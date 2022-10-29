import React, { useEffect, useState } from "react";
import Layout from "../userComponents/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import {
  performReset,
  reset,
  sendForgotLink,
} from "../features/userAuth/userAuthSlice";

const ResetPassword = () => {
  const {
    isLoading,
    isResetSuccess,
    message: reduxMessage,
  } = useSelector((state) => state.userAuth);
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, token } = useParams();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id || !token) {
      navigate("/signin");
    }
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !token || !password || !password2) {
      return;
    }
    if (password != password2) {
      setMessage("Passwords do not match");
      return;
    } else {
      setSubmitted(true);
      dispatch(performReset({ id, token, password, password2 }));
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="min-h-[100vh]">
          {submitted && isResetSuccess ? (
            <div className="flex justify-between flex-col items-center">
              <p className="mx-auto mt-20 text-lg">
                Your Password has been reset successfully
              </p>
              <button
                className="bg-black text-white font-bold px-2 py-1 mt-2"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                GO TO SIGNIN!
              </button>
            </div>
          ) : (
            <form
              className="w-[80%] md:w-[40%] mx-auto"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="password"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4 block"
              >
                PASSWORD
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                id="password"
                name="password"
                className="border-1 rounded-full border-black w-full py-1 px-4"
              ></input>
              <label
                htmlFor="password2"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4 block"
              >
                CONFIRM PASSWORD
              </label>
              <input
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                type="password"
                id="password2"
                name="password2"
                className="border-1 rounded-full border-black w-full py-1 px-4"
              ></input>
              {(message || reduxMessage) && (
                <p className="text-sm text-red-600 font-semibold">
                  {message || reduxMessage?.message || reduxMessage}
                </p>
              )}
              <input
                type="submit"
                value="RESET PASSWORD"
                className="bg-black text-white font-bold px-2 py-1 mt-2"
              ></input>
            </form>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ResetPassword;
