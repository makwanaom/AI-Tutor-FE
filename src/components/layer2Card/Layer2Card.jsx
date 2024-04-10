import { Link, useNavigate } from "react-router-dom";
import "./layer2Card.css";

const Layer2Card = ({ lessonName, lessonContent, chapter, level, subject }) => {
  const navigate = useNavigate();
  const navigateToLayer3 = (data) => {
    navigate("/layer3", { state: data });
  };
  const handleClick = (lessonName, lessonContent,chapter, level, subject) => {
    // Handle click event
    navigateToLayer3({ lessonName, lessonContent, chapter, level, subject });
    console.log("Clicked on lessonName:", lessonName);
  };
  return (
    <div
      className="layer2-card"
      onClick={() =>
        handleClick(lessonName, lessonContent, chapter, level, subject)
      }
    >
      <h3>{lessonName}</h3>
      <p>{lessonContent}</p>
    </div>
  );
};

export default Layer2Card;
