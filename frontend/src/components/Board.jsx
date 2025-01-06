import React, { useState } from "react";
import CardList from "./CardList";
import NewCardForm from "./NewCardForm";

const Board = ({ board }) => {
  const [cards, setCards] = useState(board.cards);  
  const [sortType, setSortType] = useState("alphabetical");  

  const addCard = (newCard) => {
    setCards([...cards, { ...newCard, id: cards.length + 1 }]);  
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));  
  };


  const sortedCards = [...cards];  // make a copy of cards
  sortedCards.sort((a, b) => {
    if (sortType === "alphabetical") {
      if (a.text < b.text) return -1;  // if a.text less than b.text, a comes first
      if (a.text > b.text) return 1;   // if a.text greater than b.text, b comes first
      return 0;  
    } else if (sortType === "likes") {
      return b.likes - a.likes;  // sort by number of likes
    }
    return 0;
  });

  return (
    <div>
      <h2>{board.title}</h2>
      <div>
        <button onClick={() => setSortType("alphabetical")}>Sort alphabetically</button>
        <button onClick={() => setSortType("likes")}>Sort by number of "+1"s</button>
      </div>
      <CardList cards={sortedCards} deleteCard={deleteCard} />
      <NewCardForm addCard={addCard} />
    </div>
  );
};

export default Board;