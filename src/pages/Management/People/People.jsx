import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AddPerson from "./AddPerson";
import { PersonContext } from "../../../context/PersonContext";
import { ClubContext } from "../../../context/ClubContext";
import { TeamsContext } from "../../../context/TeamsContext";
import { UserContext } from "../../../context/UserContext";
import paths from "../../../utils/paths";
import img from "../../../assets/images/person.avif";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PermissionWrapper from "../../../components/PermissionWrapper";

const People = () => {
  const { people, fetchPeople } = useContext(PersonContext);
  const { clubs } = useContext(ClubContext);
  const { teams } = useContext(TeamsContext);
  const { user } = useContext(UserContext);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchClubPosition, setSearchClubPosition] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const deletePerson = async (id) => {
    try {
      await axios.delete(`${paths.delete_person}${id}`);
      fetchPeople(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleFormSubmit = () => {
    fetchPeople(); // Refresh the list after adding or editing a person
  };

  const getClubName = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    return club ? club.name : "N/A";
  };

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : "N/A";
  };

  const filteredPeople = people.filter((person) => {
    const fullName = `${person.fname} ${person.lname}`.toLowerCase();
    const clubPosition = person.club_position?.toLowerCase() || "";
    const role = person.role?.toLowerCase() || "";
    return (
      fullName.includes(searchName.toLowerCase()) &&
      clubPosition.includes(searchClubPosition.toLowerCase()) &&
      role.includes(searchRole.toLowerCase())
    );
  });

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="_people">
      <PermissionWrapper roles={["admin"]}>
        <AddPerson
          selectedPersonId={selectedPersonId}
          onFormSubmit={handleFormSubmit}
          setSelectedPersonId={setSelectedPersonId}
        />
      </PermissionWrapper>
      <div className="m-component">
        <h1>People</h1>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Search by Club Position..."
            value={searchClubPosition}
            onChange={(e) => setSearchClubPosition(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Search by Role..."
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
            className="border p-2"
          />
        </div>
        <table className="w-full text-left" border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th className="w-[15%]">Name</th>
              <th className="w-[15%]">Club Position</th>
              <th className="w-[15%]">Role</th>
              <th className="w-[20%]">Club</th>
              <th className="w-[20%]">Team</th>
              <th className="w-[150px]">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.map((person) => (
              <React.Fragment key={person.id}>
                <tr>
                  <td>{person.id}</td>
                  <td>
                    <img
                      src={person.image || img}
                      alt={`${person.fname} ${person.lname}`}
                      width="48"
                      height="48"
                      className="rounded-full"
                    />
                  </td>
                  <td>{`${person.fname} ${person.lname}`}</td>
                  <td>{person.club_position}</td>
                  <td>{person.role}</td>
                  <td>{getClubName(person.club)}</td>
                  <td>{getTeamName(person.team)}</td>
                  <td className="border p-2 w-[160px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer text-primary font-semibold"
                      onClick={() => toggleExpand(person.id)}
                    >
                      <ExpandMoreIcon />
                      {expanded === person.id ? "Show Less" : "Show More"}
                    </div>
                  </td>
                </tr>
                {expanded === person.id && (
                  <tr>
                    <td colSpan="9" className="border">
                      <div className="p-4">
                        <p>League Position: {person.league_position}</p>
                        <p>Email: {person.email}</p>
                        <p>Phone: {person.phone}</p>
                        <div className="flex gap-2 mt-4">
                          <PermissionWrapper roles={["admin"]}>
                            <a
                              className="text-primary font-semibold cursor-pointer"
                              onClick={() => setSelectedPersonId(person.id)}
                            >
                              Edit
                            </a>
                            <a
                              className="text-[indianred] font-semibold cursor-pointer"
                              onClick={() => deletePerson(person.id)}
                            >
                              Delete
                            </a>
                          </PermissionWrapper>
                        </div>
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

export default People;
