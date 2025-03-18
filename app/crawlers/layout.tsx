import DashboardLayoutClientComponent from "@/components/dashboard/dashboard-layout-client-component";
import { cralersLinks } from "@/lib/constants";
import React, { ReactNode } from "react";

const CralwerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardLayoutClientComponent
      sidebarHeading="Cralwers"
      sidebarLinks={cralersLinks}
    >
      {children}
    </DashboardLayoutClientComponent>
  );
};

export default CralwerLayout;
