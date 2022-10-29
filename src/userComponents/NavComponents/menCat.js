import { useNavigate } from "react-router-dom";
function MenCat() {
  const navigate=useNavigate();
  return ( 
    <div className="flex z-20 w-[100%] bg-[#fff] border-b-4 border-[#222] absolute left-0 justify-center mt-3">
      <div className="p-4">
        {/* col*/}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">New Arrivals</h2>
          <ul>
            <li onClick={()=>{navigate("/search/men")}}>View All</li>
            <li onClick={()=>{navigate("/search/men")}}>Clothes</li>
          </ul>
        </div>
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Top wear</h2>
          <ul>
          <li onClick={()=>{navigate("/search/t-shirts")}}  className="cursor-pointer">T-Shirts</li>
            <li onClick={()=>{navigate("/search/casual shirts")}} className="cursor-pointer">Casual Shirts</li>
            <li onClick={()=>{navigate("/search/formal shirts")}} className="cursor-pointer">Formal Shirts</li>
            <li onClick={()=>{navigate("/search/sweatshirts")}} className="cursor-pointer">Sweatshirts</li>
            <li onClick={()=>{navigate("/search/sweaters")}} className="cursor-pointer">Sweaters</li>
            <li onClick={()=>{navigate("/search/hoodies")}} className="cursor-pointer">Hoodies</li>
            <li onClick={()=>{navigate("/search/jackets")}} className="cursor-pointer">Jackets</li>
            <li onClick={()=>{navigate("/search/blazers & coats")}} className="cursor-pointer">Blazers & Coats</li>
            <li onClick={()=>{navigate("/search/suits")}} className="cursor-pointer">Suits</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {/* col */}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Bottom Wear</h2>
          <ul>
           <li onClick={()=>{navigate("/search/jeans")}} className="cursor-pointer">Jeans</li>
           <li onClick={()=>{navigate("/search/casual trousers")}} className="cursor-pointer">Casual Trousers</li>
           <li onClick={()=>{navigate("/search/formal trousers")}} className="cursor-pointer">Formal Trousers</li>
           <li onClick={()=>{navigate("/search/shorts")}} className="cursor-pointer">Shorts</li>
           <li onClick={()=>{navigate("/search/Track Pants & Joggers")}} className="cursor-pointer">Track Pants & Joggers</li>
          </ul>
        </div>
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Indian Wear</h2>
          <ul>
           <li onClick={()=>{navigate("/search/Kurtas & Kurta Sets")}} className="cursor-pointer">Kurtas & Kurta Sets</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {/* col */}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Accessories</h2>
          <ul>
            <li onClick={()=>{navigate("/search/Ring")}} className="cursor-pointer">Ring</li>
            <li onClick={()=>{navigate("/search/Pendant")}} className="cursor-pointer">Pendant</li>
            <li onClick={()=>{navigate("/search/Bracelets")}} className="cursor-pointer">Bracelets</li>
            <li onClick={()=>{navigate("/search/Chains")}} className="cursor-pointer">Chains</li>
          </ul>
        </div>
      </div>
    </div>
   );
}

export default MenCat;