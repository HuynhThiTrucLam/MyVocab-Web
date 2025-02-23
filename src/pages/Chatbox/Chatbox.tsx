import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChatIcon from "@/assets/icons/chatbox.svg?react";
import AddIcon from "@/assets/icons/add.svg?react";
import StopIcon from "@/assets/icons/stopChat.svg?react";
import SendIcon from "@/assets/icons/sendIcon.svg?react";

import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import ChatList from "@/components/chat/ChatList";
import { SpinnerAnswering } from "@/components/Spinner";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
}

interface Answer {
  id: string;
  content: string;
  createdAt: string;
  chatId: string;
  role: "user" | "ai";
}

export const mockAnswers: Answer = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  content: "Hả",
  createdAt: "2024-02-18T08:00:00Z",
  chatId: "550e8400-e29b-41d4-a716-446655440001",
  role: "ai",
};

export interface Chat {
  id: string;
  tittle: string;
  date: string;
}

export const mockChatsByUserID: Chat[] = [
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

const mockChatMessages: Message[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    content: "Chào bạn",
    role: "user",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    content: "Hả?",
    role: "ai",
  },
];

export function Chatbox() {
  const [listChats, setListChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [isOpenNewChat, setIsOpenNewChat] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTyping(e.target.value);
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set new height
  };

  const handleGetAnswer = async () => {
    setProcessing(true);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMessages((prev) => [...prev, mockAnswers]);
    setLoading(false);
    setProcessing(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!typing.trim()) return;
    console.log("generate new message");

    //Tao mot cau hoi moi
    const newMessage: Message = {
      id: Date.now().toString(),
      content: typing,
      role: "user",
    };

    //Them cau hoi moi vao danh sach messages

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTyping("");
    if (inputRef.current) {
      inputRef.current.style.height = "30px"; // Reset to initial height
    }
    // TODO: Add AI response logic here
    await handleGetAnswer();
  };

  const handleStop = () => {
    setProcessing(false);
    console.log("Stop");
  };

  const handleAddChat = () => {
    if (isOpenNewChat) {
      return;
    }
    setIsOpenNewChat(true);
    setSelectedChat(undefined);
    console.log("Add chat");
  };

  const handleSelectChat = (chatId: string) => {
    console.log("selected: ", chatId);
    setSelectedChat(listChats.find((chat) => chat.id === chatId));
    // load messages
    setMessages(mockChatMessages);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // Cuộn về đầu container
    }
  }, [messages]);

  useEffect(() => {
    setListChats(mockChatsByUserID);
  }, []);

  return (
    <div className={styles.Chatbox}>
      <Card className={styles.ChatboxLeft}>
        <CardHeader className={styles.ChatboxHeader}>
          <div className={styles.ChatboxTitle}>
            <ChatIcon className="w-4 h-4" />
            <p className="text-black font-bold !mt-[0px]">MyVocab Chat</p>
          </div>
          <AddIcon
            className="w-4 h-4 !mt-[0px] cursor-pointer"
            onClick={handleAddChat}
          />
        </CardHeader>
        <CardContent className={styles.ChatboxLeftContent}>
          {isOpenNewChat ? (
            <Card className="flex flex-row  p-3 cursor-pointer mb-4 border border-black">
              <div className="flex flex-col gap-2 justify-between cursor-pointer">
                <h3 className="text-black text-[14px] font-bold !mt-[0px]">
                  Đoạn chat mới
                </h3>
                <p className="text-medium text-[12px]">...</p>
              </div>
            </Card>
          ) : null}
          <ChatList
            listChats={listChats}
            selectedChat={selectedChat}
            handleSelectChat={handleSelectChat}
          ></ChatList>
        </CardContent>
      </Card>
      <div className="h-full max-h-[82dvh]">
        <Card className={styles.ChatboxFrame}>
          <div className={styles.ChatboxChat} ref={chatContainerRef}>
            {messages.length === 0 ? (
              <div className="justify-center items-center flex h-full">
                <div className={styles.ChatboxEmpty}>
                  <h2 className="text-[30px] font-extrabold text-black">
                    MyVocab Chat
                  </h2>
                  <p className="text-[14px] text-[#37474F]">
                    Bắt đầu trò chuyện với MyVocab Chat.
                  </p>
                  <p className="text-[14px] text-[#37474F]">
                    Hãy thử bắt đầu cuộc trò chuyện... Bạn muốn học gì hôm nay?
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    ref={index === messages.length - 1 ? lastMessageRef : null} // Gán ref cho tin nhắn cuối
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg leading-[1.5] ${
                        message.role === "user"
                          ? "bg-secondary/50 text-black "
                          : "bg-gray-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading ? (
                  <div className={`flex ${"justify-start"}`}>
                    <div className={`max-w-[70%] pl-5 rounded-lg`}>
                      <SpinnerAnswering />
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className={styles.ChatboxSend}>
            <div className={styles.ChatboxBar}>
              {/* <Input
                value={typing}
                onChange={handleChange}
                onKeyDown={handleEnter}
                disabled={processing}
                placeholder={
                  processing ? "Đang gửi..." : "Nhập nội dung chat tại đây..."
                }
                className="flex-1"
              /> */}
              <textarea
                ref={inputRef}
                value={typing}
                onChange={handleChange}
                onKeyDown={handleEnter}
                disabled={processing}
                placeholder={
                  processing ? "Đang gửi..." : "Nhập nội dung chat tại đây..."
                }
                className="flex-1 resize-none overflow-scroll"
                rows={1} // Start small
                style={{ minHeight: "30px", maxHeight: "150px" }} // Auto-expand but keep limits
              />
            </div>
            <div className={styles.ChatboxSendIcon}>
              <p className="text-[12px] text-[#37474F]">
                {" "}
                {typing.length}/1000 từ
              </p>
              {processing ? (
                <div onClick={handleStop}>
                  <StopIcon></StopIcon>
                </div>
              ) : (
                <div onClick={handleSend}>
                  <SendIcon></SendIcon>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
