import React, { useState, useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../../../components/Shared/Button";
import ClubApplications from "./ClubApplications";
import AddClub from "./AddClub";
import PersonSelect from "../People/PersonSelect";
import { ClubContext } from "../../../context/ClubContext";
import axios from "axios";
import paths from "../../../utils/paths";
import img from "../../../assets/images/person.avif";
import PermissionWrapper from "../../../components/PermissionWrapper";

const Clubs = () => {
  const { clubs, fetchClubs } = useContext(ClubContext);
  const [expanded, setExpanded] = useState(null);
  const [selectedClubId, setSelectedClubId] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const deleteClub = async (id) => {
    try {
      await axios.delete(`${paths.delete_club}${id}`);
      fetchClubs(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const handleFormSubmit = () => {
    fetchClubs(); // Refresh the list after adding or editing a club
  };

  return (
    <div>
      <AddClub
        selectedClubId={selectedClubId}
        onFormSubmit={handleFormSubmit}
        setSelectedClubId={setSelectedClubId}
      />
      <ClubApplications />
      <div className="m-component _clubs">
        <h1>Clubs</h1>
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr>
              <th className="border p-2 w-[80px]">Logo</th>
              <th className="border p-2">Club Name</th>
              <th className="border p-2 w-[18%]">Main Contact</th>
              <th className="border p-2 w-[14%]">Position in Club</th>
              <th className="border p-2 w-[25%]">Email</th>
              <th className="border p-2 w-[12%]">Phone</th>
              <th className="border p-2 w-[150px]">More</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <React.Fragment key={club.id}>
                <tr>
                  <td className="border p-2">
                    <img
                      src={club.logo || img}
                      alt={`${club.name} Logo`}
                      width="48"
                      height="48"
                      className="rounded-full"
                    />
                  </td>
                  <td className="border p-2">{club.name}</td>
                  <td className="border p-2">{club.primary_club_contact}</td>
                  <td className="border p-2">
                    {club.primary_position_in_the_club}
                  </td>
                  <td className="border p-2">{club.primary_email}</td>
                  <td className="border p-2">{club.primary_phone_number}</td>
                  <td className="border p-2 w-[160px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer text-primary font-semibold"
                      onClick={() => toggleExpand(club.id)}
                    >
                      <ExpandMoreIcon />
                      {expanded === club.id ? "Show Less" : "Show More"}
                    </div>
                  </td>
                </tr>
                {expanded === club.id && (
                  <tr>
                    <td colSpan="7" className="border">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mt-4">
                            Secondary Contact
                          </h3>
                          <p>Name: {club.secondary_club_contact}</p>
                          <p>Position: {club.secondary_position_in_club}</p>
                          <p>Email: {club.secondary_email}</p>
                          <p>Phone: {club.secondary_phone_number}</p>
                          <h3 className="font-semibold mt-4">
                            Ground Information
                          </h3>
                          <p>Ground 1: {club.ground_1}</p>
                          <p>Ground 2: {club.ground_2}</p>
                          <p>
                            Ground 1 Dressing Facilities:{" "}
                            {club.ground_1_dressing_facilities ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 2 Dressing Facilities:{" "}
                            {club.ground_2_dressing_facilities ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 1 Shower/Toilet Facilities:{" "}
                            {club.ground_1_shower_toilet_facilities
                              ? "Yes"
                              : "No"}
                          </p>
                          <p>
                            Ground 2 Shower/Toilet Facilities:{" "}
                            {club.ground_2_shower_toilet_facilities
                              ? "Yes"
                              : "No"}
                          </p>
                          <p>
                            Ground 1 Hot Tea Facilities:{" "}
                            {club.ground_1_hot_tea_facilities ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 2 Hot Tea Facilities:{" "}
                            {club.ground_2_hot_tea_facilities ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 1 Own Scoreboard:{" "}
                            {club.ground_1_own_scoreboard ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 2 Own Scoreboard:{" "}
                            {club.ground_2_own_scoreboard ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 1 Boundary Markers:{" "}
                            {club.ground_1_boundary_markers ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 2 Boundary Markers:{" "}
                            {club.ground_2_boundary_markers ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 1 Current Session:{" "}
                            {club.ground_1_current_session ? "Yes" : "No"}
                          </p>
                          <p>
                            Ground 2 Current Session:{" "}
                            {club.ground_2_current_session ? "Yes" : "No"}
                          </p>

                          <h3 className="font-semibold mt-4">Club Officials</h3>
                          <p className="flex w-full justify-between gap-12 mb-4 pr-4">
                            Chairman:{" "}
                            <PersonSelect
                              view={true}
                              personId={club.chairman}
                            />
                          </p>
                          <p className="flex w-full justify-between gap-12 mb-4 pr-4">
                            General Secretary:{" "}
                            <PersonSelect
                              view={true}
                              personId={club.general_secretary}
                            />
                          </p>
                          <p className="flex w-full justify-between gap-12 mb-4 pr-4">
                            Treasurer:{" "}
                            <PersonSelect
                              view={true}
                              personId={club.treasurer}
                            />
                          </p>
                          <p className="flex w-full justify-between gap-12 mb-4 pr-4">
                            Welfare Officer:{" "}
                            <PersonSelect
                              view={true}
                              personId={club.welfare_officer}
                            />
                          </p>
                          <p className="flex w-full justify-between gap-12 mb-4 pr-4">
                            Registrar:{" "}
                            <PersonSelect
                              view={true}
                              personId={club.registrar}
                            />
                          </p>
                          <p className="flex w-full justify-between gap-12 mb-4 pr-4">
                            Admin:{" "}
                            <PersonSelect view={true} personId={club.admin} />
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold mt-4">
                            Additional Information
                          </h3>
                          <p>
                            Public Liability Insurance:{" "}
                            {club.is_public_liability_insurance ? "Yes" : "No"}
                          </p>
                          <p>
                            Bank Account: {club.is_bank_account ? "Yes" : "No"}
                          </p>
                          <p>
                            Member of Club Cricket Conference:{" "}
                            {club.is_member_club_cricket_conf ? "Yes" : "No"}
                          </p>
                          <p>
                            Member of MCB: {club.is_member_mcb ? "Yes" : "No"}
                          </p>
                          <p>Established: {club.established}</p>

                          <p>Joining MPCL League: {club.joining_mpcl_league}</p>
                          <h3 className="font-semibold mt-4">
                            Other Information
                          </h3>
                          <p>Recommended By 1: {club.recommended_by_1}</p>
                          <p>Recommended By 2: {club.recommended_by_2}</p>
                          <p>Registration Date: {club.registration_date}</p>
                          <p>Club Type: {club.club_type}</p>
                          <p>Website: {club.website}</p>

                          <h3 className="font-semibold mt-4">Logo</h3>
                          {club.logo ? (
                            <img
                              src={club.logo}
                              alt="Club Logo"
                              className="w-full h-auto max-w-[300px]"
                            />
                          ) : (
                            <p>No Logo</p>
                          )}
                          <div className="flex gap-2 mt-4">
                            <PermissionWrapper roles={[]}>
                              <Button
                                className={"reject"}
                                onClick={() => deleteClub(club.id)}
                              >
                                Delete
                              </Button>
                            </PermissionWrapper>
                            <PermissionWrapper
                              roles={[
                                "league_registrar",
                                {
                                  name: "club_registrar",
                                  condition: (user) => user.club == club.id,
                                },
                                {
                                  name: "club_official",
                                  condition: (user) => user.club == club.id,
                                },
                              ]}
                            >
                              <Button
                                className={"edit"}
                                onClick={() => setSelectedClubId(club.id)}
                              >
                                Edit
                              </Button>
                            </PermissionWrapper>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clubs;
