import { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import Slider from "react-slick";
import { SliderArrow } from "./common/Icons";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const SliderCard = ({ tokenId }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={`px-3 relative hover_card_parent w-full h-full`}>
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Image
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          onError={() => {
            setIsImageLoaded(false);
          }}
          className={`w-full h-full object-cover ${
            !isImageLoaded ? "opacity-0" : ""
          } duration-300`}
          fill={true}
          // src={`https://bafybeicowui3rntcy3erlbpfiunmqlmnhb7qrau45xdwqqrwccfqfeqjsy.ipfs.nftstorage.link/${tokenId}.png`}
          src={`https://blocxperts.com/projects/blocky-bites/nfts/images/${
            parseInt(tokenId) + 1
          }.png`}
          alt="add card items"
        />

        <Skeleton
          className={`absolute -top-1 left-0 block w-full h-full ${
            isImageLoaded ? "opacity-0" : ""
          } duration-300`}
        />
      </div>
    </div>
  );
};

const MintedModal = ({ show, tokenIds, setTokenIds }) => {
  const router = useRouter();

  const sliderBtn = useRef();

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center ${
        !show ? "hidden" : ""
      }`}
    >
      <div className="relative w-[90%] max-w-[450px] p-8 rounded-3xl bg-black border-[5px] border-[#FFBB00] flex flex-col items-center gap-8">
        <button
          className="absolute top-4 right-4"
          onClick={() => {
            setTokenIds([]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition hover:text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <h3 className="text-center font-extrabold text-lg text-white">
          CONGRATS!
        </h3>

        <div className="relative w-full minted-modal-slider-wrapper">
          <Slider ref={sliderBtn} {...settings}>
            {tokenIds.map((tokenId, index) => {
              return <SliderCard key={index} tokenId={tokenId} />;
            })}
          </Slider>

          <div className="flex justify-center gap-3 mt-3">
            <span
              onClick={() => sliderBtn.current.slickPrev()}
              className="rounded-full hover:bg-[#FFBB00] w-[30px] h-[30px] inline-block  cursor-pointer"
            >
              <SliderArrow />
            </span>

            <span
              onClick={() => sliderBtn.current.slickNext()}
              className="rounded-full hover:bg-[#FFBB00] w-[30px] h-[30px] rotate-180 cursor-pointer"
            >
              <SliderArrow />
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            router.push("/the-block");
          }}
          className="uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full"
        >
          View The Block
        </button>
      </div>
    </div>
  );
};

export default MintedModal;
