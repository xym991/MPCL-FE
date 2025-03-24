import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import paths from "../../../utils/paths";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../../../components/Shared/Button";
import { ClubContext } from "../../../context/ClubContext";
import PermissionWrapper from "../../../components/PermissionWrapper";

const PlayerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("unapproved");
  const { clubs } = useContext(ClubContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(paths.get_player_applications);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching player applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleApprove = async (id, approvedBy) => {
    try {
      await axios.post(paths.approve_player_application, { id, approvedBy });
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, [`${approvedBy}_appr`]: "1" } : app
        )
      );
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleReject = async (id, rejectedBy) => {
    try {
      await axios.post(paths.reject_player_application, { id, rejectedBy });
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, [`${rejectedBy}_appr`]: "0" } : app
        )
      );
    } catch (error) {
      console.error("Error rejecting application:", error);
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

  const filteredApplications = applications.filter((application) => {
    switch (filter) {
      case "approvedByClub":
        return application.club_appr === "1";
      case "rejectedByClub":
        return application.club_appr === "0";
      case "approvedByLeague":
        return application.league_appr === "1";
      case "rejectedByLeague":
        return application.league_appr === "0";
      case "unapproved":
        return (
          application.club_appr === "NULL" && application.league_appr === "NULL"
        );
      case "approved":
        return application.club_appr === "1" && application.league_appr === "1";
      case "rejected":
        return application.league_appr === "0" || application.club_appr === "0";
      default:
        return true;
    }
  });

  return (
    <PermissionWrapper
      roles={[
        "club_registrar",
        "league_registrar",
        "league_official",
        "club_official",
      ]}
    >
      <div className="m-component _player-applications">
        <h1>Player Applications</h1>
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
              filter === "approvedByClub" ? "active" : ""
            }`}
            onClick={() => setFilter("approvedByClub")}
          >
            Approved by Club
          </a>
          <a
            className={`text-primary font-semibold cursor-pointer ${
              filter === "rejectedByClub" ? "active" : ""
            }`}
            onClick={() => setFilter("rejectedByClub")}
          >
            Rejected by Club
          </a>
          <a
            className={`text-primary font-semibold cursor-pointer ${
              filter === "approvedByLeague" ? "active" : ""
            }`}
            onClick={() => setFilter("approvedByLeague")}
          >
            Approved by League
          </a>
          <a
            className={`text-primary font-semibold cursor-pointer ${
              filter === "rejectedByLeague" ? "active" : ""
            }`}
            onClick={() => setFilter("rejectedByLeague")}
          >
            Rejected by League
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
              <th className="border p-2 w-[20%]">Player Name</th>
              <th className="border p-2 w-[30%]">Club</th>
              <th className="border p-2 w-[25%]">Email</th>
              <th className="border p-2 w-[15%]">Phone</th>
              <th className="border p-2 w-[150px]">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <React.Fragment key={application.id}>
                <tr>
                  <td className="border p-2">
                    {application.fname + " " + application.lname}
                  </td>
                  <td className="border p-2">
                    {getClubName(application.club)}
                  </td>
                  <td className="border p-2">{application.email}</td>
                  <td className="border p-2">{application.phone_number}</td>
                  <td className="border p-2 w-[160px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer text-primary font-semibold"
                      onClick={() => toggleExpand(application.id)}
                    >
                      <ExpandMoreIcon />
                      {expanded === application.id ? "Show Less" : "Show More"}
                    </div>
                  </td>
                </tr>
                {expanded === application.id && (
                  <tr>
                    <td colSpan="5" className="border">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">
                            Additional Information
                          </h3>
                          <p>Date of Birth: {application.date_of_birth}</p>
                          <p>
                            Country of Birth: {application.country_of_birth}
                          </p>
                          <p>Address: {application.address}</p>
                          <p>Address 2: {application.address2}</p>
                          <p>City: {application.city}</p>
                          <p>County: {application.county}</p>
                          <p>Post Code: {application.post_code}</p>
                          <p>Country: {application.country}</p>
                          <p>Club: {getClubName(application.club)}</p>
                          <p>
                            Registered: {application.registered ? "Yes" : "No"}
                          </p>
                          <p>
                            Previous UK Club: {application.previous_uk_club}
                          </p>
                          <p>
                            Previous UK Club Season:{" "}
                            {application.previous_uk_club_season}
                          </p>
                          <p>
                            Player Classification:{" "}
                            {application.player_classification}
                          </p>
                          <p>Amount: {application.amount}</p>
                          <p>Currency: {application.currency}</p>
                          <p>Payment ID: {application.payment_id}</p>
                          <p>Payment Method: {application.payment_method}</p>
                          <p>
                            Club Approval:{" "}
                            {application.club_appr === "1" ? "Yes" : "No"}
                          </p>
                          <p>
                            League Approval:{" "}
                            {application.league_appr === "1" ? "Yes" : "No"}
                          </p>
                          <p>Status: {application.status}</p>
                          <p>
                            Terms:{" "}
                            {application.terms ? "Accepted" : "Not Accepted"}
                          </p>
                          <p>
                            Privacy:{" "}
                            {application.privacy ? "Accepted" : "Not Accepted"}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">ID Photo</h3>
                          {application.id_photo ? (
                            <img
                              src={application.id_photo}
                              alt="ID Photo"
                              className="w-full h-auto max-w-[300px]"
                            />
                          ) : (
                            <p>No ID Photo</p>
                          )}
                          <h3 className="font-semibold mt-4">Signature</h3>
                          {application.signature ? (
                            <img
                              src={application.signature}
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
                  <td colSpan="5" className="border">
                    <div className="flex gap-2 buttons">
                      <Button
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                        onClick={() => handleMail(application.email)}
                      >
                        <AlternateEmailIcon />
                        Email
                      </Button>
                      <Button
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                        onClick={() => handleCall(application.phone_number)}
                      >
                        <PhoneIcon />
                        Phone
                      </Button>
                      {application.league_appr === "NULL" && (
                        <PermissionWrapper roles={["league_registrar"]}>
                          <Button
                            className="bg-primary text-white px-4 py-2 rounded-md"
                            onClick={() =>
                              handleApprove(application.id, "league")
                            }
                          >
                            Approve by League
                          </Button>
                        </PermissionWrapper>
                      )}
                      {application.club_appr === "NULL" && (
                        <PermissionWrapper
                          roles={[
                            {
                              name: "club_registrar",
                              condition: () => application.league_appr === "1",
                            },
                          ]}
                        >
                          <Button
                            className="bg-primary text-white px-4 py-2 rounded-md"
                            onClick={() =>
                              handleApprove(application.id, "club")
                            }
                          >
                            Approve by Club
                          </Button>
                        </PermissionWrapper>
                      )}
                      {application.club_appr === "NULL" && (
                        <PermissionWrapper
                          roles={[
                            {
                              name: "club_registrar",
                              condition: () => application.league_appr === "1",
                            },
                          ]}
                        >
                          <Button
                            className="reject bg-[indianred] text-white px-4 py-2 rounded-md"
                            onClick={() => handleReject(application.id, "club")}
                          >
                            Reject by Club
                          </Button>
                        </PermissionWrapper>
                      )}
                      {application.league_appr === "NULL" && (
                        <PermissionWrapper roles={["league_registrar"]}>
                          <Button
                            className="reject bg-[indianred] text-white px-4 py-2 rounded-md"
                            onClick={() =>
                              handleReject(application.id, "league")
                            }
                          >
                            Reject by League
                          </Button>
                        </PermissionWrapper>
                      )}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </PermissionWrapper>
  );
};

export default PlayerApplications;
