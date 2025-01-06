import { useState } from "react";
import PropTypes from "prop-types";

const NewCardForm = ({ onCardSubmit }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      setError("Message is required.");
      return;
    }
    if (message.length > 40) {
      setError("Message cannot be more than 40 characters.");
      return;
    }
    onCardSubmit(message);
    setMessage("");
    setError("");
  };

  return (
    <form className="new-card-form" onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Add a new message"
      />
      <button type="submit">Add New Card</button>
    </form>
  );
};

NewCardForm.propTypes = {
  onCardSubmit: PropTypes.func.isRequired,
};

export default NewCardForm;
