import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import paths from "../utils/paths";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(paths.get_teams);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamsContext.Provider value={{ teams, fetchTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};
