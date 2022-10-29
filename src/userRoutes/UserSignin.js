import Layout from "../userComponents/Layout";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { signin, reset } from "../features/userAuth/userAuthSlice";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { signup } from "../features/userAuth/userAuthSlice";
import { get, updateCart } from "../features/cart/cartSlice";
import { getAddress } from "../features/address/addressSlice";
import { updateFavourite } from "../features/favourite/favouriteSlice";

function UserSignin() {
  const URL_EMAIL = "https://laviour.herokuapp.com/api/checkEmail";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTPSent, setOTPSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [password2, setPassword2] = useState("");
  const [phno, setPhno] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.userAuth
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const [showResend, setShowResend] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [googleLogin, setGoogleLogin] = useState(false);

  const URL_SEND = "https://laviour.herokuapp.com/api/sendSignupOTP";
  const URL_VERIFY = "https://laviour.herokuapp.com/api/verifySignupOTP";

  const handleMobile = async (e) => {
    e.preventDefault();
    const response = await axios.post(URL_SEND, { phno });
    setShowResend(false);
    console.log(response.data);
    if (response.data.status === "pending") {
      setOTPSent(true);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    let verify = { phno, otp: OTP };
    const response = await axios.post(URL_VERIFY, verify);
    console.log(response.data);
    if (response.data.status === "approved" && googleLogin) {
      let userData = {
        token,
        phno,
        password,
        isGoogleLogin: true,
      };
      dispatch(signup(userData));
    }
  };

  const handleCallbackResponse = async (response) => {
    setToken(response.credential);
    setGoogleLogin(true);
    const userData = { token: response.credential, googleLogin: true };
    console.log(userData);
    await dispatch(signin(userData));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(URL_EMAIL, { email });
    if (response.status === 200) {
      setUserExists(false);
    } else {
      let userData = { email, password, googleLogin: false };
      dispatch(signin(userData));
    }
  };
  useEffect(() => {
    if (isSuccess || user) {
      const referrer = searchParams.get("referrer");
      dispatch(getAddress());
      dispatch(updateCart({ id: user?._id, token: user?.token }));
      dispatch(updateFavourite({ id: user?._id, token: user?.token }));
      navigate(referrer ? referrer : "/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setErrorMsg(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "447994785310-te7a4gmvpd2el8pfrtb3j5gnr77bhcma.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "dark",
      size: "large",
      width: 100,
      height: 50,
    });
  }, []);
  return (
    <Layout>
      <hr className="text-[#000]" />
      {isLoading ? (
        <div className="flex justify-between items-center h-[100vh]">
          <svg
            role="status"
            className="inline w-12 h-12 mx-auto my-auto text-[#df1f98de] animate-spin dark:text-[#df1f98de] fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <>
          {googleLogin && !user ? (
            <div className="flex justify-center items-center mt-4 mb-4">
              {OTPSent ? (
                <form
                  onSubmit={handleOTP}
                  className="flex flex-col justify-center w-[100%] md:w-[60%] items-center"
                >
                  <h3 className="font-bold text-xl ">VERIFICATION</h3>
                  <label
                    htmlFor="firstname"
                    className="text-lg font-semibold text-gray-500 mb-2 mt-2"
                  >
                    Enter 6 Digit OTP sent to {"+91" + phno}
                  </label>
                  {
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
                  )}

                  <input
                    type="text"
                    id="OTP"
                    name="OTP"
                    value={OTP}
                    minLength="6"
                    maxLength="6"
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
                  <h3 className=" font-bold text-xl">VERIFICATION</h3>
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
                      {password != password2 ? (
                        <p className="text-[#ff0000]">
                          Passwords did not match
                        </p>
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
            <div className="flex justify-center items-center mt-4 mb-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center w-[100%] md:w-[60%] items-center"
              >
                <h3 className="font-bold text-xl">SIGN IN</h3>
                {errorMsg ? (
                  <p className="text-[#ff0000] text-md font-bold mt-2">
                    {errorMsg}
                  </p>
                ) : (
                  <></>
                )}
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
                  PASSWORD
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
                <p
                  className="text-[#db1d8f] mt-4 text-sm font-bold mb-2 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/user/forgot-password");
                  }}
                >
                  FORGOT PASSWORD?
                </p>
                <input
                  type="submit"
                  className="bg-[#000]  w-[60%] text-[#fff] px-2 py-2 mb-4"
                  value="SIGN IN"
                ></input>
                <div className=" " id="signInDiv"></div>
                <p className="mt-4">
                  Do not have an Account?{" "}
                  <span
                    className="hover:cursor-pointer font-bold text-[#db1d8f]"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    SIGN UP HERE
                  </span>
                </p>
              </form>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default UserSignin;
