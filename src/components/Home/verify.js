import insta from "../../images/instagram.png";
import form from "../../images/Form.gif";
import { useNavigate } from "react-router-dom";

function Verify() {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:w-1/2 p-4">
        <div className="md:w-2/3 md:mx-auto border-2 rounded-xl p-4">
          <h1 className="text-3xl text-center font-bold mb-2">
            Steps to Join the Laviour Community
          </h1>
          <br />
          <div className="flex">
            <img className="mt-2" src={insta}></img>
            <div className="ml-4">
              <h2 className="text-[22px] text-left font-semibold px-3 py-2 ">
                Step 1 - Signup
              </h2>
              <p>
                Fill in our signup form so that we can contact you and verify
                your store. After verification and signing our contract, we will
                send you your login credentials!
              </p>
              <button
                type="button"
                className="border rounded-2xl px-4 py-2 text-[#fff] bg-[#000] font-bold  ml-[10%] md:ml-[20%] mt-2 hover:bg-[#ebe8e8] hover:text-[#000] "
                onClick={() => navigate("/seller/signup")}
              >
                SIGNUP!
              </button>
            </div>
          </div>
          <div className="flex mt-3">
            <img className="mt-3 w-16 h-16" src={form}></img>
            <div>
              <h2 className="text-[22px] text-left font-semibold p-3 ">
                Step 2 - Add your products
              </h2>
              <p className="text-left text-[17px] ml-4">
                Start adding trending products from your instagram store on to
                our platform!
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Verify;
