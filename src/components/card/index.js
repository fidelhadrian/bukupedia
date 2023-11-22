import React from "react";
// import { Link } from "react-router-dom";
import "./index.css";

const Card = ({ data, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {data ? (
        <>
          <figure>
            {data.cover_art_url ? (
              <img src={data.cover_art_url} alt={data.title} />
            ) : null}
          </figure>
          <div className="card-info">
            <h3>{data.title}</h3>
            <p>{data.authors.join(", ")}</p>
            <p>Categories: {data.categories.join(", ")}</p>
            <p>Language: {data.language}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Card;
