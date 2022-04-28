import React from "react";
import { Header } from "../components";
function index({ children }) {
  return (
    <div>
      <Header />
      <div className="container py-5">{children}</div>
    </div>
  );
}

export default index;
