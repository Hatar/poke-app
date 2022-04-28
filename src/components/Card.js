import React from "react";
import { Link } from "react-router-dom";

function Card({ id, image, title, type }) {
  return (
    <Link
      to={`/types/${id}`}
      className="card p-3 my-3 mx-auto text-decoration-none"
    >
      <img
        src={image}
        className="card-img-top"
        style={{ width: "250px", height: "250px" }}
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title text-dark">{title}</h5>
      </div>
    </Link>
  );
}

export default Card;
