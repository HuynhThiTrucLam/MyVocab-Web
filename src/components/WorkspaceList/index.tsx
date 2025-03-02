import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookImage from "@/assets/icons/books.svg?react";
import PlusCircleIcon from "@/assets/icons/pluscircle.svg?react";
import { useAuth } from "@/contexts/auth-context";
import CloseIcon from "@/assets/icons/Close.svg?react";
import styles from "./styles.module.scss";
import { Input } from "../ui/input";

interface WorkspaceItem {
  id?: string;
  wordCount: number;
  name: string;
  description: string;
}

export function WorkspaceList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openNewWorkspace, serOpenNewWorkspace] = useState(false);

  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  // const userId = "733D873B-015F-4C6F-1055-08DD559CC0E4";

  useEffect(() => {
    fetch(`https://localhost:7063/api/v1/Workspace/${user?.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkspaces(data);
        } else {
          console.error("API trả về dữ liệu không hợp lệ:", data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách:", error);
      });
  }, []);

  const handleAddWorkspace = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkspaceName(e.target.value);
    //   if (!newWorkspaceName.trim()) {
    //     alert("Vui lòng nhập tên danh sách!"); // Kiểm tra nếu tên bị trống
    //     return;
    //   }
    //   const newWorkspace = {
    //     userId: user?.id,
    //     name: newWorkspaceName.trim(),
    //     description: "Mô tả mặc định",
    //   };
    //   fetch("https://localhost:7063/api/v1/Workspace", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newWorkspace),
    //   })
    //     .then(async (response) => {
    //       const data = await response.json(); // Đọc phản hồi
    //       if (!response.ok) {
    //         console.error("Lỗi API:", data);
    //         throw new Error(
    //           `Lỗi HTTP ${response.status}: ${data.message || "Không xác định"}`
    //         );
    //       }
    //       return data;
    //     })
    //     .then((data) => {
    //       if (data && data.id) {
    //         setWorkspaces((prev) => [...prev, data]);
    //         setNewWorkspaceName(""); // Xóa nội dung input sau khi thêm thành công
    //       } else {
    //         console.error("API trả về dữ liệu không hợp lệ:", data);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Lỗi khi thêm workspace:", error);
    //       alert("Không thể tạo workspace. Hãy kiểm tra lại!");
    //     });
  };
  return (
    <div className={styles.container}>
      <div className={styles.workspaceGrid}>
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            onClick={() =>
              navigate(`/my-vocab/${workspace.name}`, {
                state: { workspaceId: workspace.id },
              })
            }
            className={styles.workspaceCard}
          >
            <div className={styles.imageContainer}>
              <BookImage className={styles.bookImage} />
              <div>
                <p className={styles.title}>{workspace.name}</p>
                <div className={styles.wordCount}>{workspace.wordCount} từ</div>
              </div>
            </div>
          </div>
        ))}
        {openNewWorkspace ? (
          <div className={styles.addWorkspace}>
            <BookImage className={styles.bookImage} />
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Thêm tên danh sách mới"
                required
                className="border-none shadow-none"
                onChange={handleAddWorkspace}
              />
              <p className={styles.wordCount}>0 từ</p>
            </div>
          </div>
        ) : null}
        <div
          onClick={() => {
            serOpenNewWorkspace(true);
          }}
          className={styles.workspaceCard}
        >
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
