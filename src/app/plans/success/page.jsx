import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { stripe } from "../../../lib/stripe";
import { MongoClient } from "mongodb";
import { email } from "better-auth";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  //
  const {
    status,
    customer_details: { email: customerEmail } = {},
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    // ইউজার টেবিল বা MongoDB-তে প্ল্যান আপডেট করার লজিক
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };

    // update the user Table about the new plan
    const result = await createSubscription(subsInfo);
    console.log(result);

    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db("hireloop_db");
      const usersCollection = db.collection("user");

      // যদি metadata-তে userId বা plan নাম পাস করা থাকে
      const userId = metadata?.userId;
      const newPlan = metadata?.plan || "seeker_pro";

      if (customerEmail) {
        await usersCollection.updateOne(
          { email: customerEmail },
          { $set: { plan: newPlan, updatedAt: new Date() } },
        );
      }
      await client.close();
    } catch (err) {
      console.error("Failed to update user plan in database:", err);
    }

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full bg-[#121212] border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-pink-950/60 border border-pink-900/50 rounded-2xl flex items-center justify-center text-pink-400 mb-6 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-950/40 border border-pink-900/50 text-pink-400 text-xs font-semibold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Payment Successful
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Welcome to HireLoop Pro!
            </h1>

            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              We appreciate your business! A confirmation email and receipt have
              been sent to{" "}
              <span className="text-white font-medium">{customerEmail}</span>.
              Your subscription is now active.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="w-full py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-600/20 transition-all"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/jobs"
                className="w-full py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all border border-neutral-700/50"
              >
                Browse Jobs
              </Link>
            </div>

            {/* Security Note */}
            <p className="text-xs text-neutral-500 mt-6 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-neutral-400" /> Secure
              checkout verified by Stripe
            </p>
          </div>
        </div>
      </div>
    );
  }
}
