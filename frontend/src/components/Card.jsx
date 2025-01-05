import PropTypes from "prop-types";
// import { useState } from "react";
import "./Card.css";

const Card = ({ id, onDelete }) => {
  const [likes, setLikes] = useState(0);

  // need to add Id
  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card">
      <div className="card-content">
        {/* <p>{message}</p> */}
        <p>Test message</p>
      </div>
      <div className="card-controls">
        <span>10 💕</span>
        {/* <span>{likesCount} 💕</span> */}
        {/* <button onClick={onLike}>+1</button> */}
        <button>+1</button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Card;


Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};
