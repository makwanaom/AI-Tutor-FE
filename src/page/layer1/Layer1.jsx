import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layer1Card from '../../components/layer0Card/Layer1Crad';

const Layer1 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/layer1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              levelName: location.state.levelName,
              levelContent: location.state.levelContent,
              subject: location.state.subject
            }
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get result from backend.");
        }

        const resultData = await response.json();
        setData(resultData);
        setError(null);
      } catch (error) {
        console.error("Error:", error.message);
        setError("Failed to fetch result from backend.");
        setData(null);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchData();
  }, [location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>level 1 data</h1>
      <p><strong>Level Name:</strong> {data.level}</p>
      <p><strong>Level Content:</strong> {data.levelContent}</p>
      <p><strong>Subject:</strong> {data.subject}</p>
      <h2>Chapters:</h2>
      <ul>
      <div className="chapter-list">
        {data.chapters.map((chapter, index) => (
          <Layer1Card key={index} index={index} chapter={chapter} />
        ))}
      </div>
      </ul>
    </div>
  );
};

export default Layer1;
