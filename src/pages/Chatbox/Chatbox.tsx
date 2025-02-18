import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChatIcon from "@/assets/icons/chatbox.svg?react";
import AddIcon from "@/assets/icons/add.svg?react";
import styles from "./styles.module.scss";
import { useState } from "react";
import ChatList from "@/components/chat/ChatList";

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
    <div className={styles.Chatbox}>
      <Card className={styles.ChatboxLeft}>
        <CardHeader className={styles.ChatboxHeader}>
          <div className={styles.ChatboxTitle}>
            <ChatIcon className="w-4 h-4" />
            <p className="text-black font-bold !mt-[0px]">MyVocab Chat</p>
          </div>
          <AddIcon className="w-4 h-4 !mt-[0px]" />
        </CardHeader>
        <CardContent className={styles.ChatboxLeftContent}>
          <ChatList></ChatList>
        </CardContent>
      </Card>
      <Card className="Chatbox-right">
        <div className=""></div>
        <div className={styles.ChatboxSend}>
          <div className={styles.ChatboxBar}>
            <p>Nhập nội dung chat tại đây</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
