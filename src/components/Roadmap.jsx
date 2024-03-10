import React from "react";
import {
  RoadMapCircle,
  RoadmapFlight,
  RoadmapRoundedLine,
} from "./common/Icons";
import Image from "next/image";
import { roadmapCards } from "./common/Helper";
import { useGlobalInfoProvider } from "./common/CommonProvider";

const Roadmap = () => {
  const { roadmapRef } = useGlobalInfoProvider();
  return (
    <section
      id="roadmap"
      ref={roadmapRef}
      className="pt-[60px] sm:pt-[72px] pb-[110px] lg:py-[135px] bg-[#141310] bg-cover bg-no-repeat overflow-hidden relative"
    >
      <Image
        className="absolute top-0 end-0 w-1/3 h-[1600px]"
        width="1700"
        height="980"
        src="/assets/images/svg/right-wave.svg"
        alt="add card items"
      />
      <Image
        className="absolute top-1/2  start-0 w-[15%] min-[1320px]:w-[14%] h-[1600px]"
        width="1700"
        height="980"
        src="/assets/images/svg/left-wave.svg"
        alt="add card items"
      />
      <span className="absolute z-10 sm:w-[100px ] md:w-[90px] lg:w-[100px] xl:w-[100px] sm:h-[100px] md:h-[150px] lg:h-[100px] rounded-full bottom-top-0 left-0 blur-[387.5px] bg-[#FFBB00] hidden sm:block"></span>
      <span className="absolute z-10 sm:w-[100px ] md:w-[90px] lg:w-[190px] xl:w-[100px] sm:h-[100px] md:h-[150px] lg:h-[100px] xl:h-[215px] rounded-full bottom-[10%] left-0 blur-[387.5px] bg-[#FFBB00] hidden sm:block"></span>
      {/* <span className="absolute z-10 sm:w-[100px ] md:w-[90px] lg:w-[190px] xl:w-[100px] sm:h-[100px] md:h-[150px] lg:h-[100px] xl:h-[215px] rounded-full bottom-[25%] end-0 blur-[387.5px] bg-[#FFBB00] hidden sm:block"></span> */}
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 relative z-[1]">
        <h3
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="text-[28px] leading-[33.6px] sm:leading-[45px] sm:text-[40px] md:text-[42px] xl:text-2xl lg:leading-[60px] font-extrabold text-center mb-[40px] md:mb-[53px]"
        >
          ROADMAP
        </h3>
        <span className="absolute left-[38px] sm:left-[113px] md:left-[179px] lg:left-[49.2%] translate-x-[-50%] bottom-[-17px] z-[1] hidden lg:inline">
          <RoadMapCircle />
        </span>
        <div className="relative lg:pt-[88px] overflow-hidden">
          <span data-aos="zoom-in" data-aos-easing="linear">
            <span className="absolute left-[46%] translate-x-[-50%] top-0 z-[1] hidden lg:inline">
              <RoadmapFlight />
            </span>
          </span>
          <span
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-delay="300"
          >
            <span className="absolute left-[50%] translate-x-[-50%] top-0 z-[-1] hidden lg:inline">
              <RoadmapRoundedLine />
            </span>
          </span>
          <span
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-delay="300"
            className="absolute left-[19.5px] sm:left-[93px] md:left-[158px] top-0 z-[-1] lg:hidden h-full"
          >
            <Image
              className="h-full"
              src="/assets/images/png/roadmap_line.png"
              height={100}
              width={5}
              alt="roadmap_line"
            />
          </span>
          {roadmapCards.map((obj, index) => (
            <div
              className={` ${obj.classNameMobile}`}
              key={index}
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-delay="300"
            >
              <div
                className={`flex sm:justify-center gap-[5px] sm:gap-5 lg:gap-3 xl:gap-5 items-center lg:w-1/2 mb-6 lg:mb-0 duration-300 hover:-translate-y-1  ${
                  index % 2 === 1 ? "ml-auto" : "ml-auto lg:ml-0"
                }`}
              >
                <div
                  className={`p-[2px] rounded-[40px] sm:rounded-[50px] ${
                    index % 2 === 1
                      ? "rodmap_border_right order-2"
                      : "rodmap_border_left order-2 lg:order-1"
                  }`}
                >
                  <div
                    className={`bg-[#141310] rounded-[40px] sm:rounded-[50px] pe-0 p-3 sm:p-4 w-full max-w-[390px] sm:max-w-none sm:w-[403px] h-[196px] flex flex-col justify-center items-start ${
                      index % 2 === 1 ? "order-2" : "order-2 lg:order-1"
                    }`}
                  >
                    <button className="border border-[#FFFFFF0F] text-[#FFBB00] text-[12px] sm:text-xs leading-4 sm:leading-[21px] px-[7px] sm:px-[14px] py-[7px] rounded-[94px] mb-2">
                      {obj.cardButton}
                    </button>
                    <h4 className="text-xs sm:text-sm xl:text-[18px] font-extrabold leading-4 sm:leading-5 xl:leading-6 relative uppercase after:content-['*] after:h-[2px] after:w-[77px] after:bg-[#FFBB00] after:absolute after:bottom-[-7px] after:left-0 after:rounded-sm">
                      {obj.cardHeading}
                    </h4>
                    <p className="text-[12px] sm:text-xs xl:text-sm opacity-70 keading-4 sm:leading-5 xl:leading-[20px] mt-3 max-w-[358px] roadmap_para_ellipsis">
                      {obj.CardPara}
                    </p>
                  </div>
                </div>
                <Image
                  className={`max-w-[45px] sm:max-w-[80px] xl:max-w-none ${
                    index % 2 === 1 ? "" : "order-1 lg:order-2"
                  }`}
                  src={obj.cardImg}
                  height={100}
                  width={100}
                  alt="circle img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
