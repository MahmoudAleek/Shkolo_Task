import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_END_POINT } from "../consts";
import "./ButtonGrid.css";

interface Button {
  id: number;
  title: string;
  link: string;
  color: string;
}

const ButtonGrid = () => {
  const [buttons, setButtons] = useState<Button[]>([]);

  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    try {
      const response = await axios.get<Button[]>(`${API_END_POINT}/buttons`);
      setButtons(response.data);
    } catch (error) {
      console.error("Error fetching buttons:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_END_POINT}/buttons/${id}`);
      setButtons(buttons.filter((button) => button.id !== id));
    } catch (error) {
      console.error("Error deleting button:", error);
    }
  };

  return (
    <div className="grid-container">
      {buttons.map((button) => (
        <div key={button.id} className="grid-item">
          <a
            href={button.link}
            className="custom-button"
            style={{ backgroundColor: button.color }}
          >
            {button.title}
          </a>
          <div className="action-buttons">
            <Link to={`/updateButtonInfo/${button.id}`} className="edit-button">
              Edit
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDelete(button.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {Array.from({ length: 9 - buttons.length }).map((_, index) => (
        <div key={index} className="grid-item">
          <Link to="/addNewButton" className="add-button">
            <FaPlus />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ButtonGrid;
