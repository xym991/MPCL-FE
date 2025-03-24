import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import paths from "../../utils/paths";
import clubLogo from "../../assets/images/HICCLogo.png";
import "./Club.css";
import PersonCard from "../../components/Shared/PersonCard";
import person from "../../assets/images/person.avif";

const Club = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [officials, setOfficials] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await axios.get(`${paths.get_clubs}/${id}`);
        setClub(response.data);

        const officialIds = [
          { id: response.data.chairman, title: "Chairman" },
          { id: response.data.general_secretary, title: "General Secretary" },
          { id: response.data.treasurer, title: "Treasurer" },
          { id: response.data.welfare_officer, title: "Welfare Officer" },
          { id: response.data.registrar, title: "Registrar" },
          { id: response.data.admin, title: "Admin" },
        ].filter((official) => official.id);

        if (officialIds.length > 0) {
          const ids = officialIds.map((official) => official.id);
          const officialResponse = await axios.post(paths.get_people_details, {
            ids,
            fields: ["id", "fname", "lname", "image", "phone", "email"],
          });

          const officialData = officialResponse.data.map((person) => {
            const titles = officialIds
              .filter((official) => official.id === person.id)
              .map((official) => official.title);
            return { ...person, titles };
          });

          setOfficials(officialData);
        }

        // Fetch teams
        const teamResponse = await axios.get(
          `${paths.get_teams_by_club.replace(":id", response.data.id)}`
        );
        setTeams(teamResponse.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClub();
  }, [id]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div className="_club-page flex-col">
      <div className="section header flex flex-col items-center justify-start mb-8">
        <img
          src={club.logo || clubLogo}
          alt={`${club.name} Logo`}
          className="w-[400px] max-w-[50vh] object-contain "
        />
        <h1>{club.name}</h1>
      </div>
      <h1 className="_heading">Club officials</h1>

      <div className="_umpires">
        <div className="_umpires-grid mb-8">
          {officials?.map((official) =>
            official.titles.map((title) => (
              <PersonCard
                key={`${official.id}-${title}`}
                person={{
                  name: `${official.fname} ${official.lname}`,
                  image: official.image || person,
                  subtext: title,
                  phone: official.phone,
                  email: official.email,
                }}
              />
            ))
          )}
        </div>
      </div>

      {teams.length > 0 &&
        teams?.map((team, index) => (
          <>
            <h1 className="_heading">
              Team {index + 1} - {team.name}
            </h1>
            <div className="_umpires">
              <div className="_umpires-grid mb-8">
                {team.players?.map((player) => (
                  <PersonCard
                    key={player.id}
                    person={{
                      name: `${player.fname} ${player.lname}`,
                      image: player.image || person,
                      subtext: "Player",
                      phone: player.phone,
                      email: player.email,
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        ))}

      <h1 className="_heading">Grounds</h1>
      <table border="1" className="w-full section p-4">
        <thead>
          <tr>
            <th>Ground name</th>
            <th>Ground address</th>
            <th>Ground map</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ground 1</td>
            <td>{club.ground_1}</td>
            <td>
              <a
                href={`https://maps.google.com/?q=${club.ground_1}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </td>
          </tr>
          {club.ground_2 && (
            <tr>
              <td>Ground 2</td>
              <td>{club.ground_2}</td>
              <td>
                <a
                  href={`https://maps.google.com/?q=${club.ground_2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Club;
