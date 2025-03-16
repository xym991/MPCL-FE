import React from "react";
import "./index.css";
import person from "../../assets/images/Ajay-Carvalo.jpg";
import PersonCard from "../Shared/PersonCard";

const Umpires = () => {
  const umpires = Array(36).fill({
    name: "Ajay Carvalo",
    image: person,
    subtext: "Panel Umpire",
    phone: "+44 7595287068",
    email: "ajay.carvalo@gmail.com",
  });

  return (
    <div className="_umpires">
      <div className="_umpires-grid">
        {umpires.map((u) => (
          <PersonCard person={u} />
        ))}
      </div>
    </div>
  );
};

export default Umpires;
