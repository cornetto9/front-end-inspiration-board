import { useState } from "react";
import PropTypes from "prop-types";
import "./NewCardForm.css";

const NewCardForm = ({ onCardSubmit }) => {
    const kDefaultFormState = {
      message: "",
      likes_count: 1,
    };

  const [formData, setFormData] = useState(kDefaultFormState);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };  


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.message) {
      setError("Message is required.");
      return;
    }
    if (formData.message.length > 40) {
      setError("Message cannot be more than 40 characters.");
      return;
    }
    onCardSubmit(formData);
    setFormData(kDefaultFormState);
    setError("");
  };

  return (
    <div className="form-container">
      <form className="new-card-form" onSubmit={handleSubmit}>
        <h2>Add Card</h2>
        <label htmlFor="Message"> Message: </label>
        <input
          type="text"
          id="card"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message here..."
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

NewCardForm.propTypes = {
  onCardSubmit: PropTypes.func.isRequired,
};

export default NewCardForm;
