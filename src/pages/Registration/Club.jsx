import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import Button from "../../components/Shared/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import paths from "../../utils/paths";
import CloseIcon from "@mui/icons-material/Close";

const clubs = [
  { value: "1578", label: "Club 1578" },
  { value: "1576", label: "Club 1576" },
];

export default function PlayerRegistration() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ground_1_dressing_facilities: 0,
      ground_2_dressing_facilities: 0,
      ground_1_shower_toilet_facilities: 0,
      ground_2_shower_toilet_facilities: 0,
      ground_1_hot_tea_facilities: 0,
      ground_2_hot_tea_facilities: 0,
      is_public_liability_insurance: 0,
      is_bank_account: 0,
      is_member_club_cricket_conf: 0,
      is_member_mcb: 0,
      club_is_any_league: 0,
      is_qualified_umpire: 0,
    },
  });

  const [idPhoto, setIdPhoto] = useState(null);
  const [logo, setLogo] = useState(null);
  const sigCanvas = useRef();

  const handleIdPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIdPhoto(URL.createObjectURL(file));
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        setValue("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoDrop = (event) => {
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
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setValue("signature", "");
  };

  const handleSaveSignature = () => {
    const signatureData = sigCanvas.current.toDataURL();
    setValue("signature", signatureData);
  };

  const handleLogoClick = () => {
    document.getElementById("logo").click();
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(paths.club_registration, data);
      console.log("Form Submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="_player-registration container w-full py-8 px-16 flex flex-col justify-start">
      {/* <h1 className="heading">Club Registration</h1> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-4"
        noValidate
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name_of_club"
              className="block text-sm font-medium text-gray-700"
            >
              Name of Club <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", {
                required: "Name of club is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              placeholder="Name of Club"
            />
            {errors.name_of_club && (
              <span className="text-red-500">
                {errors.name_of_club.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div className="space-y-2">
            <label
              htmlFor="club_contact"
              className="block text-sm font-medium text-gray-700"
            >
              Name of Main Club Contact <span className="text-red-500">*</span>
            </label>
            <input
              {...register("primary_club_contact", {
                required: "Club contact is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              placeholder="Main Club Contact"
            />
            {errors.club_contact && (
              <span className="text-red-500">
                {errors.club_contact.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="position_in_club"
              className="block text-sm font-medium text-gray-700"
            >
              Position in the Club <span className="text-red-500">*</span>
            </label>
            <input
              {...register("primary_position_in_the_club", {
                required: "Position is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              placeholder="Position in the Club"
            />
            {errors.position_in_club && (
              <span className="text-red-500">
                {errors.position_in_club.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              Phone number<span className="text-red-500">*</span>
            </label>
            <input
              {...register(`primary_phone_number`, {
                required: `phone is required`,
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="tel"
              placeholder={"Phone"}
            />
            {errors.primary_phone_number && (
              <span className="text-red-500">
                {errors[`primary_phone_number_`].message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("primary_email", {
                required: "Email is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div className="space-y-2">
            <label
              htmlFor="club_contact"
              className="block text-sm font-medium text-gray-700"
            >
              Name of Secondary Club contact{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register("secondary_club_contact", {
                required: "Club contact is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              placeholder="Additional Club Contact"
            />
            {errors.club_contact && (
              <span className="text-red-500">
                {errors.club_contact.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="position_in_club"
              className="block text-sm font-medium text-gray-700"
            >
              Position in the Club <span className="text-red-500">*</span>
            </label>
            <input
              {...register("secondary_position_in_club", {
                required: "Position is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              placeholder="Position in the Club"
            />
            {errors.position_in_club && (
              <span className="text-red-500">
                {errors.position_in_club.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              Phone number<span className="text-red-500">*</span>
            </label>
            <input
              {...register(`seconday_phone_number`, {
                required: `phone is required`,
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="tel"
              placeholder={"Phone"}
            />
            {errors.seconday_phone_number && (
              <span className="text-red-500">
                {errors[`seconday_phone_number`].message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("secondary_email", {
                required: "Email is required",
              })}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Address of Ground 1 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("ground_1", {
              required: "Address of Ground 1 is required",
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            type="text"
            placeholder="Address"
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.address_ground_1.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Address of Ground 2 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("ground_2", {
              required: "Address of Ground 2 is required",
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            type="text"
            placeholder="Address"
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.address_ground_2.message}
            </span>
          )}
        </div>
        <div className="space-y-4">
          {/* Ground Labels */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="flex-1 min-w-full md:min-w-fit"></div>
            <div className="text-sm font-medium text-gray-700 min-w-[120px]">
              Ground 1
            </div>
            <div className="text-sm font-medium text-gray-700 min-w-[120px]">
              Ground 2
            </div>
          </div>

          {/* Dressing Room Facilities */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="mr-auto text-sm font-medium text-gray-700 md:min-w-fit flex-1 min-w-full">
              Are there dressing room facilities at the ground?
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_dressing_facilities")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_dressing_facilities")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_dressing_facilities")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_dressing_facilities")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Shower and Toilet Facilities */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="mr-auto text-sm font-medium text-gray-700 md:min-w-fit flex-1 min-w-full">
              Are there shower and toilet facilities at the ground?
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_shower_toilet_facilities")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_shower_toilet_facilities")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_shower_toilet_facilities")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_shower_toilet_facilities")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Hot Tea Facilities */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="mr-auto text-sm font-medium text-gray-700 md:min-w-fit flex-1 min-w-full">
              Are there facilities to provide hot tea at the ground?
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_hot_tea_facilities")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_hot_tea_facilities")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_hot_tea_facilities")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_hot_tea_facilities")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="if_no_tea_faci_reason"
            className="block text-sm font-medium text-gray-700"
          >
            If you do not have tea facilities, then please specify what steps
            have been taken to acquire use of such facilities
            <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("if_no_tea_facilities_reason", {
              required: "This field is required",
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="If you do not have tea facilities, then please specify what steps have been taken to acquire use of such facilities"
            rows={3}
            defaultValue=""
          />
          {errors.if_no_tea_faci_reason && (
            <span className="text-red-500">
              {errors.if_no_tea_faci_reason.message}
            </span>
          )}
        </div>
        <div className="space-y-4">
          {/* Ground Labels */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="flex-1 min-w-full md:min-w-fit"></div>
            <div className="text-sm font-medium text-gray-700 min-w-[120px]">
              Ground 1
            </div>
            <div className="text-sm font-medium text-gray-700 min-w-[120px]">
              Ground 2
            </div>
          </div>

          {/* Own Scoreboard */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="mr-auto text-sm font-medium text-gray-700 md:min-w-fit flex-1 min-w-full">
              Do you have your own Scoreboard?
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_own_scoreboard")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_own_scoreboard")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_own_scoreboard")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_own_scoreboard")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Boundary Markers */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="mr-auto text-sm font-medium text-gray-700 md:min-w-fit flex-1 min-w-full">
              Do you have your own Boundary Markers?
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_boundary_markers")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_boundary_markers")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_boundary_markers")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_boundary_markers")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Current Session Usage */}
          <div className="flex flex-wrap md:flex-nowrap gap-x-[6vw] items-center">
            <div className="mr-auto text-sm font-medium text-gray-700 md:min-w-fit flex-1 min-w-full">
              Will you be using above ground/s for the current session?
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_current_session")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_1_current_session")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            <div className=" flex space-x-4 w-[120px]">
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_current_session")}
                  type="radio"
                  value="1"
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("ground_2_current_session")}
                  type="radio"
                  value="0"
                  defaultChecked
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="if_no_ground_for_current_session"
            className="block text-sm font-medium text-gray-700"
          >
            If No, Please specify <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("if_no_ground_for_current_session", {
              required: "This field is required",
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="If No, Please specify"
            rows={3}
            defaultValue=""
          />
          {errors.if_no_ground_for_current_session && (
            <span className="text-red-500">
              {errors.if_no_ground_for_current_session.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="current_ground_type"
            className="block text-sm font-medium text-gray-700"
          >
            Is your current ground maintained by the Local Authority (Council),
            Sub-contracted or Private? <span className="text-red-500">*</span>
          </label>
          <input
            {...register("current_ground_type", {
              required: "This field is required",
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter the current ground type"
            rows={3}
            defaultValue=""
          />
          {errors.current_ground_type && (
            <span className="text-red-500">
              {errors.current_ground_type.message}
            </span>
          )}
        </div>
        <div>
          <div className="space-y-2 flex items-center space-x-4 gap-x-16">
            <label
              htmlFor="ground_side_run_on_sunday"
              className="text-sm font-medium text-gray-700"
            >
              How many sides does your club run on Sunday?{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register("ground_side_run_on_sunday", {
                required: "This field is required",
              })}
              type="text"
              className="block flex-1 border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="  How many sides does your club run on Sunday?"
            />
            {errors.ground_side_run_on_sunday && (
              <span className="text-red-500">
                {errors.ground_side_run_on_sunday.message}
              </span>
            )}
          </div>
          {/* Public Liability Insurance */}
          <div className="space-y-2 flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Does your club hold Public Liability Insurance?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  {...register("is_public_liability_insurance")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  defaultChecked
                  {...register("is_public_liability_insurance")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Bank Account */}
          <div className="space-y-2 flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Does your club have a Bank Account?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  {...register("is_bank_account")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  defaultChecked
                  {...register("is_bank_account")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Club Cricket Conference Membership */}
          <div className="space-y-2 flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Is your club a member of Club Cricket Conference?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  {...register("is_member_club_cricket_conf")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  defaultChecked
                  {...register("is_member_club_cricket_conf")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Middlesex Cricket Board Membership */}
          <div className="space-y-2 flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Is your club a member of Middlesex Cricket Board?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" value="1" {...register("is_member_mcb")} />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  defaultChecked
                  {...register("is_member_mcb")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Club Establishment */}
          <div className="space-y-2 flex justify-between items-center gap-x-16">
            <label className="block text-sm font-medium text-gray-700">
              When was your club established?{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="block flex-1 border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Year of establishment"
              {...register("established", {
                required: "This field is required",
              })}
            />
            {errors.when_club_established && (
              <span className="text-red-500">
                {errors.when_club_established.message}
              </span>
            )}
          </div>

          {/* League Membership */}
          <div className="space-y-2 flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Is your club at present or was your club in any league?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  {...register("club_is_any_league")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  defaultChecked
                  {...register("club_is_any_league")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Specify League */}
          <div className="space-y-2 flex justify-between items-center gap-x-16">
            <label className="block text-sm font-medium text-gray-700">
              If yes, please specify:
            </label>
            <input
              type="text"
              className="block flex-1 border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="League name"
              {...register("if_club_in_league_spec")}
            />
          </div>

          {/* Qualified Umpire */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Do you have any qualified umpire?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  {...register("is_qualified_umpire")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  defaultChecked
                  {...register("is_qualified_umpire")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Umpire Details */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              If yes, please specify by name and their contact details:
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Umpire name & contact"
              {...register("qualified_umpire_contact")}
            />
          </div>

          {/* MPCL League Joining */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              In which cricket season do you want to join MPCL League?
            </label>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Season year"
              {...register("joining_mpcl_league")}
            />
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Any further comments that will enhance your application:
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Additional comments"
              {...register("comments")}
            />
          </div>

          {/* Recommended By */}
          <div className="space-y-2 flex flex-wrap items-center gap-x-4">
            <label className="block text-sm w-full font-medium text-gray-700">
              Recommended By:
            </label>
            <input
              type="text"
              className="block flex-1 min-w-[45%] border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="(1)"
              {...register("recommended_by_1")}
            />
            <input
              type="text"
              className="block flex-1  min-w-[45%] border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="(2)"
              {...register("recommended_by_2")}
            />
          </div>
          <div className="space-y-2 flex flex-nowrap gap-x-6">
            <div className="space-y-2 flex-col flex">
              <label htmlFor="logo" className="">
                Club Logo <span className="text-red-500">*</span>
              </label>
              <div
                className="border overflow-hidden border-gray-300 space-y-2 rounded-md shadow-sm min-h-[300px] min-w-[300px] flex flex-col items-center justify-center cursor-pointer"
                onClick={handleLogoClick}
                onDrop={handleLogoDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  style={{ display: "none" }}
                  id="logo"
                />
                {logo ? (
                  <img
                    src={logo}
                    alt="Club Logo"
                    className="mt-2 w-[300px] h-[300px] object-cover"
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    Click or drag image here to upload
                  </div>
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
                  className: "border w-full min-h-[300px] h-[300px]",
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
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-start gap-4 ">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />{" "}
              Agree to terms and conditions.
              <span className="text-red-500">*</span>
            </label>
            <p className="ml-4 md:ml-8 from-gray-500 text-sm">
              I confirm that I have read the regulation on player eligibility
              and qualification criteria and the disciplinary code of conduct of
              the MIDDLESEX PREMIER CRICKET LEAGUE.
              <br />I confirm that the information supplied by me may be held
              electronically for registration purpose and may be made available
              to other cricketing bodies.
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-start gap-4 ">
              <input
                type="checkbox"
                {...register("privacy", { required: true })}
              />{" "}
              Privacy Policy.
              <span className="text-red-500">*</span>
            </label>
            <p className="ml-4 md:ml-8 from-gray-500 text-sm">
              I confirm that I have read the{" "}
              <Link to="/privacy-policy">privacy policy</Link> and consent to
              the given information being used by MPCL.
            </p>
          </div>
          <div className="space-y-2 min-w-[300px] max-w-[full] sm:max-w-[300px]">
            <Button className="w-full min-w-full" onClick={onSubmit}>
              Join MPCL Now!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
