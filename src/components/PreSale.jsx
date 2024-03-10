import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <>
      <div className="w-[100px] h-[100px] border-2 border-white rounded-full flex justify-center items-center flex-col">
        <p className="text-lg font-bold">{days}</p>
        <p>Days</p>
      </div>

      <div className="w-[100px] h-[100px] border-2 border-white rounded-full flex justify-center items-center flex-col">
        <p className="text-lg font-bold">{hours}</p>
        <p>Hours</p>
      </div>

      <div className="w-[100px] h-[100px] border-2 border-white rounded-full flex justify-center items-center flex-col">
        <p className="text-lg font-bold">{minutes}</p>
        <p>Minutes</p>
      </div>

      <div className="w-[100px] h-[100px] border-2 border-white rounded-full flex justify-center items-center flex-col">
        <p className="text-lg font-bold">{seconds}</p>
        <p>Seconds</p>
      </div>
    </>
  );
};

const PreSale = () => {
  return (
    <div id="preSale" className="pt-[100px]">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
        >
          <h2 className="mb-10 font-extrabold uppercase sm:text-xl lg:text-2xl text-[28px] leading-[36px] sm:leading-[65px] text-white text-center">
            PRE-SALE LAUNCH
          </h2>

          <div className="flex justify-center flex-wrap items-center gap-4">
            <Countdown date={new Date("March 15, 2024")} renderer={renderer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSale;
