import React, { useRef, useState } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { post } from "../../components/Fetch/Api";
import { useNavigate } from "react-router-dom";

function Create() {
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [plateNum, setPlatenum] = useState("");
  const [tallyNum, setTallyNum] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      //   const newphotos = [...photos];
      //   newphotos[index] = file;
      setPhoto(file);
    } else {
      alert("Selected File is not an image");
    }
  };
  const removeImage = () => {
    setPhoto(null);
  };

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("tallyNum", tallyNum);
    formData.append("plateNum", plateNum);
    formData.append("photo", photo);
    try {
      await post(
        "https://gk-api-production.up.railway.app/api/records/create",
        token,
        formData
      );
      setLoading(false);
      setPlatenum("");
      setTallyNum("");
      removeImage();
      navigate("/success");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setPlatenum("");
      setTallyNum("");
      removeImage();
      navigate("/error");
    }
  };
  return (
    <div>
      <div className="">
        <Navbar />
        <div className="">
          <div className="p-5">
            <div className="flex justify-center">
              <h1 className="text-center w-[70%] text-[32px] py-3 leading-[1.2] font-medium">
                Enter Car Details
              </h1>
            </div>
            <div
              className={`text-white bg-red-700 font-medium text-[18px] leading-[1] p-3 rounded-xl relative ${
                !error ? "hidden" : "block"
              }`}
            >
              <FaTimes
                className="absolute cursor-pointer text-[20px] top-2 right-2"
                onClick={() => {
                  setError(!error);
                }}
              />
              <h1>An Error occured please try again later</h1>
            </div>
            <div className="form ">
              <form onSubmit={create}>
                <div className="flex gap-2 flex-col pb-3">
                  <label htmlFor="">Time</label>
                  <input
                    required
                    type="datetime-local"
                    className="input"
                    placeholder="e.g 12-12-1212 12:12:12"
                    value={null}
                  />
                </div>
                <div className="flex gap-2 flex-col pb-3">
                  <label htmlFor="">Tally Number</label>
                  <input
                    required
                    type="number"
                    className="input"
                    placeholder="e.g 0001"
                    value={tallyNum}
                    onChange={(e) => setTallyNum(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-col pb-3">
                  <label htmlFor="">Plate Number</label>
                  <input
                    required
                    type="text"
                    className="input"
                    placeholder="e.g XXX-XXX"
                    value={plateNum}
                    onChange={(e) => setPlatenum(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  {photo == null ? (
                    <>
                      <label htmlFor="imageUpload">Choose Image</label>
                      <input
                        id="imageUpload"
                        required
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className=""
                        ref={fileInputRef}
                      />
                    </>
                  ) : (
                    <div key={photo.name} className="relative">
                      <div className="object-cover relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="Selected"
                          className=""
                        />
                      </div>
                      <button
                        onClick={removeImage}
                        className="bg-red-600 rounded-full text-center text-white absolute -top-2 -left-2"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
                <button type="submit" className="button-lg" disabled={loading}>
                  {loading ? (
                    <FaSpinner className="animate-spin text-white" />
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
