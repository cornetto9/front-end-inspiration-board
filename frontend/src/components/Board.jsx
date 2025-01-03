import React from "react";
import CardList from "./CardList";
import NewCardForm from "./NewCardForm";

const Board = ({ board }) => {
  return (
    <div>
      <h2>{board.title}</h2>
      <CardList cards={board.cards} />
      <NewCardForm />
    </div>
  );
};

export default Board;