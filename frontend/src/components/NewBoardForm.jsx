import React, { useState } from "react";

const NewBoardForm = ({ addBoard }) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && owner) {
      addBoard({ title, owner });
      setTitle("");
      setOwner("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="owner">Owner:</label>
        <input
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>
      <button type="submit">Add Board</button>
    </form>
  );
};

export default NewBoardForm;