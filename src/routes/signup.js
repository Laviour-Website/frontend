import Layout from "../components/Layout";
// import "./styles.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import logo from "../images/laviour.png";
import left from "../images/left1.svg";
import right from "../images/right.svg";

import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    description: "",
    payment: ""
  });

  // const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [localityTown, setLocalityTown] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [state, setState] = useState("");

  const [searchParams] = useSearchParams();

  const [detailsSent, setDetailsSent] = useState(false);

  const { businessName, username, email, mobile, password, name, description, payment } =
    formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const getDeets = async () => {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if (response.data[0].Status == "Success") {
        setLocalityTown(response.data[0].PostOffice[0].Block);
        setCityDistrict(response.data[0].PostOffice[0].District);
        setState(response.data[0].PostOffice[0].State);
      } 
    };
    if (pincode.length == 6) {
      getDeets();
    }
  }, [pincode]);

  useEffect(() => {
    if (isError) {
    }

    if (user) {
      navigate("/seller/dashboard");
    }

    if (isSuccess) {
      setDetailsSent(true);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !businessName ||
      !username ||
      !email ||
      !mobile ||
      !password ||
      !pincode ||
      !address ||
      !localityTown ||
      !cityDistrict ||
      !state ||
      !description ||
      !payment
    ) {
      return;
    }
    const userData = {
      name,
      businessName,
      username,
      description,
      email,
      payment,
      mobile,
      password,
      pincode,
      address,
      localityTown,
      cityDistrict,
      state,
    };
    // { businessName, email, password, mobile,username }
    dispatch(register(userData));
  };
  return (
    <>
      <div className=" bg-black min-h-screen h-full w-full">
        <Layout
          bgColor="black"
          buttonTo="/seller/signin"
          imgSrc={logo}
          buttonText="Sign in"
        >
          <div className="md:flex md:justify-between md:content-center">
            <img
              src={left}
              className="hidden xl:inline-block xl:self-center xl:ml-28 xl:text-white xl:w-96 xl:h-96 xl:opacity-60"
              alt="helloooo"
            />
            {detailsSent ? (
              <h2 className=" font-extrabold text-white">
                Your details have been sent successfully! You can login once
                your profile is verified! Please wait patiently :)
              </h2>
            ) : (
              <div className=" rounded-2xl bg-[#fff] p-6 mx-auto w-[90%] h-[68%] sm:h-[55%] sm:mt-24 mt-12 md:w-[60%] sm:w-[90%] lg:w-[30%] lg:h-[70%] lg:mt-12 md:mt-12 md:h-[70%]">
                <h1 className="text-2xl font-extrabold text-center mt-4">
                  Seller Sign up
                </h1>
                <p className="text-center my-2">
                  Hey, Enter your details to sign up{" "}
                </p>
                {message && typeof message == "string" ? (
                  <p className="text-red-700">{message}</p>
                ) : (
                  <p>Error occured</p>
                )}
                <div className="form">
                  <form onSubmit={onSubmit}>
                    <label for="name" className="mt-2 font-bold">
                      Your Name
                    </label>
                    <input
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                    <label for="businessName" className="mt-2 font-bold">
                      Business Name
                    </label>
                    <input
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Business Name"
                      value={businessName}
                      onChange={onChange}
                      required
                    />

                    <label for="username" className="mt-2 font-bold">
                      Instagram Store Username
                    </label>
                    <input
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%]  focus:outline-black"
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={onChange}
                      required
                    />
                    <label for="description" className="mt-2 font-bold">
                      Description of what you sell
                    </label>
                    <textarea
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%]  focus:outline-black"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      value={description}
                      onChange={onChange}
                      required
                    />
                    <label for="payment" className="mt-2 font-bold text-sm">
                      
                      Payment (This is how we will pay you) - Acoount No, IFSC Code, Branch name, Payee name and any other details
                    </label>
                    <textarea
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%]  focus:outline-black"
                      type="text"
                      name="payment"
                      id="payment"
                      placeholder="Payment"
                      value={payment}
                      onChange={onChange}
                      required
                    />

                    <label for="email" className="mt-2 font-bold">
                      Email
                    </label>
                    <input
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%]  focus:outline-black"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={onChange}
                      value={email}
                      required
                    />
                    <label for="mobile" className="mt-2 font-bold">
                      Phone Number
                    </label>
                    <input
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="Phone Number"
                      onChange={onChange}
                      value={mobile}
                      required
                    />
                    <label for="password" className="mt-2 font-bold">
                      Password
                    </label>
                    <input
                      className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChange}
                      required
                    />

                    <h3 className="mt-3 font-extrabold text-xl">
                      Add Your Address!
                    </h3>
                    <p>This is where we will send all returned products</p>
                    <div className="flex flex-col items-center">
                      <div className="relative flex w-[95%]">
                        <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                          Pincode*
                        </label>
                        {pincode.length == 6 ? (
                          <span
                            onClick={() => {
                              setPincode("");
                              setLocalityTown("");
                              setCityDistrict("");
                              setState("");
                            }}
                            className="absolute right-2 top-4 text-[#db1d8f] text-sm font-bold hover:cursor-pointer"
                          >
                            CHANGE{" "}
                          </span>
                        ) : (
                          <></>
                        )}
                        <input
                          required
                          minLength={6}
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => {
                            setPincode(e.target.value);
                          }}
                          disabled={pincode.length == 6}
                          type="text"
                          className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                        ></input>
                      </div>
                      <div className="relative flex w-[95%]">
                        <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                          Address (Warehouse No,Building,Street,Area)*
                        </label>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder=""
                          className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                        ></textarea>
                      </div>
                      <div className="relative flex w-[95%]">
                        <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                          Locality / Town*
                        </label>
                        <input
                          required
                          value={localityTown}
                          disabled={localityTown}
                          type="text"
                          placeholder=""
                          className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                        ></input>
                      </div>

                      <div className="flex justify-around w-[95%]">
                        <div className="relative flex w-[50%] mr-2">
                          <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                            City / District*
                          </label>
                          <input
                            required
                            value={cityDistrict}
                            disabled={cityDistrict}
                            type="text"
                            placeholder=""
                            className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                          ></input>
                        </div>
                        <div className="relative flex w-[50%]">
                          <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                            State*
                          </label>
                          <input
                            required
                            value={state}
                            disabled={state}
                            type="text"
                            placeholder=""
                            className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                          ></input>
                        </div>
                      </div>
                    </div>
                    {message && typeof message == "string" ? (
                      <p className="text-red-700">{message}</p>
                    ) : (
                      <p>Error occured</p>
                    )}
                    <input
                      type="submit"
                      className="mt-6 w-[100%] bg-[#df1f98de] rounded-xl text-white px-2 py-2.5 font-bold"
                    />
                  </form>
                </div>
              </div>
            )}
            <img
              src={right}
              className=" hidden xl:self-center xl:inline-block xl:mr-28 xl:text-white xl:w-96 xl:h-96 xl:opacity-60"
              alt="Laviour Sign Up img 2"
            />
          </div>
        </Layout>
      </div>
    </>
  );
}

export default Signup;
