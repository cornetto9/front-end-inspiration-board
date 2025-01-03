import React from "react";
import Card from "./Card";

const CardList = ({ cards, deleteCard }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} deleteCard={deleteCard} />
      ))}
    </div>
  );
};

export default CardList;