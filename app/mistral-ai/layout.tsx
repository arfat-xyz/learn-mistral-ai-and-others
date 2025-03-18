import DashboardLayoutClientComponent from "@/components/dashboard/dashboard-layout-client-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import { mistralSidebarLinks } from "@/lib/constants";
import React from "react";
export const metadata = metaDataGeneratorForNormalPage("Mistral AI");
const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardLayoutClientComponent sidebarLinks={mistralSidebarLinks}>
      {children}
    </DashboardLayoutClientComponent>
  );
};

export default DashboardLayout;
