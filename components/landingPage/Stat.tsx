import React from 'react';

const Stat = () => {
  return (
    <>
      <div className='grid grid-cols-1  lg:w-8/12 gap-10 md:w-11/12 md:gap-3 w-11/12 mx-auto  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-0 items-center justify-items-center font-outfit lg:my-36 md:my-36 my-28'>
        <h6 className='text-[80px] font-bold leading-none mb-2   bg-gradient-to-r from-[#58E427] to-[#4D8A28] bg-clip-text text-transparent text-center'>
          50M+
          <p className='text-[28px] md:text-[24px] font-bold md:font-semibold mt-2 bg-gradient-to-r from-[#58E427] to-[#4D8A28] bg-clip-text text-transparent text-center'>
            Loan disbursed
          </p>
        </h6>

        <h6 className='text-[80px] font-bold md:font-semibold leading-none mb-2 bg-gradient-to-r from-[#F97870] to-[#B57C0F] bg-clip-text text-transparent text-center'>
          100%
          <p className='text-[28px] md:text-[24px] font-bold mt-2 bg-gradient-to-r from-[#F97870] to-[#B57C0F] bg-clip-text text-transparent text-center'>
            Data security
          </p>
        </h6>

        <h6 className='text-[80px] font-bold md:font-semibold leading-none mb-2 bg-gradient-to-r from-[#CBC6C5] to-[#464542] bg-clip-text text-transparent text-center'>
          24/7
          <p className='text-[28px] md:text-[24px] font-bold mt-2 bg-gradient-to-r from-[#CBC6C5] to-[#464542] bg-clip-text text-transparent text-center'>
            Customer support
          </p>
        </h6>
      </div>
      <div className='w-11/12 mx-auto  text-center font-outfit tracking-tighter'>
        <p className='text-[#F6011B] text-[20px] font-semibold my-2  '>How to apply</p>
        <p className='font-bold text-[#282828] text-[58px] leading-none '>Instant loan</p>
        <p className='font-bold text-[#282828] lg:text-[58px] text-[48px]'>easy application process</p>
      </div>
    </>
  );
}

export default Stat;
