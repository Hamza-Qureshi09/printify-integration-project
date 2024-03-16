import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";

const ProductCard = ({
  item,
  index,
  router,
  activeImages,
  flippedItems,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  // const [flippedItems, setFlippedItems] = useState(
  //   Array(merchandiseShop.length).fill(false)
  // );
  // const [images, setimages] = useState([]);
  // const [activeImage, setactiveImage] = useState("");

  // React.useEffect(() => {
  //   const imagesUrlArray = item?.images?.map((val) => val?.src);
  //   setimages(imagesUrlArray || []);
  //   setactiveImage(imagesUrlArray?.[2]);
  // }, []);
  // console.log(images, activeImage);
  return (
    <div
      className="w-full md:w-1/3 lg:w-[24%] h-[27rem] flex flex-col gap-4 bg-[#18150E] rounded-xl
hover:shadow-lg hover:backdrop-blur-md outine
shadow-sm shadow-[#ffbb00]
transition duration-300 ease-in-out
hover:shadow-[#ffbb00] px-4 py-6
"
      key={index}
    >
      {/* Div For Image */}
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "50%",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "10px",
          position: "relative",
        }}
      >
        {/* Icon for card flip */}
        <div
          className="flex justify-end items-start absolute top-0 end-0 m-2
"
        >
          <MdOutlineFlipCameraAndroid
            className="text-[#FFBB00] text-[20px] cursor-pointer
        z-10
        "
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          />
        </div>

        <div
          className={`${flippedItems[index] ? "flipped" : "backtooriginal"} `}
        >
          {activeImages?.length >= 1 && (
            <Image
              priority={true}
              src={activeImages[index]}
              width="800"
              height="400"
              alt="merchandise-1"
              className={`object-cover md:object-contain md:object-center`}
            />
          )}
        </div>
      </div>

      {/* Div For Text */}
      <div className="flex justify-between items-center text-white text-[14px]">
        <span className="text-gray-300">Item {index + 1}</span>
        {/* <span className="text-gray-300">Price</span> */}
      </div>

      {/* Div For Name and price value */}
      <div className="flex justify-between items-center text-white text-[14px]">
        <span
          className="text-white
  text-[20px] font-bold
hover:text-[#FFBB00]"
        >
          {/* {item.nftArt} */}
          {item?.title}
        </span>
        {/* <span
    className="text-white
  text-[16px] font-bold"
  >
    234234
  </span> */}
      </div>

      {/* Button For Shop Now */}
      <div
        className="uppercase text-xs lg:text-sm font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto
  cursor-pointer mt-6
"
      >
        <a href={`/MerchandiseShopItem/${item?.id}`} className="">
          <span
            onClick={() => {
              localStorage.setItem("product", JSON.stringify(item));
            }}
            className="flex justify-center items-center gap-2 text-white text-[20px] font-bold"
          >
            Shop Now
            <MdOutlineShoppingBag className="inline-block mr-2" />
          </span>
        </a>
        {/* <button
          onClick={() => {
            router.push(``);
            // dispatch(
            //   productDetailsAction({
            //     itemDetails: item,
            //   })
            // );
          }}
          className="
    "
        ></button> */}
      </div>
    </div>
  );
};

export default ProductCard;
