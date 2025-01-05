import Card from "./Card";
import PropTypes from "prop-types";
import "./Card.css";

const CardList = ({cards, onDelete}) => {
  const getCardList = (cards) => {
    return cards.map((card) => (
        <Card 
        key={card.id} 
        card={card} 
        onDelete={onDelete} 
        />
      ));
  };
  console.log(cards, cards.length);
  return (
    <div className="create-card-section">
      {getCardList(cards)}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default CardList;