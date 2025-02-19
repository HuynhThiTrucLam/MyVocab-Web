import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import ChatItem from "./ChatItem";
import { Card } from "../ui/card";
import { Chat } from "@/pages/ChatBox/Chatbox";

interface listChatsProps {
  listChats: Chat[];
  selectedChat?: Chat;
  // setSelectedChat: (chat: Chat) => void;
  handleSelectChat: (chatId: string) => void;
}

const ChatList = ({
  listChats,
  selectedChat,
  handleSelectChat,
}: listChatsProps) => {
  return (
    <div className={styles.ChatList}>
      {listChats.map((chat, index) => (
        <Card
          key={chat.id}
          className={`${styles.ChatItem} ${
            selectedChat
              ? selectedChat.id === chat.id
                ? styles.active
                : ""
              : ""
          }`}
          onClick={() => handleSelectChat(chat.id)}
        >
          <ChatItem chat={chat}></ChatItem>
        </Card>
      ))}
    </div>
  );
};

export default ChatList;
