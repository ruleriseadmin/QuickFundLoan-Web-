import React from 'react';
import Image from 'next/image';

const Hero4 = () => {
 
  return (
    <div className='w-11/12 h-auto min-h-[564px] mt-10 bg-[#F3F6F8] mx-auto rounded-[44px] overflow-hidden font-outfit flex justify-center items-center'>
    <div className='h-auto min-h-[444px] w-11/12 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mx-auto my-10 '>

      <div className="my-auto h-full">
        <Image
          className="w-full rounded-[22px] object-cover h-full "
            src='/images/hero4.png'
            alt="Logo"
            width={491}
            height={444}
            priority={true}
          />
        </div>

        {/* Update the styles of the second grid */}
        <div className="lg:mt-32 md:mt-32 lg:ml-6 md:ml-4 w-full mt-4">
          <p className='font-bold mb-3 tracking-tighter text-[#282828] lg:text-[42px] text-[35px] leading-none '>Salary advance loan</p>
          <p className='font-normal mb-6 tracking-tighter text-[#282828] lg:text-[24px] text-[20px] '>
          Get access to cash before payday with our quick and easy salary advance loans, with funds disbursed directly to your account in minutes and flexible repayment terms.

          </p>

          <div className='flex justify-start align-middle gap-6 '>
    <button
         className='bg-[#F24C5D]   text-white font-outfit font-bold rounded-full lg:w-[146px] w-[141px] h-[54px] py-1 px-4 text-[18px]'
          >
            Apply Now

          </button>
          <button
         className='bg-inherit border border-solid border-[#282828] hover:bg-[#ffff]  text-[#282828] font-outfit font-bold rounded-full lg:w-[146px] w-[141px] h-[54px] py-1 px-4 text-[18px]'
          >
            Contact us

          </button>
    </div>
        </div>

      </div>
    </div>
  );
};

export default Hero4;
