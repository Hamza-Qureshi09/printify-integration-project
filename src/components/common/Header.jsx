import React, { useState, useEffect } from "react";
import { MenuIcon, NavLogo } from "./Icons";
import Link from "next/link";
import { headerIcons } from "./Helper";
import MobileNav from "./MobileNav";
import { useGlobalInfoProvider } from "./CommonProvider";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { readContract } from "@wagmi/core";
import { smartContract } from "@/config";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [cartData, setCartData] = useState(false);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const {
    aboutRef,
    roadmapRef,
    homeRef,
    merchandiseRef,
    teamRef,
    theBlockRef,
  } = useGlobalInfoProvider();

  const menuHandler = () => {
    setMobileNavbar(true);
    setCartData(true);
    document.body.style.overflow = "hidden";
  };
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
  };
  // ========= SCROLL TOP FOR LOGO =========
  const scrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);

      // readContract({
      //   chainId: 5,
      //   address: smartContract.address,
      //   abi: smartContract.abi,
      //   functionName: "walletOfOwner",
      //   args: [address],
      // }).then((res) => {
      //   if (res.length < 1) {
      //     toast.error("You have to own a Blocky Bite NFT!");
      //   }
      // });
    } else {
      setIsWalletConnected(false);
    }
  }, [isConnected]);

  return (
    <>
      <div className="bg-[#FFFFFF08] py-2 backdrop-blur-[32px] z-20 fixed top-0 w-full">
        <MobileNav
          cartData={cartData}
          mobileNavbar={mobileNavbar}
          setMobileNavbar={setMobileNavbar}
        />
        <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 flex justify-between items-center gap-5 xl:gap-20">
          <div className="w-full">
            <Link
              onClick={scrollToHome}
              href="/"
              className="w-fit cursor-pointer"
            >
              <NavLogo />
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-6 xl:gap-[35px] w-full">
            {headerLinks.map((obj, index) => (
              <Link
                href={`/#${obj.id}`}
                key={index}
                className={`text-xs xl:text-sm font-medium duration-300 uppercase hover:opacity-100 whitespace-nowrap cursor-pointer ${
                  obj.link === "Home" ? "" : "opacity-60"
                } `}
              >
                {obj.link}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-[14px] w-full">
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
                  className="ml-2 uppercase text-xs xl:text-sm font-bold"
                >
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 6.0625V4.05C17 3.06991 17 2.57986 16.8093 2.20551C16.6415 1.87624 16.3737 1.60853 16.0445 1.44074C15.6701 1.25 15.1801 1.25 14.2 1.25H4.05C3.06991 1.25 2.57986 1.25 2.20551 1.44074C1.87624 1.60851 1.60851 1.87622 1.44074 2.20551C1.25 2.57986 1.25 3.06991 1.25 4.05V12.45C1.25 13.4301 1.25 13.9201 1.44074 14.2945C1.60851 14.6237 1.87623 14.8915 2.20551 15.0592C2.57986 15.25 3.0699 15.25 4.05 15.25H14.2C15.1801 15.25 15.6701 15.25 16.0445 15.0592C16.3737 14.8915 16.6415 14.6237 16.8093 14.2945C17 13.9201 17 13.4301 17 12.45V10.4375M12.625 8.25C12.625 7.84339 12.625 7.64012 12.6586 7.47107C12.7966 6.77685 13.3394 6.23421 14.0336 6.09612C14.2026 6.0625 14.4059 6.0625 14.8125 6.0625H16.5625C16.9691 6.0625 17.1724 6.0625 17.3414 6.09612C18.0356 6.23421 18.5784 6.77685 18.7164 7.47107C18.75 7.64012 18.75 7.84339 18.75 8.25C18.75 8.65661 18.75 8.85987 18.7164 9.02892C18.5784 9.72315 18.0356 10.2658 17.3414 10.4039C17.1724 10.4375 16.9691 10.4375 16.5625 10.4375H14.8125C14.4059 10.4375 14.2026 10.4375 14.0336 10.4039C13.3394 10.2658 12.7966 9.72315 12.6586 9.02892C12.625 8.85987 12.625 8.65661 12.625 8.25Z"
                      stroke="#fff"
                      stroke-opacity="1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
          <span className="lg:hidden cursor-pointer" onClick={menuHandler}>
            <MenuIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
