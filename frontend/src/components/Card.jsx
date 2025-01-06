import PropTypes from "prop-types";
import { useState } from "react";
import "./Card.css";

const Card = ({ card, onDelete }) => {
  const [likes, setLikes] = useState(0);

  // need to add Id
  const onClickDelete = () => {
    onDelete(card.id);
  };

  return (
    <div className="card">
      <div className="card-content">
        <p>{card.message}</p>
      </div>
      <div className="card-controls">
        <span>{card.likesCount} 💕</span>
        <button onClick={() => setLikes(likes + 1)}>+1</button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Card;


Card.propTypes = {
  card: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
