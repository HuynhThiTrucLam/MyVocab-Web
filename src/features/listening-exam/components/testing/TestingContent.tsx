import AudioIcon from "@/assets/icons/audio.svg";
import PlayIcon from "@/assets/icons/PlayIcon.svg";
import Answer from "@/components/Answer/Answer";
import TimeAndAnwers from "@/components/TimeAndAnwser/TimeAndAnwers";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Exam } from "@/features/listening-exam/types/Exams";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Answers } from "../../types/Answer";
import styles from "./styles.module.scss";

interface TestingContentProps {
  exam: Exam;
  hour: number;
  minute: number;
  second: number;
  handlePlay: () => void;
  handleStop: () => void;
  setExam: (exam: Exam) => void;
}

const TestingContent = ({
  exam,
  hour,
  minute,
  second,
  handlePlay,
  handleStop,
  setExam,
}: TestingContentProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ListOfAnswers, setListOfAnswers] = useState<Answers[]>([]);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [_, setIsTimeUp] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // Ensure question is in ListOfAnswers
  const ensureQuestionInList = (questionId: string) => {
    if (!ListOfAnswers.some((a) => a.questionId === questionId)) {
      setListOfAnswers((prev) => [
        ...prev,
        { questionId, answer: "", isMarked: false },
      ]);
    }
  };

  const handleMarkToReview = (questionId: string) => {
    ensureQuestionInList(questionId);
    setListOfAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, isMarked: !answer.isMarked }
          : answer
      )
    );
    console.log(ListOfAnswers);
  };

  // Handler to set current index and scroll carousel
  const handleChecklistClick = (index: number) => {
    setCurrentIndex(index);
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  // Handle input change and set the value to the answer in ListOfAnswers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setListOfAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === exam.questions[currentIndex].id
          ? { ...answer, answer: value }
          : answer
      )
    );
  };

  const handleSeeResult = () => {
    console.log("see result");
  };

  const handleExitTesting = () => {
    setIsOpenDialog(false);
    navigate("/exams");
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setCurrentIndex(index);
      const questionId = exam.questions[index].id;
      ensureQuestionInList(questionId);

      console.log("Current question:", exam.questions[index]);
      console.log("Current index:", index);
      console.log("List of answers:", ListOfAnswers);
    };

    emblaApi.on("select", onSelect);

    // Trigger once on mount
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, exam.questions]);

  useEffect(() => {
    if (hour === 0 && minute === 0 && second === 0) {
      setIsTimeUp(true);
      setIsOpenDialog(true);
    }
  }, [hour, minute, second]);

  return (
    <div className={styles.testingContent}>
      <div className="relative">
        <Carousel className={styles.testingContentLeft} setApi={setEmblaApi}>
          <CarouselContent>
            {exam.questions.map((question, index) => (
              <CarouselItem key={index}>
                <div className={styles.chooseAnswerQues}>
                  <h3>Câu {index + 1}</h3>
                  <div className="flex flex-col gap-6">
                    <div className={styles.chooseAnswerQuesTitle}>
                      <p>{question.question}</p>
                    </div>
                    <div className={styles.chooseAnswerQuesAudio}>
                      <div className={styles.chooseAnswerQuesAudioItem}>
                        <img src={PlayIcon} alt="play" />
                      </div>

                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        style={{ width: "100%" }}
                      />

                      <div className={styles.chooseAnswerQuesAudioItem}>
                        <img src={AudioIcon} alt="audio" />
                      </div>
                      {question.img ? (
                        <img src={question.img} alt="img" />
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.chooseAnswerQuesAnswer}>
                    {question.type.id === "C" ? (
                      question.options?.map((option) => (
                        <Answer
                          key={option.id}
                          symbol={option.symbol}
                          description={option.description}
                          handleClick={() => {
                            setExam({
                              ...exam,
                              questions: exam.questions.map((_question) => {
                                if (_question.id === question.id) {
                                  return {
                                    ..._question,
                                    options: _question.options?.map(
                                      (_option) => ({
                                        ..._option,
                                        isSelected: _option.id === option.id,
                                      })
                                    ),
                                  };
                                }
                                return _question;
                              }),
                            });

                            ensureQuestionInList(question.id);

                            setListOfAnswers((prev) =>
                              prev.map((answer) =>
                                answer.questionId === question.id
                                  ? { ...answer, answer: option.id }
                                  : answer
                              )
                            );
                          }}
                          isSelected={option.isSelected}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col gap-4">
                        <p className="text-left text-[14px] font-medium text-gray-500">
                          Điền đáp án vào chỗ trống dưới đây:
                        </p>
                        <Input
                          type="text"
                          className="your-input-class py-7 rounded-md"
                          placeholder="Nhập đáp án của bạn"
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    className={`${styles.markToReview} ${
                      ListOfAnswers.find(
                        (answer) =>
                          answer.questionId === question.id && answer.isMarked
                      )
                        ? styles.marked
                        : ""
                    }`}
                    onClick={() => handleMarkToReview(question.id)}
                  >
                    <p>Xem lại</p>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute mt-[2rem] top-2 left-1/2 -translate-x-1/2 w-[82%] flex justify-between z-10">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className={styles.testingContentRight}>
        <TimeAndAnwers
          hour={hour}
          minute={minute}
          second={second}
          handlePlay={handlePlay}
          handleStop={handleStop}
          listOfQuestions={exam.questions}
          ListOfAnswers={ListOfAnswers}
          currentIndex={currentIndex}
          setCurrentIndex={handleChecklistClick}
        />
      </div>

      <Dialog open={isOpenDialog}>
        <DialogContent className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Thời gian đã hết. Bài thi đã tự động nộp</DialogTitle>
            <DialogDescription>
              Bạn đã hết thời gian làm bài. Vui lòng chọn Xem kết quả để xem kết
              quả.
            </DialogDescription>
            <DialogFooter>
              <Button
                className={`${styles.borderButton} w-full rounded-full text-[14px] font-bold text-[#37474F] hover:text-[#fff]`}
                onClick={handleExitTesting}
              >
                Thoát
              </Button>
              <Button
                className={`${styles.submitButton} bg-[#31E3A5] w-full rounded-full text-[14px] font-bold text-[#37474F] hover:text-[#fff]`}
                onClick={handleSeeResult}
              >
                Xem kết quả
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestingContent;
