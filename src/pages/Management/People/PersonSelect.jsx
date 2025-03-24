import { useState, useEffect, useRef, useContext } from "react";
import { PersonContext } from "../../../context/PersonContext";
import defaultImage from "../../../assets/images/person.avif";

const PersonList = ({ setPersonId, setOpen }) => {
  const { people } = useContext(PersonContext);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filteredPeople = people.filter((person) =>
    `${person.fname} ${person.lname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
    if (event.key === "Enter" && filteredPeople.length > 0) {
      setPersonId(filteredPeople[0].id);
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
        {filteredPeople.map((person) => (
          <li
            key={person.id}
            className="flex items-center gap-2 p-4 cursor-pointer"
            onClick={() => {
              setPersonId(person.id);
              setOpen(false);
            }}
          >
            <img
              src={person.image || defaultImage}
              alt={`${person.fname} ${person.lname}`}
              width="50"
              height="50"
              className="rounded-full"
            />
            <span>{`${person.fname} ${person.lname}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PersonDisplay = ({ personId, setPersonId, view }) => {
  const { people } = useContext(PersonContext);
  const [person, setPerson] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const selectedPerson = people.find((p) => p.id === personId);
    setPerson(selectedPerson || null);
  }, [personId, people]);

  return (
    <div className="_person-select-input">
      <div
        className="selected bg-white shadow h-[64px] rounded-md flex px-4 items-center justify-start gap-4 cursor-pointer font-medium min-w-[300px] text-center"
        onClick={() => !view && setOpen(true)}
      >
        {person ? (
          <>
            <img
              src={person.image || defaultImage}
              alt={`${person.fname} ${person.lname}`}
              width="50"
              height="50"
              className="rounded-full"
            />
            <span>{`${person.fname} ${person.lname}`}</span>
          </>
        ) : (
          <span className="text-gray-700 font-semibold placeholder">
            {view ? "No info" : "Select person"}
          </span>
        )}
      </div>

      {!view && open && (
        <PersonList setPersonId={setPersonId} setOpen={setOpen} />
      )}
    </div>
  );
};

export default PersonDisplay;
