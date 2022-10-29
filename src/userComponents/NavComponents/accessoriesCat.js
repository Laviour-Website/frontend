import { useNavigate } from "react-router-dom";

function AccessoriesCat() {
  const navigate=useNavigate();
  return ( 
    <div className="flex w-[100%] bg-[#fff] border-b-4 border-[#222] absolute left-0 justify-center z-20 mt-3">
    <div className="p-4">
      {/* col*/}
      <div className="m-4">
        {/* sec*/}
        <h2 className="font-bold mb-2">New Arrivals</h2>
        <ul>
          <li onClick={()=>{navigate("/category/accessories")}} className="cursor-pointer">View All</li>
          <li onClick={()=>{navigate("/category/accessories")}} className="cursor-pointer">Jewellery</li>
        </ul>
      </div>
      <div className="m-4">
        {/* sec*/}
        <h2 className="font-bold mb-2">Micellaneous</h2>
        <ul>
         <li onClick={()=>{navigate("/search/rings")}} className="cursor-pointer">Rings</li>
         <li onClick={()=>{navigate("/search/earrings")}} className="cursor-pointer">Earrings</li>
         <li onClick={()=>{navigate("/search/bracelets")}} className="cursor-pointer">Bracelets</li>
         <li onClick={()=>{navigate("/search/sunglasses")}} className="cursor-pointer">Sunglasses</li>
        </ul>
      </div>   
    </div>
    <div className="p-4">
      {/* col */}
      <div className="m-4">
        {/* sec*/}
        <h2 className="font-bold mb-2">Women Chains</h2>
        <ul>
          <li onClick={()=>{navigate("/search/Trendy Gold & Silver Chains")}} className="cursor-pointer">Trendy Gold & Silver Chains</li>
        </ul>
      </div>
      <div className="m-4">
        {/* sec*/}
        <h2 className="font-bold mb-2">Hair Accessories</h2>
        <ul>
         <li onClick={()=>{navigate("/search/Scrunchies")}} className="cursor-pointer">Scrunchies</li>
        </ul>
      </div>
    </div>
    <div className="p-4">
      {/* col */}
      <div className="m-4">
        {/* sec*/}
        <h2 className="font-bold mb-2">Men Accessories</h2>
        <ul>
          <li onClick={()=>{navigate("/search/Ring")}} className="cursor-pointer">Ring</li>
          <li onClick={()=>{navigate("/search/Pendant")}} className="cursor-pointer">Pendant</li>
          <li onClick={()=>{navigate("/search/Bracelets")}} className="cursor-pointer">Bracelets</li>
          <li onClick={()=>{navigate("/search/Chains")}} className="cursor-pointer">Chains</li>
          <li onClick={()=>{navigate("/search/Sunglasses")}} className="cursor-pointer">Sunglasses</li>
        </ul>
      </div>
    </div>
  </div>
   );
}

export default AccessoriesCat;