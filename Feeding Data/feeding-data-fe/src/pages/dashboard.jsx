import React from "react";
import HeaderLayout from "../components/Layouts/HeaderLayout";
import DashboardLayout from "../components/Layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLayout />
      <div className="flex-1 flex">
        <DashboardLayout />
      </div>
    </div>
  );
};

export default Dashboard;
