import Card from "./Card";
import PropTypes from "prop-types";
import "./Card.css";

const CardList = ({cards, onDelete}) => {
  const getCardList = (cards) => {
    return cards.map((card) => {
        <Card
          key={card.cardId}
          id={card.cardId}
          message={card.message}
          likeCount={card.likeCount}
          onDelete={onDelete}
        />
    });
  };
  console.log(cards, cards.length);
  return (
    <ul className="create-card-section">
      {getCardList(cards)}
    </ul>
  );
};

export default CardList;

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likeCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};