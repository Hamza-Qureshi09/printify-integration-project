import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { blockData } from "./common/Helper";
import Slider from "react-slick";
import { BlackLockIcon, LockIcon, SliderArrow } from "./common/Icons";
import Link from "next/link";
import { useGlobalInfoProvider } from "./common/CommonProvider";
import { smartContract } from "@/config";
import BlockCard from "./BlockCard";
import BlockSliderCard from "./BlockSliderCard";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Block = () => {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [tokens, setTokens] = useState([]);

  const { theBlockRef } = useGlobalInfoProvider();

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

  const fetchTokens = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API_BASE_URL}/tokens/v6?collection=${smartContract.address}&sortBy=tokenId&sortDirection=asc&limit=8`,
      {
        headers: {
          accept: "*/*",
          "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
        },
      }
    );
    const resData = await res.json();

    setTokens(resData?.tokens);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [isConnected]);

  return (
    <div
      id="block"
      ref={theBlockRef}
      className="pt-[130px] xl:pt-[162px] pb-16 lg:pb-0"
    >
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 flex flex-col items-center">
        <h3
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="font-extrabold uppercase text-[28px] leading-9 md:text-2xl md:leading-[65px] text-white text-center mb-0"
        >
          The Block
        </h3>
        <p
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="text-center py-2 font-medium max-w-[450px]"
        >
          An exclusive directory of owners, for owners. Some may call it a club
          for elitists. We call it a sanctuary for visionaries.
        </p>
        <div className="lg:mt-20 -mt-2.5">
          <div className="lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 hidden">
            {tokens.map((data, index) => {
              return (
                <BlockCard
                  key={index}
                  data={data}
                  extraClasses={blockData[index].blockCls}
                />
              );
            })}
          </div>
          <div className="lg:hidden  relative max-w-[100vw]">
            <span
              onClick={() => sliderBtn.current.slickPrev()}
              className="absolute bottom-[-160px] start-[48%] rounded-full hover:bg-[#FFBB00] w-[30px] h-[30px] inline-block -translate-x-[100%] cursor-pointer"
            >
              <SliderArrow />
            </span>
            <span
              onClick={() => sliderBtn.current.slickNext()}
              className="absolute  bottom-[-160px] end-[48%] rounded-full hover:bg-[#FFBB00] translate-x-[100%]  w-[30px] h-[30px] rotate-180 cursor-pointer"
            >
              <SliderArrow />
            </span>
            <Slider ref={sliderBtn} {...settings}>
              {tokens.map((data, index) => {
                return (
                  <BlockSliderCard
                    key={index}
                    data={data}
                    extraClasses={blockData[index].blockCls}
                  />
                );
              })}
            </Slider>
          </div>
          <div data-aos="fade-up" data-aos-easing="linear" data-aos-delay="300">
            {isWalletConnected ? (
              <button
                onClick={() => {
                  readContract({
                    chainId: 5,
                    address: smartContract.address,
                    abi: smartContract.abi,
                    functionName: "walletOfOwner",
                    args: [address],
                  }).then((res) => {
                    if (res.length > 0) {
                      router.push("/the-block");
                    } else {
                      toast.error("You have to own a Blocky Bite NFT!");
                    }
                  });
                }}
                className="uppercase text-xs lg:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-[192px] bg-no-repeat hover:text-[#FFBB00] flex justify-center items-center duration-300 gap-2 group  lg:-mt-8 mt-10 mx-auto"
              >
                Check It Out <BlackLockIcon group="group" />
              </button>
            ) : (
              <button
                onClick={() => {
                  open();
                }}
                className="uppercase text-xs lg:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-[220px] bg-no-repeat hover:text-[#FFBB00] flex justify-center items-center duration-300 gap-2 group  lg:-mt-8 mt-10 mx-auto"
              >
                Connect Wallet <BlackLockIcon group="group" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
