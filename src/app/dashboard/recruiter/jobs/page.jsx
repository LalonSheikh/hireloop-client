import JobsTable from "@/app/components/recruiter/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany();

  const jobs = await getCompanyJobs(company._id) || [];

  console.log("Jobs for Company:", jobs);

  return (
    <div className="min-h-screen bg-[#09090b] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Manage Jobs
            </h1>

            <p className="mt-1 text-sm text-neutral-400">
              Manage all jobs posted by your company.
            </p>
          </div>

          <div className="text-sm text-neutral-400">
            Total Jobs:{" "}
            <span className="font-semibold text-white">
              {jobs?.length || 0}
            </span>
          </div>
        </div>

        {/* Jobs Table */}
        <JobsTable jobs={jobs || []} />
      </div>
    </div>
  );
};

export default RecruiterJobs;
