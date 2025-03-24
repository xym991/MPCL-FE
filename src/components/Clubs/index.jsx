import React, { useState, useEffect } from "react";
import Club from "./Club";
import axios from "axios";
import paths from "../../utils/paths";
import { Link } from "react-router-dom";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [chairmen, setChairmen] = useState({});

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(paths.get_clubs);
        setClubs(response.data);

        const chairmanIds = response.data
          .map((club) => club.chairman)
          .filter(Boolean);
        if (chairmanIds.length > 0) {
          const chairmanResponse = await axios.post(paths.get_people_details, {
            ids: chairmanIds,
            fields: ["id", "fname", "lname"],
          });
          const chairmanData = chairmanResponse.data.reduce((acc, person) => {
            acc[person.id] = `${person.fname} ${person.lname}`;
            return acc;
          }, {});
          setChairmen(chairmanData);
        }
      } catch (error) {
        console.error("Error fetching clubs or chairmen:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="_clubs">
      <div className="clubs-grid">
        {clubs.map((club) => (
          <Link to={`/club/${club.id}`} key={club.id}>
            <Club club={{ ...club, chairman_name: chairmen[club.chairman] }} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
