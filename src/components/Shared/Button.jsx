import React from "react";
import "./Button.css";
const Button = ({ children, onClick, className }) => {
  return (
    <button className={"_button " + className} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
