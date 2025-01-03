import React, { useState } from "react";
import CardList from "./CardList";
import NewCardForm from "./NewCardForm";

const Board = ({ board }) => {
  const [cards, setCards] = useState(board.cards);

  const addCard = (newCard) => {
    setCards([...cards, { ...newCard, id: cards.length + 1 }]);
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <div>
      <h2>{board.title}</h2>
      <CardList cards={cards} deleteCard={deleteCard} />
      <NewCardForm addCard={addCard} />
    </div>
  );
};

export default Board;