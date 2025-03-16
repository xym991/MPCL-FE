import { useState } from "react";
import "./index.css";
import Club from "./Club";
import PlayerRegistration from "./Player";
import Transfer from "./Transfer";

export default function Registration() {
  const [selectedTab, setSelectedTab] = useState("Club");

  return (
    <div className="_registration">
      <div className="tabs">
        <button
          className={`tab ${selectedTab === "Club" ? "active" : ""}`}
          onClick={() => setSelectedTab("Club")}
        >
          Club Registration
        </button>
        <button
          className={`tab ${selectedTab === "Player" ? "active" : ""}`}
          onClick={() => setSelectedTab("Player")}
        >
          Player Registration
        </button>
        <button
          className={`tab ${selectedTab === "Transfer" ? "active" : ""}`}
          onClick={() => setSelectedTab("Transfer")}
        >
          Player Transfer
        </button>
      </div>

      <div className="tab-content">
        {selectedTab === "Club" && <Club />}
        {selectedTab === "Player" && (
          <PlayerRegistration setTab={setSelectedTab} />
        )}
        {selectedTab === "Transfer" && <Transfer />}
      </div>
    </div>
  );
}
