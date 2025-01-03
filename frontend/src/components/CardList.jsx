import React from "react";
import Card from "./Card";

const CardList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;