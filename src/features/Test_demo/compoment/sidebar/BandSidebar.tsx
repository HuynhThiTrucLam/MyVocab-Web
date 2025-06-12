import React, { useState, useEffect } from "react";
import { Proficiency } from "../../types/Proficiency";
import { Topic } from "../../types/Topic";
import { Spinner } from "@/components/Spinner";

interface BandSidebarProps {
  onSelectProficiency: (proficiency: Proficiency | null) => void;
  onSelectTopic: (topic: Topic) => void;
}

const BandSidebar: React.FC<BandSidebarProps> = ({
  onSelectProficiency,
  onSelectTopic,
}) => {
  const [proficiencies, setProficiencies] = useState<Proficiency[]>([]);
  const [activeProficiency, setActiveProficiency] =
    useState<Proficiency | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all proficiencies on component mount
  useEffect(() => {
    const fetchProficiencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "http://localhost:5299/api/Proficiency/Proficiency"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Proficiency[] = await response.json();
        setProficiencies(data);

        // Set first proficiency as active by default
        if (data.length > 0) {
          const firstProficiency = data[0];
          setActiveProficiency(firstProficiency);
          onSelectProficiency(firstProficiency);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch proficiencies"
        );
        console.error("Error fetching proficiencies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProficiencies();
  }, []);

  // Fetch topics when activeProficiency changes
  useEffect(() => {
    const fetchTopics = async () => {
      if (!activeProficiency) {
        setTopics([]);
        return;
      }

      try {
        setTopics([]); // Clear topics before fetching new ones
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:5299/api/Topic?ProficiencyId=${activeProficiency.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Topic[] = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch topics");
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [activeProficiency]);

  const handleSelectProficiency = (proficiency: Proficiency) => {
    setActiveProficiency(proficiency);
    onSelectProficiency(proficiency);
  };

  const handleSelectTopic = (topic: Topic) => {
    onSelectTopic(topic); // Pass the selected topic to parent
  };

  return (
    <aside className="w-full h-full p-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Proficiency Levels
      </h2>

      {loading && !proficiencies.length && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-600 rounded">
          Error: {error}
        </div>
      )}

      {!loading && (
        <ul className="space-y-2">
          {proficiencies.map((proficiency) => (
            <li key={proficiency.id}>
              <button
                onClick={() => handleSelectProficiency(proficiency)}
                className={`w-full text-left p-3 rounded-lg flex items-center transition-colors ${
                  activeProficiency?.id === proficiency.id
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">{proficiency.name}</span>
              </button>

              {/* Sub-topics */}
              {activeProficiency?.id === proficiency.id && (
                <div className="pl-6 mt-1">
                  {loading ? (
                    <div className="flex justify-center py-2"></div>
                  ) : topics.length > 0 ? (
                    <ul className="space-y-1 border-l-2 border-gray-200 pl-4">
                      {topics.map((topic) => (
                        <li key={topic.idTopic}>
                          <button
                            onClick={() => handleSelectTopic(topic)}
                            className={`w-full text-left p-2 rounded text-sm ${
                              activeProficiency?.id === proficiency.id
                                ? "hover:bg-blue-50 text-blue-700"
                                : "hover:bg-gray-50 text-gray-600"
                            }`}
                          >
                            {topic.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm pl-4 py-2">
                      No topics available
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default BandSidebar;
