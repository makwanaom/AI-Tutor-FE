import "./layer0Card.css"
import { useNavigate } from 'react-router-dom';

const Layer0Card = ({ index, levelName, levelContent, subject }) => {
  const navigate = useNavigate();
  const navigateToLayer1 = (data) => {
    
    navigate('/layer1', { state: data }); 
  };

  const handleClick = (levelName, levelContent, subject) => {
    navigateToLayer1({ levelName, levelContent, subject }); 
  };

  return (
    <div key={index} className="layer0-card" onClick={() => handleClick(levelName, levelContent,subject)}>
      <strong>{levelName}</strong>: {levelContent}
    </div>
  );
};

export default Layer0Card;
