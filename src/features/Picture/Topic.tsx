// import React, { useEffect, useState } from 'react';
// import '../Picture/style.css';
// import { useNavigate } from 'react-router-dom';

// type Topic = {
//   topicID: number;
//   topicName: string;
// };

// function Topic() {
//   const [topics, setTopics] = useState<Topic[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   const baseUrl = 'https://localhost:7063/';
//   const levelID = sessionStorage.getItem('levelID');
//   const levelName = sessionStorage.getItem('levelName');

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const url = levelID ? `${baseUrl}Topic?levelId=${levelID}` : `${baseUrl}Topic`;
//         const response = await fetch(url);

//         if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
//         const data: Topic[] = await response.json();
//         setTopics(data);
//       } catch (error) {
//         console.error('Lỗi API:', error);
//         setTopics(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopics();
//   }, [levelID]);
// const navigate = useNavigate();

//   const handleTopicClick = (topic: Topic) => {
//     sessionStorage.setItem('topicID', topic.topicID.toString());
//     sessionStorage.setItem('topicName', topic.topicName);
// navigate('/question');  };

//   return (
//     <div className="topic-wrapper">
//       <div className="topic-header">
//         <h1>Bộ đề cho cấp độ: <span>{levelName || 'Không có level'}</span></h1>
//         <p className="sub">Bạn đã sẵn sàng? Chọn bộ đề để bắt đầu luyện tập!</p>
//       </div>

//       <div className="topic-list">
//         {loading ? (
//           <p className="loading">Đang tải danh sách bộ đề...</p>
//         ) : topics && topics.length > 0 ? (
//           topics.map((topic) => (
//             <div
//               key={topic.topicID}
//               className="topic-card"
//               onClick={() => handleTopicClick(topic)}
//             >
//               <span>{topic.topicName}</span>
//             </div>
//           ))
//         ) : (
//           <p className="error">Không có bộ đề nào cho level này.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Topic;
import React, { useEffect, useState } from 'react';
import '../Picture/style.css';
import { useNavigate } from 'react-router-dom';

type Topic = {
  idTopic: string;
  name: string;
};

function Topic() {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = 'https://localhost:7063/api/';
  const proficiencyId = sessionStorage.getItem('proficiencyId');
  const proficiencyName = sessionStorage.getItem('proficiencyName');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const url = proficiencyId 
          ? `${baseUrl}Topic?ProficiencyId=${proficiencyId}` 
          : `${baseUrl}Topic`;
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data: Topic[] = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setError('Failed to load topics');
        setTopics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [proficiencyId]);

  const navigate = useNavigate();

  const handleTopicClick = (topic: Topic) => {
    sessionStorage.setItem('topicId', topic.idTopic);
    sessionStorage.setItem('topicName', topic.name);
    navigate('/question');
  };

  return (
    <div className="topic-wrapper">
      <div className="topic-header">
        <h1>Bộ đề cho trình độ: <span>{proficiencyName || 'Không có trình độ'}</span></h1>
        <p className="sub">Bạn đã sẵn sàng? Chọn bộ đề để bắt đầu luyện tập!</p>
      </div>

      <div className="topic-list">
        {loading ? (
          <p className="loading">Đang tải danh sách bộ đề...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : topics && topics.length > 0 ? (
          topics.map((topic, index) => (
            <div
              key={`${topic.idTopic}-${index}`} // Added index to handle duplicate IDs
              className="topic-card"
              onClick={() => handleTopicClick(topic)}
            >
              <span>{topic.name}</span>
            </div>
          ))
        ) : (
          <p className="error">Không có bộ đề nào cho trình độ này.</p>
        )}
      </div>
    </div>
  );
}

export default Topic;