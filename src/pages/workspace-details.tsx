import { VocabularyCard } from "@/components/workspace/workspace-details";
import { useLocation, useParams } from "react-router-dom";
import EditIcon from "@/assets/icons/edit.svg?react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        meaning: "A representative form or pattern",
        example: "This is an example of how to use the word."
      },
      {
        id: "1",
        word: "Example",
        type: "Noun", 
        pronunciation: "/ˈekˈsplæn/",
        meaning: "A representative form or pattern",
        example: "This is an example of how to use the word."
      },
      {
        id: "2", 
        word: "Ambiguous",
        type: "Adjective",
        pronunciation: "/æmˈbɪɡjuəs/",
        meaning: "Open to more than one interpretation",
        example: "The message was ambiguous and unclear."
      }
    ]
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
        example: "The company's revenue grew by 50% last year."
      }
    ]
  }
];

export default function WorkspaceDetails() {
  const location = useLocation();
  const { title } = useParams();
  const { workspaceId } = location.state;

  const workspace = DUMMY_WORKSPACES.find(w => w.id === workspaceId);
  const vocabularyItems = workspace?.vocabularyItems || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {title} <EditIcon className="w-5 h-5 cursor-pointer" />
      </h1>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Vocabulary</TableHead>
              <TableHead className="w-[120px]">Loại từ</TableHead>
              <TableHead className="w-[160px]">Phiên âm</TableHead>
              <TableHead className="w-[360px]">Nghĩa</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vocabularyItems.map((item) => (
              <TableRow key={item.id} className="max-h-[50px] h-full">
                <TableCell className="font-medium">{item.word}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.pronunciation}</TableCell>
                <TableCell className="text-left text-ellipsis line-clamp-2 max-h-[50px] h-full">
                  {item.meaning}
                </TableCell>
                <TableCell className="text-right">Xem chi tiết</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
