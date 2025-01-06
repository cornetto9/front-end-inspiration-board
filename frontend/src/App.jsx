import { useState, useEffect } from 'react'
import './App.css'
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import axios from 'axios'
import CardList from './components/CardList';
import NewCardForm from './components/NewCardForm';

const kbaseURL = "http://localhost:5000";

const getAllBoardsApi = () => {
  return axios
    .get(`${kbaseURL}/boards`)
    .then((response) => {
      // console.log("API Response:", response.data.board);
      const apiBoards = response.data.board;
      const newBoards = apiBoards.map(convertBoardFromApi);
      return newBoards;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const convertCardFromApi = (card) => {
  return {
    id: card.card_id,
    message: card.message,
    likesCount: card.likes_count,
  };
}

const convertBoardFromApi = (board) => {
  return {
    id: board.board_id,
    title: board.title,
    owner: board.owner,
    cards: board.cards ? board.cards.map(convertCardFromApi) : [],
  };
}

const getCardListApi = (id) => {
  return axios
    .get(`${kbaseURL}/boards/${id}/cards`)
    .then((response) => {
      // return response.data.cards;
      const apiCards = response.data.cards;
      const newCards = apiCards.map(convertCardFromApi);
      return newCards;
    })
    .catch((error) => {
      console.log(error);
    });
}

//APP COMPONENT
function App() {
  const [boards, setBoards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);

  const getAllBoards = () => {
    getAllBoardsApi().then((boards) => {
      setBoards(boards);
      console.log(boards);
    });
  };
  useEffect(() => {
    getAllBoards();
    setLoading(false);
  }, []);

  const getCardList = (id) => {
    getCardListApi(id)
      .then((cards) => {
        setCardData(cards);
        console.log("cardList", cards);
      })
      .catch((error) => {
        console.log("getCardList", error);
      });
  };

  //sets card list by board id
  const handleBoardClick = (id) => {
    setSelectedBoardId(id);
    getCardList(id);
  };

  const addBoard = (newBoard) => {
    setBoards([...boards, { ...newBoard, id: boards.length + 1, cards: [] }]);
  };

  const handleCardSubmit = (data) => {
    console.log(selectedBoardId);
    axios
      .post(`${kbaseURL}/boards/${selectedBoardId}/cards`, data)
      .then((response) => {
        setCardData((prevCardData) => [
          convertCardFromApi(response.data.card),
          ...prevCardData,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCardApi = (id) => {
    return axios
      .delete(`http://127.0.0.1:5000/cards/${id}`)
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCard = (id) => {
    deleteCardApi(id).then(() => {
      setCardData((cardData) =>
        cardData.filter((card) => {
          return card.id !== id;
        })
      );
    });
  };

  const selectedBoard = boards.find((board) => board.id === selectedBoardId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Welcome to the Inspiration Board</h1>
      <button onClick={() => setShowNewBoardForm(!showNewBoardForm)}>
        {showNewBoardForm ? "Hide New Board Form" : "Show New Board Form"}
      </button>
      {showNewBoardForm && <NewBoardForm addBoard={addBoard} />}
      <div>
        <h2>Boards</h2>
        <ul>
          {boards.map((board) => (
            <li key={board.id} onClick={() => handleBoardClick(board.id)}>
              {board.title} - {board.owner}
            </li>
          ))}
        </ul>
      </div>
      {selectedBoard ? (
        <Board board={selectedBoard} />
      ) : (
        <p>No board selected.</p>
      )}
      <div>
        {/* <h2>Card List {selectedBoard.title}</h2> */}
        <NewCardForm onCardSubmit={handleCardSubmit} />
        <CardList cards={cardData} onDelete={handleDeleteCard}/>
      </div>
    </div>
  );
}


export default App;
