import React, { useState } from "react";

const NewBoardForm = ({ addBoard }) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !owner) {
      setError("Both title and owner are required.");
      return;
    }
    addBoard({ title, owner });
    setTitle("");
    setOwner("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <label htmlFor="owner">Owner's Name :</label>
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