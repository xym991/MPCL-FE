import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import img from "../../assets/images/HICCLogo.png";

import "./index.css";
const Club = ({ club }) => {
  return (
    <div className="_club">
      <img src={club.logo || img} alt={`${club.name} Logo`} />
      <div className="club-main">
        <h2 className="name">{club.name}</h2>
        <p className="chairman info">
          <span>Chairman:</span>
          {club.chairman_name || "N/A"}
        </p>
        <p className="phone info">
          <PhoneIcon /> {club.primary_phone_number}
        </p>
        <p className="email info">
          <AlternateEmailIcon /> {club.primary_email}
        </p>
        <p className="address info">
          <LocationOnIcon /> {club.ground_1}
        </p>
      </div>
    </div>
  );
};

export default Club;
