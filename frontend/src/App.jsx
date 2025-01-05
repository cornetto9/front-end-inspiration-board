import { useState, useEffect } from 'react'
import './App.css'
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import axios from 'axios'

const getAllBoardsApi = () => {
  return axios
    .get(`http://127.0.0.1:5000/boards`)
    .then((response) => {
      console.log("API Response:", response.data.board); 
      const apiBoards = response.data.board;
      const newBoards = apiBoards.map(convertBoardFromApi);
      return newBoards;
    })
    .catch((error) => {
      console.log(error);
    });
};

function convertCardFromApi(card) {
  return {
    cardId: card.card_id,
    message: card.message,
    likesCount: card.likes_count,
  };
}

function convertBoardFromApi(board) {
  return {
    BoardId: board.board_id,
  };
}

const deleteCardApi = (id) => {
  return axios.delete(`http://127.0.0.1:5000/boards/${id}/cards`).catch((error) => {
    console.log(error);
  });
};

//APP COMPONENT
function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  
  const getAllBoards = () => {
    getAllBoardsApi().then((boards) => {
      setBoards(boards);
      console.log(boards)
    });
  };
  useEffect(() => {
    getAllBoards();
  }, []);  
const addBoard = (newBoard) => {
    setBoards([...boards, { ...newBoard, id: boards.length + 1, cards: [] }]);
  };

  const selectedBoard = boards.find(board => board.id === selectedBoardId);

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
          {boards.map(board => (
            <li key={board.id} onClick={() => setSelectedBoardId(board.id)}>
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
    </div>
  );
}

  // const handleDeleteCard = (id) => {
  //   deleteCardApi(id).then(() => {
  //     setCardData((cardData) =>
  //       cardData.filter((card) => {
  //         return card.id !== id;
  //       })
  //     );
  //   });
  // };

//   return (
//     <>
//       <div>
//         <h1>Test</h1>
//         {/* <CardList cards={cardData} onDelete={handleDeleteCard}></CardList> */}
//       </div>
//     </>
//   );
// }

const testBoards = {
  board: [
    {
      board_id: 1,
      cards: [],
      owner: "Me",
      title: "My First Board",
    },
    {
      board_id: 2,
      cards: [
        {
          board_id: 2,
          card_id: 1,
          likes_count: 5,
          message: "Never give up!",
        },
        {
          board_id: 2,
          card_id: 2,
          likes_count: 10,
          message: "You are capable of amazing things",
        },
      ],
      owner: "Ada Lovelace",
      title: "Motivation Quotes",
    },
    {
      board_id: 3,
      cards: [
        {
          board_id: 3,
          card_id: 3,
          likes_count: 3,
          message: "I am becoming a better programmer every day",
        },
        {
          board_id: 3,
          card_id: 6,
          likes_count: 8,
          message: "Start small, think big",
        },
      ],
      owner: "Grace Hopper",
      title: "Daily Affirmations",
    },
    {
      board_id: 4,
      cards: [
        {
          board_id: 4,
          card_id: 4,
          likes_count: 7,
          message: "Debug with patience",
        },
        {
          board_id: 4,
          card_id: 5,
          likes_count: 15,
          message: "Remember to take breaks",
        },
      ],
      owner: "Katherine Johnson",
      title: "Coding Tips",
    },
    {
      board_id: 5,
      cards: [],
      owner: "Sonic",
      title: "Tests always work!",
    },
  ],
};

export default App;
