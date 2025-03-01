import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@/assets/icons/edit.svg?react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./styles.module.scss";

interface VocabularyItem {
  id: string;
  word: string;
  type: string;
  pronunciation: string;
  meaning: string;
  example: string;
}

export default function WorkspaceDetails() {
  const location = useLocation();
  const { workspaceId } = location.state || {};
  const { title } = useParams();
  const navigate = useNavigate();
  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>([]);
  const [selectedVocabulary, setSelectedVocabulary] = useState<string[]>([]);

  useEffect(() => {
    if (!workspaceId) {
      console.error("Không tìm thấy workspaceId.");
      return;
    }

    fetch(`https://localhost:7063/api/v1/Dictionary/${workspaceId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setVocabularyItems(data);
        } else {
          console.error("API trả về dữ liệu không hợp lệ:", data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách từ vựng:", error);
      });
  }, [workspaceId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        {title} <EditIcon />
      </h1>
      <div className={styles.content}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.checkboxCell}>
                <div
                  className={`${styles.checkbox} ${
                    selectedVocabulary.length === vocabularyItems.length
                      ? styles.checked
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedVocabulary(
                      selectedVocabulary.length === vocabularyItems.length
                        ? []
                        : vocabularyItems.map((item) => item.id)
                    );
                  }}
                ></div>
              </TableHead>
              <TableHead className={styles.vocabulary}>Từ vựng</TableHead>
              <TableHead className={styles.type}>Loại từ</TableHead>
              <TableHead className={styles.pronunciation}>Phiên âm</TableHead>
              <TableHead className={styles.meaning}>Nghĩa</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vocabularyItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className={styles.checkboxCell}>
                  <div
                    className={`${styles.checkbox} ${
                      selectedVocabulary.includes(item.id) ? styles.checked : ""
                    }`}
                    onClick={() => {
                      setSelectedVocabulary((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                  ></div>
                </TableCell>
                <TableCell>{item.word}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.pronunciation}</TableCell>
                <TableCell>{item.meaning}</TableCell>
                <TableCell
                  className={styles.detailsLink}
                  onClick={() => navigate(`/dictionary?word=${item.word}`)}
                >
                  Xem chi tiết
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
