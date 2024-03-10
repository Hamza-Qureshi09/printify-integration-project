import React from "react";

const FourLoadingCardSkeleton = () => {
  const cards = [1, 2, 3, 4];
  return (
    <div
      className="w-full h-full mt-12
    md:flex md:flex-row items-center justify-center gap-3 flex-wrap space-y-4 md:space-y-0
    "
    >
      {cards?.map((val, index) => {
        return (
          <div
            key={index}
            className="w-full md:w-1/3 lg:w-[24%] h-[27rem] flex flex-col gap-4 bg-neutral-900 rounded-xl overflow-hidden animate-pulse px-4 py-6"
          >
            <div className="h-1/2 rounded-md bg-gray-300 animate-pulse"></div>

            <div className="flex flex-col justify-between h-1/2 px-4 py-2">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-3 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
              <button className="uppercase text-xs lg:text-sm font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto cursor-pointer mt-6 px-4 py-2 animate-pulse rounded-md hover:bg-opacity-75">
                Shop Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FourLoadingCardSkeleton;
