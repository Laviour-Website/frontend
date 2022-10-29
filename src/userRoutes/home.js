import Banner from "../userComponents/HomeComponents/Banner";
import Layout from "../userComponents/Layout";
import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

function Home() {
  let { sidebarOpen } = useContext(SidebarContext);
  return (
    <>
      <Layout>
        <div className={`${sidebarOpen ? "hidden w-[90%]" : ""}`}>
          <div className="w-[100%] ">
            <Banner index={0} />
            <Banner index={1} />
            <Banner index={2} />
            <Banner index={3} />
            <Banner index={4} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
