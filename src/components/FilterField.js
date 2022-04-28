import React from "react";

function FilterField({ handleFilter }) {
  return (
    <div>
      {" "}
      <input
        type="text"
        className="form-control"
        placeholder="Search Pokemon By Type"
        onChange={handleFilter}
      />
    </div>
  );
}

export default FilterField;
