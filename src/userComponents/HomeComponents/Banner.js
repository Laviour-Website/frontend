import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";

export default function Banner({ index }) {
  const [banners, setBanners] = useState({});

  useEffect(() => {
    try {
      const fun = async () => {
        let URL = `https://laviour.herokuapp.com/api/getBanners/`;
        const response = await axios.get(URL + index);
        setBanners(response.data);
      };
      fun();
    } catch (err) {}
  }, []);

  return (
    <div className=" w-full">
      <img
        className=" hidden sm:block w-[100%] h-[100%] object-cover"
        src={banners?.bannerUrl}
      ></img>

      <img
        className="sm:hidden w-[100%] h-[500px] object-cover"
        src={banners?.mobileBannerUrl}
      ></img>
      <Card index={index} />
    </div>
  );
}
