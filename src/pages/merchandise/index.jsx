import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackToTop from "@/components/common/BackToTop";
import Preloader from "@/components/common/Preloader";
import Image from "next/image";


import { useRouter } from "next/router";

import { IoIosArrowForward } from "react-icons/io";
import { merchandiseShop } from "@/components/common/Helper";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";
// import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Mint() {

    const router = useRouter();
    const [scriptLoaded, setScriptLoaded] = useState(false);
  
  
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
  
    const [flippedItems, setFlippedItems] = useState(
      Array(merchandiseShop.length).fill(false)
    );
  
    const handleMouseEnter = (index) => {
      setFlippedItems((prevFlippedItems) => {
        const newFlippedItems = [...prevFlippedItems];
        newFlippedItems[index] = true;
        return newFlippedItems;
      });
    };
  
    const handleMouseLeave = (index) => {
      setFlippedItems((prevFlippedItems) => {
        const newFlippedItems = [...prevFlippedItems];
        newFlippedItems[index] = false;
        return newFlippedItems;
      });
    };



  return (
    <div className="overflow-x-hidden">
      {/* {videoEnd ? ( */}
      <>
        <Header />


        <section className="w-full h-full pt-20 pb-4 md:py-12 px-12 md:px-40 ">
        {/* Div for image and description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 justify-start md:justify-center items-center">
          <span
            className="imageMagnifier"
            style={{ width: "100%", height: "100%", marginTop: "10rem" }}
          >
            <Zoom>
              <Image
                alt="thatwanakatree"
                src="/assets/images/png/figure.png"
                width="300"
                height="800"
                className="h-[400px] w-[400px] md:h-[400px] md:w-[400px] "
              />
            </Zoom>
          </span>
          <span className="mt-4 md:mt-16">
            <h1 className="text-[#FFBB00] text-[24px] font-bold mb-2">
            Blocky Bite Figurine
            </h1>
            <div
              
              className="text-white text-1xl "
            >Introducing the Blocky Bite Figurine: your next must-have collectible. This charming character stands at approximately 4 inches tall, perfectly sized to display wherever you choose. Made from durable, high-quality vinyl, the Blocky Bite Figurine boasts vibrant colors and a unique, block-style design that adds a playful twist to your collection.</div>
          </span>
        </div>

        {/* Div for name, price and size dropdown menu */}
        <div className="mt-12">
          <span className="flex items-center gap-40">
            <h1 className="text-[#FFBB00] text-[20px] font-bold mb-2">
            Blocky Bite Figurine
            </h1>
            <p>50.00</p>
          </span>

          <span>
            <select
              name="size"
              id="size"
              className="w-1/2 p-2 mt-4 bg-gray-800 text-[#FFBB00] text-[14px] font-bold
              cursor-pointer border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00] focus:ring-opacity-50
              text-white
              "
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
            </select>
          </span>

          {/* Shop Now Button */}
          <button
            className="uppercase text-xs md:text-lg font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full md:w-[25rem] bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto
          cursor-pointer mt-8 md:mt-20
          "
          >
            Shop Now
            <IoIosArrowForward
              className="text-[20px]
            "
            />
            <PayPalScriptProvider
              options={{
                clientId:
                  "Acxb_9S9ZZEuMvkt7QfV7KqQJcKfypd-O6Gqa_Ak--Pfs0IpFbg9gn7cKvPmlFGlsOPnqnw8vbVki5ck",
              }}
            >
              <PayPalButtons
                amount={itemPrice}
                style={{ layout: "horizontal" }}
              />
            </PayPalScriptProvider>
          </button>

          {/* {scriptLoaded ? <PayPalButton 
          amount={itemPrice}
          onSuccess={(details, data) => {
            console.log(details, data);
          }}
          
          /> : <span>Loading...</span>} */}
        </div>
      </section>


        <Footer />
        <BackToTop />
      </>
      {/* ) : ( */}
      <Preloader />
      {/* <Preloader setVideoEnd={setVideoEnd} videoEnd={videoEnd} /> */}
      {/* )} */}
    </div>
  );
}
