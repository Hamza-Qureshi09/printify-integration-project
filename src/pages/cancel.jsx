import React from "react";
import Link from "next/link";

const Cancel = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center font-Figtree">
        <div className="bg-white py-4 px-12 rounded-lg md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            class="text-gray-50 bg-red-500 w-16 h-16 mx-auto my-6 rounded-full p-4"
          >
            <path
              fill="currentColor"
              d="M20.707,4.293a1,1,0,0,0-1.414,0L12,11.586,4.707,4.293A1,1,0,0,0,3.293,5.707L11.586,14,3.293,22.293a1,1,0,0,0,0,1.414,1,1,0,0,0,1.414,0L12,16.414l7.293,7.293a1,1,0,0,0,1.414,0,1,1,0,0,0,0-1.414L13.414,14l7.293-7.293A1,1,0,0,0,20.707,4.293Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-xl text-base text-rose-400 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">Your Order is not placed yet.</p>
            <p className="text-gray-600 "> Try Again! </p>
            <div className="py-10 text-center">
              <Link
                href="/"
                className="px-12 bg-rose-600 hover:bg-rose-500 text-white font-semibold py-3 rounded-md"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cancel;
