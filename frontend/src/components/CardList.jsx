import Card from "./Card";
import PropTypes from "prop-types";
import "./CardList.css";
import { useState } from "react";

const CardList = ({ cards, onDelete, onLike }) => {
  const [sortOption, setSortOption] = useState("none");

  const getSortedCards = (cards) => {
    const sortedCards = [...cards];

    switch (sortOption) {
      case "highest":
        return sortedCards.sort((a, b) => b.likesCount - a.likesCount);
      case "lowest":
        return sortedCards.sort((a, b) => a.likesCount - b.likesCount);
      default:
        return sortedCards;
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="cardList-container">
      <div className="sort-controls">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="highest">Most Likes</option>
          <option value="lowest">Least Likes</option>
          <option value="none">Original Order</option>
        </select>
      </div>
      <div className="card-container">
        {getSortedCards(cards).map((card) => (
          <Card key={card.id} card={card} onDelete={onDelete} onLike={onLike} />
        ))}
      </div>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default CardList;
