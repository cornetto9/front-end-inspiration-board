import { useState, useEffect } from 'react'
import './App.css'
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import axios from 'axios'
import { Card } from '@material-ui/core';
import CardList from './components/CardList';

const getAllBoardsApi = () => {
  return axios
    .get(`http://127.0.0.1:5000/boards`)
    .then((response) => {
      // console.log("API Response:", response.data.board); 
      const apiBoards = response.data.board;
      const newBoards = apiBoards.map(convertBoardFromApi);
      return newBoards;
    })
    .catch((error) => {
      console.log('error', error);
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
  return axios.get(`http://127.0.0.1:5000/boards/${id}/cards`)
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
// const deleteCardApi = (id) => {
//   return axios.delete(`http://127.0.0.1:5000/boards/${id}/cards`).catch((error) => {
//     console.log(error);
//   });
// };

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
      console.log(boards)
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
      console.log('cardList',cards)
    })
    .catch((error) => {
      console.log("getCardList", error);
    }); 
  }; 
    
  const handleBoardClick = (id) => {
    setSelectedBoardId(id);
    getCardList(id);
  };


  // const mockBoards = [
  //   {
  //     id: 1,
  //     title: "Project Alpha",
  //     owner: "Alice",
  //     cards: [
  //       { id: 1, text: "Set up project structure", completed: false },
  //       { id: 2, text: "Create initial components", completed: true },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Project Beta",
  //     owner: "Bob",
  //     cards: [
  //       { id: 3, text: "Design database schema", completed: false },
  //       { id: 4, text: "Implement API endpoints", completed: true },
  //     ],
  //   },
  // ];

  // useEffect(() => {
  //   setTimeout(() => {
  //     setBoards(mockBoards);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

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
        <CardList cards={cardData} />
      </div>
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

export default App;
