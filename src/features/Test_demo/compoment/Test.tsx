// c:/BAITAPAPI/MyVocab-Web/src/features/ProficiencyPage.tsx (or Test.tsx as per error)
import React, { useState } from "react";
import BandSidebar from "./sidebar/BandSidebar";
import SidebarContext from "./sidebar/SidebarContent";

// IMPORT from your central types file! Adjust the path as necessary.
import { Proficiency, Topic, Exam } from "../types/Exam"; // <--- THIS IS KEY!

// REMOVE any local definitions like this:
// export interface Proficiency { ... }
// export interface Topic { ... }
// export interface Exam { ... }

const ProficiencyPage: React.FC = () => {
  const [activeProficiency, setActiveProficiency] =
    useState<Proficiency | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null); // This now uses the imported Topic

  const handleTopicSelect = (topic: Topic) => {
    if (!topic?.idTopic) {
      console.error("Invalid topic received: idTopic is missing", topic);
      return;
    }
    setActiveTopic(topic); // ⚠️ QUAN TRỌNG: Thêm dòng này để cập nhật state
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-md">
        <BandSidebar
          onSelectProficiency={(proficiency) => {
            setActiveProficiency(proficiency);
            setActiveTopic(null);
          }}
          // onSelectTopic=setActiveTopic(topic)
          onSelectTopic={handleTopicSelect}
        />
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <SidebarContext
          activeProficiency={activeProficiency}
          activeTopic={activeTopic} // ✅ Đảm bảo giá trị này không null
        />
      </div>
    </div>
  );
};

export default ProficiencyPage;
