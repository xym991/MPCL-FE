import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import paths from "../../../utils/paths";
import Button from "../../../components/Shared/Button";
import TeamSelect from "../Teams/TeamSelect";
import ClubSelect from "../Clubs/ClubSelect";

const AddPerson = ({ selectedPersonId, onFormSubmit, setSelectedPersonId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [image, setImage] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [clubId, setClubId] = useState(null);

  useEffect(() => {
    const fetchPerson = async (id) => {
      try {
        const response = await axios.get(`${paths.get_people}/${id}`);
        const person = response.data;
        Object.keys(person).forEach((key) => {
          setValue(key, person[key]);
        });
        setImage(person.image || null);
        setTeamId(person.team);
        setClubId(person.club);
      } catch (error) {
        console.error("Error fetching person:", error);
      }
    };

    if (selectedPersonId) {
      fetchPerson(selectedPersonId);
    } else {
      reset({
        // Reset all fields explicitly
        fname: "",
        lname: "",
        phone: "",
        email: "",
        league_position: "",
        club_position: "",
        role: "",
        password: "",
        image: null, // Reset image field too
      });
      setImage(null);
      setTeamId(null);
      setClubId(null);
    }
  }, [selectedPersonId, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(paths.add_person, {
        ...data,
        team: teamId,
        club: clubId,
      });
      console.log("Form Submitted:", response.data);
      reset();
      setImage(null);
      setTeamId(null);
      setClubId(null);
      setSelectedPersonId(null); // Clear the selected person ID
      onFormSubmit(); // Callback to refresh the list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="_add-person m-component">
      <h1 className="flex items-start justify-between flex-wrap">
        {selectedPersonId ? "Update Person" : "Add Person"}{" "}
        <Button onClick={handleSubmit(onSubmit)} type="submit">
          {selectedPersonId ? "Update" : "Create"} person data
        </Button>
      </h1>

      <div className="flex justify-between gap-8 items-start flex-wrap">
        <div className="grid grid-cols-2 gap-x-6 flex-1 gap-y-4 flex-wrap min-w-[66%]">
          {selectedPersonId && <input type="hidden" {...register("id")} />}
          <div className="flex-1">
            <label>
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 w-full"
              {...register("fname", { required: true })}
            />
            {errors.fname && (
              <p className="text-red-500">First Name is required</p>
            )}
          </div>
          <div>
            <label>
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 w-full"
              {...register("lname", { required: true })}
            />
            {errors.lname && (
              <p className="text-red-500">Last Name is required</p>
            )}
          </div>
          <div>
            <label>Phone</label>
            <input className="border p-2 w-full" {...register("phone")} />
          </div>
          <div>
            <label>Email</label>
            <input className="border p-2 w-full" {...register("email")} />
          </div>
          <div>
            <label>League Position</label>
            <input
              className="border p-2 w-full"
              {...register("league_position")}
            />
          </div>
          <div>
            <label>Club Position</label>
            <input
              className="border p-2 w-full"
              {...register("club_position")}
            />
          </div>
          <div>
            <label>Role</label>
            <select className="border p-2 w-full" {...register("role")}>
              <option value="">Select Role</option>
              <option value="club_registrar">Club Registrar</option>
              <optio value="club_official">Club Official</optio>
              {/* <option value="club_admin">Club Admin</option> */}
              {/* <option value="club_chairman">Club Chairman</option> */}
              <option value="league_registrar">League Registrar</option>
              <option value="league_official">League Official</option>
              <option value="admin">Admin</option>
              <option value="player">Player</option>
              <option value="umpire">Umpire</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="border p-2 w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
        </div>
        <div className="space-y-2 flex-col flex">
          <label htmlFor="image" className="">
            ID Photo
          </label>
          <div
            className="border overflow-hidden border-gray-300 space-y-2 rounded-md shadow-sm min-h-[300px] min-w-[300px] flex flex-col items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("image").click()}
            onDrop={(event) => {
              event.preventDefault();
              const file = event.dataTransfer.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result);
                  setValue("image", reader.result);
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
                    setImage(reader.result);
                    setValue("image", reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="image"
              style={{ display: "none" }}
            />
            {image ? (
              <img
                src={image}
                alt="ID Photo"
                className="mt-2 w-[300px] h-[300px] object-cover"
              />
            ) : (
              <div className="text-gray-500 text-center">
                Click or drag image here to upload
              </div>
            )}
          </div>
        </div>
        <div className="min-w-full flex gap-6">
          {" "}
          <div className="flex-1">
            <label>Club</label>
            <ClubSelect clubId={clubId} setClubId={setClubId} />
          </div>
          <div className="flex-1">
            <label>Team</label>
            <TeamSelect teamId={teamId} setTeamId={setTeamId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;
