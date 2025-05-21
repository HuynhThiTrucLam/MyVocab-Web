import AudioIcon from "@/assets/icons/audio.svg";
import PlayIcon from "@/assets/icons/PlayIcon.svg";
import Answer from "@/components/Answer/Answer";
import TimeAndAnwers from "@/components/TimeAndAnwser/TimeAndAnwers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
import { Exam } from "@/features/listening-exam/types/Exams";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Answers } from "../../types/Answer";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ListOfAnswers, setListOfAnswers] = useState<Answers[]>([]);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setCurrentIndex(index);

      // Log current question here
      console.log("Current question:", exam.questions[index]);
    };

    emblaApi.on("select", onSelect);

    // Trigger once on mount
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, exam.questions]);

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
                    {question.options?.map((option) => (
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
                                  options: _question.options.map((_option) => {
                                    return {
                                      ..._option,
                                      isSelected: _option.id === option.id,
                                    };
                                  }),
                                };
                              }
                              return _question;
                            }),
                          });
                          setListOfAnswers([
                            ...ListOfAnswers,
                            {
                              id: option.id,
                              questionId: question.id,
                            },
                          ]);
                        }}
                        isSelected={option.isSelected}
                      />
                    ))}
                  </div>
                  <div className={styles.markToReview}>
                    <button className="flex gap-2 items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                      <p>Xem lại</p>
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[82%] flex justify-between z-10">
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
        />
      </div>
    </div>
  );
};

export default TestingContent;
