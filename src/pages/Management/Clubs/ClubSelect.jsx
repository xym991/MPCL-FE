import { useState, useEffect, useRef, useContext } from "react";
import { ClubContext } from "../../../context/ClubContext";
import defaultImage from "../../../assets/images/person.avif";

const ClubList = ({ setClubId, setOpen }) => {
  const { clubs } = useContext(ClubContext);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (event.key === "Enter" && filteredClubs.length > 0) {
      setClubId(filteredClubs[0].id);
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
        {filteredClubs.map((club) => (
          <li
            key={club.id}
            className="flex items-center gap-2 p-4 cursor-pointer"
            onClick={() => {
              setClubId(club.id);
              setOpen(false);
            }}
          >
            <img
              src={club.logo || defaultImage}
              alt={club.name}
              width="50"
              height="50"
              className="rounded-full"
            />
            <span>{club.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ClubDisplay = ({ clubId, setClubId, view }) => {
  const { clubs } = useContext(ClubContext);
  const [club, setClub] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const selectedClub = clubs.find((c) => c.id === clubId);
    setClub(selectedClub || null);
  }, [clubId, clubs]);

  return (
    <div className="_person-select-input">
      <div
        className="selected bg-white shadow h-[64px] rounded-md flex px-4 items-center justify-start gap-4 cursor-pointer font-medium min-w-[300px] text-center"
        onClick={() => !view && setOpen(true)}
      >
        {club ? (
          <>
            <img
              src={club.logo || defaultImage}
              alt={club.name}
              width="50"
              height="50"
              className="rounded-full"
            />
            <span>{club.name}</span>
          </>
        ) : (
          <span className="text-gray-700 font-semibold placeholder">
            {view ? "No info" : "Select club"}
          </span>
        )}
      </div>

      {!view && open && <ClubList setClubId={setClubId} setOpen={setOpen} />}
    </div>
  );
};

export default ClubDisplay;
