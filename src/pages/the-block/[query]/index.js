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
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [isEligible, setIsEligible] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [publicAddresses, setPublicAddresses] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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

          router.push("/");
        }
      });
    } else {
      setIsEligible(false);
      setIsWalletConnected(false);
    }
  }, [address]);

  useEffect(() => {
    const { query } = router.query;

    if (query) {
      fetch(`/api/search?query=${query}`, {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.accounts.length > 0) {
            res.accounts.forEach((account) => {
              setUsernames((prev) => [...prev, account.username]);
              setPublicAddresses((prev) => [...prev, account.publicAddress]);
            });
          } else {
            router.push("/the-block");
          }
        });
    }
  }, [router]);

  const fetchTokens = async (address) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API_BASE_URL}/users/${address}/tokens/v7?contract=${smartContract.address}&sortDirection=asc`,
      {
        headers: {
          accept: "*/*",
          "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
        },
        cache: "no-cache",
      }
    );
    const resData = await res.json();

    let arr = [1, 2, 3];

    resData?.tokens?.map((tokenData) => {
      setTokens((prev) => [...prev, { ...tokenData, owner: address }]);
    });
  };

  useEffect(() => {
    if (publicAddresses.length > 0 && isEligible) {
      publicAddresses.forEach(async (publicAddress) => {
        await fetchTokens(publicAddress);
      });
    }
  }, [publicAddresses, isEligible]);

  return (
    <div className="overflow-x-hidden">
      {/* {videoEnd ? ( */}
      <>
        <Header />

        <div className="pt-[130px] xl:pt-[162px] lg:pb-16">
          <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
            <button
              onClick={() => {
                router.push("/the-block");
              }}
              className="mb-7 flex items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8334 10.0001H4.16669M4.16669 10.0001L10 15.8334M4.16669 10.0001L10 4.16675"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Go Back
            </button>

            <h3
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-delay="300"
              className="font-extrabold uppercase text-[28px] leading-9 md:text-2xl md:leading-[65px] text-white text-center mb-0"
            >
              {router.query.query}
            </h3>
            <p
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-delay="300"
              className="text-center py-2 font-medium"
            >
              An exclusive directory of owners, for owners.
            </p>

            <div className="mt-14">
              {isEligible ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {tokens?.map((data, index) => {
                      return (
                        <BlockPageCard
                          key={index}
                          data={data}
                          tokenOwner={data?.owner}
                          extraClasses={`${
                            index % 2 === 0 ? "lg:translate-y-[80px]" : ""
                          }`}
                          hideOverlay={true}
                        />
                      );
                    })}
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
