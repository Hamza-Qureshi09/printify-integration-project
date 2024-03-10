import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import BackToTop from "@/components/common/BackToTop";
import Preloader from "@/components/common/Preloader";
import Image from "next/image";
import React from "react";
import BlockPageCard from "@/components/BlockPageCard";
import { smartContract } from "@/config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

export default function TheBlock() {
  const { push } = useRouter();
  const { isConnected, address } = useAccount();
  const [isEligible, setIsEligible] = useState(false);
  const [username, setUsername] = useState("");
  const [initialTokens, setInitialTokens] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [continuation, setContinuation] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (isConnected && address) {
      setIsWalletConnected(true);

      readContract({
        chainId: 5,
        address: smartContract.address,
        abi: smartContract.abi,
        functionName: "walletOfOwner",
        args: [address],
      }).then((res) => {
        if (res.length > 0) {
          setIsEligible(true);
        } else {
          toast.error("You have to own a Blocky Bite NFT!");

          push("/");
        }
      });
    } else {
      setIsEligible(false);
      setIsWalletConnected(false);
    }
  }, [address]);

  const fetchInitial = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API_BASE_URL}/tokens/v6?collection=${smartContract.address}&sortBy=tokenId&sortDirection=asc&limit=4`,
      {
        headers: {
          accept: "*/*",
          "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
        },
        cache: "no-cache",
      }
    );
    const resData = await res.json();

    setInitialTokens(resData?.tokens);
    setContinuation(resData?.continuation);
  };

  useEffect(() => {
    if (isEligible) {
      fetchInitial();
    }
  }, [isEligible]);

  async function getMoreTokens() {
    if (!continuation) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API_BASE_URL}/tokens/v6?collection=${smartContract.address}&sortBy=tokenId&sortDirection=asc&limit=4&continuation=${continuation}`,
      {
        headers: {
          accept: "*/*",
          "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
        },
        cache: "no-cache",
      }
    );
    const { tokens: _tokens, continuation: _continuation } = await res.json();

    setTokens((prevTokens) => [...prevTokens, ..._tokens]);

    if (_continuation) {
      setContinuation(_continuation);
    } else {
      setContinuation("");
    }
  }

  useEffect(
    function () {
      if (inView) {
        if (continuation) {
          getMoreTokens();
        }
      }
    },
    [inView, continuation]
  );

  const handleSearchBtnClick = () => {
    setIsDisabled(true);

    fetch(`/api/search?query=${username}`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        setIsDisabled(false);

        if (res.accounts.length > 0) {
          push(`/the-block/${res.query}`);
        } else {
          toast.error("Nothing found");
        }
      });
  };

  return (
    <div className="overflow-x-hidden">
      {/* {videoEnd ? ( */}
      <>
        <Header />

        <div className="pt-[130px] xl:pt-[162px] lg:pb-16">
          <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
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
              className="text-center py-2 font-medium"
            >
              An exclusive directory of owners, for owners.
            </p>

            {isEligible ? (
              <>
                <div className="mt-10 w-full flex flex-col items-center">
                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchBtnClick();
                      }
                    }}
                    type="text"
                    placeholder="Enter username"
                    className="block w-full max-w-[450px] border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
                  />

                  <button
                    onClick={handleSearchBtnClick}
                    className={`uppercase text-xs xl:text-sm font-bold bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] h-[56px] w-[192px] bg-no-repeat duration-300 text-black flex justify-center items-center  mt-4 bg_size_full ${
                      isDisabled ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {isDisabled ? "Searching..." : "Search"}
                  </button>
                </div>

                <div className="mt-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {initialTokens.map((data, index) => {
                      return (
                        <BlockPageCard
                          key={index}
                          data={data}
                          extraClasses={`${
                            index % 2 === 0 ? "lg:translate-y-[80px]" : ""
                          }`}
                          hideOverlay={true}
                        />
                      );
                    })}

                    {tokens.map((data, index) => {
                      return (
                        <BlockPageCard
                          key={index}
                          data={data}
                          extraClasses={`${
                            index % 2 === 0 ? "lg:translate-y-[80px]" : ""
                          }`}
                          hideOverlay={true}
                        />
                      );
                    })}
                  </div>

                  {continuation && (
                    <div
                      ref={ref}
                      className="mt-[80px] lg:mt-[105px] w-full flex justify-center"
                    >
                      <Image
                        width={50}
                        height={50}
                        src="/assets/gif/preloader_gif.gif"
                        alt="page-logo"
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {isWalletConnected ? (
                  <div className="mt-14 w-full flex justify-center">
                    <Image
                      width={50}
                      height={50}
                      src="/assets/gif/preloader_gif.gif"
                      alt="page-logo"
                    />
                  </div>
                ) : (
                  <p className="mt-14 text-center text-white/70">
                    Please connect your wallet
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <Footer />
        <BackToTop />
      </>
      {/* ) : ( */}
      <Preloader />
      {/* <Preloader setVideoEnd={setVideoEnd} videoEnd={videoEnd} /> */}
      {/* )} */}
    </div>
  );
}
