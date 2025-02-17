import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./styles.module.scss";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
    // Add AI response logic here
  };

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className={styles.messageList}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === "user" ? styles.user : styles.ai
            }`}
          >
            {message.text}
          </div>
        ))}
      </CardContent>
      <div className={styles.inputContainer}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyUp={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
}
