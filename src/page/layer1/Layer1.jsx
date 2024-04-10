import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you're using React Router

const Layer1 = () => {
  const location = useLocation();
  const { levelName, levelContent, subject } = location.state || {}; // Get data or default to empty object
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = {
          prompt: {
            levelName,
            levelContent,
            subject,
          },
        };

        const response = await fetch('http://localhost:3000/layer1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chapters.');
        }

        const result = await response.json();
        setChapters(result.chapters);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setError('Failed to fetch chapters.');
      } finally {
        setLoading(false);
      }
    };

    if (levelName && levelContent && subject) {
      fetchData();
    }
  }, [levelName, levelContent, subject]); // Run effect when these values change

  return (
    <div>
      <h1>Layer 1: {levelName}</h1>
      <h2>Subject: {subject}</h2>

      {loading && <p>Loading chapters...</p>}
      {error && <p>{error}</p>}

      {chapters.length > 0 ? (
        <ul>
          {chapters.map((chapter, index) => (
            <li key={index}>{chapter}</li>
          ))}
        </ul>
      ) : (
        <p>No chapters found.</p>
      )}
    </div>
  );
};

export default Layer1;