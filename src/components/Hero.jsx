import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalInfoProvider } from "./common/CommonProvider";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Hero = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  const { homeRef } = useGlobalInfoProvider();

  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [isConnected]);
  return (
    <div
      id="home"
      ref={homeRef}
      className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 flex-col flex grow pt-[57px] sm:pt-[80px] justify-center"
    >
      <div className="flex pt-[60px] sm:pt-[70px] md:pt-[80px] lg:pt-[41px] flex-col md:flex-row relative z-[1]">
        <div className="absolute z-[-1] left-[45%] -translate-x-1/2 lg:translate-x-0 bottom-[5%] xl:bottom-[-6%] lg:left-0 w-[38%] lg:w-[45%] xl:w-[50%] hidden md:block">
          <Image
            className="w-full h-full"
            width={563}
            height={555}
            src="/assets/images/webp/hero-small-cartoon-bg.webp"
            alt="cartoon-img"
          />
        </div>
        <div className="absolute z-[-1] left-0 bottom-0 w-[40%] md:hidden">
          <Image
            className="w-full h-full"
            width={140}
            height={173}
            src="/assets/images/webp/hero-small-cartoon-img.webp"
            alt="cartoon-img"
          />
        </div>
        <div className="md:w-[55%] lg:w-[50%] lg:pt-[78px]">
          <div className="relative">
            <span className="w-[96px] md:w-[140px] xl:w-[206px] h-[1px] bg-white absolute right-[-45px] sm:right-[-5%] md:right-[-24%] lg:right-[-7%] xl:right-[-15%] bottom-[-30%] md:bottom-[16%] lg:bottom-[22%] rotate-90 md:rotate-0">
              <span className="bg-white w-[4px] h-[4px] right-0 rounded-full absolute top-1/2 -translate-y-1/2"></span>
            </span>
            <h1 className="font-extrabold text-[34px] sm:text-[40px] lg:text-[50px] lg:leading-[69px] xl:text-[60px] leading-[39px] md:leading-[45px]  uppercase text-center md:text-start max-w-[351px] md:max-w-full mx-auto md:ms-0">
              Metaverse with Blocky Bites
            </h1>
          </div>
          <p className="font-normal text-sm leading-6 mt-[10px] md:mt-5 mb-[25px] text-white opacity-70 max-w-[336px] md:max-w-[448px] text-center md:text-start mx-auto md:ms-0">
            As a Blocky Bite owner, you are a pioneer of the metaverse. Blocky
            Bites doesn’t settle for mediocrity…we pave the way for
            interconnected digital and physical worlds. This is the future…so
            we’re paving a path to empower owners by providing them an NFT which
            functions as a ticket to enter physical dimensions via owner-only
            merchandise, in-game video game characters, coupons and discounts,
            in-person events, a database of owners…for owners, and…well…more to
            come.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => {
                if (!isWalletConnected) {
                  open();
                }
              }}
              className="uppercase text-sm xl:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] w-[180px] h-[38px] sm:h-[56px] bg_size_full bg-no-repeat duration-300 hover:text-[#FFBB00] flex justify-center items-center"
            >
              {isWalletConnected ? "WELCOME!" : "CONNECT WALLET"}
            </button>
          </div>
        </div>
        <div className="w-[80%] md:w-[50%] lg:w-1/2 sm:pt-5 md:pt-16 lg:pt-0 ms-auto me-0 md:mx-auto xl:translate-y-[-50px] translate-x-[30px] md:translate-x-0">
          <Image
            className="opacity-60"
            width={632}
            height={691}
            src="/assets/gif/hero-gif.gif"
            alt="cartoon-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
