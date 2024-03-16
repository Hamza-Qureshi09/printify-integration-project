import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { merchandiseShop } from "@/components/common/Helper";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import Link from "next/link";
// import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaStripe } from "react-icons/fa";
import { CreateShipNowOrder, PrintifyProducts } from "@/http";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import FourLoadingCardSkeleton from "@/components/LoadingCardSkeleton";

// get all related printify shop products
const GetPrintifyProducts = async (totalProducts) => {
  const response = await PrintifyProducts({ limit: totalProducts });
  if (response.status === 200) {
    const { data } = response;
    const Products = {
      current_page: data?.data?.current_page,
      data: data?.data?.data,
      from: data?.data?.from,
      last_page: data?.data?.last_page,
      links: data?.data?.links,
      per_page: data?.data?.per_page,
      total: data?.data?.total,
      prev_page_url: data?.data?.prev_page_url,
      last_page_url: data?.data?.last_page_url,
      next_page_url: data?.data?.next_page_url,
    };
    return Products;
  }
};
const MerchandiseShopItem = (params) => {
  const router = useRouter();
  // const { productDetails } = useSelector((state) => state.productSlice);
  const [productDetails, setproductDetails] = useState({});
  const [selectedImage, setselectedImage] = useState(0);
  const [itemSize, setitemSize] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [SelectedVarient, setSelectedVarient] = useState({});

  const formatPriceFunc = (price) => {
    return parseFloat(
      price.toFixed(2).replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1.")
    );
  };

  // queries
  const {
    isLoading,
    error: productsError,
    data: productsData,
    refetch,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      return await GetPrintifyProducts(
        Number(process.env.NEXT_PUBLIC_TotalPrintifyProducts)
      );
    },
    staleTime: 1000 * 60 * 5, // 5mins
    refetchOnWindowFocus: false,
    enabled: true, // Initial fetching
  });

  // handle payment
  const handlePayment = async () => {
    // Validate input fields before placing the order (add your validation logic here)
    if (!itemSize || Object.keys(SelectedVarient).length < 1) {
      return toast.error("Some Details are missing!", {
        autoClose: 3000,
        theme: "dark",
        icon: true,
        position: "bottom-right",
      });
    }

    const payload = {
      varient: {
        ...SelectedVarient,
        price: formatPriceFunc(SelectedVarient["price"]),
      },
      productId: productDetails?.id,
      title: productDetails?.title,
    };

    try {
      const res = await CreateShipNowOrder(payload);
      if (res.status !== 200) {
        console.log(res?.response?.data);
        return toast.error(
          res?.response
            ? res?.response?.data?.message
            : "Shipping failed!\nAn Error Occured!",
          {
            autoClose: 3000,
            theme: "dark",
            icon: true,
            position: "bottom-right",
          }
        );
      }
      if (res.status === 200) {
        const session = res.data;
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        );
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.error(
            "Error during redirect to checkout:",
            result.error?.message
          );
        }
      }
    } catch (error) {
      return toast.error(error ? error?.message : "Payment failed!", {
        autoClose: 3000,
        theme: "dark",
        icon: true,
        position: "bottom-right",
      });
    }
  };

  const { itemName, itemPrice, itemImg, itemImg2, itemDescription } =
    router.query;

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const [flipImage, setFlipImage] = useState(
    Array(merchandiseShop.length).fill(true)
  );

  const handleFlipImage = (index) => () => {
    setFlipImage((prevFlipImage) => {
      const newFlipImage = [...prevFlipImage];
      newFlipImage[index] = !newFlipImage[index];
      return newFlipImage;
    });
  };
  // states
  const [flippedItems, setFlippedItems] = useState(
    Array(productsData?.data.length).fill(false)
  );
  const [activeImages, setactiveImages] = useState([]);
  const [images, setimages] = useState([]);

  const handleMouseEnter = (index) => {
    setFlippedItems((prevFlippedItems) => {
      const newFlippedItems = prevFlippedItems.slice();
      newFlippedItems[index] = true;
      return newFlippedItems;
    });
    const activeImagesUrls = images?.map((items) => {
      const FlippedImage = items.find((val, index) => index === 3 && val);
      return FlippedImage;
    });

    setactiveImages((prevActiveImages) => {
      const newFlippedImages = prevActiveImages.slice();
      newFlippedImages[index] = activeImagesUrls[index];
      return newFlippedImages;
    });
  };

  const handleMouseLeave = (index) => {
    setFlippedItems((prevFlippedItems) => {
      const newFlippedItems = prevFlippedItems.slice();
      newFlippedItems[index] = false;
      return newFlippedItems;
    });
    const activeImagesUrls = images?.map((items) => {
      const FlippedImage = items.find((val, index) => index === 2 && val);
      return FlippedImage;
    });

    setactiveImages((prevActiveImages) => {
      const newFlippedImages = prevActiveImages.slice();
      newFlippedImages[index] = activeImagesUrls[index];
      return newFlippedImages;
    });
  };

  React.useEffect(() => {
    if (productsData?.data) {
      setFlippedItems(Array(productsData?.data.length).fill(false));
      const itemImageUrls = productsData.data.map((item) => {
        const imagesUrlArray = item?.images?.map((val) => val?.src);
        return imagesUrlArray || [];
      });
      setimages(itemImageUrls);

      if (itemImageUrls?.length >= 1) {
        const activeImagesUrls = itemImageUrls?.map((items) => {
          const findActiveImage = items.find(
            (val, index) => index === 2 && val
          );
          return findActiveImage;
        });
        setactiveImages(activeImagesUrls);
      }
    }
  }, [productsData?.data]);

  React.useEffect(() => {
    const productItem = localStorage.getItem("product");
    setproductDetails(JSON.parse(productItem));
  }, []);

  return (
    <div>
      {!modalOpen && (
        <div>
          <div className="z-[10]">
            <Header />
          </div>

          {/* Section for item details */}
          <section className="w-full h-full pt-20 pb-4 md:py-12 px-12 md:px-20 mt-16">
            {/* Div for image and description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 justify-start md:justify-center items-start">
              <span
                style={{ width: "100%", height: "100%" }}
                className="imageMagnifier flex flex-col md:flex-row gap-2 w-full"
              >
                <Zoom>
                  <Image
                    alt="thatwanakatree"
                    src={productDetails?.images?.[selectedImage]?.src}
                    width="400"
                    height="100"
                    className="rounded-lg w-full object-cover md:w-[400px]"
                  />
                </Zoom>
                {/* list of images */}
                <div className="flex flex-row md:flex-col gap-1 max-h-32 md:max-h-[420px] overflow-scroll">
                  {productDetails?.images?.slice(0, 10)?.map((val, index) => {
                    return (
                      <Image
                        key={index}
                        alt="thatwanakatree"
                        src={val?.src}
                        width="100"
                        height="100"
                        className={`rounded-lg cursor-pointer ${
                          selectedImage === index
                            ? "border-[3px] border-yellow-500"
                            : ""
                        }`}
                        onClick={() => setselectedImage(index)}
                      />
                    );
                  })}
                </div>
              </span>
              <span className="mt-4 md:2">
                <h1 className="text-[#FFBB00] text-[24px] font-bold mb-2">
                  {productDetails?.title}
                </h1>
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    productDetails?.description
                  )}
                  className="text-white text-[14px] description"
                ></div>
                {/* tags */}
                <div className="flex flex-row justify-start items-start gap-2 my-4">
                  {productDetails?.tags?.slice(0, 5)?.map((val, index) => {
                    return (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-yellow-500"
                      >
                        # {val}
                      </span>
                    );
                  })}
                </div>
              </span>
            </div>

            <div className="w-full flex flex-col md:flex-row ">
              {/* Size provider and varient selection */}
              <div className="mt-12 mb-10 md:mb-4 md:mt-1 flex flex-row md:w-1/2 w-full gap-2">
                <span className="w-1/2 flex flex-col justify-around items-start gap-1">
                  <h1 className="text-white text-[20px] font-bold">
                    Item Size:
                  </h1>
                  <select
                    name="size"
                    id="size"
                    value={itemSize}
                    onChange={(e) => {
                      if (e.target.value) {
                        setitemSize(e.target.value);
                      }
                    }}
                    className="p-2 mt-4 bg-neutral-800 text-[14px] font-bold
                cursor-pointer border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00] focus:ring-opacity-50
                text-white px-4 w-full h-12
                "
                  >
                    <option value={``}>Select Size</option>
                    {productDetails?.options?.length >= 1 &&
                      productDetails?.options[1]?.values?.map((val, index) => {
                        return (
                          <option key={index} value={`${val?.id}`}>
                            {val?.title}
                          </option>
                        );
                      })}
                  </select>
                </span>

                {/* providers list */}
                <span className="flex flex-col justify-around items-start gap-1 w-1/2">
                  <h1 className="text-white text-[20px] font-bold">
                    Select Provider:
                  </h1>
                  <button
                    onClick={() => {
                      if (itemSize) {
                        setmodalOpen(true);
                      } else {
                        return toast.error("Select Item Size!", {
                          autoClose: 3000,
                          theme: "dark",
                          icon: true,
                          position: "bottom-right",
                        });
                      }
                    }}
                    className="mt-4 px-4 py-2 text-[16px] text-yellow-500 border border-yellow-600 rounded-md hover:bg-yellow-500 hover:text-white transition-all duration-200"
                  >
                    View Provider Info
                  </button>
                </span>
              </div>
              {Object.keys(SelectedVarient)?.length >= 1 && (
                <div className="mt-1 mb-10 md:mb-4 flex flex-col md:w-1/2 w-full gap-2 bg-neutral-900 rounded-md px-4 py-2 border border-yellow-500">
                  <h1 className="text-white text-[20px] font-bold">
                    Selected Varient:
                  </h1>
                  <div className="h-12 w-full flex flex-row  justify-between">
                    <div className="flex flex-col">
                      <div>{SelectedVarient?.title}</div>
                      <div className="flex flex-row gap-1">
                        <p>Price:</p>
                        <span>{formatPriceFunc(SelectedVarient?.price)} $</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-1">
                        <p>Weight:</p>
                        <span>{SelectedVarient?.grams}</span>
                      </div>
                      <div className="flex flex-row gap-1">
                        <p>Avaliablity:</p>
                        <span>
                          {SelectedVarient?.is_available
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-1">
                        <p>Quantity:</p>
                        <span>{SelectedVarient?.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Shop Now Button */}
            <button
              onClick={handlePayment}
              className="uppercase text-xs md:text-lg font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full md:w-[25rem] bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto
            cursor-pointer mt-8 md:mt-20
            "
            >
              Shop Now
              <IoIosArrowForward className="text-[20px]" />
              <FaStripe className="text-2xl" />
              {/* <PayPalScriptProvider
                  options={{
                    clientId:
                      "ARaVRMP3MOMPT53lrjayddba7uXtzpsEqVG309F_UvnsxN-01HO3_Z4TUOm_3kuED3yxB7Fgtxnx-GaM",
                  }}
                >
                  <PayPalButtons
                    amount={itemPrice}
                    style={{ layout: "horizontal" }}
                  />
                </PayPalScriptProvider> */}
            </button>
          </section>

          <div className="flex items-center px-20 py-4 md:px-40 ">
            <hr className="w-full h-0.5 bg-[#FFBB00] mt-2 md:mt-" />
          </div>

          {/*Section for remaining cards display*/}
          <section className="w-full h-full pt-20 pb-4 md:py-12 px-12 md:px-20">
            <div className="w-full h-full">
              <h1 className="text-[#FFBB00] text-[30px] font-bold text-center">
                Shop More
              </h1>
              {/* Card for Item */}
              {isLoading ? (
                <FourLoadingCardSkeleton />
              ) : (
                <div
                  className="w-full h-full mt-12
        md:flex md:flex-row items-center justify-center gap-3 flex-wrap space-y-4 md:space-y-0
        "
                >
                  {productsData?.data?.length >= 1
                    ? productsData?.data?.map((item, index) => {
                        if (item?.id !== productDetails?.id) {
                          return (
                            <ProductCard
                              key={index}
                              item={item}
                              index={index}
                              router={router}
                              activeImages={activeImages}
                              flippedItems={flippedItems}
                              handleMouseEnter={handleMouseEnter}
                              handleMouseLeave={handleMouseLeave}
                            />
                          );
                        }
                      })
                    : "No Product Exist!"}
                </div>
              )}
            </div>
          </section>
          <Footer />
        </div>
      )}
      {/* modal */}
      <div className="z-[20]">
        {modalOpen && (
          <ProviderVarient
            modalOpen={modalOpen}
            setmodalOpen={setmodalOpen}
            SelectedVarient={SelectedVarient}
            itemSize={itemSize}
            setSelectedVarient={setSelectedVarient}
            productDetails={productDetails}
          />
        )}
      </div>
    </div>
  );
};

