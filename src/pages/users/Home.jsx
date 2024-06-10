import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="">
        <div className="">
          <Navbar />
          <div className="flex justify-center items-center">
            <div className="w-full h-[50vh] p-5">
              <div className="">
                <Link to={"/create"}>
                  <button className="button-lg">Capture</button>
                </Link>
              </div>
              <div className="flex justify-center gap-2 items-center">
                <span className="border border-gray-300 w-full"></span>
                <span>or</span>
                <span className="border border-gray-300 w-full"></span>
              </div>
              <div className="">
                <Link to={"/records"}>
                  <button className="button-lg">Records</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
