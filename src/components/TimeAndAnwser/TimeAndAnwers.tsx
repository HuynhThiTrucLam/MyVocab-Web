import React, { useState } from "react";
import styles from "./style.module.scss";
import Timer from "./Timer";

interface TimeAndAnwersProps {
  hour: number;
  minute: number;
  second: number;
  handlePlay: () => void;
  handleStop: () => void;
}

const TimeAndAnwers = ({
  hour,
  minute,
  second,
  handlePlay,
  handleStop,
}: TimeAndAnwersProps) => {
  const [isRunning, setIsRunning] = useState(true);

  const handleStopAndContinue = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  return (
    <div className={styles.timeAndAnswers}>
      <h3>Thời gian còn lại</h3>
      <Timer hour={hour} minute={minute} second={second} />

      <div className={styles.timeAndAnswersButton}>
        <button onClick={handleStopAndContinue}>
          {isRunning ? "Dừng" : "Tiếp tục"}
        </button>
        <button onClick={handleStop}>Nộp bài</button>
      </div>
    </div>
  );
};

export default TimeAndAnwers;
