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

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Exam } from "@/features/listening-exam/types/Exams";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Answers } from "../../types/Answer";
import styles from "./styles.module.scss";
import { SelectedOption } from "../../types/Question";
import Notification from "./Notification";
import { useAuth } from "@/contexts/auth-context";
import { listeningService } from "../../api/listening-service";
import { ResultRequest } from "../../types/Result";

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
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ListOfAnswers, setListOfAnswers] = useState<Answers[]>([]);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedOption>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingSuccess, setIsSubmittingSuccess] = useState(false);

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

  const handleExitTesting = () => {
    setIsOpenDialog(false);
    navigate("/exams");
  };

  const handleViewResult = () => {
    console.log("Xem kết quả");
  };

  const getFinishedTime = () => {
    const finishedTime = exam.time - (hour * 60 + minute + second / 60);
    return finishedTime;
  };

  const handleOpenDialog = async () => {
    setIsOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const finishedTime = getFinishedTime();
      const result: ResultRequest = {
        userId: user?.id || "",
        examId: exam.id,
        finishedTime: finishedTime,
        results: ListOfAnswers,
      };

      console.log("result", result);
      const response = await listeningService.postResult(result);
      console.log("response", response);

      if (response.status === 200) {
        setIsSubmitting(false);
        setIsSubmittingSuccess(true);
        await new Promise((res) => setTimeout(res, 3000));
      }
    } catch (error) {
      setIsSubmitting(false);
      setIsSubmittingSuccess(false);
      console.log("error", error);
    }
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
      <Carousel className={styles.testingContentLeft} setApi={setEmblaApi}>
        <CarouselContent>
          {exam.questions.map((question, index) => (
            <CarouselItem key={index}>
              <div className={styles.chooseAnswerQues}>
                <h3>Câu {index + 1}</h3>
                <div className="flex flex-col gap-6">
                  {/* <div className={styles.chooseAnswerQuesTitle}> */}
                  <span className="text-left text-[14px] font-medium text-gray-500">
                    {question.question}
                  </span>
                  {/* </div> */}
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
                  </div>
                  {question.img ? <img src={question.img} alt="img" /> : null}
                </div>
                <div className={styles.chooseAnswerQuesAnswer}>
                  {question.type.name === "Choose the correct answer" ? (
                    question.options
                      ?.slice()
                      .sort((a, b) => a.symbol.localeCompare(b.symbol))
                      .map((option) => (
                        <Answer
                          key={option.id}
                          symbol={option.symbol}
                          description={option.description}
                          handleClick={() => {
                            setSelectedAnswers(option);
                            console.log("selectedAnswer", selectedAnswers);
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
          handleOpenDialog={handleOpenDialog}
        />
      </div>

      {isTimeUp && (
        <Notification
          type="time-up"
          isOpenDialog={isTimeUp}
          handleExitTesting={handleExitTesting}
          handleViewResult={handleViewResult}
        />
      )}

      {isOpenDialog && (
        <Notification
          type="submit"
          isOpenDialog={isOpenDialog}
          isSubmitting={isSubmitting}
          isSubmittingSuccess={isSubmittingSuccess}
          handleExitTesting={handleExitTesting}
          handleViewResult={handleViewResult}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default TestingContent;
