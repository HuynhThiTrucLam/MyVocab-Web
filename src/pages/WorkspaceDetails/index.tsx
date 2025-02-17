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
import { useState } from "react";
import styles from "./styles.module.scss";

const DUMMY_WORKSPACES = [
  {
    id: "1",
    title: "English Vocabulary",
    vocabularyItems: [
      {
        id: "1",
        word: "Example",
        type: "Noun",
        pronunciation: "/ˈekˈsplæn/",
        meaning:
          "A representative form or pattern lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        example: "This is an example of how to use the word.",
      },
      {
        id: "3",
        word: "Example2",
        type: "Noun",
        pronunciation: "/ˈekˈsplæn/",
        meaning: "A representative form or pattern",
        example: "This is an example of how to use the word.",
      },
      {
        id: "2",
        word: "Ambiguous",
        type: "Adjective",
        pronunciation: "/æmˈbɪɡjuəs/",
        meaning: "Open to more than one interpretation",
        example: "The message was ambiguous and unclear.",
      },
    ],
  },
  {
    id: "2",
    title: "Business Terms",
    vocabularyItems: [
      {
        id: "1",
        word: "Revenue",
        type: "Noun",
        pronunciation: "/ˈrevənjuː/",
        meaning: "Income from business activities",
        example: "The company's revenue grew by 50% last year.",
      },
    ],
  },
];

export default function WorkspaceDetails() {
  const location = useLocation();
  const { title } = useParams();
  const navigate = useNavigate();
  const { workspaceId } = location.state;
  const workspace = DUMMY_WORKSPACES.find((w) => w.id === workspaceId);
  const vocabularyItems = workspace?.vocabularyItems || [];
  const [selectedVocabulary, setSelectedVocabulary] = useState<string[]>([]);

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
                    selectedVocabulary?.length === vocabularyItems.length
                      ? styles.checked
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedVocabulary?.length === vocabularyItems.length) {
                      setSelectedVocabulary([]);
                    } else {
                      setSelectedVocabulary(
                        vocabularyItems.map((item) => item.id)
                      );
                    }
                  }}
                ></div>
              </TableHead>
              <TableHead
                className={`${styles.columnWidth} ${styles.vocabulary}`}
              >
                Vocabulary
              </TableHead>
              <TableHead className={`${styles.columnWidth} ${styles.type}`}>
                Loại từ
              </TableHead>
              <TableHead
                className={`${styles.columnWidth} ${styles.pronunciation}`}
              >
                Phiên âm
              </TableHead>
              <TableHead className={`${styles.columnWidth} ${styles.meaning}`}>
                Nghĩa
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vocabularyItems.map((item) => (
              <TableRow key={item.id} className={styles.alternateRow}>
                <TableCell className={styles.checkboxCell}>
                  <div
                    className={`${styles.checkbox} ${
                      selectedVocabulary?.includes(item.id)
                        ? styles.checked
                        : ""
                    }`}
                    onClick={() => {
                      if (selectedVocabulary?.includes(item.id)) {
                        setSelectedVocabulary(
                          selectedVocabulary.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedVocabulary([...selectedVocabulary, item.id]);
                      }
                    }}
                  ></div>
                </TableCell>
                <TableCell className={styles.wordCell}>{item.word}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.pronunciation}</TableCell>
                <TableCell className={styles.meaningCell}>
                  <div className={styles.meaningText}>{item.meaning}</div>
                </TableCell>
                <TableCell
                  className={styles.detailsLink}
                  onClick={() => {
                    navigate(`/dictionary/${item.word}`);
                  }}
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
