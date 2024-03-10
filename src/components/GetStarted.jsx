import Image from "next/image";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <div className="xl:pt-[172px] lg:pt-[130px] pt-[100px] overflow-hidden">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
        <div className="flex flex-col items-center lg:items-start justify-between lg:border-[11px] lg:border-solid lg:border-[#FFBB0008] rounded-lg lf:bg-[#12110F] xl:px-14 xl:py-[70px] lg:px-[46px] lg:py-14 relative">
          <div
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-delay="300"
            className="xl:max-w-[473px] max-w-[391px]"
          >
            <h3 className="font-extrabold text-[28px] leading-[36px] sm:text-[41.4px] xl:text-2xl sm:leading-[54px] xl:leading-[65px] text-white mb-0 lg:text-start text-center">
              GET STARTED
            </h3>
            <p className="font-normal text-[13px] xl:text-sm leading-5 xl:leading-6 text-white mb-0 opacity-70 mt-3 xl:mt-[15px] lg:text-start text-center">
              Blocky Bites is your token into the metaverse, so join us today.
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-delay="300"
            className="lg:absolute lg:top-[-90px] xl:top-[-90px] lg:-end-3 lg:w-[470px] lg:h-[376px] xl:w-[560px] xl:h-[430px] sm:w-3/4 overflow-hidden mt-10 lg:mt-0"
          >
            <Image
              className="w-full h-full hidden lg:block"
              width="576"
              height="400"
              src="/assets/images/webp/get_started_img.webp"
              alt="add card items"
            />
            <Image
              className="sm:w-full sm:h-full w-[348px] h-[278px] group-hover:scale-105 transition-all duration-300 lg:translate-y-8 xl:translate-y-6 lg:hidden"
              width="576"
              height="400"
              src="/assets/images/png/getstarted-img.png"
              alt="add card items"
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-delay="400"
          >
            <Link
              href="#preSale"
              className="uppercase text-xs xl:text-sm font-bold bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] h-[56px] w-[192px] bg-no-repeat duration-300 text-black flex justify-center items-center  mt-8 xl:mt-10 bg_size_full"
            >
              Mint Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
