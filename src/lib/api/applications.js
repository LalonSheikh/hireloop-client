import { serverFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
  try {
    return await serverFetch(`/api/applications?applicantId=${applicantId}`);
  } catch (error) {
    console.error("Failed to fetch applications by applicant:", error);
    return [];
  }
};