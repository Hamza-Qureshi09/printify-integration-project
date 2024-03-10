import React, { useState, useEffect } from "react";
import { headerIcons } from "./Helper";
import Link from "next/link";
import { CrossMenuIcon } from "./Icons";
import { useGlobalInfoProvider } from "./CommonProvider";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const MobileNav = ({ mobileNavbar, setMobileNavbar, cartData }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { aboutRef, learnRef, homeRef, merchandiseShopRef } =
    useGlobalInfoProvider();
  // ================= LINK DATA =================
  const headerLinks = [
    { link: "Home", id: "home" },
    { link: "About Us", id: "aboutUs" },
    { link: "Roadmap", id: "roadmap" },
    { link: "The Block", id: "block" },
    { link: "Merchandise", id: "merchandise" },
    { link: "Team", id: "team" },
  ];
  // ========= SCROLL TOP FOR LINKS =========
  const scrollToSection = (value) => {
    if (value.current) {
      value.current.scrollIntoView({ behavior: "smooth" });
    }
    setMobileNavbar(false);
    document.body.style.overflow = "auto";
  };
  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [isConnected]);
  return (
    <>
      <div
        className={`flex-col lg:hidden items-center gap-8 absolute top-0 left-0 bg-black w-full justify-center h-screen z-50 ${
          mobileNavbar ? "flex" : "hidden"
        }`}
      >
        <span
          className="absolute top-7 right-4 cursor-pointer"
          onClick={scrollToSection}
        >
          <CrossMenuIcon />
        </span>
        {headerLinks.map((obj, index) => (
          <div
            key={index}
            className={`asdfasd ${
              cartData ? "mobile-view-animate translate-y-[10px]" : ""
            }`}
          >
            <Link
              href={`/#${obj.id}`}
              onClick={() => {
                document.body.style.overflow = "auto";
                setMobileNavbar(false);
              }}
              className={`text-base font-medium duration-300 uppercase hover:opacity-100 whitespace-nowrap inline-block cursor-pointer ${
                obj.link === "Home" ? "opacity-100" : "opacity-60"
              } `}
            >
              {obj.link}
            </Link>
          </div>
        ))}
        <div
          className={`flex gap-4 ${
            cartData ? "mobile-view-animate translate-y-[10px]" : ""
          }`}
        >
          {headerIcons.map((obj, index) => (
            <a
              aria-label="social-links"
              className={`duration-300 hover:translate-y-[-6px] `}
              key={index}
              href={obj.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {obj.icon}
            </a>
          ))}
        </div>
        {isWalletConnected ? (
          <>
            <Link
              href={"/account"}
              className="uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat ms-3 xl:ms-5 duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full"
            >
              Account
            </Link>

            <button
              onClick={() => {
                open();
              }}
              className="mt-2 uppercase text-xs xl:text-sm font-bold"
            >
              Wallet
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              open();
            }}
            className="uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat ms-3 xl:ms-5 duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </>
  );
};

export default MobileNav;
