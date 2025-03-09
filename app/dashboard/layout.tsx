import DashboardLayoutClientComponent from "@/components/dashboard/dashboard-layout-client-component";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardLayoutClientComponent>{children}</DashboardLayoutClientComponent>
  );
};

export default DashboardLayout;
