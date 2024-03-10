import React from "react";
import { FooterIcon } from "./common/Icons";
import { headerIcons } from "./common/Helper";
import { useGlobalInfoProvider } from "./common/CommonProvider";
import Link from "next/link";
const Footer = () => {
  const {
    aboutRef,
    homeRef,
    roadmapRef,
    merchandiseRef,
    teamRef,
    theBlockRef,
  } = useGlobalInfoProvider();
  const getCurrentYear = new Date().getFullYear();
  // ============== FOOTER LINKS DATA =============================
  const FooterLink = [
    {
      Link: "home",
      refLink: homeRef,
    },
    {
      Link: "About Us",
      refLink: aboutRef,
    },
    {
      Link: "Roadmap",
      refLink: roadmapRef,
    },
    {
      Link: "Merchandise",
      refLink: merchandiseRef,
    },
    {
      Link: "Team",
      refLink: teamRef,
    },
    {
      Link: "The Block",
      refLink: theBlockRef,
    },
  ];
  // ========= SCROLL TOP FOR LINKS =========
  const scrollToSection = (value) => {
    if (value.current) {
      value.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:mt-[114px] mt-[94px] relative">
      <span className="inline-block shadow-custom w-[130px] h-[125px] rounded-full absolute top-0 left-0"></span>
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
        <div className="flex flex-col items-center">
          {" "}
          <Link href="/">
            <FooterIcon />
          </Link>
          <p className="  font-normal text-sm leading-6 mb-0 mt-5 md:mt-[11px] xl:mt-4 ff_open_sans text-white opacity-70 max-w-[369px] text-center">
            Pioneers of the Metaverse.
          </p>
          <div className=" flex gap-4 md:gap-5 xl:gap-[30px] md:my-[14px] xl:my-5 my-4 flex-wrap justify-center">
            {FooterLink.map((data, index) => {
              return (
                <div key={index}>
                  {" "}
                  <p
                    onClick={() => scrollToSection(data.refLink)}
                    className="cursor-pointer font-medium text-[12px] min-[375px]:text-xs md:text-sm leading-5 text-white opacity-60 hover:opacity-100 transition duration-300 uppercase"
                  >
                    {data.Link}
                  </p>
                </div>
              );
            })}
          </div>
          <div className=" flex gap-4 mb-[35px] xl:mb-[50px]">
            {headerIcons.map((obj, index) => (
              <a
                aria-label="social-links"
                className="duration-300 hover:translate-y-[-6px]"
                key={index}
                href={obj.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {obj.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="font-normal text-[12px] min-[375px]:text-xs lg:text-[11px] xl:text-sm leading-6 mb-0 ff_open_sans mt-0.5 sm:mt-0 text-white opacity-70 text-center py-4 xl:py-6 bg-[#171511]">
        Copyright© {getCurrentYear} Blocky Bites. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
