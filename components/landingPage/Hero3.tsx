"use client";
import React, { useState } from "react";
import Image from "next/image";
import BuisnessLoanForm from "./BuisnessLoanForm";

const Hero3 = () => {
  const [openBuisnessLoanForm, setOpenBuisnessLoanForm] = useState(false);

  const toggleBusinessLoanForm = () => {
    setOpenBuisnessLoanForm(!openBuisnessLoanForm);
  };

  return (
    <div 
    id='hero3'
    className="w-11/12 h-auto min-h-[564px] mt-10 bg-[#F3F6F8] mx-auto rounded-[44px] overflow-hidden font-outfit flex justify-center items-center">
      <div className="h-auto min-h-[444px] w-11/12 flex flex-col-reverse lg:flex-row md:flex-row mx-auto my-10 gap-6">
        {/* Text Section */}
        <div className="lg:mt-32 md:mt-32 w-full md:mr-4">
          <p className="font-bold mb-3 tracking-tighter text-[#282828] lg:text-[42px] text-[35px] leading-none">
            Instant Business loan
          </p>
          <p className="font-normal mb-6 tracking-tighter text-[#282828] lg:text-[24px] text-[20px]">
          Fuel your business growth with quick, flexible loans approved in minutes, along with tailored repayment schedules to match your business's cash flow!
          </p>
          <div className="flex justify-start align-middle gap-6 mb-6">
            <button
              onClick={toggleBusinessLoanForm}
              className="bg-[#F24C5D] text-white font-outfit font-bold rounded-full lg:w-[146px] w-[141px] h-[54px] py-1 px-4 text-[18px]"
            >
              Apply Now
            </button>
            <button
              className="bg-inherit border border-solid border-[#282828] text-[#282828] font-outfit font-bold rounded-full lg:w-[146px] w-[141px] h-[54px] py-1 px-4 text-[18px]"
            >
              Contact us
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="my-auto h-[444px] sm:mt-4 w-full">
          <Image
            className="w-full rounded-[22px] object-cover h-full"
            src="/images/hero3.png"
            alt="Logo"
            width={491}
            height={444}
            priority={true}
          />
        </div>
      </div>

      {/* Conditional Render for Form */}
      {openBuisnessLoanForm && (
        <BuisnessLoanForm
          toggleBusinessLoanForm={toggleBusinessLoanForm}
          isOpen={openBuisnessLoanForm}
        />
      )}
    </div>
  );
};

export default Hero3;
