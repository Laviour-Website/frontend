import img4 from "../../images/banner4.webp";

function ImgBanner() {
  return (
    <div className="flex justify-center max-w-[100vw]">
      {/* <img className="w-[45%] h-[100%]" src={img1}></img>
        <img className="w-[45%] h-[100%]" src={img2}></img> */}
      <img
        className=" hidden sm:block w-[100%] h-[100%] object-contain"
        src={img4}
      ></img>
      {/* <img
        className="sm:hidden w-[100%] h-[500px] object-cover"
        src={mobileBanner}
      ></img> */}
    </div>
  );
}

export default ImgBanner;
