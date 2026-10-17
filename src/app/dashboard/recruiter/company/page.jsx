import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

const CompanyPage = async () => {
  const session = await getUserSession();
  
  const user = session?.user || session;
  const userId = user?.id || user?._id;

  const company = await getRecruiterCompany(userId);
  console.log("company before create", company);

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;