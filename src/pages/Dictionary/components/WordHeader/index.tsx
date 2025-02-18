import HeartIcon from "@/assets/icons/heart.svg?react";
import LoundSpeakIcon from "@/assets/icons/loundspeaker.svg?react";
import ShareIcon from "@/assets/icons/share.svg?react";
import styles from "./styles.module.scss";
import { useState } from "react";

interface WordHeaderProps {
  word: string;
  phonetic: string;
  audioUrl?: string;
}

export function WordHeader({ word, phonetic, audioUrl }: WordHeaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (audioUrl && !isPlaying) {
      setIsPlaying(true);
      const audio = new Audio(audioUrl);
      try {
        await audio.play();

        await new Promise((resolve) => {
          audio.onended = resolve;
        });
      } catch (err) {
        console.error("Failed to play audio:", err);
      } finally {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.wordGroup}>
        <h2 className={styles.word}>{word}</h2>
        <p className={styles.pronunciation}>{phonetic}</p>
      </div>
      <div className={styles.actions}>
        <HeartIcon className={`${styles.actionIcon} ${styles.heart}`} />
        <LoundSpeakIcon
          className={`${styles.actionIcon} ${styles.speaker} ${
            !audioUrl || isPlaying ? styles.disabled : ""
          } ${isPlaying ? styles.playing : ""}`}
          onClick={handlePlayAudio}
        />
        <ShareIcon className={`${styles.actionIcon} ${styles.share}`} />
      </div>
    </div>
  );
}
