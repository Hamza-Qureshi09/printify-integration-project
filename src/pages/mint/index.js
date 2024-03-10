import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackToTop from "@/components/common/BackToTop";
import Preloader from "@/components/common/Preloader";
import Image from "next/image";
import Block from "@/components/Block";
import {
  LeftSideShadow,
  RightSideShadow,
  SliderArrow,
} from "@/components/common/Icons";
import Slider from "react-slick";
import MintBox from "@/components/MintBox";

export default function Mint() {
  return (
    <div className="overflow-x-hidden">
      {/* {videoEnd ? ( */}
      <>
        <Header />

        <div className="pt-[130px] xl:pt-[162px] pb-24 relative overflow-hidden">
          <Image
            className="absolute top-0 start-0 w-1/2 hidden md:flex"
            width="302"
            height="320"
            src="/assets/images/svg/team-wave.svg"
            alt="add card items"
          />
          <Image
            className="absolute end-0 bottom-0 w-3/4 hidden md:flex z-[-1]"
            width="302"
            height="320"
            src="/assets/images/svg/team-right-wave.svg"
            alt="add card items"
          />

          <span className="start-0 bottom-0 absolute max-md:w-full max-md:h-full hidden md:block ">
            <LeftSideShadow />
          </span>
          <span className="inline-block shadow-custom w-[161px] h-[161px] rounded-full absolute bottom-0 left-0  md:hidden"></span>
          <span className="inline-block shadow-custom w-[161px] h-[161px] rounded-full absolute top-0 end-0  md:hidden"></span>
          <span className="end-0 top-0 absolute max-md:w-full  max-md:h-full hidden md:block">
            <RightSideShadow />
          </span>
          <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 relative z-10 flex flex-col items-center">
            {" "}
            <h1 className="pt-14 text-[28px] leading-[33.6px] sm:leading-[45px] sm:text-[40px] md:text-[42px] xl:text-2xl lg:leading-[60px] font-extrabold text-center mb-[40px] md:mb-[53px] aos-init aos-animate">
              GET YOUR <br /> BLOCKY BITES
            </h1>
            <Image
              width="376"
              height="400"
              src="/assets/images/webp/get_started_img.webp"
              alt=""
            />
            <MintBox />
          </div>
        </div>

        <Block />

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
