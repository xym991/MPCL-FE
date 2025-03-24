import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import paths from "../../../utils/paths";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../../../components/Shared/Button";
import AddTeam from "./AddTeam";
import PersonSelect from "../People/PersonSelect";
import { ClubContext } from "../../../context/ClubContext";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const { clubs } = useContext(ClubContext);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(paths.get_teams);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`${paths.delete_team}${id}`);
      setTeams(teams.filter((team) => team.id !== id)); // Remove the deleted team from the list
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleFormSubmit = () => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(paths.get_teams);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  };

  const getClubName = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    return club ? club.name : "N/A";
  };

  return (
    <div>
      <AddTeam
        selectedTeamId={selectedTeamId}
        onFormSubmit={handleFormSubmit}
        setSelectedTeamId={setSelectedTeamId}
      />
      <div className="m-component _teams">
        <h1>Teams</h1>
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr>
              <th className="border p-2">Team Name</th>
              <th className="border p-2 w-[20%]">Club</th>
              <th className="border p-2 w-[150px]">More</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <React.Fragment key={team.id}>
                <tr>
                  <td className="border p-2">{team.name}</td>
                  <td className="border p-2">{getClubName(team.club)}</td>
                  <td className="border p-2 w-[160px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer text-primary font-semibold"
                      onClick={() => toggleExpand(team.id)}
                    >
                      <ExpandMoreIcon />
                      {expanded === team.id ? "Show Less" : "Show More"}
                    </div>
                  </td>
                </tr>
                {expanded === team.id && (
                  <tr>
                    <td colSpan="3" className="border">
                      <div className="flex gap-6 flex-col p-4">
                        <div className="grid grid-cols-3 gap-6">
                          <p>
                            Player 1:{" "}
                            <PersonSelect view={true} personId={team.player1} />
                          </p>
                          <p>
                            Player 2:{" "}
                            <PersonSelect view={true} personId={team.player2} />
                          </p>
                          <p>
                            Player 3:{" "}
                            <PersonSelect view={true} personId={team.player3} />
                          </p>
                          <p>
                            Player 4:{" "}
                            <PersonSelect view={true} personId={team.player4} />
                          </p>
                          <p>
                            Player 5:{" "}
                            <PersonSelect view={true} personId={team.player5} />
                          </p>
                          <p>
                            Player 6:{" "}
                            <PersonSelect view={true} personId={team.player6} />
                          </p>
                          <p>
                            Player 7:{" "}
                            <PersonSelect view={true} personId={team.player7} />
                          </p>
                          <p>
                            Player 8:{" "}
                            <PersonSelect view={true} personId={team.player8} />
                          </p>
                          <p>
                            Player 9:{" "}
                            <PersonSelect view={true} personId={team.player9} />
                          </p>
                          <p>
                            Player 10:{" "}
                            <PersonSelect
                              view={true}
                              personId={team.player10}
                            />
                          </p>
                          <p>
                            Player 11:{" "}
                            <PersonSelect
                              view={true}
                              personId={team.player11}
                            />
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <p>
                            Substitute 1:{" "}
                            <PersonSelect view={true} personId={team.sub1} />
                          </p>
                          <p>
                            Substitute 2:{" "}
                            <PersonSelect view={true} personId={team.sub2} />
                          </p>
                          <p>
                            Substitute 3:{" "}
                            <PersonSelect view={true} personId={team.sub3} />
                          </p>
                          <p>
                            Substitute 4:{" "}
                            <PersonSelect view={true} personId={team.sub4} />
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          className={"reject"}
                          onClick={() => deleteTeam(team.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          className={"edit"}
                          onClick={() => setSelectedTeamId(team.id)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
