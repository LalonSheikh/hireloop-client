"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";

// Import all icons cleanly from the main package
import { Text, Persons, Thunderbolt, Check } from '@gravity-ui/icons';
import StatsGrid from "@/app/components/dashboard/StatsGrid";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="text-white p-6">Loading...</div>;
  }

  const user = session?.user;
  console.log("session data for recruiterdashboardhomepage", session);

  // Recruiter stats data using the correctly imported variables
  const recruiterStats = [
    { title: "Total Job Posts", value: "48", icon: Text },
    { title: "Total Applicants", value: "1,284", icon: Persons },
    { title: "Active Jobs", value: "18", icon: Thunderbolt }, // Fixed matching variable name
    { title: "Jobs Closed", value: "32", icon: Check },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Welcome Greeting */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Welcome Back, {user?.name || "Recruiter"}
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          Here is an overview of your recruitment activities.
        </p>
      </div>

      {/* Reusable Stats Component */}
      <StatsGrid stats={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;
