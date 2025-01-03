import React from "react";

const Card = ({ card }) => {
  return (
    <div>
      <p>{card.text}</p>
      <p>{card.completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
};

export default Card;