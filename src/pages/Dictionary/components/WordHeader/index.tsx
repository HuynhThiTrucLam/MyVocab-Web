import HeartIcon from "@/assets/icons/heart.svg?react";
import LoundSpeakIcon from "@/assets/icons/loundspeaker.svg?react";
import ShareIcon from "@/assets/icons/share.svg?react";
import styles from "./styles.module.scss";

interface WordHeaderProps {
  word: string;
  phonetic: string;
  audioUrl?: string;
}

export function WordHeader({ word, phonetic, audioUrl }: WordHeaderProps) {
  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
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
            !audioUrl ? styles.disabled : ""
          }`}
          onClick={handlePlayAudio}
        />
        <ShareIcon className={`${styles.actionIcon} ${styles.share}`} />
      </div>
    </div>
  );
}
