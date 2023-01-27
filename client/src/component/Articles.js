import axios from "axios";
import React from "react";
import { useState } from "react";

const Article = ({ articles }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  //-----put (modifier et poster des donnees)---------------------
  const handleEdit = () => {
    const data = {
      author: articles.author,
      content: editContent ? editContent : articles.content,
      updatedDate: Date.now(),
    };
    axios
      .put("http://localhost:3000/api/blog/" + articles._id, data)
      .then(() => setIsEditing(false));
  };

  //-------delete--------------------------------
  const handleDelete = () => {
    axios.delete("http://localhost:3000/api/blog/" + articles._id);
    //rafraichir la page--------------
    window.location.reload();
  };

  const dateFormater = (date) => {
    var newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{articles.author}</h3>
        <em>poste le {dateFormater(articles.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : articles.content}
          autoFocus
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : articles.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button
          onClick={() => {
            if (window.confirm("voulez vous vraiment effacer ce message?")) {
              handleDelete();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Article;
