"use client";

import React, { useState, useMemo } from "react";
import JobCard from "@/app/components/jobs/JobCard";
import JobFilters from "@/app/components/jobs/JobFilters";

export default function JobListingContainer({ initialJobs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  // Extract unique categories and types for the filter options dropdowns
  const uniqueCategories = useMemo(() => {
    return [...new Set(initialJobs.map((job) => job.jobCategory).filter(Boolean))];
  }, [initialJobs]);

  const uniqueTypes = useMemo(() => {
    return [...new Set(initialJobs.map((job) => job.jobType).filter(Boolean))];
  }, [initialJobs]);

  // Filter jobs client-side based on internal state
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch = 
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.responsibilities?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory;
      const matchesType = selectedType === "all" || job.jobType === selectedType;
      const matchesRemote = !isRemoteOnly || job.isRemote;

      return matchesSearch && matchesCategory && matchesType && matchesRemote;
    });
  }, [initialJobs, searchQuery, selectedCategory, selectedType, isRemoteOnly]);

  return (
    <div>
      {/* Search & Filter Component controlled via state props */}
      <JobFilters 
        categories={uniqueCategories} 
        types={uniqueTypes}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      {/* Grid or Empty State */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#121212] rounded-3xl border border-neutral-800">
          <p className="text-neutral-400 text-lg">No job listings found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}