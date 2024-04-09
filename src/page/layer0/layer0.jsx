import { useState } from "react";
import Layer0Card from "../../components/layer0Card/Layer0Card";

const Layer0 = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const getLayer0Result = async () => {
    // e.preventDefault();
    setLoading(true);
    if (prompt.trim() === "") {
      setError("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/layer0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to get result from backend.");
      }

      const resultData = await response.json();
      setResult(resultData);
      setError(null);
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to fetch result from backend.");
      setResult(null);
    } finally {
      setLoading(false); // Update loading state regardless of success or failure
    }
  };
  return (
    <div>
      <h1>Layer 0 Component</h1>
      <input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt"
      />
      <button onClick={getLayer0Result} disabled={loading}>
        {loading ? "Loading..." : "Fetch Topics"}
      </button>

      {error && <p>{error}</p>}
      {result && (
        <div>
          {Array.isArray(result) ? ( // Check if result is an array
            result.map((level, index) => (
              <Layer0Card
                index={index}
                levelName={level.levelName}
                levelContent={level.levelContent}
                key={index}
              />
            ))
          ) : (
            <p>{result.result}</p> // Display direct answer as a paragraph
          )}
        </div>
      )}
    </div>
  );
};

export default Layer0;
