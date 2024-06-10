import React from "react";
import { Link } from "react-router-dom";
import img from "../logo.png";

function Main() {
  return (
    <div>
      <div className="">
        <div className="">
          <div className="logo p-5 ">
            <img src={img} alt="" />
          </div>
          <div className="">
            <div className="flex justify-evenly flex-col px-5 mt-[100px]">
              <Link to={"/auth/login"}>
                <button className="w-full rounded-lg text-white flex justify-center items-center bg-primary py-4 text-[20px] my-3">
                  <h1>Login</h1>
                </button>
              </Link>
              <Link to={"/auth/signup"}>
                <button className="w-full rounded-lg text-white flex justify-center items-center bg-primary py-4 text-[20px] my-3">
                  <h1>Signup</h1>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
