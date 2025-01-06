import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);

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

  useEffect(() => {
    axios.get('http://localhost:5000/api/boards')
      .then(response => {
        setBoards(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addBoard = (newBoard) => {
    axios.post('http://localhost:5000/api/boards', newBoard)
      .then(response => {
        setBoards([...boards, response.data]);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const selectedBoard = boards.find(board => board.id === selectedBoardId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Inspiration Board</h1>
      </header>
      <main className="content">
        <section className="boards">
          <div className="section-header">
            <h2>Boards</h2>
          </div>
          <ul className="board-list">
            {boards.map(board => (
              <li key={board.id} onClick={() => setSelectedBoardId(board.id)}>
                {board.title} - {board.owner}
              </li>
            ))}
          </ul>
        </section>
        <section className="selected-board">
          <div className="section-header">
            <h2>Selected Board</h2>
          </div>
          {selectedBoard ? (
            <Board board={selectedBoard} />
          ) : (
            <p>No board selected.</p>
          )}
        </section>
        <section className="create-board">
          <div className="section-header">
            <h2>Create a New Board</h2>
          </div>
          {showNewBoardForm && <NewBoardForm addBoard={addBoard} />}
          <button onClick={() => setShowNewBoardForm(!showNewBoardForm)}>
            {showNewBoardForm ? "Hide New Board Form" : "Show New Board Form"}
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;