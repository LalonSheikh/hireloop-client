// import React from "react";
// import { serverFetch } from "@/lib/core/server";
// import Link from "next/link";

// export default async function JobsPage() {
//   let jobs = [];

//   try {
//     const res = await serverFetch('/api/jobs');
//     // Safely extract the jobs array whether it's wrapped in { jobs: [...] } or returned directly
//     jobs = Array.isArray(res) ? res : (res?.jobs || []);
//   } catch (error) {
//     console.error("Failed to fetch jobs:", error.message);
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4 min-h-[60vh]">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Open Positions</h1>
//         <p className="text-sm text-neutral-400">Discover your next engineering challenge.</p>
//       </div>

//       {jobs.length === 0 ? (
//         <p className="text-neutral-400 text-sm">No job positions available right now.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => {
//             const jobId = job._id || job.id;
//             return (
//               <div 
//                 key={jobId}
//                 className="bg-[#18181b] border border-neutral-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-neutral-700 transition-colors"
//               >
//                 <div>
//                   <span className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
//                     {job.companyName || "Confidential"}
//                   </span>
//                   <h2 className="text-lg font-semibold text-white mt-1 mb-2">
//                     {job.jobTitle}
//                   </h2>
//                   <p className="text-xs text-neutral-400 line-clamp-2 mb-6">
//                     {job.responsibilities || job.jobCategory}
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {job.location && (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium">
//                         📍 {job.location}
//                       </span>
//                     )}
//                     {job.jobType && (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium">
//                         💼 {job.jobType}
//                       </span>
//                     )}
//                     {job.minSalary && (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium">
//                         💰 ${job.minSalary} -${job.maxSalary}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
//                   <Link
//                     href={`/jobs/${jobId}`}
//                     className="group flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors"
//                   >
//                     Apply Now
//                     <span className="group-hover:translate-x-1 transition-transform">→</span>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
import { getJobs } from "@/lib/api/jobs";
import JobListingContainer from "@/app/components/jobs/JobListingContainer";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Open Positions</h1>
          <p className="text-neutral-400">Discover your next career opportunity and apply today.</p>
        </div>

        {/* Client-Managed Job Listing Container */}
        <JobListingContainer initialJobs={jobs} />
      </div>
    </main>
  );
}