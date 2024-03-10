import React, { useState } from "react";
import { faqsData } from "./common/Helper";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { CloseAccordionIcon, OpenAccordionIcon } from "./common/Icons";

const Faqs = () => {
  const [open, setOpen] = useState(0); // Set the initial state to 0 to open the first item by default

  const handleOpen = (index) => {
    if (open === index) {
      // If the clicked item is already open, close it.
      setOpen(-1);
    } else {
      // If a different item is clicked, open it.
      setOpen(index);
    }
  };

  return (
    <div className="xl:mt-[104px] md:mt-[130px] mt-[100px] lg:pb-[60px] xl:pb-1">
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0">
        <h2
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="font-extrabold uppercase text-[28px] leading-9 sm:text-xl lg:text-2xl md:leading-[65px] text-white text-center mb-0"
        >
          Frequently ask Questions
        </h2>
        <div className="w-full max-w-[897px] mx-auto pt-7  md:pt-[13px] xl:pt-0.5">
          {faqsData.map((data, index) => {
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-delay={data.delay}
              >
                {" "}
                <Accordion
                  className="border border-[#FFFFFF29]  rounded-[5px] pb-[15px] mt-3 lg:mt-4 xl:mt-[27px]"
                  open={open === index}
                >
                  <AccordionHeader
                    className="px-[6px] md:px-5 cursor-pointer pb-0 flex flex-row justify-between gap-2 transition duration-300"
                    onClick={() => handleOpen(index)}
                  >
                    <div className="w-full flex justify-between items-center">
                      <h3 className="font-extrabold text-sm md:text-base text-white text-start">
                        <span className="pe-2"> Q.</span>
                        <span>{data.question}</span>
                      </h3>
                      <span className="text-white ">
                        {open === index ? (
                          <OpenAccordionIcon />
                        ) : (
                          <CloseAccordionIcon />
                        )}
                      </span>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="p-0">
                    <p className="text-normal pt-2.5 text-sm text-white opacity-70 leading-6 mb-0 md:px-11 pb px-[6px]">
                      {data.answer}
                    </p>
                  </AccordionBody>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
