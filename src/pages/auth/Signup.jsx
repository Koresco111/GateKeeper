import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../logo.png";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { post } from "../../components/Fetch/Api";

function Signup() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const handleToggle = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username,
      email,
      password,
    };
    try {
      const response = await post(
        "http://localhost:8000/api/auth/register",
        null,
        data
      );
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("name", response.data.user.username);
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      alert("An error Occured");
    }
  };

  return (
    <div>
      <div className="">
        <div className="p-4 h-full mt-[30px]">
          <div className="flex flex-col justify-center gap-5 items-center">
            <div className="logo">
              <img src={img} alt="" />
            </div>
            <h1 className="text-center w-[70%] text-[30px] py-3 leading-[1] font-medium">
              Sign up an Account
            </h1>
          </div>
          <div className="form ">
            <form onSubmit={register}>
              <div className="flex gap-2 flex-col pb-3">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  required
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g example@exm.com"
                />
              </div>
              <div className="flex gap-2 flex-col pb-3">
                <label htmlFor="">Username</label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  placeholder="e.g John Doe"
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
                  <span>Sign Up</span>
                )}
              </button>
            </form>
            <h1 className="text-center">
              Don't have an account
              <Link to={"/auth/login"}>
                <span className="text-primary underline"> Login</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
