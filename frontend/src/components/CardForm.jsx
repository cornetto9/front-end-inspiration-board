// import PropTypes from "prop-types";
import { useState } from "react";

const CardForm =() => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New card:", text);
    setText("");
  };


  return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Add a new task"
    />
    <button type="submit">Add</button>
  </form>
  )
};

export default CardForm
