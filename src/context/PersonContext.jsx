import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import paths from "../utils/paths";

export const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const fetchPeople = useCallback(async () => {
    try {
      const response = await axios.get(paths.get_people);
      setPeople(response.data);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return (
    <PersonContext.Provider value={{ people, fetchPeople }}>
      {children}
    </PersonContext.Provider>
  );
};
