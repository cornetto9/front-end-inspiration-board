import React, { useState } from "react";

const Card = ({ card, deleteCard }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <p>{card.text}</p>
      <p>{card.completed ? "Completed" : "Not Completed"}</p>
      <button onClick={() => deleteCard(card.id)}>Delete</button>
      <button onClick={() => setLikes(likes + 1)}>+1</button>
      <p>Likes: {likes}</p>
    </div>
  );
};

export default Card;