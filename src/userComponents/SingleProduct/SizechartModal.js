import React from "react";
import { GrClose } from "react-icons/gr";

export default function SizechartModal({ setModalOpen, sizeChart }) {
  return (
    <div className="z-10 w-[90%] h-[90%] bg-[#fff]">
      <div>
        <GrClose className="h-8 w-8" onClick={() => setModalOpen(false)} />
        <div className="flex justify-center">
          <img src={sizeChart} className=" h-[50%] object-contain"></img>
        </div>
      </div>
    </div>
  );
}
