import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import "./Card.css";

const Card = ({ card, onDelete, onLike }) => {

  return (
    <div className="card">
      <div className="card-content">
        <p>{card.message}</p>
      </div>
      <div className="card-controls">
        <span>
          <button onClick={() => onLike(card.id)}>
            {`${card.likesCount} `}
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </span>
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
