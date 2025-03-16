import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button from "../../components/Shared/Button";
import paths from "../../utils/paths";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const clubs = [
  { value: "1", label: "Club 1578" },
  { value: "0", label: "Club 1576" },
];

export default function PlayerRegistration({ tab, setTab }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const [idPhoto, setIdPhoto] = useState(null);
  const sigCanvas = useRef();
  const [transfer, setTransfer] = useState(false);

  const handleIdPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIdPhoto(URL.createObjectURL(file));
    }
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSaveSignature = () => {
    const signatureData = sigCanvas.current.toDataURL();
    setValue("signature", signatureData);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(paths.player_transfer, {
        ...data,
        club: data.club.value,
        new_club: data.new_club.value,
      });
      console.log("Form Submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="_player-registration container w-full py-8 px-16 flex flex-col justify-start">
      {/* <h1 className="heading text-center">Player Transfer</h1> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
        <div className="space-y-2">
          <label>
            Registration number <span className="text-red-500">*</span>
          </label>
          <input
            className="border p-2 w-full"
            {...register("registration_number", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label>
            Current club <span className="text-red-500">*</span>
          </label>
          <Controller
            name="club"
            control={control}
            rules={{ required: "Current club is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={clubs.filter(
                  (club) => club.value !== getValues("new_club")?.value
                )}
                onChange={(selectedOption) => field.onChange(selectedOption)}
              />
            )}
          />
          {errors.club && <p className="text-red-500">{errors.club.message}</p>}
        </div>
        <div className="space-y-2">
          <label>
            New club <span className="text-red-500">*</span>
          </label>
          <Controller
            name="new_club"
            control={control}
            rules={{ required: "New club is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={clubs.filter(
                  (club) => club.value !== getValues("club")?.value
                )}
                onChange={(selectedOption) => field.onChange(selectedOption)}
              />
            )}
          />
          {errors.club && <p className="text-red-500">{errors.club.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="space-y-2">
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
          <div className="space-y-2">
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
        </div>

        <div className="space-y-2 flex-1 relative">
          <label>Player Signature </label>{" "}
          <span className="text-red-500">*</span>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              className: "border flex-1 w-full min-h-[300px] h-[300px]",
            }}
          />
          <button
            type="button"
            className="bg-red-500 text-white m-0 h-[30px] w-[30px] flex justify-center items-center absolute top-[-8px] right-0 rounded-sm"
            onClick={handleClearSignature}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-2 min-w-[300px] max-w-[full] sm:max-w-[300px]">
          <Button className="w-full min-w-full" onClick={onSubmit}>
            Submit transfer request
          </Button>
        </div>
      </form>
    </div>
  );
}
