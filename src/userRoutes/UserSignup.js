import Layout from "../userComponents/Layout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleCheck, reset, signup } from "../features/userAuth/userAuthSlice";
import axios from "axios";
import { updateCart } from "../features/cart/cartSlice";
import { updateFavourite } from "../features/favourite/favouriteSlice";
import { getAddress } from "../features/address/addressSlice";

function UserSignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [request_id, setRequestId] = useState("");
  const [googleLogin, setGoogleLogin] = useState(false);
  const [form, setForm] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [token, setToken] = useState("token");
  // const [showResend, setShowResend] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.userAuth
  );
  const handleCallbackResponse = (response) => {
    setToken(response.credential);
    console.log(response.credential);
    if (response.credential) {
      dispatch(googleCheck({ token: response.credential }));
      setGoogleLogin(true);
    }
  };

  const URL_SEND = "https://laviour.herokuapp.com/api/sendSignupOTP";
  const URL_VERIFY = "https://laviour.herokuapp.com/api/verifySignupOTP";
  const URL_EMAIL = "https://laviour.herokuapp.com/api/checkEmail";

  const handleMobile = async (e) => {
    e.preventDefault();
    const response = await axios.post(URL_SEND, { phno });
    console.log(response.data);
    // setShowResend(false);
    if (response.data.Status) {
      setOTPSent(true);
      setRequestId(response.data.Details);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    let verify = { phno, otp: OTP, request_id };
    const response = await axios.post(URL_VERIFY, verify);
    console.log(response.data);
    if (response.data.Status === "Success" && !googleLogin) {
      let userData = {
        firstName: firstname,
        lastName: lastname,
        email,
        phno,
        password,
        isGoogleLogin: false,
      };
      dispatch(signup(userData));
    } else if (response.data.Status === "Success" && googleLogin) {
      let userData = {
        token,
        phno,
        password,
        isGoogleLogin: true,
      };
      dispatch(signup(userData));
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "447994785310-te7a4gmvpd2el8pfrtb3j5gnr77bhcma.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "dark",
      size: "large",
      width: 100,
      height: 50,
      marginLeft: 0,
    });
  }, []);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      dispatch(getAddress());
      dispatch(updateCart({ id: user._id, token: user.token }));
      dispatch(updateFavourite({ id: user._id, token: user.token }));

      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setUserExists(false);
    const response = await axios.post(URL_EMAIL, { email });
    if (response.status === 201) {
      setUserExists(true);
    } else setForm(true);
  };

  return (
    <Layout>
      <hr className="text-[#000]" />
      {form || googleLogin ? (
        <div className="flex justify-center items-center mt-4 mb-4">
          {OTPSent ? (
            <form
              onSubmit={handleOTP}
              className="flex flex-col justify-center w-[100%] md:w-[60%] items-center"
            >
              <h3 className="font-bold text-xl">VERIFICATION</h3>
              <label
                htmlFor="firstname"
                className="text-lg font-semibold text-gray-500 mb-2 mt-2"
              >
                Enter 4 Digit OTP sent to {"+91" + phno}
              </label>

              {/* {
                <div className="hidden">
                  {setTimeout(() => {
                    setShowResend(true);
                  }, 10000)}
                </div>
              }
              {showResend ? (
                <button
                  className=" w-[20%] text-[#fff] bg-[#000]"
                  onClick={handleMobile}
                  disabled={!showResend}
                >
                  Resend OTP
                </button>
              ) : (
                <p>You can resend OTP after 30 seconds</p>
              )} */}
              <input
                type="text"
                id="OTP"
                name="OTP"
                value={OTP}
                minLength="4"
                maxLength="4"
                className="border-1 border-[#000] w-[60%] py-1 px-2"
                onChange={(e) => setOTP(e.target.value)}
              />
              <input
                type="submit"
                value="Submit OTP"
                className="bg-[#000] mt-4 w-[60%] text-[#fff] px-2 py-2 mb-4"
              />
            </form>
          ) : (
            <form
              onSubmit={handleMobile}
              className="flex flex-col justify-center w-[100%] md:w-[60%] items-center"
            >
              <h3 className="font-bold text-xl">VERIFICATION</h3>
              {googleLogin ? (
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-lg font-semibold text-gray-500 mb-2 mt-4"
                  >
                    NEW PASSWORD
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    type="password"
                    name="password"
                    id="password"
                    className="border-1  border-black w-[60%] py-1 px-4"
                  ></input>
                  <label
                    htmlFor="confirmpwd"
                    className="text-lg font-semibold text-gray-500 mb-2 mt-4"
                  >
                    CONFIRM PASSWORD
                  </label>
                  <input
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                    name="confirmpwd"
                    type="password"
                    id="pwd"
                    className="border-1  border-black w-[60%] py-1 px-4"
                  ></input>
                  {password !== password2 ? (
                    <p className="text-[#ff0000]">Passwords did not match</p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              <label
                htmlFor="firstname"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4"
              >
                Enter your Mobile Number
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
              </div>
              <input
                type="submit"
                value="Get OTP"
                className="bg-[#000] mt-4 w-[60%] text-[#fff] px-2 py-2 mb-4"
              />
            </form>
          )}
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center mt-4 mb-4 w-full">
            <form
              onSubmit={onSubmit}
              className="flex flex-col justify-center w-[100%] md:w-[60%] items-center"
            >
              <h3 className=" font-bold text-xl">CREATE ACCOUNT</h3>
              {userExists ? (
                <p className="text-[#ff0000] text-md font-bold my-2">
                  A user with this Email already exists. Either make changes or{" "}
                  <Link className="underline underline-offset-3" to="/signin">
                    SIGN IN HERE
                  </Link>
                </p>
              ) : (
                <></>
              )}
              <label
                htmlFor="firstname"
                className="text-lg font-semibold text-gray-500 mb-2"
              >
                FIRST NAME
              </label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                type="text"
                name="firstname"
                id="firstname"
                className="border-1 rounded-full border-black w-[60%] py-1 px-4"
              ></input>
              <label
                htmlFor="lastname"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4"
              >
                LAST NAME
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                type="text"
                name="lastname"
                id="lastname"
                className="border-1 rounded-full border-black w-[60%] py-1 px-4"
              ></input>
              <label
                htmlFor="email"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4"
              >
                EMAIL
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                id="email"
                name="email"
                className="border-1 rounded-full border-black w-[60%] py-1 px-4"
              ></input>

              <label
                htmlFor="password"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4"
              >
                NEW PASSWORD
              </label>
              <input
                value={password}
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                className="border-1 rounded-full border-black w-[60%] py-1 px-4"
              ></input>
              <label
                htmlFor="confirmpwd"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4"
              >
                CONFIRM PASSWORD
              </label>
              <input
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                name="confirmpwd"
                type="password"
                id="pwd"
                className="border-1 rounded-full border-black w-[60%] py-1 px-4"
              ></input>
              {password !== password2 ? (
                <p className="text-[#ff0000]">Passwords did not match</p>
              ) : (
                <></>
              )}
              <input
                type="submit"
                className="bg-[#000] mt-4 w-[60%] text-[#fff] px-2 py-2 mb-4"
                value="CREATE"
              ></input>
              <div className="  " id="signUpDiv"></div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default UserSignUp;
