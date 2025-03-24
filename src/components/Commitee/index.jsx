import React, { useState, useEffect } from "react";
import axios from "axios";
import paths from "../../utils/paths";
import PersonCard from "../Shared/PersonCard";
import person from "../../assets/images/Ajay-Carvalo.jpg";

const Commitee = () => {
  const [commiteeMembers, setCommiteeMembers] = useState([]);

  useEffect(() => {
    const fetchCommiteeMembers = async () => {
      try {
        const response = await axios.get(paths.get_commitee_members);
        setCommiteeMembers(response.data);
      } catch (error) {
        console.error("Error fetching commitee members:", error);
      }
    };

    fetchCommiteeMembers();
  }, []);

  return (
    <div className="_umpires">
      <div className="_umpires-grid">
        {commiteeMembers.length > 0 &&
          commiteeMembers?.map((member) => (
            <PersonCard
              key={member.id}
              person={{
                name: `${member.fname} ${member.lname}`,
                image: member.image || person,
                subtext: member.role,
                phone: member.phone,
                email: member.email,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Commitee;
