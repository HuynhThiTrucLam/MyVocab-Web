import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./styles.module.scss";
import ListeningTab from "@/features/listening-exam/components/ListeningTab";
import { useAuth } from "@/contexts/auth-context";
import NonSupportedFeature from "../NonSupportedFeature";
import { ReadingTab } from "@/features/reading";

import Test from "@/features/Test_demo/compoment/Test"; // đường dẫn thực tế của bạn

const Exams = () => {
  // If you want to add auth-based display back in, uncomment below
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Tabs defaultValue="listening" className={styles.tabContainer}>
          <TabsList
            className={`bg-transparent shadow-none border-none p-0 ${styles.tabList}`}
          >
            <TabsTrigger value="listening" className={styles.tabTrigger}>
              Listening
            </TabsTrigger>
            <TabsTrigger value="reading" className={styles.tabTrigger}>
              Reading
            </TabsTrigger>
            <TabsTrigger value="speaking" className={styles.tabTrigger}>
              Speaking
            </TabsTrigger>
            <TabsTrigger value="writing" className={styles.tabTrigger}>
              Writing
            </TabsTrigger>
            <TabsTrigger value="Test_Exam" className={styles.tabTrigger}>
              Test Exam
            </TabsTrigger>
          </TabsList>
          <div className={styles.line}></div>

          <TabsContent value="listening">
            <ListeningTab />
          </TabsContent>

          <TabsContent value="reading">
            <ReadingTab />
            {/* Thêm nội dung vào đây */}
          </TabsContent >

          <TabsContent value="speaking">
            <p>Speaking</p>
            {/* Thêm nội dung vào đây */}
          </TabsContent>

          <TabsContent value="writing">
            <p>Writing</p>
            {/* Thêm nội dung vào đây */}
          </TabsContent>
          <TabsContent value="Test_Exam">
            <Test />
          </TabsContent>
        </Tabs >
      ) : (
        <NonSupportedFeature />
      )}
    </>
  );
};

export default Exams;
