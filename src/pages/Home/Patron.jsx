import React from "react";

const Patron = ({ img1, text, img2, heading }) => {
  return (
    <div className="_patron">
      <div className="patron-card">
        {img2 && <img src={img2} alt="" />}
        <p>
          <h1 className="heading">{heading}</h1>
          {text}
        </p>
        {img1 && <img src={img1} alt="" />}
      </div>
    </div>
  );
};

export default Patron;
