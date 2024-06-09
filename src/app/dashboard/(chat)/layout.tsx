import React from "react";
import Chatbot from "./chatbot";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="h-screen flex-1 overflow-auto">{children}</div>
      <Chatbot />
    </div>
  );
}
