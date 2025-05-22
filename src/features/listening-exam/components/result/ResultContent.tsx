import PlayIcon from "@/assets/icons/PlayIcon.svg";
import RightAnswer from "@/assets/icons/RightAnswer";
import WrongAnswer from "@/assets/icons/WrongAnswer";
import AudioIcon from "@/assets/icons/audio.svg";
import ScriptIcon from "@/assets/icons/scriptIcon";
import ChecklistAnswer from "@/components/TimeAndAnwser/Checklist/ChecklistAnswer";
import Timer from "@/components/TimeAndAnwser/Timer/Timer";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Result } from "../../types/Result";
import DetailResultTab from "./DetailResultTab";
import styles from "./styles.module.scss";

interface ResultContentProps {
  result: Result;
}

const ResultContent = ({ result }: ResultContentProps) => {
  const navigate = useNavigate();
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRedoListening = () => {
    console.log("redo listening");
    navigate(`/testing/${result.id}`);
  };

  // Handler to sync checklist and carousel
  const handleChecklistClick = (index: number) => {
    setCurrentIndex(index);
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <div className={styles.resultContent}>
      <div className="relative">
        <Carousel className={styles.resultContentLeft} setApi={setEmblaApi}>
          <CarouselContent>
            {result.results.map((result, index) => (
              <CarouselItem key={index}>
                <div className={styles.chooseAnswerQues}>
                  <h3>Câu {index + 1}</h3>
                  <div className="flex flex-col gap-6">
                    <div className={styles.chooseAnswerQuesTitle}>
                      <p>{result.question}</p>
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
                      {result.img ? <img src={result.img} alt="img" /> : null}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <DetailResultTab
                      icon={<ScriptIcon className="text-[#000]" />}
                      title="Xem nội dung bài nghe"
                      content={result.script}
                    />
                    <DetailResultTab
                      icon={<RightAnswer className="text-[#000]" />}
                      title="Giải thích đáp án"
                      content={result.script}
                    />
                  </div>
                  <div className={styles.chooseAnswerQuesAnswer}>
                    {result.type.id === "C" ? (
                      result.options?.map((option) => {
                        let optionClass =
                          "w-full border-2 flex flex-row gap-4 items-center justify-between px-6 py-3 rounded-md ";
                        if (option.isSelected && option.isCorrect) {
                          optionClass += " border-[#31E3A5] bg-[#e6fff5]"; // green border + light green bg
                        } else if (
                          option.isSelected &&
                          option.isCorrect === false
                        ) {
                          optionClass += " border-[#FF7C7C] bg-[#ffeaea]"; // red border + light red bg
                        } else if (option.isCorrect) {
                          optionClass += " border-[#31E3A5]"; // green border
                        } else if (option.isSelected) {
                          optionClass += " border-[#007bff] bg-[#e6f0ff]"; // blue border + light blue bg
                        } else {
                          optionClass += " border-gray-300";
                        }
                        return (
                          <div
                            className="w-full flex flex-row gap-4 items-center cursor-pointer"
                            key={option.id}
                          >
                            <p>{option.symbol}</p>
                            <div className={optionClass}>
                              <p className="text-[14px] text-left">
                                {option.description}
                              </p>
                              {option.isCorrect === true ? (
                                <RightAnswer />
                              ) : null}
                              {option.isCorrect === false ? (
                                <WrongAnswer />
                              ) : null}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className={`relative flex flex-col gap-4`}>
                        <p className="text-left text-[14px] font-medium text-gray-500">
                          Đáp án của bạn:
                        </p>
                        <div className={`relative w-full`}>
                          <Input
                            type="text"
                            value={result.type.answerValue}
                            className={`py-7 rounded-md font-bold text-black w-full pr-10
                              ${
                                result.type.isCorrect === true
                                  ? "border-2 border-[#31E3A5] bg-[#e6fff5]"
                                  : ""
                              }
                              ${
                                result.type.isCorrect === false
                                  ? "border-2 border-[#FF7C7C] bg-[#ffeaea]"
                                  : ""
                              }
                              ${
                                result.type.isCorrect === null ||
                                result.type.isCorrect === undefined
                                  ? "border-2 border-gray-300"
                                  : ""
                              }
                            `}
                            disabled
                          />
                          {result.type.isCorrect === true ? (
                            <span className="absolute top-1/2 right-6 transform translate-x-[8px] translate-y-[-12px]">
                              <RightAnswer />
                            </span>
                          ) : null}
                          {result.type.isCorrect === false ? (
                            <span className="absolute top-1/2 right-6 transform translate-x-[8px] translate-y-[-12px]">
                              <WrongAnswer />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
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
      <div className={styles.resultContentRight}>
        <div className="w-full flex flex-col gap-4 py-3">
          <h3 className="text-left font-bold text-[14px]">Thời gian làm bài</h3>
          <Timer
            hour={Math.floor(result.finishedTime / 60)}
            minute={Math.floor(result.finishedTime % 60)}
            second={Math.floor(result.finishedTime * 100) % 100}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-left font-bold text-[14px]">Danh sách đáp án</h3>
          <ChecklistAnswer
            listOfResult={result.results}
            currentIndex={currentIndex}
            setCurrentIndex={handleChecklistClick}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 bg-[#31E3A5] rounded-sm text-[12px]"></div>
            <p>Câu trả lời đúng</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 bg-[#37474F] rounded-sm text-[12px]"></div>
            <p>Câu trả lời sai</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 bg-gray-200 text-[12px] rounded-sm"></div>
            <p>Câu chưa điền đáp án</p>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <button
            onClick={() => {}}
            className="w-full border border-[#37474F] rounded-full text-[14px] font-bold text-[#37474F] hover:text-[#31E3A5] hover:border-[#31E3A5]"
          >
            Thoát
          </button>
          <button
            onClick={handleRedoListening}
            className="w-full bg-[#31E3A5] rounded-full text-[14px] font-bold text-[#37474F] hover:text-[#fff] hover:bg-[#37474F]"
          >
            Làm lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultContent;
