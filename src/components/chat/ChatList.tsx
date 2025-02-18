import React from "react";
import ChatItem from "./chatitem";
import styles from "./styles.module.scss";

export interface Chat {
  id: string;
  tittle: string;
  date: string;
}

export const mockChats: Chat[] = [
  {
    id: "1",
    tittle: "Cuộc trò chuyện 1",
    date: "2025-02-18T08:30:00Z",
  },
  {
    id: "2",
    tittle: "Cuộc trò chuyện 2",
    date: "2025-02-17T14:15:00Z",
  },
  {
    id: "3",
    tittle: "Công việc",
    date: "2025-02-16T09:45:00Z",
  },
  {
    id: "4",
    tittle: "Học tập",
    date: "2025-02-15T18:00:00Z",
  },
  {
    id: "5",
    tittle: "Du lịch",
    date: "2025-02-14T11:25:00Z",
  },
];

const ChatList = () => {
  return (
    <div className={styles.ChatList}>
      {mockChats.map((chat) => (
        <ChatItem key={chat.id} chat={chat}></ChatItem>
      ))}
    </div>
  );
};

export default ChatList;
