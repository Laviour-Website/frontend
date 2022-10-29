import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function FootwearCat() {
  const navigate =useNavigate();
  return (
    <div className="flex w-[100%] z-20 bg-[#fff] border-b-4 border-[#222] absolute left-0 justify-center mt-3">
      <div className="p-4">
        {/* col*/}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">New Arrivals</h2>
          <ul>
            <li  onClick={()=>{navigate("/category/footwear")}} className="cursor-pointer">View All</li>
            <li onClick={()=>{navigate("/category/footwear")}} className="cursor-pointer">Footwear</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {/* col */}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Men</h2>
          <ul>
            <li onClick={()=>{navigate("/search/sneakers")}} className="cursor-pointer">Sneakers</li>
            <li onClick={()=>{navigate("/search/Sandals & Floaters")}} className="cursor-pointer">Sandals & Floaters</li>
            <li onClick={()=>{navigate("/search/Flip Flops")}} className="cursor-pointer">Flip Flops</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {/* col */}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Women</h2>
          <ul>
            <li onClick={()=>{navigate("/search/flats")}} className="cursor-pointer">Flats</li>
            <li onClick={()=>{navigate("/search/heels")}} className="cursor-pointer">Heels</li>
            <li onClick={()=>{navigate("/search/boots")}} className="cursor-pointer">Boots</li>
            <li onClick={()=>{navigate("/search/sneakers")}} className="cursor-pointer">Sneakers</li>
          </ul>
        </div>
      </div>
    </div>
 
  )
}
