import React from "react";

const CustomCursor = ({ position, show }) => {
  console.log(position);
  return (
    <div
      style={{
        position: "absolute",
        left: `${position?.x - 180}px`,
        top: `${position?.y - 180}px`,
        visibility: show?.show ? "visible" : "hidden",
      }}
      className="custom-cursor"
    >
      <h3>{show?.name}</h3>
      <p>{show?.designation}</p>
    </div>
  );
};

export default CustomCursor;
