import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, TypePage, ViewPage } from "./pages";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/types/:pokemonId" element={<TypePage />} />
          <Route exact path="/views/:type" element={<ViewPage />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