export default MerchandiseShopItem;

// select provider varient
const ProviderVarient = ({
  setmodalOpen,
  modalOpen,
  SelectedVarient,
  itemSize,
  setSelectedVarient,
  productDetails,
}) => {
  const [varients, setVarients] = React.useState([]);
  React.useEffect(() => {
    productDetails?.variants?.forEach((val) => {
      if (val?.options[1].toString() === itemSize) {
        setVarients((preVal) => {
          return [...preVal, { ...val }];
        });
      }
    });
  }, []);
  return (
    <>
      <ReactModal
        key={"react_modal"}
        isOpen={modalOpen}
        className="bg-neutral-950 drop-shadow-md right-0 left-0 top-0 bottom-0 absolute z-[10] flex flex-col justify-center items-center"
      >
        <div className="h-[450px] w-[90%] md:w-[70%] bg-white p-2 rounded-md blur-0 z-30 text-gray-800">
          <div className="h-12 flex flex-row justify-between items-center px-4">
            <h1 className="text-[20px] font-bold">Provider Information</h1>
            <button onClick={() => setmodalOpen(false)}>
              <IoClose className="hover:text-lg transition-all duration-150" />
            </button>
          </div>
          <hr />
          <div>
            <p className="mt-1 mb-2 px-4 text-xs">
              <b>Group By:</b> <span className="text-yellow-500">Size</span>
            </p>
            <div className="overflow-scroll max-h-[350px] mt-2">
              <table className="min-w-full divide-y divide-gray-200 overflow-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {varients?.length >= 1
                    ? varients?.map((val, index) => {
                        const formattedPrice = parseFloat(
                          val?.price
                            .toFixed(2)
                            .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1.")
                        );
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {val?.title?.split("/")[0]}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <p className="h-10 w-10 rounded-full bg-gray-200 flex flex-col justify-center items-center">
                                    {val?.title?.split("/")[1]}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex flex-col items-center justify-center gap-1">
                              <div className="text-sm text-gray-900">
                                0{val?.quantity}
                              </div>
                              <div className="text-sm text-gray-500">
                                Calculated
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {formattedPrice
                                  ? `${formattedPrice} USD`
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {val?.is_available
                                ? "Available"
                                : "Not Available"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => {
                                  setSelectedVarient(val);
                                  setmodalOpen(false);
                                }}
                                className={`px-2 py-1 ${
                                  SelectedVarient?.id === val?.id
                                    ? "bg-teal-500"
                                    : "bg-blue-500"
                                }  rounded-md text-white`}
                              >
                                {SelectedVarient?.id === val?.id
                                  ? "Selected Varient"
                                  : "Select Varient"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : "N/A"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
