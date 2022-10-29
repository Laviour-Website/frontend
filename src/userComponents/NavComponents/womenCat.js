import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WomenCat() {
  const navigate = useNavigate();
  return (
    <div className="flex w-[100%] z-20 bg-[#fff] border-b-4 border-[#222] absolute left-0 justify-center mt-3">
      <div className="p-4">
        {/* col*/}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">New Arrivals</h2>
          <ul>
            <li onClick={()=>{navigate("/category/women")}} className="cursor-pointer">View All</li>
            <li onClick={()=>{navigate("/category/women")}} className="cursor-pointer">Clothes</li>
          </ul>
        </div>
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Trending Now</h2>
          <ul>
            <li onClick={()=>{navigate("/search/Cute Summer Dress")}} className="cursor-pointer">Cute Summer Dress</li>
            <li onClick={()=>{navigate("/search/Ribbed tops")}} className="cursor-pointer">Ribbed tops</li>
            <li onClick={()=>{navigate("/search/Satin Slip Dress")}} className="cursor-pointer">Satin Slip Dress</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {/* col */}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Western Wear</h2>
          <ul>
            <Link to="/search/dresses" className="block  cursor-pointer">
              Dresses
            </Link>
            <Link to="/search/tops" className="block cursor-pointer">
              Tops
            </Link>
            <Link to="/search/t-shirts" className="block cursor-pointer">
              T-shirts
            </Link>
            <Link to="/search/trousers & capris" className="block cursor-pointer">
              Trousers & Capris
            </Link>
            <Link to="/search/shorts & skirts" className="block cursor-pointer">
              Shorts & Skirts
            </Link>
            <Link to="/search/denim jeans" className="block cursor-pointer">
              Denim Jeans
            </Link>
            <Link to="/search/co-ords" className="block cursor-pointer">
              Co-ords
            </Link>
            <Link to="/search/jumpsuits" className="block cursor-pointer">
              Jumpsuits
            </Link>
            <Link to="/search/sweatshirts" className="block cursor-pointer">
              SweatShirts
            </Link>
            <Link to="/search/hoodies" className="block cursor-pointer">
              Hoodies
            </Link>
            <Link to="/search/jackets" className="block cursor-pointer">
              Jackets
            </Link>
            <Link to="/search/blazers" className="block cursor-pointer">
              Blazers
            </Link>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {/* col */}
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Indian Wear</h2>
          <ul>
            <Link to="/search/kurtis" className="block cursor-pointer">
              Kurtis
            </Link>
            <Link to="/search/leggings & palazzo" className="block cursor-pointer">
              Leggings & Palazzo
            </Link>
            <Link to="/search/tunics & tops" className="block cursor-pointer">
              Tunics & Tops
            </Link>
            <Link to="/search/dupattas" className="block cursor-pointer">
              Dupattas
            </Link>
          </ul>
        </div>
        <div className="m-4">
          {/* sec*/}
          <h2 className="font-bold mb-2">Accessories</h2>
          <ul>
            <Link to="/search/earrings" className="block cursor-pointer">
              Earrings
            </Link>
            <Link to="/search/jewellery set" className="block cursor-pointer">
              Jewellery Set
            </Link>
            <Link to="/search/Ring" className="block cursor-pointer">
              Ring
            </Link>
            <Link to="/search/pendant" className="block cursor-pointer">
              Pendant
            </Link>
            <Link to="/search/bracelets" className="block cursor-pointer">
              Bracelets
            </Link>
            <Link to="/search/chains" className="block cursor-pointer">
              Chains
            </Link>``
          </ul>
        </div>
      </div>
    </div>
  );
}
