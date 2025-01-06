import { useState, useEffect } from 'react'
import './App.css'
import NewBoardForm from "./components/NewBoardForm";
import axios from 'axios'
import CardList from './components/CardList';
import NewCardForm from './components/NewCardForm';

const kbaseURL = "http://localhost:5000";

const convertCardFromApi = (card) => {
  return {
    id: card.card_id,
    message: card.message,
    likesCount: card.likes_count,
  };
};

const convertBoardFromApi = (board) => {
  return {
    id: board.board_id,
    title: board.title,
    owner: board.owner,
    cards: board.cards ? board.cards.map(convertCardFromApi) : [],
  };
};

// Gets the list of boards
const getAllBoardsApi = () => {
  return axios
    .get(`${kbaseURL}/boards`)
    .then((response) => {
      const apiBoards = response.data.board;
      const newBoards = apiBoards.map(convertBoardFromApi);
      return newBoards;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

// Gets the list of cards for a board
const getCardListApi = (id) => {
  return axios
    .get(`${kbaseURL}/boards/${id}/cards`)
    .then((response) => {
      const apiCards = response.data.cards;
      const newCards = apiCards.map(convertCardFromApi);
      return newCards;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Deletes a card from the board
const deleteCardApi = (id) => {
  return axios.delete(`http://127.0.0.1:5000/cards/${id}`)
    .catch((error) => {
      console.log(error);
  });
};

// Increments the likes count for a card
const incrementLikesApi = (id) => {
  return axios
    .patch(`${kbaseURL}/cards/${id}/like`) 
    .then(() => {
      console.log("Like incremented successfully for card:", id);
    })
    .catch((error) => {
      console.error("Error incrementing likes:", error);
    });
};

//APP COMPONENT
function App() {
  const [boards, setBoards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(true);

  //Board functions
  const getAllBoards = () => {
    getAllBoardsApi().then((boards) => {
      setBoards(boards);
    });
  };
  useEffect(() => {
    getAllBoards();
    setLoading(false);
  }, []);

  const addBoard = (newBoard) => {
    setBoards([...boards, { ...newBoard, id: boards.length + 1, cards: [] }]);
  };

  const selectedBoard = boards.find((board) => board.id === selectedBoardId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  //card functions

  //gets card list by board id
  const getCardList = (id) => {
    getCardListApi(id)
      .then((cards) => {
        setCardData(cards);
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

  //adds card to board
  const handleCardSubmit = (data) => {
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

  //deletes card from board
  const handleDeleteCard = (id) => {
    deleteCardApi(id).then(() => {
      setCardData((cardData) =>
        cardData.filter((card) => {
          return card.id !== id;
        })
      );
    });
  };

  //increments likes on card
  const handleLike = (id) => {
    incrementLikesApi(id).then(() => {
      setCardData((prevCardData) =>
        prevCardData.map((card) =>
          card.id === id
            ? { ...card, likesCount: card.likesCount + 1 } // Increment the likes count locally
            : card
        )
      );
    });
  };

  return (
    <div className="App">
      <h1>Welcome to the Inspiration Board</h1>
      <button className="hide" onClick={() => setShowNewBoardForm(!showNewBoardForm)}>
        {showNewBoardForm ? "Hide New Board Form" : "Show New Board Form"}
      </button>
      <div className="top-section">
        {showNewBoardForm && <NewBoardForm addBoard={addBoard} setShowNewForm={setShowNewBoardForm} showNewForm={showNewBoardForm}/>}
        <div className="board-list">
          <h2>Boards</h2>
          <ul>
            {boards.map((board) => (
              <li className="board-names" key={board.id} onClick={() => handleBoardClick(board.id)}>
                {board.title} - {board.owner}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedBoard && (
        <div>
      <h2 className="title">{selectedBoard.title}</h2>
        <div className="bottom-section">
          <CardList
            cards={cardData}
            onDelete={handleDeleteCard}
            onLike={handleLike}
          />
          <NewCardForm onCardSubmit={handleCardSubmit} />
        </div>
        </div>
      )}
    </div>
  );
}



export default App;
