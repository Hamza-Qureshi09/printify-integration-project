import Image from "next/image";
import React, { useEffect, useState } from "react";
const Preloader = () => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // if (videoEnd === true) {
  //   document.body.classList.add("overflow_hidden");
  // } else {
  //   document.body.classList.remove("overflow_hidden");
  // }
  // return () => {
  //   document.body.classList.remove("overflow_hidden");
  // };
  // }, []);
  const [preload, setPreload] = useState(true);
  useEffect(() => {
    document.body.classList.add("overflow_hidden");
    setTimeout(() => {
      document.body.classList.remove("overflow_hidden");
      setPreload(false);
    }, 2800);
  }, [2800]);

  return (
    <>
      {preload && (
        <div
          className={`
           fixed h-screen end-0 top-0 w-full z-50 flex justify-center items-center bg-[#020102]`}
        >
          {/* <video muted autoPlay playsInline onEnded={() => setVideoEnd(true)}>
          <source
            src="/assets/video/preloader-video-cutted.mp4"
            type="video/mp4"
          />
        </video> */}
          <Image
            width={632}
            height={691}
            src="/assets/gif/preloader_gif.gif"
            alt="page-logo"
          />
        </div>
      )}
    </>
  );
};

export default Preloader;
