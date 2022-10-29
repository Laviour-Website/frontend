import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function Admin() {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin);
  useEffect(() => {
    if (!admin) {
      navigate("/admin/signin");
    } else {
      navigate("/admin/banners");
    }
  }, []);
  return <></>;
}

export default Admin;
