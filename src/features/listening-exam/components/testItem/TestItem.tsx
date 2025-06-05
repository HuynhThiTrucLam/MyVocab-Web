import CircleIcon from "@/assets/icons/circle.svg";
import QuestionIcon from "@/assets/icons/question.svg";
import { useNavigate } from "react-router-dom";
import { ListeningExam } from "../../types/ListeningExam";
import styles from "../style.module.scss";

interface TestItemProps {
  mainColor: string;
  secondaryColor: string;
  exam: ListeningExam;
}

const TestItem = ({ exam, mainColor, secondaryColor }: TestItemProps) => {
  const gradient = `linear-gradient(90deg, ${mainColor} 0%, ${secondaryColor} 100%)`;
  const navigate = useNavigate();

  const handleStartExam = (exam: ListeningExam) => {
    navigate(`/testing/${exam.id}`);
  };

  return (
    <div className={styles.testCard}>
      <div className={styles.testCardHeader}>
        <div
          style={{
            width: "30px",
            height: "30px",
            background: gradient,
            position: "relative",
            backgroundColor: `linear-gradient(90deg, ${mainColor}, #fff) 1`,
          }}
        >
          <img src={CircleIcon} alt="circle" className={styles.circleIcon} />
        </div>

        {/* 1line and overflow by three dots */}
        <h4 className="font-medium line-clamp-1 truncate">{exam.title}</h4>
      </div>
      <div className={styles.testCardQuestion}>
        <img src={QuestionIcon} alt="question" />
        <p>{exam.numberQuestion} câu hỏi</p>
      </div>
      <div className={styles.testCardTopic}>
        <p>
          Dạng: <span>{exam.topic.name}</span>
        </p>
      </div>

      <div
        style={{
          width: "max-content",
          background: gradient,
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          color: "#222", // or white if your mainColor is dark
          fontWeight: "bold",
          display: "inline-block",
        }}
      >
        <p
          className="text-[12px]"
          style={{
            color:
              mainColor === "#31e3a5" || mainColor === "#914BFB"
                ? "#fff"
                : "#000",
          }}
        >
          <span>
            {mainColor === "#31e3a5"
              ? "Đề mới"
              : mainColor === "#914BFB"
              ? "Đã hoàn thành"
              : "Chưa hoàn thành"}
          </span>
        </p>
      </div>
      <button
        className="text-[13px] font-medium hover:border-1 hover:border-[#000]"
        onClick={() => {
          handleStartExam(exam);
        }}
      >
        Bắt đầu ngay
      </button>
    </div>
  );
};

export default TestItem;
