import { useParams, useNavigate } from "react-router-dom";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaBars, FaRegImage } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../features/product/productSlice";
import { useEffect, useState, useCallback } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { editProductBackend } from "../features/product/productSlice";
import {
  CategoryOptions,
  accSubcategory,
  menSubcategory,
  womenSubcategory,
  product,
  ChangeOptions,
  genderOptions,
} from "../components/AddProduct/Options";
import { logout, refreshToken } from "../features/auth/authSlice";
import { reset as resetAuth } from "../features/auth/authSlice";
import { reset as resetProd } from "../features/product/productSlice";

import {
  colourOptions,
  colourStyles,
} from "../components/AddProduct/Example.tsx";
import SellerProtectedRoute from "./SellerProtectedRoute";

function EditProduct() {
  let { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    isError: isProductError,
  } = useSelector((state) => state.product);
  const isRefreshError = useSelector((state) => state.auth.isError);
  useEffect(() => {
    if (productId) dispatch(editProduct(productId));
  }, [dispatch]);

  const sellerId = useSelector((state) => state.auth.seller._id);

  const { editProd } = useSelector((state) => state.product);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [productType, setProductType] = useState("");
  const [images, setImages] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [dataNotFilled, setDataNotFilled] = useState(false);

  const [XS, setXS] = useState(0);
  const [S, setS] = useState(0);
  const [M, setM] = useState(0);
  const [L, setL] = useState(0);
  const [XL, setXL] = useState(0);
  const [XXL, setXXL] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);
  const [seven, setSeven] = useState(0);
  const [eight, setEight] = useState(0);
  const [nine, setNine] = useState(0);
  const [ten, setTen] = useState(0);
  const [eleven, setEleven] = useState(0);
  const [twelve, setTwelve] = useState(0);

  const [sizechart, setSizechart] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [MRP, setMRP] = useState("");

  const [changeCategory, setChangeCategory] = useState(false);
  const [changeSizeChart, setSizeChart] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [changeGender, setChangeGender] = useState(false);

  useEffect(() => {
    if (editProd) {
      setCategory(editProd.category);
      setSubcategory(editProd.subcategory);
      setProductType(editProd.productType);
      if (editProd.pictures) {
        const newArr = editProd.pictures.map((image) => {
          return image.img;
        });
        newArr.unshift(editProd.cover);
        setImages(newArr);
      }

      setBrandName(editProd.brandName);
      setName(editProd.name);
      setDescription(editProd.description);
      setPrice(editProd.price);
      setMRP(editProd.MRP);
      setColor(editProd.color);
      if (editProd.countInStock) {
        if (category == "footwear") {
          setThree(editProd.countInStock[0].qty);
          setFour(editProd.countInStock[1].qty);
          setFive(editProd.countInStock[2].qty);
          setSix(editProd.countInStock[3].qty);
          setSeven(editProd.countInStock[4].qty);
          setEight(editProd.countInStock[5].qty);
          setNine(editProd.countInStock[6].qty);
          setTen(editProd.countInStock[7].qty);
          setEleven(editProd.countInStock[8].qty);
          setTwelve(editProd.countInStock[9].qty);
        } else {
          setXS(editProd.countInStock[0].qty);
          setS(editProd.countInStock[1].qty);
          setM(editProd.countInStock[2].qty);
          setL(editProd.countInStock[3].qty);
          setXL(editProd.countInStock[4].qty);
          setXXL(editProd.countInStock[5].qty);
        }
      }
      setGender(editProd.gender);
      setSizechart(editProd.sizeChart);
    }
  }, [editProd]);

  useEffect(() => {
    if (isProductError) {
      dispatch(resetAuth());
      dispatch(refreshToken());
    }

    if (isRefreshError) {
      dispatch(logout());
      dispatch(resetProd());
      setTimeout(() => {
        navigate("/seller/signin");
      }, 200);
    }
  }, [isProductError, isRefreshError]);
  // , setCategory,setSubcategory,setProductType,setImages,setBrandName, setName,setDescription, setPrice, setXS,setS,setM, setL, setXL, setXXL,setSizechart

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSizechart(reader.result);
    };
  };

  const removeFile = (image) => (e) => {
    e.preventDefault();
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(image), 1);
    setImages(newFiles);
  };

  const makeCover = (image) => (e) => {
    e.preventDefault();
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(image), 1);
    newFiles.unshift(image);
    setImages(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpg": [".jpg"] },
    maxSize: 5242880*2
  });

  const switchCategory = (cat) => {
    switch (cat) {
      case "men":
        return (
          <Select
            options={menSubcategory}
            onChange={(e) => {
              setSubcategory(e.value);
            }}
          />
        );
      case "women":
        return (
          <Select
            options={womenSubcategory}
            onChange={(e) => {
              setSubcategory(e.value);
            }}
          />
        );
      case "accessories":
        return (
          <Select
            options={accSubcategory}
            onChange={(e) => {
              setSubcategory(e.value);
            }}
          />
        );
      default:
        return <p className="text-red-400">You have not selected a category</p>;
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    let countInStock;
    if (category == "footwear") {
      countInStock = [
        {
          size: "3",
          qty: three,
        },
        {
          size: "4",
          qty: four,
        },
        {
          size: "5",
          qty: five,
        },
        {
          size: "6",
          qty: six,
        },
        {
          size: "7",
          qty: seven,
        },
        {
          size: "8",
          qty: eight,
        },
        {
          size: "9",
          qty: nine,
        },
        {
          size: "10",
          qty: ten,
        },
        {
          size: "11",
          qty: eleven,
        },
        {
          size: "12",
          qty: twelve,
        },
      ];
    } else {
      countInStock = [
        {
          size: "XS",
          qty: XS,
        },
        {
          size: "S",
          qty: S,
        },
        {
          size: "M",
          qty: M,
        },
        {
          size: "L",
          qty: L,
        },
        {
          size: "XL",
          qty: XL,
        },
        {
          size: "XXL",
          qty: XXL,
        },
      ];
    }
    if (
      !brandName ||
      !name ||
      !color ||
      !category ||
      !subcategory ||
      !productType ||
      !description ||
      !price ||
      !sizechart ||
      !gender ||
      !MRP
    ) {
      setDataNotFilled(true);
      return;
    }
    const productData = {
      productId,
      brandName: brandName,
      name: name,
      countInStock,
      color: color,
      category: category,
      subcategory: subcategory,
      productType: productType,
      description: description,
      price: price,
      MRP: MRP,
      pictures: images.slice(1),
      cover: images[0],
      sizeChart: sizechart,
      soldBy: sellerId,
      gender,
      createdOn: new Date(),
    };

    await dispatch(editProductBackend(productData));
    navigate("/seller/products");
  };

  return (
    <SellerProtectedRoute>
      <SidebarXL isActive="products" />
      <nav className="lg:hidden bg-[#000] w-full h-20 sticky">
        <div className="h-20 w-full flex lg:flex-none justify-between">
          <FaBars
            onClick={toggle}
            className="lg:hidden w-14 h-14 p-2 mt-2.5 ml-1 text-[#fff]"
          />
          <CgProfile className="w-14 h-14 p-1 mt-2.5 text-[#fff] mr-1" />
        </div>
      </nav>
      {isOpen ? (
        <Sidebar isOpen={isOpen} isActive="products" toggle={toggle} />
      ) : (
        <></>
      )}

      <div className="lg:ml-[15%]">
        <h3 className="text-[#000] font-extrabold text-xl ml-[20%]">
          Edit Your Product
        </h3>
        <div className="rounded-2xl mx-auto bg-[#000] p-6  w-[90%] h-[68%] sm:h-[55%] sm:mt-8 mt-4 md:w-[80%] sm:w-[90%] lg:w-[60%] lg:h-[70%] lg:mt-8 lg:mx-0  md:mt-8 md:h-[70%]  ">
          {dataNotFilled && (
            <p className="text-red-700 text-sm">
              Please fill all the fields to proceed!
            </p>
          )}
          <form onSubmit={handleFormSubmit}>
            <label className="text-white mb-2 mt-4 font-bold" htmlFor="brand">
              Enter the brand name:
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
              placeholder="Brand Name"
              className="form-input px-4 py-2 rounded-md border-2 w-[100%] mb-4"
            ></input>
            <label htmlFor="name" className="text-white font-bold mb-2">
              Enter the name of the Product:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Product Name"
              className="form-input px-4 py-2 rounded-md border-2 w-[100%] mb-4"
            ></input>

            {!changeCategory ? (
              <div>
                <label htmlFor="category" className="text-white font-bold mb-2">
                  Do you want to change category?
                </label>
                <Select
                  options={ChangeOptions}
                  defaultValue={{ value: "no", label: "No" }}
                  onChange={(e) => {
                    setChangeCategory(e.value);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-wrap mt-2">
                <div className="w-[40%] mr-20">
                  <div className="mb-2">
                    <label htmlFor="category" className="text-white font-bold">
                      Choose a Category
                    </label>
                  </div>
                  <Select
                    options={CategoryOptions}
                    onChange={(e) => {
                      setCategory(e.value);
                    }}
                  />
                </div>
                <div className="w-[40%] ">
                  <div className="mb-2 ">
                    <label htmlFor="category" className="text-white font-bold">
                      Choose a Subcategory
                    </label>
                  </div>
                  {switchCategory(category)}
                </div>
              </div>
            )}

            <div className="mb-2 mt-4">
              <label htmlFor="ProductType" className="text-white font-bold">
                Select the type of the product
              </label>
            </div>
            <Select
              options={product}
              onChange={(e) => {
                setProductType(e.value);
              }}
            />
            <div className="text-white">
              {productType === "Thrift" ? (
                <>
                  <label className="text-white font-bold my-4">
                    Describe the defect/ how old the Product
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Description"
                    className="form-input px-4 py-2 rounded-md border-2 w-[100%] mb-2"
                  ></textarea>
                </>
              ) : (
                <>
                  <label className="text-white font-bold mt-4 mb-2">
                    Enter the product Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="form-input px-4 py-2 rounded-md border-2 w-[100%] mb-2 text-black"
                  ></textarea>
                </>
              )}
            </div>

            <label className="text-white font-bold mb-2">
              Enter the respective quantity for the sizes:{" "}
            </label>
            {category === "footwear" ? (
              <div className="flex flex-wrap justify-start">
                <div className="flex mt-2 mb-4 ">
                  <label htmlFor="3" name="3" className="text-white">
                    3
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setThree(e.target.value);
                      }}
                      type="number"
                      id="3"
                      name="3"
                      value={three}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="4" name="4" className="text-white">
                    4
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setFour(e.target.value);
                      }}
                      type="number"
                      id="4"
                      name="4"
                      value={four}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="5" name="5" className="text-white">
                    5
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setFive(e.target.value);
                      }}
                      type="number"
                      id="5"
                      name="5"
                      value={five}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="6" name="6" className="text-white">
                    6
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setSix(e.target.value);
                      }}
                      type="number"
                      id="6"
                      name="6"
                      value={six}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="7" name="7" className="text-white">
                    7
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setSeven(e.target.value);
                      }}
                      type="number"
                      id="7"
                      name="7"
                      value={seven}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="8" name="8" className="text-white">
                    8
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setEight(e.target.value);
                      }}
                      type="number"
                      id="8"
                      name="8"
                      value={eight}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="9" name="9" className="text-white">
                    9
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setNine(e.target.value);
                      }}
                      type="number"
                      id="9"
                      name="9"
                      value={nine}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="10" name="10" className="text-white">
                    10
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setTen(e.target.value);
                      }}
                      type="number"
                      id="10"
                      name="10"
                      value={ten}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="11" name="11" className="text-white">
                    11
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setEleven(e.target.value);
                      }}
                      type="number"
                      id="11"
                      name="11"
                      value={eleven}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="12" name="12" className="text-white">
                    12
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setTwelve(e.target.value);
                      }}
                      type="number"
                      id="12"
                      name="12"
                      value={twelve}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-between">
                <div className="flex mt-2 mb-4 ">
                  <label htmlFor="XS" name="XS" className="text-white">
                    XS
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setXS(e.target.value);
                      }}
                      type="number"
                      id="XS"
                      name="XS"
                      value={XS}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="S" name="S" className="text-white">
                    S
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setS(e.target.value);
                      }}
                      type="number"
                      id="S"
                      name="S"
                      value={S}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="M" name="M" className="text-white">
                    M
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setM(e.target.value);
                      }}
                      type="number"
                      id="M"
                      name="M"
                      value={M}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="L" name="L" className="text-white">
                    L
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setL(e.target.value);
                      }}
                      type="number"
                      id="L"
                      name="L"
                      value={L}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="XL" name="XL" className="text-white">
                    XL
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setXL(e.target.value);
                      }}
                      type="number"
                      id="XL"
                      name="XL"
                      value={XL}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  <label htmlFor="XXL" name="XXL" className="text-white">
                    XXL
                  </label>
                  <div className="ml-2 ">
                    <input
                      onChange={(e) => {
                        setXXL(e.target.value);
                      }}
                      type="number"
                      id="XXL"
                      name="XXL"
                      value={XXL}
                      className="form-input rounded-md border-2 w-16 text-center"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            )}

            {/*             
            <div className="flex flex-wrap justify-between">
              <div className="flex mt-2 mb-4 ">
                <label htmlFor="XS" name="XS" className="text-white">
                  XS
                </label>
                <div className="ml-2 ">
                  <input
                    onChange={(e) => {
                      setXS(e.target.value);
                    }}
                    type="number"
                    id="XS"
                    name="XS"
                    value={XS}
                    className="form-input rounded-md border-2 w-16 text-center"
                    required
                  ></input>
                </div>
              </div>
              <div className="flex mt-2 mb-4">
                <label htmlFor="S" name="S" className="text-white">
                  S
                </label>
                <div className="ml-2 ">
                  <input
                    onChange={(e) => {
                      setS(e.target.value);
                    }}
                    type="number"
                    id="S"
                    name="S"
                    value={S}
                    className="form-input rounded-md border-2 w-16 text-center"
                    required
                  ></input>
                </div>
              </div>
              <div className="flex mt-2 mb-4">
                <label htmlFor="M" name="M" className="text-white">
                  M
                </label>
                <div className="ml-2 ">
                  <input
                    onChange={(e) => {
                      setM(e.target.value);
                    }}
                    type="number"
                    id="M"
                    name="M"
                    value={M}
                    className="form-input rounded-md border-2 w-16 text-center"
                    required
                  ></input>
                </div>
              </div>
              <div className="flex mt-2 mb-4">
                <label htmlFor="L" name="L" className="text-white">
                  L
                </label>
                <div className="ml-2 ">
                  <input
                    onChange={(e) => {
                      setL(e.target.value);
                    }}
                    type="number"
                    id="L"
                    name="L"
                    value={L}
                    className="form-input rounded-md border-2 w-16 text-center"
                    required
                  ></input>
                </div>
              </div>
              <div className="flex mt-2 mb-4">
                <label htmlFor="XL" name="XL" className="text-white">
                  XL
                </label>
                <div className="ml-2 ">
                  <input
                    onChange={(e) => {
                      setXL(e.target.value);
                    }}
                    type="number"
                    id="XL"
                    name="XL"
                    value={XL}
                    className="form-input rounded-md border-2 w-16 text-center"
                    required
                  ></input>
                </div>
              </div>
              <div className="flex mt-2 mb-4">
                <label htmlFor="XXL" name="XXL" className="text-white">
                  XXL
                </label>
                <div className="ml-2 ">
                  <input
                    onChange={(e) => {
                      setXXL(e.target.value);
                    }}
                    type="number"
                    id="XXL"
                    name="XXL"
                    value={XXL}
                    className="form-input rounded-md border-2 w-16 text-center"
                    required
                  ></input>
                </div>
              </div>
            </div> */}
            {changeGender ? (
              <div>
                <label className="text-white font-bold mt-4 mb-2">
                  Select Gender
                </label>
                <Select
                  options={genderOptions}
                  onChange={(e) => {
                    setGender(e.value);
                  }}
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="sizeChart"
                  className="text-white font-bold mb-2"
                >
                  Do you want to change the product gender?
                </label>
                <Select
                  options={ChangeOptions}
                  defaultValue={{ value: "no", label: "No" }}
                  onChange={(e) => {
                    setChangeGender(e.value);
                  }}
                />
              </div>
            )}
            {changeColor ? (
              <div>
                <label className="text-white font-bold mt-4 mb-2">
                  Select Product Color
                </label>
                <Select
                  options={colourOptions}
                  styles={colourStyles}
                  onChange={(e) => {
                    setColor(e.value);
                  }}
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="sizeChart"
                  className="text-white font-bold mb-2"
                >
                  Do you want to change the product color?
                </label>
                <Select
                  options={ChangeOptions}
                  defaultValue={{ value: "no", label: "No" }}
                  onChange={(e) => {
                    setChangeColor(e.value);
                  }}
                />
              </div>
            )}
            <div>
              <label className="text-white font-bold mt-4 mb-2">
                Enter the discounted Price (This is the price you will receive)
              </label>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                className="form-input px-4 py-2 rounded-md border-2 w-[100%] mb-4"
              ></input>
            </div>
            <div>
              <label className="text-white font-bold mt-4 mb-2">
                Enter the MRP of the Product
              </label>
              <input
                value={MRP}
                onChange={(e) => {
                  setMRP(e.target.value);
                }}
                type="number"
                className="form-input px-4 py-2 rounded-md border-2 w-[100%] mb-4"
              ></input>
            </div>
            <label className="text-white font-bold mt-2 mb-2">
              Add Product Images:
            </label>
            <div
              className="border-2 border-dotted bg-slate-50 h-[200px] text-center"
              {...getRootProps()}
            >
              <input {...getInputProps()}></input>
              {isDragActive
                ? "Drop your files here - ratio (3:4)"
                : "You can drop your files here"}
            </div>
            {images?.length > 0 ? (
              <div>
                <label className="text-white font-bold mt-4">
                  Product Images Preview (Select a cover picture)
                </label>
                <div className="flex flex-wrap justify-start bg-white mt-2 rounded-md p-2">
                  {images?.map((image, index) => (
                    <div key={index}>
                      <button
                        onClick={makeCover(image)}
                        className="rounded border-2 bg-white text-green-600 ml-2"
                      >
                        <FaRegImage />
                      </button>
                      <button
                        onClick={removeFile(image)}
                        className="rounded border-2 bg-white text-red-600 "
                      >
                        <RiDeleteBin6Line />
                      </button>
                      {index === 0 ? (
                        <img
                          src={image}
                          className="w-24 h-32 border-4 mx-2 border-green-600"
                        ></img>
                      ) : (
                        <img src={image} className="w-24 h-32 mx-2"></img>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            {changeSizeChart ? (
              <div>
                <label className="text-white font-bold mt-4 mb-2">
                  Upload size chart for your product
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .svg, .png"
                  onChange={handleChange}
                  className="p-2 font-bold text-white text-wrap"
                  required
                  file={sizechart}
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="sizeChart"
                  className="text-white font-bold mb-2"
                >
                  Do you want to change sizechart?
                </label>
                <Select
                  options={ChangeOptions}
                  defaultValue={{ value: "no", label: "No" }}
                  onChange={(e) => {
                    setSizeChart(e.value);
                  }}
                />
              </div>
            )}
            {dataNotFilled && (
              <p className="text-red-700 text-sm">
                Please fill all the fields to proceed!
              </p>
            )}

            <div className="flex justify-center">
              {isLoading ? (
                <button className="bg-[#df1f98de] mt-6 w-32 rounded-full text-white px-2 py-1.5 font-bold">
                  <svg
                    role="status"
                    className="inline w-8 h-8 mx-2 text-[#df1f98de] animate-spin dark:text-[#df1f98de] fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </button>
              ) : (
                <input
                  type="submit"
                  className=" py-2 mt-4 ml-2 font-bold px-4 rounded-full bg-[#dd00ae] text-white text-center"
                  value="Update Product"
                  disabled={isLoading}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </SellerProtectedRoute>
  );
}

export default EditProduct;
