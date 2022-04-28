import React from "react";
import { Link } from "react-router-dom";

function Card({ image, title, type }) {
  return (
    <div className="card p-3 my-3 mx-auto">
      <img
        src={image}
        className="card-img-top"
        style={{ width: "250px", height: "250px" }}
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link to="" className="btn btn-primary btn-sm">
          {type}
        </Link>
      </div>
    </div>
  );
}

export default Card;
