import { getJobById } from "@/lib/api/jobs";
import { Card } from "@heroui/react";
import { MapPin, Briefcase, CircleDollarSign, Calendar, CheckCircle2, Award, Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;

  // 
  const job = await getJobById(id);

  console.log("Job details page", job);

  // যদি জব না পাওয়া যায়
  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
        <p className="text-neutral-400 mb-4">The job you are looking for does not exist or has been removed.</p>
        <Link href="/jobs" className="px-4 py-2 bg-pink-600 rounded-xl text-white font-medium hover:bg-pink-700 transition-colors">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Company Header Section */}
        <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 shadow-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img 
              src={job.companyLogo} 
              alt={`${job.companyName} logo`} 
              className="w-16 h-16 object-contain rounded-2xl bg-white p-2 shadow-md"
            />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 bg-pink-950/40 px-3 py-1 rounded-full border border-pink-900/50">
                {job.companyName}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">
                {job.jobTitle}
              </h1>
              <p className="text-neutral-400 text-sm mt-1 flex items-center gap-1">
                <Building2 className="w-4 h-4" /> Category: {job.jobCategory}
              </p>
            </div>
          </div>

          {/* Apply Now Button */}
          <Link 
            href={`/jobs/${id}/apply`} 
            className="w-full md:w-auto text-center px-8 py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Apply Now
          </Link>
        </div>

        {/* Quick Info Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-xs text-neutral-400 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-pink-400" /> Job Type</span>
            <span className="font-semibold text-sm">{job.jobType}</span>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-xs text-neutral-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-pink-400" /> Location Type</span>
            <span className="font-semibold text-sm">{job.isRemote ? "Remote" : "On-site"}</span>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-xs text-neutral-400 flex items-center gap-1"><CircleDollarSign className="w-3.5 h-3.5 text-pink-400" /> Salary Range</span>
            <span className="font-semibold text-sm">${job.minSalary} –${job.maxSalary}/mo</span>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-xs text-neutral-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-pink-400" /> Deadline</span>
            <span className="font-semibold text-sm">{job.deadline}</span>
          </div>
        </div>

        {/* Detailed Sections (Responsibilities, Requirements, Benefits) */}
        <div className="space-y-6">
          {/* Responsibilities */}
          <div className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-pink-400">
              <CheckCircle2 className="w-5 h-5" /> Responsibilities
            </h2>
            <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
              {job.responsibilities}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-pink-400">
              <Award className="w-5 h-5" /> Requirements & Skills
            </h2>
            <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
              {job.requirements}
            </p>
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-pink-400">
                ✨ Perks & Benefits
              </h2>
              <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                {job.benefits}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default JobDetailsPage;