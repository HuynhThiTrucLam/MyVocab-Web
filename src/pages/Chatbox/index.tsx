import { Chatbox } from "@/components/ChatBox";
import styles from "./styles.module.scss";

export default function ChatboxPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Assistant</h1>
      <Chatbox />
    </div>
  );
}
