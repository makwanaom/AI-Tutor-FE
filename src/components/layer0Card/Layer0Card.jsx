import "./layer0Card.css"
import { Link, useNavigate } from 'react-router-dom';

const Layer0Card = ({ index, levelName, levelContent, subject }) => {
  const navigate = useNavigate();
  const navigateToLayer1 = (data) => {
    
    navigate('/layer1', { state: data }); 
  };

  const handleClick = (levelName, levelContent, subject) => {
    navigateToLayer1({ levelName, levelContent, subject }); 
  };

  return (
    <Link to='/layer1'>
    <div key={index} className="layer0-card" onClick={() => handleClick(levelName, levelContent,subject)}>
      <strong>{levelName}</strong>: {levelContent}
    </div>
    </Link>
  );
};

export default Layer0Card;
