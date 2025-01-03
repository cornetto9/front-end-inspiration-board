import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';

function App() {
  const [boards, setBoards] = useState([]); 
  const [selectedBoardId, setSelectedBoardId] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  
  const mockBoards = [
    {
      id: 1,
      title: "Project Alpha",
      owner: "Alice",
      cards: [
        { id: 1, text: "Set up project structure", completed: false },
        { id: 2, text: "Create initial components", completed: true },
      ],
    },
    {
      id: 2,
      title: "Project Beta",
      owner: "Bob",
      cards: [
        { id: 3, text: "Design database schema", completed: false },
        { id: 4, text: "Implement API endpoints", completed: true },
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setBoards(mockBoards);
      setLoading(false);
    }, 1000);
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

export default App;