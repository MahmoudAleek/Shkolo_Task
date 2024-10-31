import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_END_POINT } from "../consts";
import "./ButtonForm.css";

const ButtonForm = () => {
  const { id: buttonId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [color, setColor] = useState("#000000"); // Default color

  useEffect(() => {
    if (buttonId) {
      // Fetch button data if we are editing an existing button
      axios
        .get(`${API_END_POINT}/buttons/${buttonId}`)
        .then((response) => {
          const button = response.data;
          setTitle(button.title);
          setLink(button.link);
          setColor(button.color);
        })
        .catch((error) => {
          console.error("Error fetching button details:", error);
        });
    }
  }, [buttonId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { title, link, color };

    try {
      if (buttonId) {
        await axios.put(`${API_END_POINT}/buttons/${buttonId}`, data);
      } else {
        await axios.post(`${API_END_POINT}/buttons`, data);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting button form:", error);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="button-form">
        <h2>{buttonId ? "Edit Button" : "Add New Button"}</h2>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="link">Link</label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <label htmlFor="color">Button Color</label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        >
          <option value="">Select Color</option>
          <option value="#FF0000">Red</option>
          <option value="#0000FF">Blue</option>
          <option value="#008000">Green</option>
          <option value="#FFD700">Yellow</option>
          <option value="#800080">Purple</option>
          <option value="#FFA500">Orange</option>
          <option value="#FF69B4">Pink</option>
          <option value="#008080">Teal</option>
          <option value="#808080">Gray</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            {buttonId ? "Update Button" : "Add Button"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ButtonForm;
