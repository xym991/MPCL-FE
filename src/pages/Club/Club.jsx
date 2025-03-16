import React from "react";
import clubLogo from "../../assets/images/HICCLogo.png";
import "./Club.css";
const Club = () => {
  return (
    <div className="_club-page">
      <div className="header flex flex-col items-center justify-center">
        <img src={clubLogo} alt="" className="w-[300px] object-contain " />
        <h1 className="text-primary">Harrow Indians Cricket Club</h1>
      </div>
    </div>
  );
};

export default Club;
