import React from "react";
import { Card } from "../ui/card";
import dayjs from "dayjs";
import { Chat } from "./ChatList";
import styles from "./styles.module.scss";

interface ChatItemProps {
  chat: Chat;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  return (
    <Card className={styles.ChatItem}>
      <div className="flex flex-col gap-2 justify-between">
        <h3 className="text-black font-bold !mt-[0px]">{chat.tittle}</h3>
        <p className="text-medium text-[12px]">
          {"Tạo lúc: "}
          {dayjs(chat.date).format("HH:mm DD/MM/YYYY")}
        </p>
      </div>
    </Card>
  );
};

export default ChatItem;
