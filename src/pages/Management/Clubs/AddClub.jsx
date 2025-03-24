import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import paths from "../../../utils/paths";
import Button from "../../../components/Shared/Button";
import PersonSelect from "../People/PersonSelect";
import PermissionWrapper from "../../../components/PermissionWrapper";

const AddClub = ({ selectedClubId, onFormSubmit, setSelectedClubId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [logo, setLogo] = useState(null);
  const [officials, setOfficials] = useState({});

  useEffect(() => {
    const fetchClub = async (id) => {
      try {
        const response = await axios.get(`${paths.get_clubs}/${id}`);
        const club = response.data;
        Object.keys(club).forEach((key) => {
          setValue(key, club[key]);
        });
        setLogo(club.logo || null);
      } catch (error) {
        console.error("Error fetching club:", error);
      }
    };

    if (selectedClubId) {
      fetchClub(selectedClubId);
    } else {
      reset({
        // Reset all fields explicitly
        name: "",
        primary_club_contact: "",
        primary_position_in_the_club: "",
        primary_phone_number: "",
        primary_email: "",
        secondary_club_contact: "",
        secondary_position_in_club: "",
        secondary_phone_number: "",
        secondary_email: "",
        ground_1: "",
        ground_2: "",
        ground_1_dressing_facilities: false,
        ground_2_dressing_facilities: false,
        ground_1_shower_toilet_facilities: false,
        ground_2_shower_toilet_facilities: false,
        ground_1_hot_tea_facilities: false,
        ground_2_hot_tea_facilities: false,
        ground_1_own_scoreboard: false,
        ground_2_own_scoreboard: false,
        ground_1_boundary_markers: false,
        ground_2_boundary_markers: false,
        ground_1_current_session: false,
        ground_2_current_session: false,
        current_ground_type: "",
        is_public_liability_insurance: false,
        is_bank_account: false,
        is_member_club_cricket_conf: false,
        is_member_mcb: false,
        established: "",
        recommended_by_1: "",
        recommended_by_2: "",
        logo: null, // Reset logo field too
        club_type: "",
        website: "",
      });
      setLogo(null);
      setOfficials({});
    }
  }, [selectedClubId, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(paths.add_club, {
        ...data,
        logo,
        ...officials,
      });
      console.log("Form Submitted:", response.data);
      reset();
      setLogo(null);
      setSelectedClubId(null); // Clear the selected club ID
      onFormSubmit(); // Callback to refresh the list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <PermissionWrapper
      roles={
        !selectedClubId
          ? ["league_registrar"]
          : ["league_registrar", "club_registrar", "club_official"]
      }
    >
      {" "}
      <div className="_add-club m-component">
        <h1 className="flex items-start justify-between">
          {selectedClubId ? "Update Club" : "Add Club"}{" "}
          <Button onClick={handleSubmit(onSubmit)} type="submit">
            {selectedClubId ? "Update" : "Create"} club
          </Button>
        </h1>

        <div className="club-fields grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 lg:col-span-2">
            <div>
              <label>
                Name of Club <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">Name of Club is required</p>
              )}
            </div>
            <div>
              <label>
                Name of Primary Club Contact{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("primary_club_contact", { required: true })}
              />
              {errors.primary_club_contact && (
                <p className="text-red-500">Main Club Contact is required</p>
              )}
            </div>
            <div>
              <label>
                Position in the Club <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("primary_position_in_the_club", {
                  required: true,
                })}
              />
              {errors.primary_position_in_the_club && (
                <p className="text-red-500">Position in the Club is required</p>
              )}
            </div>
            <div>
              <label>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("primary_phone_number", { required: true })}
              />
              {errors.primary_phone_number && (
                <p className="text-red-500">Phone Number is required</p>
              )}
            </div>
            <div>
              <label>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("primary_email", { required: true })}
              />
              {errors.primary_email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>
            <div>
              <label>Name of Secondary Club Contact</label>
              <input
                className="border p-2 w-full"
                {...register("secondary_club_contact")}
              />
            </div>
            <div>
              <label>Secondary Position in the Club</label>
              <input
                className="border p-2 w-full"
                {...register("secondary_position_in_club")}
              />
            </div>
            <div>
              <label>Secondary Phone Number</label>
              <input
                className="border p-2 w-full"
                {...register("secondary_phone_number")}
              />
            </div>
          </div>
          <div className="space-y-2 flex-col flex">
            <label htmlFor="logo" className="">
              Club Logo
            </label>
            <div
              className="border overflow-hidden border-gray-300 space-y-2 rounded-md shadow w-full h-[320px] flex flex-col items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("logo").click()}
              onDrop={(event) => {
                event.preventDefault();
                const file = event.dataTransfer.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setLogo(reader.result);
                    setValue("logo", reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              onDragOver={(event) => event.preventDefault()}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setLogo(reader.result);
                      setValue("logo", reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="logo"
                style={{ display: "none" }}
              />
              {logo ? (
                <img
                  src={logo}
                  alt="Club Logo"
                  className="min-w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  Click or drag image here to upload
                </div>
              )}
            </div>
          </div>

          <div>
            <label>Secondary Email</label>
            <input
              className="border p-2 w-full"
              {...register("secondary_email")}
            />
          </div>
          <div>
            <label>Address of Ground 1</label>
            <input className="border p-2 w-full" {...register("ground_1")} />
          </div>
          <div>
            <label>Address of Ground 2</label>
            <input className="border p-2 w-full" {...register("ground_2")} />
          </div>
          <div className="flex flex-row">
            <label>Ground 1 Dressing Facilities</label>
            <input
              type="checkbox"
              {...register("ground_1_dressing_facilities")}
            />
          </div>
          <div className="flex flex-row">
            <label>Ground 2 Dressing Facilities</label>
            <input
              type="checkbox"
              {...register("ground_2_dressing_facilities")}
            />
          </div>
          <div className="flex flex-row">
            <label>Ground 1 Shower/Toilet Facilities</label>
            <input
              type="checkbox"
              {...register("ground_1_shower_toilet_facilities")}
            />
          </div>
          <div className="flex flex-row">
            <label>Ground 2 Shower/Toilet Facilities</label>
            <input
              type="checkbox"
              {...register("ground_2_shower_toilet_facilities")}
            />
          </div>
          <div className="flex flex-row">
            <label>Ground 1 Hot Tea Facilities</label>
            <input
              type="checkbox"
              {...register("ground_1_hot_tea_facilities")}
            />
          </div>
          <div className="flex flex-row">
            <label>Ground 2 Hot Tea Facilities</label>
            <input
              type="checkbox"
              {...register("ground_2_hot_tea_facilities")}
            />
          </div>
          <div className="flex flex-row">
            <label>Ground 1 Own Scoreboard</label>
            <input type="checkbox" {...register("ground_1_own_scoreboard")} />
          </div>
          <div className="flex flex-row">
            <label>Ground 2 Own Scoreboard</label>
            <input type="checkbox" {...register("ground_2_own_scoreboard")} />
          </div>
          <div className="flex flex-row">
            <label>Ground 1 Boundary Markers</label>
            <input type="checkbox" {...register("ground_1_boundary_markers")} />
          </div>
          <div className="flex flex-row">
            <label>Ground 2 Boundary Markers</label>
            <input type="checkbox" {...register("ground_2_boundary_markers")} />
          </div>
          <div className="flex flex-row">
            <label>Ground 1 Current Session</label>
            <input type="checkbox" {...register("ground_1_current_session")} />
          </div>
          <div className="flex flex-row">
            <label>Ground 2 Current Session</label>
            <input type="checkbox" {...register("ground_2_current_session")} />
          </div>
          <div>
            <label>Current Ground Type</label>
            <input
              className="border p-2 w-full"
              {...register("current_ground_type")}
            />
          </div>

          <div className="flex flex-row">
            <label>Public Liability Insurance</label>
            <input
              type="checkbox"
              {...register("is_public_liability_insurance")}
            />
          </div>
          <div className="flex flex-row">
            <label>Bank Account</label>
            <input type="checkbox" {...register("is_bank_account")} />
          </div>
          <div className="flex flex-row">
            <label>Member of Club Cricket Conference</label>
            <input
              type="checkbox"
              {...register("is_member_club_cricket_conf")}
            />
          </div>
          <div className="flex flex-row">
            <label>Member of MCB</label>
            <input type="checkbox" {...register("is_member_mcb")} />
          </div>
          <div>
            <label>Established</label>
            <input
              className="border p-2 w-full"
              {...register("established", { required: false })}
            />
          </div>
          <div>
            <label>Recommended By 1</label>
            <input
              className="border p-2 w-full"
              {...register("recommended_by_1")}
            />
          </div>
          <div>
            <label>Recommended By 2</label>
            <input
              className="border p-2 w-full"
              {...register("recommended_by_2")}
            />
          </div>
          <div>
            <label>Club Type</label>
            <input className="border p-2 w-full" {...register("club_type")} />
          </div>
          <div>
            <label>Website</label>
            <input className="border p-2 w-full" {...register("website")} />
          </div>
          <div className="flex flex-row min-w-full"></div>
          <div></div>
          <div>
            <label>Chairman</label>
            <PersonSelect
              className="border p-2 w-full"
              personId={officials.chairman}
              setPersonId={(id) => setOfficials({ ...officials, chairman: id })}
            />
          </div>
          <div>
            <label>General Secretary</label>
            <PersonSelect
              className="border p-2 w-full"
              personId={officials.general_secretary}
              setPersonId={(id) =>
                setOfficials({ ...officials, general_secretary: id })
              }
            />
          </div>
          <div>
            <label>Treasurer</label>
            <PersonSelect
              className="border p-2 w-full"
              personId={officials.treasurer}
              setPersonId={(id) =>
                setOfficials({ ...officials, treasurer: id })
              }
            />
          </div>
          <div>
            <label>Welfare Officer</label>
            <PersonSelect
              className="border p-2 w-full"
              personId={officials.welfare_officer}
              setPersonId={(id) =>
                setOfficials({ ...officials, welfare_officer: id })
              }
            />
          </div>
          <div>
            <label>Registrar</label>
            <PersonSelect
              className="border p-2 w-full"
              personId={officials.registrar}
              setPersonId={(id) =>
                setOfficials({ ...officials, registrar: id })
              }
            />
          </div>
          <div>
            <label>Admin</label>
            <PersonSelect
              className="border p-2 w-full"
              personId={officials.admin}
              setPersonId={(id) => setOfficials({ ...officials, admin: id })}
            />
          </div>
        </div>
      </div>
    </PermissionWrapper>
  );
};

export default AddClub;
