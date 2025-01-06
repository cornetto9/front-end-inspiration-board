import { useState } from "react";
// import CardList from "./CardList";
// import NewCardForm from "./NewCardForm";
import PropTypes from "prop-types";
import "./Board.css";

const Board = ({ board }) => {
  // const [cards, setCards] = useState(board.cards);
  const [sortType, setSortType] = useState("alphabetical");

  // const addCard = (newCard) => {
  //   setCards([...cards, { ...newCard, id: cards.length + 1 }]);
  // };

  // const deleteCard = (cardId) => {
  //   setCards(cards.filter((card) => card.id !== cardId));
  // };

  // const sortedCards = [...cards].sort((a, b) => {
  //   if (sortType === "alphabetical") {
  //     return a.text.localeCompare(b.text);
  //   } else if (sortType === "likes") {
  //     return b.likes - a.likes;
  //   }
  //   return 0;
  // });

  return (
    <div>
      {/* <h2 className="board-title">{board.title}</h2>
      <div>
        <button onClick={() => setSortType("alphabetical")}>
          Sort alphabetically
        </button>
        <button onClick={() => setSortType("likes")}>
          Sort by number of +1s
        </button>
      </div>
      <CardList cards={cards} onDelete={deleteCard} />
      <NewCardForm addCard={addCard} /> */}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.object.isRequired,
};

export default Board;
