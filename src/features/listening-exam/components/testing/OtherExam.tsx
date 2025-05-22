import TestItem from "@/features/listening-exam/components/testItem/TestItem";
import { Exam } from "@/features/listening-exam/types/Exams";
import {
  mockUserExamList,
  UserExam,
  UserExamList,
} from "@/features/listening-exam/types/UserExam";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface OtherExamListProps {
  otherExams: Exam[];
}

const OtherExam = ({ otherExams }: OtherExamListProps) => {
  const [otherExamsList, setOtherExamsList] = useState<Exam[]>([]);
  const [userExamList, setUserExamList] = useState<UserExamList>();

  useEffect(() => {
    setOtherExamsList(otherExams);
  }, []);

  useEffect(() => {
    setOtherExamsList(otherExams);
    setUserExamList(mockUserExamList);
  }, [otherExams]);

  return (
    <div className={styles.otherExams}>
      <h3 className="text-lg font-extrabold">Đề thi Listening khác</h3>
      <div className={styles.otherExamsList}>
        {otherExamsList.map((exam, idx) => (
          <TestItem
            key={idx}
            exam={exam}
            mainColor={
              userExamList?.data.some(
                (userExam) =>
                  userExam.exam.id === exam.id &&
                  userExam.status === "completed"
              )
                ? "#914BFB"
                : userExamList?.data.some(
                    (userExam) =>
                      userExam.exam.id === exam.id && userExam.status === "new"
                  )
                ? "#FFBF47"
                : "#31e3a5"
            }
            secondaryColor={
              userExamList?.data.some(
                (userExam) =>
                  userExam.exam.id === exam.id &&
                  userExam.status === "completed"
              )
                ? "#0E8CAA"
                : userExamList?.data.some(
                    (userExam) =>
                      userExam.exam.id === exam.id && userExam.status === "new"
                  )
                ? "#F2FF90"
                : "#1B7D5B"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OtherExam;
