import React from "react";
import Club from "./Club";
import image from "../../assets/images/HICCLogo.png";
import { Link } from "react-router-dom";

const Clubs = () => {
  const clubs = Array(20).fill({
    name: "Harrow Indians Cricket Club",
    image,
    chairman: "Pradeep Sharma",
    phone: "+44 07459104464",
    email: "sharmapradeep12@gmail.com",
    address:
      " London Marathon Playing Fields, Birkbeck Avenue, Greenford, Middlesex, UB6 8LS",
  });
  return (
    <div className="_clubs">
      <div className="clubs-grid">
        {clubs.map((club) => (
          <Link to={"/club"}>
            <Club club={club} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
