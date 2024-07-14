import React from "react";

const TitleandDescription = ({ handleDiscribtion, handleTitle }) => {
  return (
    <div className="acc-amenities-cnt">
      <h2>Now, let's give your house a title</h2>
      <p>Short titles work best</p>
      <textarea
        type="text"
        className="title-input"
        onChange={(e) => handleTitle(e.target.value)}
      />
      <>
        <h2>Create Your Description</h2>
        <p>Share what makes your place special.</p>
        <textarea
          type="text"
          className="title-input"
          style={{ fontSize: "1rem" }}
          onChange={(e) => handleDiscribtion(e.target.value)}
        />
      </>
    </div>
  );
};

export default TitleandDescription;
