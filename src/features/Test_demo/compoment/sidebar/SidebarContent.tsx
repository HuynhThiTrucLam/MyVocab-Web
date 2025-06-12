// src/features/Test_demo/compoment/sidebar/SidebarContext.tsx

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/Spinner";

// src/types/interfaces.ts (or app.d.ts)

export interface Proficiency {
  id: string;
  name: string;
  band: string;
  description: string;
}

export interface Topic {
  idTopic: string; // This must be consistently 'string'
  name: string;
}

export interface Exam {
  idExam: string;
  nameExam: string;
  topicID: string;
  topicName?: string;
}

interface SidebarContextProps {
  activeProficiency: Proficiency | null;
  activeTopic: Topic | null;
}

const SidebarContext: React.FC<SidebarContextProps> = ({
  activeProficiency,
  activeTopic,
}) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [examsError, setExamsError] = useState<string | null>(null);

  // Fetch exams when activeTopic changes
  useEffect(() => {
    const fetchExams = async () => {


       if (!activeTopic?.idTopic) {
      console.log('No activeTopic or missing idTopic', activeTopic);
      setExams([]);
      return;
    }
      // This check is good as activeTopic could be null or idTopic could be missing from API response initially
      if (!activeTopic?.idTopic) {
        setExams([]);
        
        return;
      }

      try {
        setIsLoadingExams(true);
        setExamsError(null);

        const response = await fetch(
          `http://localhost:5299/api/Exam?topicId=${activeTopic.idTopic}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform data to consistent format
        const formattedExams = Array.isArray(data) ? data : [data];
        setExams(formattedExams.map((exam: any) => ({
          idExam: exam.idExam || exam.id || '',
          nameExam: exam.nameExam || exam.name || 'Unnamed Exam',
          topicID: activeTopic.idTopic,
          topicName: activeTopic.name || ''
        })));
      } catch (err) {
        setExamsError(err instanceof Error ? err.message : "Failed to load exams");
        console.error("Exam fetch error:", err);
      } finally {
        setIsLoadingExams(false);
      }
    };

    fetchExams();
  }, [activeTopic?.idTopic]); // Dependency on activeTopic.idTopic ensures re-fetch when topic changes

  return (
    <div className="space-y-4">
      {/* Proficiency Section */}
      {activeProficiency && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {activeProficiency.name}
          </h2>
          <p className="text-gray-600 mb-4">{activeProficiency.description}</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {activeProficiency.band}
            </span>
          </div>
        </Card>
      )}

      {/* Topic Section */}
      {activeTopic && (
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {activeTopic.name}
              </h2>
              <p className="text-sm text-gray-500">Topic ID: {activeTopic.idTopic}</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {activeProficiency?.name || 'No Proficiency'}
            </span>
          </div>

          {/* Exams List */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Related Exams</h3>

            {isLoadingExams ? (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            ) : examsError ? (
              <div className="p-3 bg-red-50 text-red-600 rounded">
                Error: {examsError}
              </div>
            ) : exams.length > 0 ? (
              <ul className="space-y-2">
                {exams.map((exam) => (
                  <li key={exam.idExam} className="p-3 bg-gray-50 rounded hover:bg-gray-100">
                    <h4 className="font-medium">{exam.nameExam}</h4>
                    <p className="text-sm text-gray-500">Exam ID: {exam.idExam}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 py-2">No exams available for this topic</p>
            )}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!activeProficiency && !activeTopic && (
        <Card className="p-6 text-center text-gray-500">
          <p>Please select a proficiency level or topic from the sidebar</p>
        </Card>
      )}
    </div>
  );
};

export default SidebarContext;