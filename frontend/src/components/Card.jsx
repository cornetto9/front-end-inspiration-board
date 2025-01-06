import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ card, onDelete, onLike }) => {

  return (
    <div className="card">
      <div className="card-content">
        <p>{card.message}</p>
      </div>
      <div className="card-controls">
        <span>{card.likesCount} 💕</span>
        <button onClick={() => onLike(card.id)}>+1</button>
        <button onClick={() => onDelete(card.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;


Card.propTypes = {
  card: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};
