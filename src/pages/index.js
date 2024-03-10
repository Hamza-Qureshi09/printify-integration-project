import About from "@/components/About";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import GetStarted from "@/components/GetStarted";
import Hero from "@/components/Hero";
import MerchandiseShop from "@/components/MerchandiseShop";
import JoinDiscord from "@/components/JoinDiscord";
import PreSale from "@/components/PreSale";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import Header from "@/components/common/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Block from "@/components/Block";
import BackToTop from "@/components/common/BackToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import Image from "next/image";

export default function Home(props) {
  // const [videoEnd, setVideoEnd] = useState(false);
  // ========================== AOS ================================
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 400,
    });
  }, []);
  return (
    <>
      <MerchandiseShop />
    </>
    // <div className="overflow-x-hidden">
    //   {/* {videoEnd ? ( */}
    //   <>
    //     <div className="xl:min-h-screen flex flex-col relative">
    //       <Image
    //         className="absolute top-0 lg:top-[-20%] start-0 lg:-start-36 w-3/5 sm:w-2/5 lg:w-[35%] opacity-[50%]"
    //         width="1700"
    //         height="980"
    //         src="/assets/images/svg/hero-wave.svg"
    //         alt="wave-img"
    //       />
    //       <Image
    //         className="absolute bottom-[-500px] left-[-150px] w-[1100px] h-[1100px] z-[-1]"
    //         src="/assets/images/svg/hero_left_shadow.svg"
    //         alt="shadow"
    //         width={215}
    //         height={215}
    //       />
    //       <Image
    //         className="absolute bottom-[-500px] right-[-150px] w-[1100px] h-[1100px] z-[-1]"
    //         src="/assets/images/svg/hero_right_shadow.svg"
    //         alt="shadow"
    //         width={215}
    //         height={215}
    //       />
    //       <Header />
    //       <Hero />
    //     </div>
    //     <PreSale />
    //     <About />
    //     <Roadmap />
    //     <Block />
    //     <MerchandiseShop />
    //     <JoinDiscord />
    //     <GetStarted />
    //     <Team />
    //     <Faqs />
    //     <Footer />
    //     <BackToTop />
    //   </>
    //   {/* ) : ( */}
    //   <Preloader />
    //   {/* <Preloader setVideoEnd={setVideoEnd} videoEnd={videoEnd} /> */}
    //   {/* )} */}
    // </div>
  );
}
