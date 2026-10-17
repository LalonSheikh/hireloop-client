"use client";

import React, { useState } from "react";
import { Form, TextArea, Switch, toast } from "@heroui/react";
import { createJob } from "@/lib/actions/jobs";
import { redirect, useRouter } from "next/navigation";
import { Briefcase } from "@gravity-ui/icons";

export default function PostJobForm({ company }) {
  console.log("PostJobForm received company Props:", company);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [locationValue, setLocationValue] = useState("");

  // Updated handler to correctly toggle remote status and clear text when unchecked
  const handleRemoteChange = (checked) => {
    setIsRemote(checked);
    if (checked) {
      setLocationValue("Remote");
    } else {
      setLocationValue(""); // Clears "Remote" so you can type a custom location again
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const payload = {
        ...data,
        isRemote,
        companyId: company._id,
        companyName: company.name,
        companyLogo: company.logoUrl,
        status: "active",
        isPubliclyVisible: true,
      };

      console.log("Submitting Job Data:", payload);

      const res = await createJob(payload);

      console.log("Create Job Response:", res);

      if (res?.success) {
        alert("Job posted successfully and is now live!");

        setLocationValue("");
        setIsRemote(false);

        router.push("/dashboard/recruiter/jobs");
      } else {
        alert(res?.message || "Failed to post job.");
      }
    } catch (error) {
      console.error("Failed to create job:", error);
      alert("Something went wrong while posting the job.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="px-6 py-6 md:px-8 md:pt-8 border-b border-neutral-800/80 flex items-start justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Post a New Job
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-1">
            Enter your job details to start receiving qualified applicants on
            HireLoop.
          </p>
          {/* Company verification status panel */}
          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
            <Briefcase size={14} className="text-zinc-500" />
            Posting as:{" "}
            <span className="font-semibold text-zinc-300">{company.name}</span>
            <span className="text-emerald-500 font-medium bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">
              {company.status}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {company.status!=="Approved" && <div>Please wait to get approval</div> }
      {company.status === "Approved" && (
        <Form
          onSubmit={handleSubmit}
          className="bg-[#18181b] border border-neutral-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Form Body Fields Grid */}
          <div className="p-6 md:p-8 flex flex-col gap-6">
            {/* Row 1: Job Title & Job Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Job Title
                </label>
                <input
                  name="jobTitle"
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  required
                  className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Job Category
                </label>
                <div className="relative">
                  <select
                    name="jobCategory"
                    defaultValue="Technology"
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Job Type & Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Job Type
                </label>
                <div className="relative">
                  <select
                    name="jobType"
                    defaultValue="Full-time"
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Salary Range (Min - Max USD)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="minSalary"
                    type="number"
                    placeholder="Min (e.g. 50000)"
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                  <input
                    name="maxSalary"
                    type="number"
                    placeholder="Max (e.g. 80000)"
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Location with Toggle & Application Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-neutral-300">
                    Location
                  </label>

                  {/* Clean Custom Switch Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-xs text-neutral-400">
                      Remote Position
                    </span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isRemote}
                        onChange={(e) => handleRemoteChange(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 peer-checked:after:bg-neutral-950 after:border-neutral-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white"></div>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <input
                    name="location"
                    type="text"
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                    disabled={isRemote}
                    placeholder={isRemote ? "Fully Remote" : "City, Country"}
                    required={!isRemote}
                    className={`w-full bg-[#121214] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors ${
                      isRemote ? "opacity-60 cursor-not-allowed italic" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Application Deadline
                </label>
                <input
                  name="deadline"
                  type="date"
                  required
                  className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
            {/* Row 4: Responsibilities */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-300">
                Responsibilities
              </label>
              <TextArea
                name="responsibilities"
                placeholder="Outline daily duties, expectations, and goals..."
                required
                className="w-full bg-[#121214] border border-neutral-800 rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 min-h-[110px] focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>

            {/* Row 5: Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-300">
                Requirements & Tech Stack
              </label>
              <TextArea
                name="requirements"
                placeholder="List core tech skills, years of experience, qualifications..."
                required
                className="w-full bg-[#121214] border border-neutral-800 rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 min-h-[110px] focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>

            {/* Row 6: Benefits (Optional) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-300">
                Benefits (Optional)
              </label>
              <TextArea
                name="benefits"
                placeholder="Health insurance, remote budget, flexible hours..."
                className="w-full bg-[#121214] border border-neutral-800 rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 min-h-[80px] focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Footer Actions Container */}
          <div className="px-6 py-4 md:px-8 md:py-5 bg-[#121214]/60 border-t border-neutral-800/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish Job Post"}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}
