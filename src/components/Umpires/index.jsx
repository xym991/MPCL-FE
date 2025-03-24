import React, { useState, useEffect } from "react";
import axios from "axios";
import paths from "../../utils/paths";
import PersonCard from "../Shared/PersonCard";

const Umpires = () => {
  const [umpires, setUmpires] = useState([]);

  useEffect(() => {
    const fetchUmpires = async () => {
      try {
        const response = await axios.get(paths.get_umpires);
        setUmpires(response.data);
      } catch (error) {
        console.error("Error fetching umpires:", error);
      }
    };

    fetchUmpires();
  }, []);

  return (
    <div className="_umpires">
      <div className="_umpires-grid">
        {umpires.length > 0 &&
          umpires?.map((u) => (
            <PersonCard
              key={u.id}
              person={{
                name: `${u.fname} ${u.lname}`,
                image: u.image,
                subtext: u.league_position,
                phone: u.phone,
                email: u.email,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Umpires;
