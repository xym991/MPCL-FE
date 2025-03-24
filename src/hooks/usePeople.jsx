import { useState, useEffect } from "react";
import axios from "axios";
import paths from "../utils/paths";

export default function usePeople() {
  const [people, setPeople] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(paths.get_people, {
          params: { fields: "fname,lname,image" },
        });
        setPeople(response.data);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div style={{ width: "360px" }}>
      <button onClick={() => setOpen(!open)}>Toggle People List</button>
      {open && (
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              <img
                src={person.image}
                alt={`${person.fname} ${person.lname}`}
                width="50"
                height="50"
              />
              <span>{`${person.fname} ${person.lname}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
