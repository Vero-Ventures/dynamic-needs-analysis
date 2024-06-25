import React from "react";
import SideNav from "@/components/sidenav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <div className="flex">
          <div className="h-screen flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
