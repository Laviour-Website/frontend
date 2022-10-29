import Content from "../components/Home/content";
import Verify from "../components/Home/verify";
import logoS from "../images/laviour.png";
import Layout from "../components/Layout.js";

function Seller() {
  return (
    <>
      <Layout
        bgColor="#000"
        imgSrc={logoS}
        buttonText="Sign In"
        buttonTo="/seller/signin"
      >
        <br />
        <div className="md:flex md:flex-row-reverse md:justify-evenly">
          <Verify></Verify>
          <Content></Content>
        </div>
      </Layout>
    </>
  );
}

export default Seller;
