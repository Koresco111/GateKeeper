import React from "react";
import { Link } from "react-router-dom";
import img from "../../success.png";

function Success() {
  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-2 justify-center items-center p-5 mt-[80px]">
          <div className="">
            <img src={img} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center w-[70%] text-[32px] py-3 leading-[1.2] font-medium">
              Successfully Added to Records
            </h1>
            <Link to={"/records"} className="w-full">
              <button className="button-lg">Records</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
