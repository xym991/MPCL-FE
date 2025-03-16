import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const PersonCard = ({ person }) => {
  return (
    <div className="_person-card">
      <img src={person.image} alt="" />
      <div className="info">
        <h3>{person.name}</h3>
        <p className="subtext">{person.subtext}</p>
        {person.phone && (
          <p className="phone info">
            <PhoneIcon />
            {person.phone}
          </p>
        )}
        {person.email && (
          <p className="email info">
            <AlternateEmailIcon /> {person.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
