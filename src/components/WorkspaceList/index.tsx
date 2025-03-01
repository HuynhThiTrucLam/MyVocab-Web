import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookImage from "@/assets/icons/books.svg?react";
import PlusCircleIcon from "@/assets/icons/pluscircle.svg?react";
import styles from "./styles.module.scss";
import { useAuth } from "@/contexts/auth-context";

interface WorkspaceItem {
  id: string;
  wordCount: number;
  name: string;
  description: string;
}

export function WorkspaceList() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  // const userId = "733D873B-015F-4C6F-1055-08DD559CC0E4";
  const { user, signOut } = useAuth();
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

  const addWorkspace = () => {
    if (!newWorkspaceName.trim()) {
      alert("Vui lòng nhập tên danh sách!"); // Kiểm tra nếu tên bị trống
      return;
    }

    const newWorkspace = {
      userId: user?.id, 
      name: newWorkspaceName.trim(),
      description: "Mô tả mặc định",
    };

    fetch("https://localhost:7063/api/v1/Workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkspace),
    })
      .then(async (response) => {
        const data = await response.json(); // Đọc phản hồi
        if (!response.ok) {
          console.error("Lỗi API:", data);
          throw new Error(
            `Lỗi HTTP ${response.status}: ${data.message || "Không xác định"}`
          );
        }
        return data;
      })
      .then((data) => {
        if (data && data.id) {
          setWorkspaces((prev) => [...prev, data]);
          setNewWorkspaceName(""); // Xóa nội dung input sau khi thêm thành công
        } else {
          console.error("API trả về dữ liệu không hợp lệ:", data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi thêm workspace:", error);
        alert("Không thể tạo workspace. Hãy kiểm tra lại!");
      });
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

        {/* Ô nhập tên danh sách mới */}
        <div className={styles.addWorkspaceContainer}>
          <input
            type="text"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            placeholder="Nhập tên danh sách..."
            className={styles.workspaceInput}
          />
          <div onClick={addWorkspace} className={styles.workspaceCard}>
            <div className={styles.imageContainer}>
              <PlusCircleIcon className={styles.bookImage} />
              <div>
                <p className={styles.title}>Thêm danh sách mới</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
