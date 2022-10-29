import React, { useEffect, useState } from "react";
import Layout from "../userComponents/Layout";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { reset, sendForgotLink } from "../features/userAuth/userAuthSlice";

const ForgotPassword = () => {
  const { isLoading, isSuccess, isForgotSuccess } = useSelector(
    (state) => state.userAuth
  );
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(sendForgotLink({ email }));
    setSubmitted(true);
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="min-h-[100vh]">
          {submitted ? (
            <div className="flex justify-between">
              <p className="mx-auto mt-20 text-lg">
                We have sent you the reset link (If your account exists)!
              </p>
            </div>
          ) : (
            <form
              className="w-[80%] md:w-[40%] mx-auto"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="email"
                className="text-lg font-semibold text-gray-500 mb-2 mt-4 block"
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
                className="border-1 rounded-full border-black w-full py-1 px-4"
              ></input>

              <input
                type="submit"
                value="SEND RESET LINK"
                className="bg-black text-white font-bold px-2 py-1 mt-2"
              ></input>
            </form>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ForgotPassword;
