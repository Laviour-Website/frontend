// import "./styles.css"
import Layout from "../components/Layout";
import logo from "../images/laviour.png";
import left from "../images/left1.svg";
import right from "../images/right.svg";
import { useState, useEffect } from "react";
import { signin, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BsSkipStartFill } from "react-icons/bs";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seller, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess || seller) {
      navigate("/seller/dashboard");
    }

    dispatch(reset());
  }, [seller, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sellerData = {
      email,
      password,
    };
    // {  email, password}
    dispatch(signin(sellerData));
  };
  return (
    <div className=" bg-black min-h-screen">
      <Layout
        bgColor="black"
        imgSrc={logo}
        buttonText="Sign up"
        buttonTo="/seller"
      >
        <div className="md:flex md:justify-between md:content-center">
          <img
            src={left}
            className="hidden xl:inline-block xl:self-center xl:ml-28 xl:text-white xl:w-96 xl:h-96 xl:opacity-60"
            alt="helloooo"
          />
          <div className=" rounded-2xl bg-[#fff] p-6 mx-auto w-[90%] h-[68%] sm:h-[55%] sm:mt-24 mt-12 md:w-[60%] sm:w-[90%] lg:w-[30%] lg:h-[70%] lg:mt-12 md:mt-12 md:h-[70%]">
            <h1 className="text-2xl font-extrabold text-center mt-4">
              Seller Login
            </h1>
            <p className="text-center mt-2">
              Hey, Enter your details to sign in{" "}
            </p>
            <br />
            <div className="form">
              <form onSubmit={onSubmit}>
                <input
                  className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <input
                  className="form-input px-4 py-2 rounded-xl border-2 w-[100%] mt-3 focus:outline-black"
                  placeholder="Enter Your Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <p className="mt-2 text-sm font-bold ">
                  Having trouble to Sign in?
                </p>
                {message && <p className="text-red-700 mt-2">{message}</p>}

                {isLoading ? (
                  <button className="bg-[#df1f98de] mt-2 w-[100%] rounded-xl text-white px-2 py-1.5 font-bold">
                    <svg
                      role="status"
                      className="inline w-8 h-8 mr-2 text-[#df1f98de] animate-spin dark:text-[#df1f98de] fill-white"
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
                  </button>
                ) : (
                  <input
                    className="mt-2 w-[100%] bg-[#df1f98de] rounded-xl text-white px-2 py-2.5 font-bold"
                    type="submit"
                    value="Log In"
                  />
                )}
              </form>
              <p className="text-center my-2 text-sm">
                <span className="text-xl">-</span>Or
                <span className="text-xl">-</span>
              </p>
              <Link to="/seller/signup">
                <button className="flex items-center mt-3 justify-center ml-[15%] w-[70%] bg-white border-2 border-black rounded-full p-2 font-bold">
                  <BsSkipStartFill className="h-6 w-6" />
                  SIGNUP
                </button>
              </Link>
            </div>
          </div>
          <img
            src={right}
            className=" hidden xl:self-center xl:inline-block xl:mr-28 xl:text-white xl:w-96 xl:h-96 xl:opacity-60"
            alt="hellosooo"
          />
        </div>
      </Layout>
    </div>
  );
}

export default Signin;
