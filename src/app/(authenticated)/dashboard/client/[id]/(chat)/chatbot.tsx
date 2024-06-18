"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";

import { useChat } from "@ai-sdk/react";

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex h-screen max-w-xl flex-col border">
      <div className="flex-1 overflow-y-auto scroll-smooth p-6">
        <div className="space-y-4">
          <AssistantMessage message="Hello, welcome to the Dynamic Need Anaylsis Calculator. I am an AI assistant ready to help." />
          {messages.map((m) =>
            m.role === "user" ? (
              <ChatMessage key={m.id} message={m.content} />
            ) : (
              <AssistantMessage key={m.id} message={m.content} />
            )
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-4 dark:bg-gray-950">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            name="message"
            id="message"
            rows={1}
            className="min-h-[48px] resize-none rounded-2xl border border-neutral-400 p-4 pr-16 shadow-sm dark:border-gray-800"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-3 h-8 w-8"
          >
            <ArrowUpIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start justify-end gap-4">
      <div className="grid gap-1 text-sm">
        <div className="font-medium">You</div>
        <div className="prose prose-stone w-96 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid gap-1 text-sm">
        <div className="font-medium">Insurance Assistant</div>
        <div className="prose prose-stone w-96 rounded-lg">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
