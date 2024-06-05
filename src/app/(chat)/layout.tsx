import React from "react";
import Chatbot from "./chatbot";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
      <Chatbot />
    </div>
  );
}
