import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";

export default function Chatbot() {
  return (
    <div className="flex h-screen max-w-xl flex-col border">
      <div className="flex-1 overflow-y-auto scroll-smooth p-6">
        <div className="space-y-4">
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
          <ChatMessage />
          <AssistantMessage />
        </div>
      </div>
      <div className="bg-gray-100 p-4 dark:bg-gray-950">
        <div className="relative">
          <Textarea
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
        </div>
      </div>
    </div>
  );
}

function ChatMessage() {
  return (
    <div className="flex items-start justify-end gap-4">
      <div className="grid gap-1 text-sm">
        <div className="font-medium">You</div>
        <div className="prose prose-stone w-96 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <p>
            Hi there! Can you tell me a bit about yourself? Hi there! Can you
            tell me a bit about yourself?
          </p>
        </div>
      </div>
    </div>
  );
}

function AssistantMessage() {
  return (
    <div className="flex items-start gap-4">
      <div className="grid gap-1 text-sm">
        <div className="font-medium">Insurance Assistant</div>
        <div className="prose prose-stone w-96 rounded-lg">
          <p>
            It's a pleasure to meet you! I'm an AI assistant created by Acme
            Inc. I'm here to help with all sorts of tasks, from research and
            analysis to creative projects and problem-solving. Please let me
            know if there's anything I can assist you with.
          </p>
        </div>
      </div>
    </div>
  );
}
