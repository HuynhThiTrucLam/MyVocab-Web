import BookImage from "@/assets/icons/books.svg?react";
import { useNavigate } from "react-router-dom";
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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
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
            className="w-full max-w-[210px] max-h-[280px] flex flex-col justify-between items-center border border-gray-200 rounded-2xl py-[65px] px-7 hover:border-secondary transition-all duration-300 shadow-lg cursor-pointer"
          >
            <div className="flex justify-center items-center mb-4">
              <BookImage className="w-[90px] h-[90px]" />
            </div>
            <div>
              <p className="text-black font-bold text-sm text-center flex justify-center items-center gap-2">
                {workspace.title}
                {/* <EditIcon className="w-4 h-4 cursor-pointer" /> */}
              </p>
              <div className="flex gap-2 mt-4 text-sm justify-center text-center">
                {workspace.wordCount} từ
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
