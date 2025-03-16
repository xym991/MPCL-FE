import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "./index.css";
const Club = ({ club }) => {
  return (
    <div className="_club">
      <img src={club.image} alt="" />
      <div className="club-main">
        <h2 className="name">{club.name}</h2>
        <p className="chairman info">
          <span>Chairman:</span>
          {club.chairman}
        </p>
        <p className="phone info">
          <PhoneIcon /> {club.phone}
        </p>
        <p className="email info">
          <AlternateEmailIcon /> {club.email}
        </p>
        <p className="address info">
          <LocationOnIcon /> {club.address}
        </p>
      </div>
    </div>
  );
};

export default Club;
