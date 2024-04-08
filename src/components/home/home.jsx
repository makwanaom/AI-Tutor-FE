import React, { useState } from 'react';

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [detailedExplanation, setDetailedExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setTopics(data.topics);
      setResponse('');
      setSelectedTopic('');
      setDetailedExplanation('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data');
    }
    setLoading(false);
  };

  const handleTopicClick = async (topic) => {
    try {
      const response = await fetch('http://localhost:5000/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
      setResponse('');
      setSelectedTopic(topic);
      setDetailedExplanation(data.detailedExplanation);
    } catch (error) {
      console.error('Error fetching detailed explanation:', error);
      setResponse('Error fetching detailed explanation');
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Topics'}
        </button>
      </form>
      <div>
        <h2>Topics:</h2>
    
        {topics.map((topic, index) => (
          <div
            key={index}
            style={{
              cursor: 'pointer',
              border: '1px solid black',
              margin: '5px',
              padding: '5px'
            }}
            onClick={() => handleTopicClick(topic)}
          >
            {topic}
          </div>
        ))}
      </div>
      {selectedTopic && (
        <div>
          <h2>Selected Topic:</h2>
          <p>{selectedTopic}</p>
          <h2>Detailed Explanation:</h2>
          <p>{detailedExplanation}</p>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
