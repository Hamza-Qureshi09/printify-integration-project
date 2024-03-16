import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { merchandiseShop } from "@/components/common/Helper";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PrintifyProducts } from "@/http";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FourLoadingCardSkeleton from "@/components/LoadingCardSkeleton";

// get all printify shop products
const GetPrintifyProducts = async (totalProducts) => {
  const response = await PrintifyProducts({ limit: totalProducts });
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

const ExploreShop = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalProducts = searchParams.get("total");
  const [queryEnabled, setQueryEnabled] = useState(false);

  // queries
  const {
    isLoading,
    error: productsError,
    data: productsData,
    refetch,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      return await GetPrintifyProducts(totalProducts);
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    enabled: queryEnabled, // Initially disable fetching
  });

  const [flippedItems, setFlippedItems] = useState(
    Array(productsData?.data.length).fill(false)
  );
  const [activeImages, setactiveImages] = useState([]);
  const [images, setimages] = useState([]);

  // const handleMouseEnter = (index) => {
  //   setFlippedItems((prevFlippedItems) => {
  //     const newFlippedItems = [...prevFlippedItems];
  //     newFlippedItems[index] = true;
  //     return newFlippedItems;
  //   });
  // };

  // const handleMouseLeave = (index) => {
  //   setFlippedItems((prevFlippedItems) => {
  //     const newFlippedItems = [...prevFlippedItems];
  //     newFlippedItems[index] = false;
  //     return newFlippedItems;
  //   });
  // };

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

  // fetch data when params become available after initial render
  React.useEffect(() => {
    if (totalProducts) {
      setQueryEnabled(true);
    }
  }, [totalProducts]);

  // loading..
  if (isLoading) {
    return (
      <div className="w-full flex flex-col space-y-3 animate-pulse px-8 py-8 ">
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-11/12"></div>
        <div className="h-4 bg-gray-300 rounded-md w-9/12"></div>
        <div className="h-4 bg-gray-300 rounded-md w-3/5"></div>
      </div>
    );
  }

  if (productsError) {
    return <div>{productsError?.message}</div>;
  }

  return (
    <div>
      <div className="w-full h-full flex flex-col ">
        <Header />
        {/* Content Div */}
        <section className="w-full h-full pt-20 pb-4 md:py-32 px-12 md:px-20">
          <h1 className="w-full h-full flex justify-center items-center">
            <span className="text-center text-[#FFBB00] text-[20px] md:text-[30px] font-bold mb-4">
              Explore Shop
            </span>
          </h1>
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
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ExploreShop;
