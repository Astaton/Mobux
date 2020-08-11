import React from "react";

const BigDogPic = ({ imgUrl, breed, hideBigPic }) => (
  <div id="bigPicContainer" className="hideBigPic" onClick={() => hideBigPic()}>
    <img className="bigDogPic" alt={`a ${breed} good boy`} src={imgUrl} />
  </div>
);

export default BigDogPic;
