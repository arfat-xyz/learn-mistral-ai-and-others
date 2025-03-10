"use client";
import { sidebarLinks } from "@/lib/constants";
import { removeDashFromString } from "@/lib/utils-function";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayoutClientComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-3 mb-6 md:mb-0 md:border-r-2 md:h-screen px-3 py-2">
        <div className="h-full w-full">
          <div className="sidebar p-4">
            <Link href={"/"} className="text-2xl font-bold mb-6">
              Home
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
