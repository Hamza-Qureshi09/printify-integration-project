import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGlobalInfoProvider } from "./common/CommonProvider";

const About = () => {
  const { aboutRef } = useGlobalInfoProvider();
  return (
    <div
      id="aboutUs"
      ref={aboutRef}
      className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 pt-[76px] pb-[85px] sm:py-[100px] md:py-[102px] xl:pb-[154px]"
    >
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
        >
          <h2 className="uppercase text-[28px] leading-[33.6px] sm:leading-[45px] sm:text-[40px] md:text-[45px] lg:text-[50px] font-extrabold text-center mx-auto md:ms-0 max-w-[335px] md:text-start md:leading-[60px] mb-[15px] md:max-w-[461px]">
            The Metaverse Revolution
          </h2>
          <p className="text-sm text-white opacity-70 max-w-[335px] sm:max-w-[500px] mx-auto md:ms-0 md:max-w-[451px] text-center md:text-start xl:leading-6">
            In the metaverse, we stand on the brink of a new epoch, where our
            digital and physical realities converge, crafting an immersive
            tapestry of experiences that could redefine the essence of human
            connection and creativity. The metaverse is not just a new domain
            for digital escapism, but a revolutionary platform that promises to
            amplify human potential by merging the richness of virtual
            experiences with the tangibility of the physical world. By becoming
            a part of the Blocky Bites community, you are an explorer of the
            metaverse.
          </p>
          <div className="flex justify-center md:justify-start pt-[25px] sm:pt-[30px] lg:pt-[35px]">
            <Link
              target="_blank"
              href="https://www.wired.com/story/what-is-the-metaverse/"
              className="uppercase text-sm xl:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] w-[130px] h-[44px] sm:h-[56px] bg_size_full sm:w-[147px] bg-no-repeat duration-300 hover:text-[#FFBB00] flex justify-center items-center"
            >
              READ MORE
            </Link>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-easing="linear"
          data-aos-delay="300"
          className=" max-w-[335px] sm:max-w-full pt-[61px] md:pt-0 sm:w-[53%]"
        >
          <Image
            className="w-full h-full"
            width={601}
            height={548}
            src="/assets/images/webp/metaverse-img.webp"
            alt="about-img"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
