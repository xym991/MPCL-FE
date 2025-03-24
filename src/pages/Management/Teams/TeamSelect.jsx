import { useState, useEffect, useRef, useContext } from "react";
import { TeamsContext } from "../../../context/TeamsContext";
import defaultImage from "../../../assets/images/person.avif";

const TeamList = ({ setTeamId, setOpen }) => {
  const { teams } = useContext(TeamsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredTeams.length > 0) {
      setTeamId(filteredTeams[0].id);
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="_person-select flex w-[300px] bg-white rounded-md flex-col"
    >
      <div className="p-4 pb-2 flex w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="flex flex-1 p-2 inp"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ul className="flex flex-col">
        {filteredTeams.map((team) => (
          <li
            key={team.id}
            className="flex items-center gap-2 p-4 cursor-pointer"
            onClick={() => {
              setTeamId(team.id);
              setOpen(false);
            }}
          >
            <img
              src={team.logo || defaultImage}
              alt={team.name}
              width="50"
              height="50"
              className="rounded-full"
            />
            <span>{team.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TeamDisplay = ({ teamId, setTeamId, view }) => {
  const { teams } = useContext(TeamsContext);
  const [team, setTeam] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const selectedTeam = teams.find((t) => t.id === teamId);
    setTeam(selectedTeam || null);
  }, [teamId, teams]);

  return (
    <div className="_person-select-input">
      <div
        className="selected bg-white shadow h-[64px] rounded-md flex px-4 items-center justify-start gap-4 cursor-pointer font-medium min-w-[300px] text-center"
        onClick={() => !view && setOpen(true)}
      >
        {team ? (
          <span>{team.name}</span>
        ) : (
          <span className="text-gray-700 font-semibold placeholder">
            {view ? "No info" : "Select team"}
          </span>
        )}
      </div>

      {!view && open && <TeamList setTeamId={setTeamId} setOpen={setOpen} />}
    </div>
  );
};

export default TeamDisplay;
