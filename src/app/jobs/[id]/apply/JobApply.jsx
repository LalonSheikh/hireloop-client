"use client";

import React, { useState } from "react";
import { Form, Button, TextField, Label, Input, Description, FieldError } from "@heroui/react";
import { Link, FileText, LayoutHeaderCells } from "@gravity-ui/icons";

const JobApply = ({ job, applicant }) => {
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    additionalNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine job metadata, applicant details, and user form data
    const submissionData = {
      jobId: job?._id || job?.id,
      jobTitle: job?.jobTitle || job?.title,
      jobType: job?.jobType,
      applicantId:applicant?.id,
      companyName: job?.companyName,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      status:"applied",
      ...formData,
    };

    console.log("Submitting Application Data:", submissionData);

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Application Submitted Successfully!");
        setSubmitted(true);
      } else {
        alert(result.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Network or server error during submission:", error);
      alert("An error occurred while submitting your application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl shadow-blue-950/20">
        
        {/* Header Section */}
        <div className="text-center mb-8 pb-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <LayoutHeaderCells className="w-6 h-6 text-blue-400" />
            {job?.jobTitle || job?.title || "Position"}
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Applying as <span className="text-blue-400 font-medium">{applicant?.name || "Candidate"}</span> ({applicant?.email || "candidate@email.com"})
          </p>
          {job?.companyName && (
            <p className="text-xs text-zinc-500 mt-1">Company: {job.companyName} | Type: {job?.jobType}</p>
          )}
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
              ✓
            </div>
            <h3 className="text-lg font-semibold text-white">Application Submitted!</h3>
            <p className="text-sm text-zinc-400 mt-1">We have successfully recorded your details in MongoDB.</p>
          </div>
        ) : (
          <Form 
            validationBehavior="native" 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5"
          >
            {/* Resume Link */}
            <TextField name="resumeLink" isRequired type="url" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                Resume / CV Link <span className="text-blue-400 font-normal">(Required)</span>
              </Label>
              <Input 
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="https://www.resume.com/your-cv" 
                className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
              />
              <Description className="text-xs text-zinc-500">Provide a link to your Google Drive, Dropbox, or online profile.</Description>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Portfolio Link */}
            <TextField name="portfolioLink" type="url" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Link className="w-4 h-4 text-blue-400" />
                Portfolio / GitHub Link <span className="text-zinc-500 font-normal">(Optional)</span>
              </Label>
              <Input 
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
                placeholder="https://github.com/username" 
                className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Additional Notes */}
            <TextField name="additionalNotes" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Additional Notes <span className="text-zinc-500 font-normal">(Optional)</span>
              </Label>
              <Input 
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Write a brief note about why you fit this role..." 
                className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-700/60 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-600 min-h-[80px]"
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button 
                type="submit" 
                isDisabled={loading}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
              <Button 
                type="reset" 
                variant="flat" 
                onClick={() => setFormData({ resumeLink: "", portfolioLink: "", additionalNotes: "" })}
                className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm rounded-xl transition-all cursor-pointer"
              >
                Reset
              </Button>
            </div>
          </Form>
        )}

        <div className="text-center mt-6 pt-4 border-t border-zinc-800/40">
          <p className="text-xs text-zinc-500">
            Copyright © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default JobApply;