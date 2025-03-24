import React, { useState, useEffect } from "react";
import axios from "axios";
import paths from "../../../utils/paths";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../../../components/Shared/Button";

const ClubApplications = () => {
  const [applications, setApplications] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(paths.get_club_applications);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching club applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(paths.approve_club_application, { id });
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: "accepted" } : app
        )
      );
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(paths.reject_club_application, { id });
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: "rejected" } : app
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

  const filteredApplications = applications.filter((application) => {
    switch (filter) {
      case "pending":
        return application.status === "pending";
      case "accepted":
        return application.status === "accepted";
      case "rejected":
        return application.status === "rejected";
      default:
        return true;
    }
  });

  return (
    <div className="m-component _club-applications">
      <h1>Club Applications</h1>
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
            filter === "pending" ? "active" : ""
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </a>
        <a
          className={`text-primary font-semibold cursor-pointer ${
            filter === "accepted" ? "active" : ""
          }`}
          onClick={() => setFilter("accepted")}
        >
          Accepted
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
            <th className="border p-2">Club Name</th>
            <th className="border p-2 w-[18%]">Main Contact</th>
            <th className="border p-2 w-[14%]">Position in Club</th>
            <th className="border p-2 w-[20%]">Email</th>
            <th className="border p-2 w-[12%]">Phone</th>
            <th className="border p-2 w-[150px]">More</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application) => (
            <React.Fragment key={application.id}>
              <tr>
                <td className="border p-2">{application.name}</td>
                <td className="border p-2">
                  {application.primary_club_contact}
                </td>
                <td className="border p-2">
                  {application.primary_position_in_the_club}
                </td>
                <td className="border p-2">{application.primary_email}</td>
                <td className="border p-2">
                  {application.primary_phone_number}
                </td>
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
                  <td colSpan="6" className="border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Secondary Contact</h3>
                        <p>Name: {application.secondary_club_contact}</p>
                        <p>
                          Position: {application.secondary_position_in_club}
                        </p>
                        <p>Email: {application.secondary_email}</p>
                        <p>Phone: {application.secondary_phone_number}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Ground Information</h3>
                        <p>Ground 1: {application.ground_1}</p>
                        <p>Ground 2: {application.ground_2}</p>
                        <p>
                          Dressing Facilities:{" "}
                          {application.ground_1_dressing_facilities
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Shower/Toilet Facilities:{" "}
                          {application.ground_1_shower_toilet_facilities
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Hot Tea Facilities:{" "}
                          {application.ground_1_hot_tea_facilities
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Own Scoreboard:{" "}
                          {application.ground_1_own_scoreboard ? "Yes" : "No"}
                        </p>
                        <p>
                          Boundary Markers:{" "}
                          {application.ground_1_boundary_markers ? "Yes" : "No"}
                        </p>
                        <p>
                          Current Session:{" "}
                          {application.ground_1_current_session ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Additional Information
                        </h3>
                        <p>
                          Public Liability Insurance:{" "}
                          {application.is_public_liability_insurance
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Bank Account:{" "}
                          {application.is_bank_account ? "Yes" : "No"}
                        </p>
                        <p>
                          Member of Club Cricket Conference:{" "}
                          {application.is_member_club_cricket_conf
                            ? "Yes"
                            : "No"}
                        </p>
                        <p>
                          Member of MCB:{" "}
                          {application.is_member_mcb ? "Yes" : "No"}
                        </p>
                        <p>Established: {application.established}</p>
                        <p>
                          Club in Any League:{" "}
                          {application.club_is_any_league ? "Yes" : "No"}
                        </p>
                        <p>
                          Qualified Umpire:{" "}
                          {application.is_qualified_umpire ? "Yes" : "No"}
                        </p>
                        <p>
                          Joining MPCL League: {application.joining_mpcl_league}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Comments</h3>
                        <p>{application.comments}</p>
                        <h3 className="font-semibold">Logo</h3>
                        {application.logo ? (
                          <img
                            src={application.logo}
                            alt="Club Logo"
                            className="w-full h-auto max-w-[300px]"
                          />
                        ) : (
                          <p>No Logo</p>
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
                      onClick={() => handleMail(application.primary_email)}
                    >
                      <AlternateEmailIcon />
                      Primary Contact
                    </Button>
                    <Button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                      onClick={() => handleMail(application.secondary_email)}
                    >
                      <AlternateEmailIcon />
                      Secondary Contact
                    </Button>
                    <Button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                      onClick={() =>
                        handleCall(application.primary_phone_number)
                      }
                    >
                      <PhoneIcon />
                      Primary Contact
                    </Button>
                    <Button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
                      onClick={() =>
                        handleCall(application.secondary_phone_number)
                      }
                    >
                      <PhoneIcon />
                      Secondary Contact
                    </Button>
                    {application.status === "pending" && (
                      <>
                        <Button
                          className="bg-primary text-white px-4 py-2 rounded-md"
                          onClick={() => handleApprove(application.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="reject bg-[indianred] text-white px-4 py-2 rounded-md"
                          onClick={() => handleReject(application.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {application.status === "rejected" && (
                      <Button
                        className="bg-primary text-white px-4 py-2 rounded-md"
                        onClick={() => handleApprove(application.id)}
                      >
                        Approve
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

export default ClubApplications;
