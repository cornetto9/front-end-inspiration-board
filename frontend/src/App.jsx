import { useState, useEffect } from 'react'
import './App.css'
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import axios from 'axios'
import CardList from './components/CardList';
import NewCardForm from './components/NewCardForm';
import PropTypes from "prop-types";

const kbaseURL = "https://back-end-inspiration-board-dream-girls.onrender.com";

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
      return [];
    });
};

// add new board 
const addBoardApi = (data) => {
  return axios
    .post(`${kbaseURL}/boards`, data)
    .then((response) => {
      return convertBoardFromApi(response.data.board);
    })
    .catch((error) => {
      console.log(error);
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
  return axios.delete(`${kbaseURL}/${id}`).catch((error) => {
    console.log(error);
  });
};

// Increments the likes count for a card
const incrementLikesApi = (id) => {
  return axios
    .patch(`${kbaseURL}/cards/${id}/like`) 
    .catch((error) => {
      console.error("Error incrementing likes:", error);
    });
};

//APP COMPONENT
function App({ initialBoards = [] }) {
  const [boards, setBoards] = useState([initialBoards]);
  const [cardData, setCardData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(true);

  //Board functions
  const getAllBoards = () => {
    getAllBoardsApi().then((boards) => {
      setBoards(boards);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (initialBoards.length === 0) {
      getAllBoards();
    } else {
      setLoading(false);
    }
  }, [initialBoards]);


  const addBoard = (newBoard) => {
    addBoardApi(newBoard)
      .then((board) => {
        setBoards((prevBoards) => [...prevBoards, board]);
      })
      .catch((error) => {
        console.log("addBoard", error);
      });
  };

  const selectedBoard = boards.find((board) => board.id === selectedBoardId);

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
  const handleClickBoard = (id) => {
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

  //deletes card from board frontend and backend
  const handleDeleteCard = (id) => {
    deleteCardApi(id).then(() => {
      setCardData((cardData) =>
        cardData.filter((card) => {
          return card.id !== id;
        })
      );
    });
  };

  //increments likes on card frontend
  const handleLike = (id) => {
    incrementLikesApi(id).then(() => {
      setCardData((prevCardData) =>
        prevCardData.map((card) =>
          card.id === id
            ? { ...card, likesCount: card.likesCount + 1 } 
            : card
        )
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>Welcome to the Inspiration Board</h1>
      <div className="top-section">
        {showNewBoardForm && (
          <NewBoardForm
            addBoard={addBoard}
            setShowNewForm={setShowNewBoardForm}
            showNewForm={showNewBoardForm}
          />
        )}
        <Board
          boards={boards}
          handleClick={handleClickBoard}
          setShowNewForm={setShowNewBoardForm}
          showNewForm={showNewBoardForm}
        />
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

App.propTypes = {
  initialBoards: PropTypes.array,
};

export default App;
