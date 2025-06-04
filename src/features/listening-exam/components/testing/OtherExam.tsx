import TestItem from "@/features/listening-exam/components/testItem/TestItem";
import { Exam } from "@/features/listening-exam/types/Exams";
import { UserExam } from "@/features/listening-exam/types/UserExam";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface OtherExamListProps {
  otherExams: Exam[];
}

const OtherExam = ({ otherExams }: OtherExamListProps) => {
  const [otherExamsList, setOtherExamsList] = useState<Exam[]>([]);
  const [userExam, setUserExam] = useState<UserExam | null>(null);

  useEffect(() => {
    setOtherExamsList(otherExams);
  }, []);

  useEffect(() => {
    setOtherExamsList(otherExams);
  }, [otherExams]);

  return (
    <div className={styles.otherExams}>
      <h3 className="text-lg font-extrabold">Đề thi Listening khác</h3>
      <div className={styles.otherExamsList}>
        {otherExamsList.map((exam) => (
          <TestItem
            key={exam.id}
            exam={exam}
            mainColor={""}
            secondaryColor={""}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherExam;
