import React, { useState } from "react";
import Header from "./Header";
import People from "./People";
import { PersonProvider } from "../../context/PersonContext";
import { ClubProvider } from "../../context/ClubContext";
import { TeamsProvider } from "../../context/TeamsContext";
import Clubs from "./Clubs";
import Players from "./Players";
import Teams from "./Teams";

const Management = () => {
  const [tab, setTab] = useState("");
  return (
    <PersonProvider>
      <ClubProvider>
        <TeamsProvider>
          <div className="_management mt-[130px]">
            <Header tab={tab} setTab={setTab} />
            <main>
              {tab === "people" && <People />}
              {tab === "clubs" && <Clubs />}
              {tab === "players" && <Players />}
              {tab === "teams" && <Teams />}
            </main>
          </div>
        </TeamsProvider>
      </ClubProvider>
    </PersonProvider>
  );
};

export default Management;
