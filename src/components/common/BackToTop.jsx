import React, { useEffect, useState } from "react";
import { BackToTopIcon } from "./Icons";

const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed bg-[#FFBB01] z-10 bottom-[3%] border animate_back_to_top border-white border-dashed transition-all duration-300 ease-linear end-3 w-9 md:h-11 h-9 md:w-11 flex items-center justify-center cursor-pointer rounded-full hover:shadow-backtop  ${
          scrollPosition > 200 ? "block" : "hidden"
        }`}
        onClick={() => scrollToTop()}
      >
        <BackToTopIcon />
      </div>
    </>
  );
};

export default BackToTop;
