import React from "react";
import "./index.css";
import Button from "../../../components/Shared/Button";
const Hero = ({ children, img }) => {
  return (
    <div className="_hero" style={{ backgroundImage: `url(${img}` }}>
      {children}
    </div>
  );
};

export default Hero;
