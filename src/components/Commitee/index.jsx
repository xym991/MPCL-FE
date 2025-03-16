import React from "react";
import "../Umpires/index.css";
import person from "../../assets/images/Ajay-Carvalo.jpg";
import PersonCard from "../Shared/PersonCard";

const Commitee = () => {
  const umpires = Array(18).fill({
    name: "Ajay Carvalo",
    image: person,
    subtext: "League Secretary & Division 4",
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

export default Commitee;
