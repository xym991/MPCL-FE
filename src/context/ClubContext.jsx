import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import paths from "../utils/paths";

export const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await axios.get(paths.get_clubs);
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <ClubContext.Provider value={{ clubs, fetchClubs }}>
      {children}
    </ClubContext.Provider>
  );
};
