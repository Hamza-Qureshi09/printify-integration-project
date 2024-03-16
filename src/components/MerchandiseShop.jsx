import Image from "next/image";
import React, { useState } from "react";
import { merchandiseShop } from "./common/Helper";
import Link from "next/link";
import { useGlobalInfoProvider } from "./common/CommonProvider";
import { BlackLockIconBlack, ShopDropDownIcon } from "./common/Icons";
import { toast } from "react-toastify";
import { readContract } from "@wagmi/core";
import { smartContract } from "@/config";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import axios from "axios";
import { PrintifyProducts } from "@/http";
import { useDispatch } from "react-redux";
import { productDetailsAction } from "@/store/services/product_service";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import FourLoadingCardSkeleton from "./LoadingCardSkeleton";

// get first 4 printify shop products
const GetPrintifyProducts = async () => {
  const response = await PrintifyProducts({ limit: 4 });
  if (response.status === 200) {
    const { data } = response;
    const Products = {
      current_page: data?.data?.current_page,
      data: data?.data?.data,
      from: data?.data?.from,
      last_page: data?.data?.last_page,
      links: data?.data?.links,
      per_page: data?.data?.per_page,
      total: data?.data?.total,
      prev_page_url: data?.data?.prev_page_url,
      last_page_url: data?.data?.last_page_url,
      next_page_url: data?.data?.next_page_url,
    };
    return Products;
  }
};

const MerchandiseShop = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // queries
  const {
    isLoading,
    error: productsError,
    data: productsData,
  } = useQuery({
    queryKey: ["products"],
    queryFn: GetPrintifyProducts,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  const [flippedItems, setFlippedItems] = useState(
    Array(productsData?.data.length).fill(false)
  );
  const [activeImages, setactiveImages] = useState([]);
  const [images, setimages] = useState([]);
  
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { merchandiseRef } = useGlobalInfoProvider();
  const [dropdownStates, setDropdownStates] = useState(
    Array(merchandiseShop.length).fill(false)
  );
  const [selectedSizes, setSelectedSizes] = useState(
    Array(merchandiseShop.length).fill("")
  );
  const [rotateArrow, setRotateArrow] = useState(
    Array(merchandiseShop.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);

    const newRotateArrows = [...rotateArrow];
    newRotateArrows[index] = !newRotateArrows[index];
    setRotateArrow(newRotateArrows);
  };

  const selectSize = (index, size) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = size;
    setSelectedSizes(newSelectedSizes);
    toggleDropdown(index);
  };
  const Data = [
    {
      selectValue: "sm",
    },
    {
      selectValue: "md",
    },
    {
      selectValue: "lg",
    },
    {
      selectValue: "xl",
    },
    {
      selectValue: "xxl",
    },
  ];

  const handleFlipImage = (index) => () => {
    setFlipImage((prevFlipImage) => {
      const newFlipImage = [...prevFlipImage];
      newFlipImage[index] = !newFlipImage[index];
      return newFlipImage;
    });
  };

  const handleMouseEnter = (index) => {
    setFlippedItems((prevFlippedItems) => {
      const newFlippedItems = prevFlippedItems.slice();
      newFlippedItems[index] = true;
      return newFlippedItems;
    });
    const activeImagesUrls = images?.map((items) => {
      const FlippedImage = items.find((val, index) => index === 3 && val);
      return FlippedImage;
    });

    setactiveImages((prevActiveImages) => {
      const newFlippedImages = prevActiveImages.slice();
      newFlippedImages[index] = activeImagesUrls[index];
      return newFlippedImages;
    });
  };

  const handleMouseLeave = (index) => {
    setFlippedItems((prevFlippedItems) => {
      const newFlippedItems = prevFlippedItems.slice();
      newFlippedItems[index] = false;
      return newFlippedItems;
    });
    const activeImagesUrls = images?.map((items) => {
      const FlippedImage = items.find((val, index) => index === 2 && val);
      return FlippedImage;
    });

    setactiveImages((prevActiveImages) => {
      const newFlippedImages = prevActiveImages.slice();
      newFlippedImages[index] = activeImagesUrls[index];
      return newFlippedImages;
    });
  };

  React.useEffect(() => {
    if (productsData?.data) {
      setFlippedItems(Array(productsData?.data.length).fill(false));
      const itemImageUrls = productsData.data.map((item) => {
        const imagesUrlArray = item?.images?.map((val) => val?.src);
        return imagesUrlArray || [];
      });
      setimages(itemImageUrls);

      if (itemImageUrls?.length >= 1) {
        const activeImagesUrls = itemImageUrls?.map((items) => {
          const findActiveImage = items.find(
            (val, index) => index === 2 && val
          );
          return findActiveImage;
        });
        setactiveImages(activeImagesUrls);
      }
    }
  }, [productsData?.data]);

  if (productsError) {
    return <div>{productsError?.message}</div>;
  }
  return (
    <div
      id="merchandise"
      ref={merchandiseRef}
      className="xl:pt-[150px] lg:pt-[130px] pt-[58px] relative
      "
    >
      {/* <Image
        className="absolute top-[-50px] end-0 w-[30%] h-[1580px]"
        width="1700"
        height="980"
        src="/assets/images/svg/shop-wave.svg"
        alt="wave-img"
      /> */}
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 relative z-10">
        <h3
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="font-extrabold text-[28px] leading-9 md:text-2xl md:leading-[65px] text-white text-center mb-0"
        >
          MERCHANDISE SHOP
        </h3>

        {/* Card for Item */}
        {isLoading ? (
          <FourLoadingCardSkeleton />
        ) : (
          <div
            className="w-full h-full mt-12
      md:flex md:flex-row items-center justify-center gap-3 flex-wrap space-y-4 md:space-y-0
      "
          >
            {productsData?.data?.length >= 1
              ? productsData?.data?.map((item, index) => (
                  <ProductCard
                    key={index}
                    item={item}
                    index={index}
                    router={router}
                    activeImages={activeImages}
                    flippedItems={flippedItems}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                  />
                ))
              : "No Product Exist!"}
          </div>
        )}

        <div data-aos="fade-up" data-aos-easing="linear" data-aos-delay="300">
          <Link
            href={`/ExploreShop?total=${productsData?.total}`}
            className="uppercase text-xs lg:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] h-[56px] w-[250px] bg-no-repeat duration-300 hover:text-[#FFBB00] flex justify-center items-center  mt-8 xl:mt-10 mx-auto bg_size_full"
          >
            Explore the Entire Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchandiseShop;
