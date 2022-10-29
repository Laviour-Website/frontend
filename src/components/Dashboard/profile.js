import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

function Profile() {
    const {seller}=useSelector((state)=>state.auth)
    return ( 
    <div className="bg-white w-[75%] h-[40%] rounded-3xl mx-auto mt-10 pt-1 px-4">
        <CgProfile className="w-16 h-16 mx-auto mt-4 "/>
        <div className="mt-4">
            <p className="my-1"><span className="font-bold">Business Name -</span>{seller.businessName}</p>
            <p className="my-1"><span className="font-bold">IG Username -</span> {seller.username}</p>
            <p className="my-1"><span className="font-bold">Email -</span> {seller.email}</p>
            <p className="my-1"><span className="font-bold">Contact -</span> {seller.mobile}</p>
        </div>
    </div> );
}

export default Profile;
