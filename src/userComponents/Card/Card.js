import { useState, useEffect } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./cards.css";
import axios from "axios";
import uniqid from "uniqid";
import HomeProductCard from "../ProductsComponent/HomeProductCard";

function Card({ index }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fun = async () => {
      try {
        let URL = `https://laviour.herokuapp.com/api/getBannerProducts/`;
        const response = await axios.get(URL + index);
        setProducts(response.data);
      } catch (err) {
        // alert("An error occured");
      }
    };
    fun();
  }, []);
  var settings = {
    arrow: true,
    infinite: false,
    // speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <MdArrowForwardIos className="text-2xl" />,
    prevArrow: <MdArrowBackIos className="w-40 h-40 " />,
    swipeToScroll: true,
    initialSlide: 0,
    className: "react__slick__slider__home",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
          swipeToScroll: true,
          infinite: true,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 7000,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 3,
          swipeToScroll: true,
          infinite: true,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          swipeToScroll: true,
          infinite: true,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 5000,
        },
      },
    ],
  };
  const prodCards = products?.map((product, index) => {
    return (
      <HomeProductCard
        key={uniqid()}
        id={product?._id}
        image={product?.cover}
        title={product?.brandName}
        description={product?.name}
        cost={product?.sellingPrice}
        mrp={product?.MRP}
        soldBy={product?.soldBy}
      />
    );
  });

  return (
    <div className="w-[90%] lg:h-[500px] h-auto mx-auto">
      <Slider className="" {...settings}>
        {prodCards}
      </Slider>
    </div>
  );
}

export default Card;
