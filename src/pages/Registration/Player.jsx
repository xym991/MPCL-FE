import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button from "../../components/Shared/Button";
import axios from "axios";
import paths from "../../utils/paths";
import CloseIcon from "@mui/icons-material/Close";

export default function PlayerRegistration({ tab, setTab }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [idPhoto, setIdPhoto] = useState(null);
  const sigCanvas = useRef();
  const [transfer, setTransfer] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(paths.get_clubs);
        setClubs(
          response.data.map((club) => ({ value: club.id, label: club.name }))
        );
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

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
      const response = await axios.post(paths.player_registration, {
        ...data,
        club: data.club.value,
      });
      console.log("Form Submitted:", response.data);
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="_player-registration container w-full py-8 px-16 flex flex-col justify-start">
      {/* <h1 className="heading text-center">Player Registration</h1> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
        <div className="flex flex-col sm:flex-row gap-12 justify-between my-4">
          <label className="font-semibold">
            Are you registered for any MPCL Club?
          </label>
          <div>
            <label>
              <input
                type="radio"
                onChange={(e) => setTransfer(e.target.checked && true)}
                value="yes"
                name="transfer"
              />{" "}
              Yes
            </label>
            <label className="ml-4">
              <input
                type="radio"
                onChange={(e) => setTransfer(e.target.checked && false)}
                value="yes"
                name="transfer"
              />{" "}
              No
            </label>
          </div>
        </div>
        {transfer && (
          <div className="space-y-2">
            <h3 className="text-lg">
              Please submit MPCL Player transfer form to get the player transfer
              from current club to new club.
              <br /> Please{" "}
              <span
                className="text-primary font-semibold"
                onClick={() => setTab("Transfer")}
              >
                click here
              </span>{" "}
              to access player transfer form
            </h3>
          </div>
        )}
        {!transfer && (
          <>
            <div className="space-y-2">
              <label>
                Select Club <span className="text-red-500">*</span>
              </label>
              <Controller
                name="club"
                control={control}
                rules={{ required: "Club is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={clubs}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
                  />
                )}
              />
              {errors.club && (
                <p className="text-red-500">{errors.club.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-8">
              <div>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-8">
              <div>
                <label>
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="border p-2 w-full"
                  {...register("date_of_birth", { required: true })}
                />
                {errors.date_of_birth && (
                  <p className="text-red-500">Date of Birth is required</p>
                )}
              </div>
              <div>
                <label>
                  Country of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  className="border p-2 w-full"
                  {...register("country_of_birth", { required: true })}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <div>
                <label>
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  className="border p-2 w-full"
                  {...register("phone_number", { required: true })}
                />
              </div>
              <div className="my-0">
                {" "}
                <label>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="border p-2 w-full"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label>
                Address <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-full"
                {...register("address", { required: true })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-8">
              <div>
                <label>
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  className="border p-2 w-full"
                  {...register("city", { required: true })}
                />
              </div>
              <div>
                <label>County</label>
                <input className="border p-2 w-full" {...register("county")} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <div className="space-y-2">
                <label>
                  Post Code <span className="text-red-500">*</span>
                </label>
                <input
                  className="border p-2 w-full"
                  {...register("post_code", { required: true })}
                />
                {errors.post_code && (
                  <p className="text-red-500">Post Code is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label>
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  className="border p-2 w-full"
                  defaultValue="United Kingdom"
                  {...register("country")}
                  readOnly
                />
                {errors.country && (
                  <p className="text-red-500">Country is required</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label>Previous UK Club</label>
              <input
                className="border p-2 w-full"
                {...register("previous_uk_club")}
              />
            </div>

            <div className="space-y-2">
              <label>
                Player Classification <span className="text-red-500">*</span>
              </label>
              <div>
                <label>
                  <input
                    type="radio"
                    {...register("player_classification", { required: true })}
                    value="local"
                  />{" "}
                  Local
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    {...register("player_classification", { required: true })}
                    value="first_class"
                  />{" "}
                  First Class
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    {...register("player_classification", { required: true })}
                    value="overseas"
                  />{" "}
                  Overseas
                </label>
              </div>
              {errors.player_classification && (
                <p className="text-red-500">
                  Player Classification is required
                </p>
              )}
            </div>

            <div className="space-y-2 flex flex-nowrap gap-x-6">
              <div className="space-y-2 flex-col flex">
                <label htmlFor="id_photo" className="">
                  ID Photo <span className="text-red-500">*</span>
                </label>
                <div
                  className="border overflow-hidden border-gray-300 space-y-2 rounded-md shadow-sm min-h-[300px] min-w-[300px] flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById("id_photo").click()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setIdPhoto(reader.result);
                        setValue("id_photo", reader.result);
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
                          setIdPhoto(reader.result);
                          setValue("id_photo", reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="id_photo"
                    style={{ display: "none" }}
                  />
                  {idPhoto ? (
                    <img
                      src={idPhoto}
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
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-start gap-x-6 ">
                <input
                  type="checkbox"
                  {...register("terms", { required: true })}
                />{" "}
                Agree to terms and conditions.
                <span className="text-red-500">
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500">
                  You must agree to the terms and conditions
                </p>
              )}
              <p className="ml-4 md:ml-8 from-gray-500 text-sm">
                I confirm that I have read the regulation on player eligibility
                and qualification criteria and the disciplinary code of conduct
                of the MIDDLESEX PREMIER CRICKET LEAGUE.
                <br />I confirm that the information supplied by me may be held
                electronically for registration purpose and may be made
                available to other cricketing bodies.
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-start gap-x-6 ">
                <input
                  type="checkbox"
                  {...register("privacy", { required: true })}
                />{" "}
                Privacy Policy.
                <span className="text-red-500">
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.privacy && (
                <p className="text-red-500">
                  You must agree to the privacy policy
                </p>
              )}
              <p className="ml-4 md:ml-8 from-gray-500 text-sm">
                I confirm that I have read the{" "}
                <Link to="/privacy-policy">privacy policy</Link> and consent to
                the given information being used by MPCL.
              </p>
            </div>
            <div className="space-y-2 min-w-[300px] max-w-[full] sm:max-w-[300px]">
              <Button className="w-full min-w-full" onClick={onSubmit}>
                Pay and Register
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
