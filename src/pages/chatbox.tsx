import { Chatbox } from "@/components/workspace/chatbox";

export default function ChatboxPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      <Chatbox />
    </div>
  );
}
