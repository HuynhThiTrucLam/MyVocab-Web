import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { listeningService } from "../../api/listening-service";
import { Band } from "../../types/Bands";
import { Exam, Topic } from "../../types/Exams";
import { mockUserExamList, UserExamList } from "../../types/UserExam";
import styles from "../style.module.scss";
import TestItem from "../testItem/TestItem";
import { Spinner } from "@/components/Spinner";

interface SidebarContentProps {
  activeBand: Band;
  description: string;
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

const SidebarContent = ({ activeBand }: SidebarContentProps) => {
  const [examList, setExamList] = useState<Exam[]>([]); // List all exams of data
  const [userExamList, setUserExamList] = useState<UserExamList>(); // List exams of user
  const [_, setSelectedTopic] = useState<Topic>(mockTopic[0]);
  const [isLoading, setIsLoading] = useState(false);
  //pass param activeBand.id
  const fetchExamList = async () => {
    setIsLoading(true);
    if (!activeBand) return; // Guard clause
    const examList = await listeningService.getListeningExamListByBandId(
      activeBand.id
    );
    setExamList(examList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!activeBand) return;
    fetchExamList();
    setUserExamList(mockUserExamList);
  }, [activeBand]);

  return (
    <div className={styles.listeningContent}>
      <div className={styles.listeningContentHeader}>
        <h2 className="text-xl font-bold mb-2">{activeBand?.name}</h2>
        <p className={styles.description}>{activeBand?.description}</p>
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

        {isLoading ? (
          <Spinner />
        ) : examList.length > 0 ? (
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
        ) : (
          <Card className="flex gap-2 flex-col justify-center items-center h-[50vh]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              className="size-10 text-[#37474F]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
              />
            </svg>
            <p className="text-sm text-[#37474F]">Chưa có đề thi nào</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SidebarContent;
