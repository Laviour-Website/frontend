import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../userComponents/Layout";
import { Link, useNavigate } from "react-router-dom";
import { editData } from "../features/userAuth/userAuthSlice";
import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";

import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";
function EditAccount() {
  let { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phno, setPhno] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstname(user.firstName);
      setLastname(user.lastName);
      setPhno(user.phno);
    }
  }, []);

  useEffect(() => {
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isRefreshError]);

  const handleEditForm = (e) => {
    e.preventDefault();
    if (user.phno !== phno) {
    }
    const data = {
      prevEmail: user.email,
      firstName,
      lastName,
      phno: user.phno,
    };
    dispatch(editData(data));
    navigate("/account");
  };

  let { sidebarOpen } = useContext(SidebarContext);
  return (
    <ProtectedRoute>
      <Layout>
        <div className={`${sidebarOpen ? "hidden w-[90%]" : "w-full"}`}>
          <div className="text-center">
            <h2 className=" mt-20 text-2xl">Settings</h2>
            <p>You can edit your account here!</p>
          </div>
          <div className="w-[50%] mx-auto border-1 p-4">
            <div className="flex flex-row  justify-between mx-2">
              <h4>My Details</h4>
            </div>
            <form onSubmit={handleEditForm}>
              <div className="flex flex-col">
                {/* <label htmlFor="email" className="mt-2 mx-2">
                  Email
                </label>
                <input
                  className="w-[50%] border-1 border-[#000] my-2 mx-2 px-2 py-1"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input> */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mt-2 mx-2">
                  First Name
                </label>
                <input
                  className="w-[50%] border-1 border-[#000] my-2 mx-2 px-2 py-1"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mt-2 mx-2">
                  Last Name
                </label>
                <input
                  className="w-[50%] border-1 border-[#000] my-2 mx-2 px-2 py-1"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                ></input>
              </div>
              {/* <div className="flex flex-col">
                {otpSent ? (
                  <div>
                    <label htmlFor="phno" className="mt-2 mx-2">
                      Enter the OTP Sent to +91{phno}
                    </label>
                    <input
                      className="w-[50%] border-1 border-[#000] my-2 mx-2 px-2 py-1"
                      type="text"
                      id="phno"
                      name="phno"
                      value={phno}
                      onChange={(e) => setPhno(e.target.value)}
                    ></input>
                    <button>VERIFY</button>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="phno" className="mt-2 mx-2">
                      Mobile Number{" "}
                      <span className="text-red-600">
                        {" "}
                        (will need verification if changed)
                      </span>
                    </label>
                    <div className="flex ">
                      <div className="pt-1 h-[100%] flex flex-col justify-center text-grey-700 w-10">
                        +91
                      </div>
                      <input
                        type="text"
                        id="phno"
                        name="phno"
                        value={phno}
                        minLength="10"
                        maxLength="10"
                        className="border-1 border-[#000] w-[55%] py-1 px-2"
                        onChange={(e) => setPhno(e.target.value)}
                      />
                      <button className="bg-[#000] mx-2 px-2 text-[#fff]">
                        VERIFY
                      </button>
                    </div>
                  </div>
                )}
              </div> */}
              <input
                className="bg-[#000] text-[#fff] w-[30%] py-1 my-3 mx-2"
                type="submit"
              ></input>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

export default EditAccount;
