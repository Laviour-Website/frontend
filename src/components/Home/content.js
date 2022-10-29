import img1 from "../../images/fashion1.svg";
import img2 from "../../images/fashion2.svg";
import img3 from "../../images/fashion3.svg";
import img4 from "../../images/fashion4.svg";

function Content() {
  return (
    <div className="md:w-1/2  text-black">
      <div className="w-2/3 mx-auto">
        <div className="mt-4">
          <h1 className="text-3xl text-center font-bold ">
            Reaching out to all the small business of Instagram
          </h1>
        </div>
        <br />

        <div>
          <div className="md:flex my-4 border-2 border-radius rounded-lg p-3">
            <img className="w-40 h-24 m-1" src={img1}></img>
            <div>
              <h3 className="text-2xl font-extrabold ml-3">
                Millions of Customers
              </h3>
              <p className="text-xl tracking-tighter self-center text-left ml-3 mt-2">
                We reach out to an ever-growing, highly engaged, beauty-focused
                audience
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="md:flex-nowrap md:flex-row-reverse md:flex  my-4   border-2 border-radius rounded-lg p-3">
            <img className="w-40 h-24 m-1" src={img2}></img>
            <div>
              <h3 className="text-2xl font-extrabold ">
                Trendsetters in Beauty
              </h3>
              <p className="text-xl tracking-tighter self-center text-left mt-2">
                Customers look to us for the latest beauty trends making us the
                country's largest beauty influencers
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="md:flex my-4  border-2 border-radius rounded-lg p-3 ">
            <img className="w-40 h-24 m-1" src={img3}></img>
            <div>
              <h3 className="text-2xl font-extrabold ml-3">Customer Centric</h3>
              <p className="text-xl tracking-tighter self-center text-left ml-3 mt-2 ">
                Through our wide assortment, competitive pricing and timely
                deliveries, we ensure our customers are always happy
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="md:flex md:flex-nowrap md:flex-row-reverse my-4  border-2 border-radius rounded-lg p-3 ">
            <img className="w-40 h-24 ml-3" src={img4}></img>
            <div>
              <h3 className="text-2xl font-extrabold">Pan India Delivery</h3>
              <p className="text-xl tracking-tighter self-center text-left mt-2">
                We deliver 24x7 to all corners of the country and have offline
                retail stores in all major cities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
