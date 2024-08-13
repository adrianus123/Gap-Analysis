import React from "react";
import HeaderLayout from "../components/Layouts/HeaderLayout";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import Alert from "../components/Fragments/Alert";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Alert open={true} />
      <HeaderLayout />
      <div className="flex-1 flex">
        <DashboardLayout />
      </div>
    </div>
  );
};

export default Dashboard;
