import Image from "next/image";
import React, { useRef, useState } from "react";
import { headerIcons, team } from "./common/Helper";
import { LeftSideShadow, RightSideShadow, SliderArrow } from "./common/Icons";
import Slider from "react-slick";
import { useGlobalInfoProvider } from "./common/CommonProvider";

const Team = () => {
  const { teamRef } = useGlobalInfoProvider();
  const { sliderArrow } = useState("right");
  const HandleClickRight = () => {
    sliderBtn.current.slickNext();
  };
  const HandleClickLeft = () => {
    sliderBtn.current.slickPrev();
  };

  const sliderBtn = useRef();
  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      id="team"
      ref={teamRef}
      className="xl:mt-[178px] md:mt-[153px] mt-[93px] xl:py-[96px] md:pt-[68px] md:pb-[120px] lg:py-[68px] relative pb-[67px]"
    >
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
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 relative z-10">
        <h3
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="font-extrabold uppercase text-[28px] leading-9  sm:text-xl lg:text-2xl md:leading-[65px] text-white text-center mb-0"
        >
          Team
        </h3>
        <div className="lg:[701px] lg:w-[702px] xl:w-[986px] mx-auto relative">
          <span
            onClick={HandleClickLeft}
            className="absolute lg:top-1/2 group hover:bg-[#FFBB00] w-[30px] h-[30px] bottom-[-65px] start-[48%] rounded-full transition duration-300 inline-block -translate-x-[100%] lg:-start-[52px] lg:-translate-y-1/2 cursor-pointer"
          >
            <SliderArrow sliderArrow={sliderArrow} />
          </span>
          <span
            onClick={HandleClickRight}
            className="absolute lg:top-1/2 bottom-[-65px] rotate-180  end-[48%] hover:bg-[#FFBB00] translate-x-[100%] rounded-full transition duration-300 w-[30px] h-[30px] lg:-end-[52px] lg:-translate-y-1/2 cursor-pointer"
          >
            <SliderArrow sliderArrow={sliderArrow} />
          </span>

          <Slider ref={sliderBtn} {...settings}>
            {team.map((data, index) => {
              return (
                <div
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-delay={data.delay}
                  key={index}
                  className="xl:!w-[302px] lg:!w-[214px] min-[375px]:w-[302px] xl:px-5 px-2 md:px-[14px] "
                >
                  <div className="mx-auto relative pb-4 group">
                    <div className="xl:w-[277px] xl:h-[297px] lg:w-[197px] lg:h-[211px] min-[375px]:w-[277px] min-[375px]:h-[297px] w-[255px] h-[280px] absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-[52.5%] lg:-translate-y-[53.5%] xl:-translate-y-[52.5%] -rotate-6 sm:-rotate-3 md:-rotate-6 border-2 rounded-lg bg-[#FFBB001A] border-[#FFBB001A] group-hover:rotate-0 transition duration-300 group-hover:pb-0"></div>
                    <Image
                      className="xl:!w-[262px] lg:!w-[186px] min-[375px]:w-[262px] w-[250px] mx-auto transition-all duration-300"
                      width="302"
                      height="320"
                      src={data.itemImg}
                      alt="add card items"
                    />
                  </div>
                  <div>
                    <h3 className=" font-extrabold text-[17px] xl:text-lg leading-[22px] xl:leading-[31px] text-center uppercase text-white mb-0 drop-shadow mt-2.5 xl:mt-[15px]">
                      {data.name}
                    </h3>
                    <p className="font-normal text-[11px] xl:text-sm leading-[14px] xl:leading-5 text-center opacity-70 text-white mb-0 mt-[3px] xl:mt-[5px]">
                      {data.post}
                    </p>
                    <span className="flex justify-center gap-[6px] mt-2.5 xl:mt-[15px]">
                      {headerIcons.map((obj, index) => (
                        <a
                          aria-label="social-links"
                          className="duration-300 hover:translate-y-[-6px] "
                          key={index}
                          href={obj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {obj.icon}
                        </a>
                      ))}
                    </span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Team;
