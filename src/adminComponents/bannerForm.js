import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminProtectedRoute from "../adminRoutes/AdminProtectedRoute";
import { logout } from "../features/admin/adminAuthSlice";
import { add, reset } from "../features/admin/adminSlice";

function BannerForm({ category, index }) {
  const [bannerPic, setBannerPic] = useState("");
  const [bannerMobilePic, setBannerMobilePic] = useState("");
  const { isError } = useSelector((state) => state.banner);
  const [productIdArr, setProductIdArr] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [productId1, setProductId1] = useState("");
  const [productId2, setProductId2] = useState("");
  const [productId3, setProductId3] = useState("");
  const [productId4, setProductId4] = useState("");
  const [productId5, setProductId5] = useState("");
  const [productId6, setProductId6] = useState("");
  const [productId7, setProductId7] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      dispatch(reset());
      dispatch(logout());
      navigate("/admin/signin");
    }
  }, [isError]);

  const handleHomeBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBannerPic(reader.result);
    };
  };
  const handleHomeMobileBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBannerMobilePic(reader.result);
    };
  };
  return (
    <AdminProtectedRoute>
      <div>
        <h1 className="font-bold text-xl">
          NOTE: UPDATE ONLY ONE CATEGORY AT A TIME!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              add({ index: index, bannerPic, productIdArr, bannerMobilePic })
            );
            setProductIdArr(["", "", "", "", "", "", ""]);
            setProductId1("");
            setProductId2("");
            setProductId3("");
            setProductId4("");
            setProductId5("");
            setProductId6("");
            setProductId7("");
          }}
          className="my-2 flex flex-col"
        >
          <div>
            <label for={category} className="mr-4">
              Select {category} Banner:{" "}
            </label>
            <input
              type="file"
              id={category}
              accept="image/*"
              className="text-sm text-grey-500 ml-12 mb-4
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            hover:file:bg-[#f4efef] hover:file:text-[#000]
            file:cursor-pointer file:bg-pink-50
          file:text-[#db1d8f]"
              onChange={handleHomeBanner}
              required
            />
          </div>
          <div>
            <label for={category} className="mr-4">
              Select {category} mobile Banner:{" "}
            </label>
            <input
              type="file"
              id={category}
              accept="image/*"
              onChange={handleHomeMobileBanner}
              className="text-sm text-grey-500 mb-4
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            hover:file:bg-[#f4efef] hover:file:text-[#000]
            file:cursor-pointer file:bg-pink-50
          file:text-[#db1d8f]"
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 1 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId1(e.target.value);
                let arr = productIdArr;
                arr[0] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId1}
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 2 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId2(e.target.value);
                let arr = productIdArr;
                arr[1] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId2}
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 3 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId3(e.target.value);
                let arr = productIdArr;
                arr[2] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId3}
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 4 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId4(e.target.value);
                let arr = productIdArr;
                arr[3] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId4}
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 5 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId5(e.target.value);
                let arr = productIdArr;
                arr[4] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId5}
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 6 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId6(e.target.value);
                let arr = productIdArr;
                arr[5] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId6}
              required
            />
          </div>
          <div className="my-2">
            <label>Enter product id for 7 product</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => {
                setProductId7(e.target.value);
                let arr = productIdArr;
                arr[6] = e.target.value;
                setProductIdArr(arr);
              }}
              value={productId7}
              required
            />
          </div>
          <input
            type="submit"
            className="mx-auto items-center p-2 bg-[#db1d8f] text-[#fff] font-bold px-8"
          />
        </form>
      </div>
    </AdminProtectedRoute>
  );
}

export default BannerForm;
