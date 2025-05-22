import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Answers } from "@/features/listening-exam/types/Answer";
import { QuestionListening } from "@/features/listening-exam/types/Question";
import { useState } from "react";
import { Button } from "../ui/button";
import Checklist from "./Checklist/Checklist";
import styles from "./style.module.scss";
import Timer from "./Timer/Timer";
import { useNavigate } from "react-router-dom";

interface TimeAndAnwersProps {
  hour: number;
  minute: number;
  second: number;
  handlePlay: () => void;
  handleStop: () => void;
  listOfQuestions: QuestionListening[];
  ListOfAnswers: Answers[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const TimeAndAnwers = ({
  hour,
  minute,
  second,
  handlePlay,
  handleStop,
  listOfQuestions,
  ListOfAnswers,
  currentIndex,
  setCurrentIndex,
}: TimeAndAnwersProps) => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleStopAndContinue = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  const handleSubmit = () => {
    // Giả sử sau khi post ListAnwser lên API sẽ trả về id của kết quả bài thi - resultId
    const resultId = "123"; // mock

    console.log("resultId", resultId);
    navigate(`/result/${resultId}`);
  };

  return (
    <div className={styles.timeAndAnswers}>
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-left">Thời gian còn lại</h3>
        <Timer hour={hour} minute={minute} second={second} />
      </div>
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-left">Danh sách câu hỏi</h3>
        <Checklist
          listOfQuestions={listOfQuestions}
          ListOfAnswers={ListOfAnswers}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <div className={styles.timeAndAnswersNote}>
        <div className={styles.timeAndAnswersNoteItem}>
          <div className="w-4 h-4 bg-[#31E3A5] rounded-sm"></div>
          <p>Câu hỏi đã có đáp án</p>
        </div>
        <div className={styles.timeAndAnswersNoteItem}>
          <div className="w-4 h-4 bg-[#37474F] rounded-sm"></div>
          <p>Câu hỏi được đánh dấu để xem lại</p>
        </div>
        <div className={styles.timeAndAnswersNoteItem}>
          <div className="w-4 h-4 bg-white border border-[#37474F] rounded-sm"></div>
          <p>Câu hỏi chưa có đáp án</p>
        </div>
      </div>
      <div className={styles.timeAndAnswersButton}>
        <button onClick={handleStopAndContinue} className={styles.borderButton}>
          {isRunning ? "Dừng" : "Tiếp tục"}
        </button>
        <div className={styles.submitButton}>
          <Dialog open={isOpenDialog}>
            <DialogTrigger onClick={() => setIsOpenDialog(true)}>
              Nộp bài
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-5">
              <DialogHeader>
                <DialogTitle>Bạn có chắc chắn muốn nộp bài?</DialogTitle>
                <DialogDescription>
                  Đừng quên kiểm tra lại các đáp án của mình trước khi nộp bài
                  để đạt kết quả tốt nhất!
                </DialogDescription>
                <DialogFooter>
                  <Button
                    className={`${styles.borderButton} w-full rounded-full text-[14px] font-bold text-[#37474F] hover:text-[#fff]`}
                    onClick={() => setIsOpenDialog(false)}
                  >
                    Thoát
                  </Button>
                  <Button
                    className={`${styles.submitButton} w-full rounded-full text-[14px] font-bold text-[#37474F] hover:text-[#fff]`}
                    onClick={handleSubmit}
                  >
                    Nộp bài
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TimeAndAnwers;
