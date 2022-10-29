import Navbar from "./Navbar/navbar";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";

import logo from "../images/laviour.png";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <div className="bg-black text-white font-[helvetica] ">
        <div className="text-3xl font-bold mt-12 pt-12 text-center">
          CONNECT WITH US
        </div>
        <div className="mt-12 text-center text-lg font-bold">
          @LAVIOUROFFICIAL
        </div>
        <div className="flex justify-center mt-2">
          <a href="https://www.instagram.com/laviourofficial" target="_blank">
            <AiOutlineInstagram className="w-8 h-8 mx-1" />
          </a>
          <AiFillFacebook className="w-8 h-8 mx-1" />
          <a href="https://twitter.com/laviour" target="_blank">
            <AiOutlineTwitter className="w-8 h-8 mx-1" />
          </a>
          <AiFillLinkedin className="w-8 h-8 mx-1" />
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <img src={logo} className="w-[60%] sm:w-[20%] h-auto "></img>
          <p className="text-center sm:text-[14px] hidden sm:block">
            Extending the reach of Instagram stores beyond the confines of
            Social Media!
          </p>
        </div>

        <div className="font-bold text-center text-md mt-8 pb-28">
          Contact Us - support@laviour.com
        </div>
      </div>
    </>
  );
};

export default Layout;
