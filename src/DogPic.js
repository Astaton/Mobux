import React from "react";

const DogPic = ({ imgUrl, breed, picClickHandler }) => (
  <div className="dogPicFrame">
    <img
      className="dogPic"
      src={imgUrl}
      alt={`a ${breed} good boy`}
      onClick={() => picClickHandler(imgUrl)}
    />
  </div>
);

export default DogPic;
