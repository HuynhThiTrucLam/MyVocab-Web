import BookImage from "@/assets/icons/books.svg?react";
import PlusCircleIcon from "@/assets/icons/pluscircle.svg?react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface WorkspaceItem {
  id: string;
  title: string;
  wordCount: number;
}

export function WorkspaceList() {
  const navigator = useNavigate();
  const workspaces: WorkspaceItem[] = [
    { id: "1", title: "English Vocabulary", wordCount: 50 },
    { id: "2", title: "Business Terms", wordCount: 30 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.workspaceGrid}>
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            onClick={() => {
              navigator(`/my-vocab/${workspace.title}`, {
                state: {
                  workspaceId: workspace.id,
                },
              });
            }}
            className={styles.workspaceCard}
          >
            <div className={styles.imageContainer}>
              <BookImage className={styles.bookImage} />
              <div>
                <p className={styles.title}>
                  {workspace.title}
                  {/* <EditIcon className="w-4 h-4 cursor-pointer" /> */}
                </p>
                <div className={styles.wordCount}>{workspace.wordCount} từ</div>
              </div>
            </div>
          </div>
        ))}
        <div onClick={() => {}} className={styles.workspaceCard}>
          <div className={styles.imageContainer}>
            <PlusCircleIcon className={styles.bookImage} />
            <div>
              <p className={styles.title}>Thêm danh sách mới</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
