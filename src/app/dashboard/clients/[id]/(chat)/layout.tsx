import React from "react";
import Chatbot from "./chatbot";
import SideNav from "@/components/sidenav";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">
        <div className="flex">
          <div className="h-screen flex-1 overflow-auto">{children}</div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
