import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { del, get } from "../../components/Fetch/Api";

function Admin() {
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");

  const Del = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const question = confirm("Are you sure you want to delete this record?");
    if (question === true) {
      try {
        await del(
          `https://gk-api-production.up.railway.app/api/records/${id}`,
          token
        );
        alert("Record Deleted Successfully");
      } catch (err) {
        alert("An error Occured");
      }
    }
  };
  const GetRecords = async () => {
    try {
      const response = await get(
        "https://gk-api-production.up.railway.app/api/records",
        token
      );

      setRecords(response.data);
    } catch (err) {
      alert("An error Occured");
    }
  };
  const GetUsers = async () => {
    try {
      const response = await get(
        "https://gk-api-production.up.railway.app/api/users",
        token
      );

      setUsers(response.data);
    } catch (err) {
      alert("An error Occured");
    }
  };
  const userDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const question = confirm("Are you sure you want to delete this user?");
    if (question === true) {
      try {
        await del(
          `https://gk-api-production.up.railway.app/api/users/${id}`,
          token
        );
        alert("Record Deleted Successfully");
      } catch (err) {
        alert("An error Occured");
      }
    }
  };
  const formatted = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      weekday: "long", // e.g., "Friday"
      year: "numeric", // e.g., "2024"
      month: "long", // e.g., "June"
      day: "numeric", // e.g., "7"
      hour: "numeric", // e.g., "2"
      minute: "numeric", // e.g., "03"
      second: "numeric", // e.g., "14"
      hour12: true, // 12-hour format with AM/PM
    });
  };
  useEffect(() => {
    GetRecords();
    GetUsers();
  }, []);

  return (
    <div>
      <div className="">
        <div className="">
          <Navbar />
          <div className="">
            <div className="p-3 record">
              <h1 className="text-[23px] py-3 font-medium">Records</h1>
              <div className="overflow-scroll scrollbar-none">
                <table>
                  <thead>
                    <th className="px-4 py2 text-left">Id</th>
                    <th className="px-4 py2 text-left">Time In</th>
                    <th className="px-4 py2 text-left">Tally No.</th>
                    <th className="px-4 py2 text-left">Plate Number</th>
                    <th className="px-4 py2 text-left">Checkout</th>
                    <th className="px-4 py2 text-left">Time Out</th>
                    <th className="px-4 py2 text-left">Action</th>
                  </thead>
                  <tbody>
                    {records &&
                      records.map((record, index) => (
                        <tr
                          className="border-b border-gray-300 hover:bg-gray-300"
                          key={index}
                        >
                          <td className=" px-4 py-2  text-left">{index + 1}</td>
                          <td className=" px-4 py-2  text-left whitespace-nowrap">
                            {formatted(record.createdAt)}
                          </td>
                          <td className=" px-4 py-2  text-left">
                            {record.tallyNum}
                          </td>
                          <td className=" px-4 py-2  text-left whitespace-nowrap">
                            {record.plateNum}
                          </td>
                          <td className=" px-4 py-2  text-left">
                            <div className="p-2 bg-[#ff0909]/30 rounded-lg text-[#ff0909] font-thin flex justify-center items-center">
                              <h1>False</h1>
                            </div>
                          </td>
                          <td className=" px-4 py-2  text-center whitespace-nowrap">
                            -
                          </td>
                          <td className=" px-4 py-2  text-left whitespace-nowrap">
                            <button
                              className="p-2 bg-[#ff0909]/30 rounded-lg text-[#ff0909] font-thin flex justify-center items-center"
                              onClick={() => {
                                Del(record._id);
                              }}
                            >
                              Checkout
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 user">
              <h1 className="text-[23px] py-3 font-medium">Users</h1>
              <div className="overflow-scroll scrollbar-none">
                <table>
                  <thead>
                    <th className="px-4 py2 text-left">Id</th>
                    <th className="px-4 py2 text-left">username</th>
                    <th className="px-4 py2 text-left">created At</th>
                    <th className="px-4 py2 text-left">Action</th>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user, index) => (
                        <tr
                          className="border-b border-gray-300 hover:bg-gray-300"
                          key={index}
                        >
                          <td className=" px-4 py-2  text-left">{index + 1}</td>
                          <td className=" px-4 py-2  text-left">
                            {user.username}
                          </td>
                          <td className=" px-4 py-2  text-left whitespace-nowrap">
                            {formatted(user.createdAt)}
                          </td>
                          <td className=" px-4 py-2  text-left whitespace-nowrap">
                            <button
                              className="p-2 bg-[#ff0909]/30 rounded-lg text-[#ff0909] font-thin flex justify-center items-center"
                              onClick={() => {
                                userDelete(user._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
