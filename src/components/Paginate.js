import React from "react";

function Paginate({ switchToNextPage, switchToPrevPage, prevUrl }) {
  return (
    <div>
      <button
        className="btn btn-light"
        disabled={!prevUrl}
        onClick={switchToPrevPage}
      >
        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
      </button>
      <button className="btn btn-light mx-2" onClick={switchToNextPage}>
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default Paginate;
