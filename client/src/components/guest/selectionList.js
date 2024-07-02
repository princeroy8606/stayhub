import React, { useState } from "react";

const SelectionList = ({ data, onSelect, deafultValue }) => {
  return (
    <select onChange={onSelect} className="selection-list">
      <option value="select">{deafultValue}</option>
      {data.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectionList;
