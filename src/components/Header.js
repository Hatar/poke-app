import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container mx-auto">
        <Link className="navbar-brand" to="/">
          <h3>Pokemon App</h3>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
