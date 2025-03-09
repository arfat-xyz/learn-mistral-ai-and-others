import DashboardLayoutClientComponent from "@/components/dashboard/dashboard-layout-client-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Dashboard");
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
