import React from "react";
import { Card } from "../ui/card";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { Chat } from "@/pages/ChatBox/Chatbox";

interface ChatItemProps {
  chat: Chat;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between">
      <h3 className="text-black text-[14px] font-bold !mt-[0px]">
        {chat.tittle}
      </h3>
      <p className="text-medium text-[12px]">
        {"Tạo lúc: "}
        {dayjs(chat.date).format("HH:mm DD/MM/YYYY")}
      </p>
    </div>
  );
};

export default ChatItem;
