import { getUserSession } from "@/lib/core/session";
import JobApply from "./JobApply";
import { redirect } from "next/navigation";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getJobById } from "@/lib/api/jobs";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  FileText,
} from "lucide-react";
import { getPlanById } from "@/lib/api/plans";

export default async function ApplyPage({ params }) {
  const { id } = await params;

  // 1. Get authenticated user session first
  const user = await getUserSession();
  console.log("Current user session", user);

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-screen bg-neutral-950 flex flex-col justify-center items-center text-white p-6">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-md text-center shadow-2xl">
          <ShieldAlert className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
          <p className="text-neutral-400 text-sm">
            Only job seekers can apply for positions. Please sign in with a
            seeker account to proceed.
          </p>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = await getPlanById(user?.plan || "seeker_free");
  console.log("plan", plan);



  const job = await getJobById(id);

  const usagePercentage = Math.min(
    Math.round((applications.length / plan.maxApplicationsPerMonth) * 100),
    100,
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Job Details
        </Link>

        {/* Quota & Plan Status Card */}
        <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-900/50 text-pink-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> {plan.name} Plan Quota
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                You have applied so far:{" "}
                <span className="text-pink-400">{applications.length}</span> out
                of {plan.maxApplicationsPerMonth} this month
              </h2>
            </div>

            <Link
              href="/plans"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm shadow-lg transition-all"
            >
              Upgrade Plan
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>

          <p className="text-xs text-neutral-400">
            Purchase plan to apply for more positions.{" "}
            <Link href="/plans" className="text-pink-400 underline font-medium">
              View Pricing Options
            </Link>
          </p>
        </div>

        {/* Main Conditional Form Area */}
        {applications.length < plan.maxApplicationsPerMonth ? (
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
              <div className="p-3 bg-pink-950/50 border border-pink-900/40 rounded-2xl text-pink-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Submit Your Application</h3>
                <p className="text-xs text-neutral-400">
                  Your profile details will be attached automatically.
                </p>
              </div>
            </div>

            <JobApply job={job} applicant={user} />
          </div>
        ) : (
          <div className="bg-[#121212] border border-red-950/50 rounded-3xl p-8 text-center shadow-2xl">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Monthly Limit Reached</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
              You have reached your maximum application quota (
              {plan.maxApplicationsPerMonth} applications) for this month.
              Upgrade your plan to continue applying.
            </p>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl text-sm transition-all"
            >
              Explore Plans & Upgrade
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
