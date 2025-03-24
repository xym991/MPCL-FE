import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import paths from "../../../utils/paths";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../../../components/Shared/Button";
import { ClubContext } from "../../../context/ClubContext";

const PlayerTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("unapproved");
  const { clubs } = useContext(ClubContext);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get(paths.get_player_transfers);
        setTransfers(response.data);
      } catch (error) {
        console.error("Error fetching player transfers:", error);
      }
    };

    fetchTransfers();
  }, []);

  const handleApprove = async (id, approvedBy) => {
    try {
      await axios.post(paths.approve_player_transfer, { id, approvedBy });
      const updatedTransfers = transfers.map((transfer) =>
        transfer.id === id
          ? { ...transfer, [`${approvedBy}_appr`]: "1" }
          : transfer
      );
      setTransfers(updatedTransfers);

      const transfer = updatedTransfers.find((t) => t.id === id);
      if (transfer.from_club_appr === "1" && transfer.to_club_appr === "1") {
        await axios.post(paths.update_player_club, {
          playerId: transfer.player_id,
          newClubId: transfer.to_club,
        });
      }
    } catch (error) {
      console.error("Error approving transfer:", error);
    }
  };

  const handleReject = async (id, rejectedBy) => {
    try {
      await axios.post(paths.reject_player_transfer, { id, rejectedBy });
      setTransfers(
        transfers.map((transfer) =>
          transfer.id === id
            ? { ...transfer, [`${rejectedBy}_appr`]: "0" }
            : transfer
        )
      );
    } catch (error) {
      console.error("Error rejecting transfer:", error);
    }
  };

  const handleMail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const getClubName = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    return club ? club.name : "N/A";
  };

  const filteredTransfers = transfers.filter((transfer) => {
    switch (filter) {
      case "approvedByFromClub":
        return transfer.from_club_appr === "1";
      case "rejectedByFromClub":
        return transfer.from_club_appr === "0";
      case "approvedByToClub":
        return transfer.to_club_appr === "1";
      case "rejectedByToClub":
        return transfer.to_club_appr === "0";
      case "unapproved":
        return (
          transfer.from_club_appr === "NULL" && transfer.to_club_appr === "NULL"
        );
      case "approved":
        return transfer.from_club_appr === "1" && transfer.to_club_appr === "1";
      case "rejected":
        return transfer.from_club_appr === "0" || transfer.to_club_appr === "0";
      default:
        return true;
    }
  });

  return (
    <div className="m-component _player-transfers">
      <h1>Player Transfers</h1>
      <div className="filters flex justify-between mb-4">
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "all" ? "active" : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "approvedByFromClub" ? "active" : ""
          }`}
          onClick={() => setFilter("approvedByFromClub")}
        >
          Approved by From Club
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "rejectedByFromClub" ? "active" : ""
          }`}
          onClick={() => setFilter("rejectedByFromClub")}
        >
          Rejected by From Club
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "approvedByToClub" ? "active" : ""
          }`}
          onClick={() => setFilter("approvedByToClub")}
        >
          Approved by To Club
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "rejectedByToClub" ? "active" : ""
          }`}
          onClick={() => setFilter("rejectedByToClub")}
        >
          Rejected by To Club
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "unapproved" ? "active" : ""
          }`}
          onClick={() => setFilter("unapproved")}
        >
          Unapproved
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "approved" ? "active" : ""
          }`}
          onClick={() => setFilter("approved")}
        >
          Approved
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "rejected" ? "active" : ""
          }`}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </a>
      </div>
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border p-2 w-[10%]">Player ID</th>
            <th className="border p-2 w-[25%]">Player Name</th>
            <th className="border p-2 w-[30%]">From Club</th>
            <th className="border p-2 w-[30%]">To Club</th>
            <th className="border p-2 w-[150px]">More</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransfers.map((transfer) => (
            <React.Fragment key={transfer.id}>
              <tr>
                <td className="border p-2">{transfer.registration_number}</td>
                <td className="border p-2">
                  {transfer.fname + " " + transfer.lname}
                </td>
                <td className="border p-2">
                  {getClubName(transfer.from_club)}
                </td>
                <td className="border p-2">{getClubName(transfer.to_club)}</td>
                <td className="border p-2 w-[160px]">
                  <div
                    className="flex items-center gap-1 cursor-pointer text-primary font-semibold"
                    onClick={() => toggleExpand(transfer.id)}
                  >
                    <ExpandMoreIcon />
                    {expanded === transfer.id ? "Show Less" : "Show More"}
                  </div>
                </td>
              </tr>
              {expanded === transfer.id && (
                <tr>
                  <td colSpan="6" className="border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">
                          Additional Information
                        </h3>
                        <p>Date of Birth: {transfer.date_of_birth}</p>
                        <p>Country of Birth: {transfer.country_of_birth}</p>
                        <p>Address: {transfer.address}</p>
                        <p>Address 2: {transfer.address2}</p>
                        <p>City: {transfer.city}</p>
                        <p>County: {transfer.county}</p>
                        <p>Post Code: {transfer.post_code}</p>
                        <p>Country: {transfer.country}</p>
                        <p>From Club: {getClubName(transfer.from_club)}</p>
                        <p>To Club: {getClubName(transfer.to_club)}</p>
                        <p>Registered: {transfer.registered ? "Yes" : "No"}</p>
                        <p>Previous UK Club: {transfer.previous_uk_club}</p>
                        <p>
                          Previous UK Club Season:{" "}
                          {transfer.previous_uk_club_season}
                        </p>
                        <p>
                          Player Classification:{" "}
                          {transfer.player_classification}
                        </p>
                        <p>Amount: {transfer.amount}</p>
                        <p>Currency: {transfer.currency}</p>
                        <p>Payment ID: {transfer.payment_id}</p>
                        <p>Payment Method: {transfer.payment_method}</p>
                        <p>
                          From Club Approval:{" "}
                          {transfer.from_club_appr === "1" ? "Yes" : "No"}
                        </p>
                        <p>
                          To Club Approval:{" "}
                          {transfer.to_club_appr === "1" ? "Yes" : "No"}
                        </p>
                        <p>Status: {transfer.status}</p>
                        <p>
                          Terms: {transfer.terms ? "Accepted" : "Not Accepted"}
                        </p>
                        <p>
                          Privacy:{" "}
                          {transfer.privacy ? "Accepted" : "Not Accepted"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">ID Photo</h3>
                        {transfer.id_photo ? (
                          <img
                            src={transfer.id_photo}
                            alt="ID Photo"
                            className="w-full h-auto max-w-[300px]"
                          />
                        ) : (
                          <p>No ID Photo</p>
                        )}
                        <h3 className="font-semibold mt-4">Signature</h3>
                        {transfer.signature ? (
                          <img
                            src={transfer.signature}
                            alt="Signature"
                            className="w-full h-auto"
                          />
                        ) : (
                          <p>No Signature</p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="6" className="border">
                  <div className="flex gap-2 buttons">
                    <Button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                      onClick={() => handleMail(transfer.email)}
                    >
                      <AlternateEmailIcon />
                      Email
                    </Button>
                    <Button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                      onClick={() => handleCall(transfer.phone_number)}
                    >
                      <PhoneIcon />
                      Phone
                    </Button>
                    {transfer.to_club_appr === "NULL" && (
                      <Button
                        className="bg-primary text-white px-4 py-2 rounded-md"
                        onClick={() => handleApprove(transfer.id, "to_club")}
                      >
                        Approve by To Club
                      </Button>
                    )}
                    {transfer.from_club_appr === "NULL" && (
                      <Button
                        className="bg-primary text-white px-4 py-2 rounded-md"
                        onClick={() => handleApprove(transfer.id, "from_club")}
                      >
                        Approve by From Club
                      </Button>
                    )}
                    {transfer.from_club_appr === "NULL" && (
                      <Button
                        className="reject bg-[indianred] text-white px-4 py-2 rounded-md"
                        onClick={() => handleReject(transfer.id, "from_club")}
                      >
                        Reject by From Club
                      </Button>
                    )}
                    {transfer.to_club_appr === "NULL" && (
                      <Button
                        className="reject bg-[indianred] text-white px-4 py-2 rounded-md"
                        onClick={() => handleReject(transfer.id, "to_club")}
                      >
                        Reject by To Club
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTransfers;
