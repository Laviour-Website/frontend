import { useState } from "react";

function Sizes() {

  return (
    <div>
      <label className="text-white font-bold">Select Available Sizes</label>
      <div className="flex">
        <div className="m-2">
          <input
            type="checkbox"
            id="XS"
            value="XS"
            className="form-input"
          ></input>
          <label htmlFor="XS" className="text-white">
            XS
          </label>
        </div>
        
        <div className="m-2">
          <input
            type="checkbox"
            id="S"
            value="S"
            className="form-input"
          ></input>
          <label htmlFor="S" className="text-white">
            S
          </label>
        </div>
        <div className="m-2">
          <input
            type="checkbox"
            id="M"
            value="M"
            className="form-input"
          ></input>
          <label htmlFor="M" className="text-white">
            M
          </label>
        </div>
        <div className="m-2">
          <input
            type="checkbox"
            id="L"
            value="L"
            className="form-input"
          ></input>
          <label htmlFor="L" className="text-white">
            L
          </label>
        </div>
        <div className="m-2">
          <input
            type="checkbox"
            id="XL"
            value="XL"
            className="form-input"
          ></input>
          <label htmlFor="XL" className="text-white">
            XL
          </label>
        </div>
        <div className="m-2">
          <input
            type="checkbox"
            id="XXL"
            value="XXL"
            className="form-input"
          ></input>
          <label htmlFor="XXL" className="text-white">
            XXL
          </label>
        </div>
      </div>
    </div>
  );
}

export default Sizes;
