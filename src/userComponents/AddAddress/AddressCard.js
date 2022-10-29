import { useDispatch, useSelector } from "react-redux";
import { selectAddress } from "../../features/address/addressSlice";
function AddressCard({
  name,
  mobileNumber,
  pincode,
  address,
  localityTown,
  cityDistrict,
  id,
}) {
  const { selected } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  return (
    <div
      className={`w-[95%] border-1 mx-auto my-4 flex justify-between ${
        selected === id ? "border-2 border-[#db1d8f]" : ""
      }`}
      onClick={() => dispatch(selectAddress({ id }))}
    >
      <div className="flex">
        <div className="my-2 mx-4 flex flex-col justify-around">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p>{address}</p>
            <p>{localityTown}</p>
            <p>{cityDistrict}</p>
            <p>{pincode}</p>
            <p className="font-bold"> Mobile - {mobileNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
