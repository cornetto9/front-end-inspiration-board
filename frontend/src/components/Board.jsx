import PropTypes from "prop-types";
import "./Board.css";

const Board = ({ boards, handleClick, setShowNewForm, showNewForm}) => {

  return (
    <div>
      <div className="title-button-container">
        <h2 className="board-title">Boards</h2>
        <button
          className="button-show-hide"
          onClick={() => setShowNewForm(!showNewForm)}
        >
          {showNewForm ? "Click To Hide Board Form" : "Click To Show Board Form"}
        </button>
      </div>
      <div className="board-list-container2">
        {/* <ul> */}
        {boards.map((board) => (
          <p
            className="board-names"
            key={board.id}
            onClick={() => handleClick(board.id)}
          >
            {board.title} - {board.owner}
          </p>
        ))}
        {/* </ul> */}
      </div>
    </div>
  );
};

Board.propTypes = {
  boards: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  setShowNewForm: PropTypes.func.isRequired,
  showNewForm: PropTypes.bool.isRequired,
};

export default Board;
