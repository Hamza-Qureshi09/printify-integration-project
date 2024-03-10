"use client";
import React, { useEffect, useState } from "react";
import CountUp, { useCountUp } from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { statisticsData } from "./common/Helper";
import Link from "next/link";

const JoinDiscord = () => {
  // REF FOR COUNTUP ANIMATION
  const countUpRef = React.useRef(null);
  const [viewCount, setViewCount] = useState();
  const [endValue, setEndValue] = useState(0);
  useEffect(() => {
    if (viewCount) {
      setEndValue(100);
      setViewCount(false);
    }
  }, [viewCount]);

  function onVisibilityChange(visible) {
    if (visible && !viewCount) {
      setViewCount(true);
    }
  }
  return (
    <div className="xl:pt-[78px] lg:pt-[130px] pt-[100px]">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
        >
          <h2 className="font-extrabold uppercase sm:text-xl lg:text-2xl text-[28px] leading-[36px] sm:leading-[65px] text-white text-center mb-0">
            Join Our Discord
          </h2>
          <p className="font-normal text-sm leading-6 text-center text-white mb-0 opacity-70 mt-[15px]">
            This discord is no place for the weak-minded. Join now to show off
            your sick NFTs or to just chill.
          </p>
        </div>

        <div className="md:max-w-[599px] max-w-[375px] !mx-auto flex justify-between mt-[42px] md:mt-[38px]">
          {statisticsData.map((data, index) => {
            return (
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="linear"
                data-aos-delay="500"
                key={index}
                className={` ${data.counterStyling} flex flex-col items-center md:py-7 py-2.5`}
              >
                <div>
                  <VisibilitySensor
                    onChange={onVisibilityChange}
                    offset={{
                      top: 10,
                    }}
                    delayedCallon
                  >
                    <CountUp
                      start={0}
                      duration={4}
                      end={endValue && data.value}
                    >
                      {({ countUpRef }) => (
                        <>
                          <span
                            className="md:text-xl font-extrabold text-[28px] leading-9 md:leading-[52px] text-white"
                            ref={countUpRef}
                          ></span>
                          <span className="md:text-xl font-extrabold text-[28px] leading-9 md:leading-[52px] text-white">
                            {data.unit}
                          </span>
                        </>
                      )}
                    </CountUp>
                  </VisibilitySensor>
                </div>
                <p className="font-normal text-center text-sm sm:text-base leading-[26px] text-white opacity-70 mb-0 mt-2 md:mt-[18px] ">
                  {data.title}
                </p>
              </div>
            );
          })}
        </div>
        <div data-aos="fade-up" data-aos-easing="linear" data-aos-delay="300">
          <Link
            target="_blank"
            href="https://discord.gg/cEjgVrcV8p"
            className="uppercase text-xs lg:text-sm font-bold bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] h-[56px] w-[192px] bg-no-repeat duration-300 text-black flex justify-center items-center  lg:mt-[45px] mt-10 mx-auto bg_size_full"
          >
            Join Discord
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinDiscord;
