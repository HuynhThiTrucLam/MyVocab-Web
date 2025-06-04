// import React, { useEffect, useState } from 'react';
// import '../Picture/style.css';
// import { useNavigate } from 'react-router-dom';


// type Level = {
//   levelID: number;
//   levelName: string;
// };

// function Picture() {
//   const [levels, setLevels] = useState<Level[] | null>([]);
//   const [loading, setLoading] = useState(true);

//   const baseUrl = 'https://localhost:7063/';

//   useEffect(() => {
//     const fetchLevels = async () => {
//       try {
//         const response = await fetch(`${baseUrl}Proficiency`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Lỗi: ${response.status}`);
//         }

//         const data: Level[] = await response.json();
//         setLevels(data);
//       } catch (error) {
//         console.error('Lỗi khi gọi API:', error);
//         setLevels(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLevels();
//   }, []);
// const navigate = useNavigate();
//   const handleLevelClick = (level: Level) => {
//     sessionStorage.setItem('levelID', level.levelID.toString());
//     sessionStorage.setItem('levelName', level.levelName);
//   navigate('/topic');
//   };

//   return (
//     <div className="picture-container">
//       <section className="header-section">
//         <h2 className="main-title">TỔNG HỢP BỘ ĐỀ PICTURE</h2>
//         <div className="levels-grid">
//           {loading ? (
//             <p className="loading">Đang tải levels...</p>
//           ) : levels ? (
//             levels.map((level) => (
//               <button
//                 key={level.levelID}
//                 className="level-card"
//                 onClick={() => handleLevelClick(level)}
//               >
//                 {level.levelName}
//               </button>
//             ))
//           ) : (
//             <p className="error">Không thể tải levels.</p>
//           )}
//         </div>
//       </section>

//       <section className="message-section">
//         <h2 className="welcome-message">
//           Welcome to our English class! Let&apos;s learn with pictures and have fun!
//         </h2>
//       </section>

     
//     </div>
//   );
// }

// export default Picture;
import React, { useEffect, useState } from 'react';
import '../Picture/style.css';
import { useNavigate } from 'react-router-dom';

type Proficiency = {
  id: string;
  name: string;
  band: string;
  description: string;
};

function Picture() {
  const [proficiencies, setProficiencies] = useState<Proficiency[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = 'https://localhost:7063/api/Proficiency/';

  useEffect(() => {
    const fetchProficiencies = async () => {
      try {
        const response = await fetch(`${baseUrl}Proficiency`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Proficiency[] = await response.json();
        setProficiencies(data);
      } catch (error) {
        console.error('Error fetching proficiencies:', error);
        setError('Failed to load proficiencies');
        setProficiencies(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProficiencies();
  }, []);

  const navigate = useNavigate();

  const handleProficiencyClick = (proficiency: Proficiency) => {
    sessionStorage.setItem('proficiencyId', proficiency.id);
    sessionStorage.setItem('proficiencyName', proficiency.name);
    navigate('/topic');
  };

  return (
    <div className="picture-container">
      <section className="header-section">
        <h2 className="main-title">TỔNG HỢP BỘ ĐỀ PICTURE</h2>
        <div className="levels-grid">
          {loading ? (
            <p className="loading">Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : proficiencies ? (
            proficiencies.map((proficiency) => (
              <button
                key={proficiency.id}
                className="level-card"
                onClick={() => handleProficiencyClick(proficiency)}
              >
                <div className="proficiency-info">
                  <p>Band: {proficiency.band}</p>
                  <h3>{proficiency.name}</h3>
                
                 
                </div>
              </button>
            ))
          ) : (
            <p className="error">Không có dữ liệu hiển thị.</p>
          )}
        </div>
      </section>

      <section className="message-section">
        <h2 className="welcome-message">
          Welcome to our English class! Let&apos;s learn with pictures and have fun!
        </h2>
      </section>
    </div>
  );
}

export default Picture;