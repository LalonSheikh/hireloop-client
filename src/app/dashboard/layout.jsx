import React from "react";
import { DashboardSideBar } from "../components/dashboard/DashboardSideBar";

const layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSideBar></DashboardSideBar>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
