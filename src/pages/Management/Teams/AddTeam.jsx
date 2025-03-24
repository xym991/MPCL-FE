import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import paths from "../../../utils/paths";
import Button from "../../../components/Shared/Button";
import PersonSelect from "../People/PersonSelect";
import ClubSelect from "../Clubs/ClubSelect";
import PermissionWrapper from "../../../components/PermissionWrapper";

const AddTeam = ({ selectedTeamId, onFormSubmit, setSelectedTeamId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [players, setPlayers] = useState({});
  const [clubId, setClubId] = useState(null);

  useEffect(() => {
    const fetchTeam = async (id) => {
      try {
        const response = await axios.get(`${paths.get_teams}/${id}`);
        const team = response.data;
        Object.keys(team).forEach((key) => {
          setValue(key, team[key]);
        });
        setPlayers({
          player1: team.player1,
          player2: team.player2,
          player3: team.player3,
          player4: team.player4,
          player5: team.player5,
          player6: team.player6,
          player7: team.player7,
          player8: team.player8,
          player9: team.player9,
          player10: team.player10,
          player11: team.player11,
          sub1: team.sub1,
          sub2: team.sub2,
          sub3: team.sub3,
          sub4: team.sub4,
        });
        setClubId(team.club);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    if (selectedTeamId) {
      fetchTeam(selectedTeamId);
    } else {
      reset({
        name: "",
        club: "",
      });
      setPlayers({});
      setClubId(null);
    }
  }, [selectedTeamId, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(paths.add_team, {
        ...data,
        ...players,
        club: clubId,
      });
      console.log("Form Submitted:", response.data);
      reset({
        name: "",
        club: "",
      });
      setPlayers({});
      setClubId(null);
      setSelectedTeamId(null); // Clear the selected team ID
      onFormSubmit(); // Callback to refresh the list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <PermissionWrapper
      roles={[
        "club_official",
        "league_official",
        "club_registrar",
        "league_registrar",
      ]}
    >
      <div className="_add-team m-component">
        <h1 className="flex items-start justify-between">
          {selectedTeamId ? "Update Team" : "Add Team"}{" "}
          <Button onClick={handleSubmit(onSubmit)} type="submit">
            {selectedTeamId ? "Update" : "Create"} team
          </Button>
        </h1>

        <div className="team-fields grid grid-cols-3 gap-8">
          <div className="grid grid-cols-3  gap-6 col-span-3">
            <div className="col-span-2">
              <label>
                Team Name <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">Team Name is required</p>
              )}
            </div>
            <div>
              <label>
                Club <span className="text-red-500">*</span>
              </label>
              <ClubSelect clubId={clubId} setClubId={setClubId} />
              {errors.club && <p className="text-red-500">Club is required</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-4 col-span-3">
            <div>
              <label>Captain</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player1}
                setPersonId={(id) => setPlayers({ ...players, player1: id })}
              />
            </div>
            <div>
              <label>Player 2</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player2}
                setPersonId={(id) => setPlayers({ ...players, player2: id })}
              />
            </div>
            <div>
              <label>Player 3</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player3}
                setPersonId={(id) => setPlayers({ ...players, player3: id })}
              />
            </div>
            <div>
              <label>Player 4</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player4}
                setPersonId={(id) => setPlayers({ ...players, player4: id })}
              />
            </div>
            <div>
              <label>Player 5</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player5}
                setPersonId={(id) => setPlayers({ ...players, player5: id })}
              />
            </div>
            <div>
              <label>Player 6</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player6}
                setPersonId={(id) => setPlayers({ ...players, player6: id })}
              />
            </div>
            <div>
              <label>Player 7</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player7}
                setPersonId={(id) => setPlayers({ ...players, player7: id })}
              />
            </div>
            <div>
              <label>Player 8</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player8}
                setPersonId={(id) => setPlayers({ ...players, player8: id })}
              />
            </div>
            <div>
              <label>Player 9</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player9}
                setPersonId={(id) => setPlayers({ ...players, player9: id })}
              />
            </div>
            <div>
              <label>Player 10</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player10}
                setPersonId={(id) => setPlayers({ ...players, player10: id })}
              />
            </div>
            <div>
              <label>Player 11</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.player11}
                setPersonId={(id) => setPlayers({ ...players, player11: id })}
              />
            </div>
            <div>
              <label>Substitute 1</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.sub1}
                setPersonId={(id) => setPlayers({ ...players, sub1: id })}
              />
            </div>
            <div>
              <label>Substitute 2</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.sub2}
                setPersonId={(id) => setPlayers({ ...players, sub2: id })}
              />
            </div>
            <div>
              <label>Substitute 3</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.sub3}
                setPersonId={(id) => setPlayers({ ...players, sub3: id })}
              />
            </div>
            <div>
              <label>Substitute 4</label>
              <PersonSelect
                className="border p-2 w-full"
                personId={players.sub4}
                setPersonId={(id) => setPlayers({ ...players, sub4: id })}
              />
            </div>
          </div>
        </div>
      </div>
    </PermissionWrapper>
  );
};

export default AddTeam;
