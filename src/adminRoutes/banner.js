import Layout from "./layout";
import BannerForm from "../adminComponents/bannerForm";
import AdminProtectedRoute from "./AdminProtectedRoute";

function Banner() {
  return (
    <AdminProtectedRoute>
      <Layout name="Home">
        <div className="flex flex-col justify-center items-center mt-8">
          <BannerForm category="Home" index={0} />
          <BannerForm category="Women" index={1} />
          <BannerForm category="Men" index={2} />
          <BannerForm category="Accessories" index={3} />
          <BannerForm category="Footwear" index={4} />
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}

export default Banner;
