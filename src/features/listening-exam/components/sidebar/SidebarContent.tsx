import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Band } from "../../types/Bands";
import { Exam, Topic } from "../../types/Exams";
import { mockUserExamList, UserExamList } from "../../types/UserExam";
import styles from "../style.module.scss";
import TestItem from "../testItem/TestItem";

interface SidebarContentProps {
  activeBand: Band;
  description: string;
  testsMock: Exam[];
}
const mockTopic: Topic[] = [
  {
    id: "0",
    name: "All",
    description: "Tất cả",
  },
  {
    id: "1",
    name: "Picture Description",
    description: "Mô tả tranh",
  },
  {
    id: "2",
    name: "Question-Response",
    description: "(Hỏi - Đáp đơn giản)",
  },
];

const SidebarContent = ({ activeBand, testsMock }: SidebarContentProps) => {
  const [examList, setExamList] = useState<Exam[]>([]); // List all exams of data
  const [userExamList, setUserExamList] = useState<UserExamList>(); // List exams of user
  const [selectedTopic, setSelectedTopic] = useState<Topic>(mockTopic[0]);

  useEffect(() => {
    setExamList(testsMock);
    setUserExamList(mockUserExamList);
  }, [testsMock]);

  return (
    <div className={styles.listeningContent}>
      <div className={styles.listeningContentHeader}>
        <h2 className="text-xl font-bold mb-2">{activeBand.name}</h2>
        <p className={styles.description}>{activeBand.description}</p>
      </div>

      <div className={styles.listeningContentBody}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-extrabold">Luyện đề ngay</h3>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Dạng bài" />
            </SelectTrigger>
            <SelectContent>
              {mockTopic.map((topic) => (
                <SelectItem
                  key={topic.id}
                  value={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                  }}
                >
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {examList.map((exam, idx) => (
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
                        userExam.exam.id === exam.id &&
                        userExam.status === "new"
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
                        userExam.exam.id === exam.id &&
                        userExam.status === "new"
                    )
                  ? "#F2FF90"
                  : "#1B7D5B"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
