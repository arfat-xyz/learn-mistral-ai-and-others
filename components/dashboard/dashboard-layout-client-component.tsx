"use client";
import { mistralSidebarLinks } from "@/lib/constants";
import { LinkType } from "@/lib/interface";
import { removeDashFromString } from "@/lib/utils-function";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { CgArrowLeft } from "react-icons/cg";

const DashboardLayoutClientComponent = ({
  children,
  sidebarLinks = mistralSidebarLinks,
}: {
  children: ReactNode;
  sidebarLinks?: LinkType[];
  sidebarHeading?: string;
}) => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-3 mb-6 md:mb-0 md:border-r-2 md:h-screen px-3 py-2">
        <div className="h-full w-full">
          <div className="sidebar p-4">
            <Link
              href={"/"}
              className="text-2xl font-bold mb-6 inline-flex justify-center items-center group transition-all duration-300 relative"
            >
              <CgArrowLeft className="absolute opacity-0 top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100  transition-all duration-300" />
              <span className="group-hover:ml-3 transition-all duration-300">
                Back
              </span>
            </Link>
            <ul className="space-y-2 h-[calc(100vh-120px)] overflow-auto">
              {sidebarLinks.map(({ href, value }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className={`capitalize text-lg font-bold rounded-lg block ps-5 hover:text-white hover:border-transparent hover:bg-black transition-colors duration-300 ${
                      pathname === href && "bg-gray-200"
                    }`}
                  >
                    {removeDashFromString(value)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9  md:h-screen px-3 py-2">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayoutClientComponent;
