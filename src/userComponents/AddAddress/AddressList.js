import React from "react";
import AddressCard from "./AddressCard";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AddressList() {
  const { address } = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState(
    address.address[0]._id
  );

  return (
    <div className="w-[95%] border-1 mx-auto my-4 flex  flex-col justify-between">
      {address.address.map((obj) => {
        return (
          <AddressCard
            {...obj}
            id={obj?._id}
            def={obj?.default}
            key={Math.floor(Math.random() * 10000)}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        );
      })}

    </div>
  );
}
