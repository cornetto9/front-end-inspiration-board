import { useState } from "react";
import PropTypes from "prop-types";

const NewCardForm = ({ addCard }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setError("Message is required.");
      return;
    }
    if (text.length > 40) {
      setError("Message cannot be more than 40 characters.");
      return;
    }
    addCard({ text, completed: false });
    setText("");
    setError("");
  };

  return (
    <form className="new-card-form" onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new message"
      />
      <button type="submit">Add</button>
    </form>
  );
};

NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default NewCardForm;
