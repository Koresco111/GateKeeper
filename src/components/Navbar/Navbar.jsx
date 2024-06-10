import React, { useEffect } from "react";
import img from "../../logow.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = sessionStorage.getItem("name");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    navigate("/");
    alert("Logged out Successfully");
  };
  useEffect(() => {
    if (!token && !user) {
      navigate("/auth/login");
      alert("Unauthenticated");
    }
  }, []);
  return (
    <div>
      <div className="">
        <div className="bg-primary p-3 text-white">
          <div className="w-full">
            <img src={img} alt="" className="w-[90%]" />
          </div>
          <div className="flex items-end justify-between mt-3">
            <div className="text-[22px] font-medium">
              <h1>Hi, {user}</h1>
            </div>
            <div className="">
              <button
                className="text-primary py-1 px-3 font-medium text-[21px] rounded-lg bg-white"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
