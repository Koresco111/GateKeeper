import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../logo.png";
import { post } from "../../components/Fetch/Api";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const handleToggle = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username,
      password,
    };
    try {
      const response = await post(
        "https://gk-api-production.up.railway.app/api/auth/login",
        null,
        data
      );
      if (response.data.isAdmin === true) {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("name", response.data.username);
        setLoading(false);
        navigate("/home/record/admin");
      } else {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("name", response.data.username);
        navigate("/home");
      }
    } catch (err) {
      alert("An error Occured");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="">
        <div className="">
          <div className="p-4 h-full mt-[30px]">
            <div className="flex flex-col justify-center gap-5 items-center">
              <div className="logo">
                <img src={img} alt="" />
              </div>
              <h1 className="text-center w-[70%] text-[30px] py-3 leading-[1] font-medium">
                Login into your Account
              </h1>
            </div>
            <div className="form ">
              <form onSubmit={login}>
                <div className="flex gap-2 flex-col pb-3">
                  <label htmlFor="">Username</label>
                  <input
                    required
                    type="text"
                    className="input"
                    placeholder="e.g John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-col relative">
                  <label htmlFor="">Password</label>
                  <input
                    required
                    type={passwordType}
                    className="input"
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={handleToggle}
                    className="absolute right-4 top-[47px] cursor-pointer text-xl text-gray-500"
                  >
                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <button type="submit" className="button-lg" disabled={loading}>
                  {loading ? (
                    <FaSpinner className="animate-spin text-white" />
                  ) : (
                    <span>Log In</span>
                  )}
                </button>
              </form>
              <h1 className="text-center">
                Already have an account
                <Link to={"/auth/signup"}>
                  <span className="text-primary underline"> Signup</span>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
