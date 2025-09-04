import React from 'react';
import Image from 'next/image';

const ApplyCard = () => {
  
  return (
    <>
      <div className='grid grid-cols-1  gap-10  w-11/12 mx-auto    md:grid-cols-2 lg:grid-cols-4 lg:gap-0 items-center justify-items-center font-outfit my-10'>
          <div className='bg-navcolor w-[298px] min-h-[280px] h-auto shadow-[0_0_25px_0_#00000014] rounded-[18px] backdrop-blur-[8px]'>
            <div className='flex justify-start align-middle mt-6 ml-8'>
              <Image
                src='/images/desktop.png'
                alt='Apply Logo'
                width={60}
                height={60}
              />
            </div>
            <p className='ml-8 font-normal mt-8 mb-2 text-[20px]'>Visit  Quickfund Website</p>
            <p className='ml-8 text-[17px] text-[#5A5A5A]'>Click on  Apply Now  at the top of the  website to start your loan application. Or download our Mobile App. <span className='text-[#ED3237] hover:cursor-pointer'>Download Here</span></p>


        </div>
        <div className='bg-navcolor w-[298px] h-[280px] shadow-[0_0_25px_0_#00000014] rounded-[18px] backdrop-blur-[8px]'>
        <div className='flex justify-start align-middle mt-6 ml-8'>
              <Image
                 src='/images/permission1.png'
                alt='Apply Logo'
                width={60}
                height={60}
              />
            </div>
            <p className='ml-8 font-normal mt-8 mb-2 text-[20px]'>Create or Log In to Your Account</p>
            <p className='ml-8 text-[17px] text-[#5A5A5A]'>Sign Up or Login with Just your Phone Number!</p>


</div>
<div className='bg-navcolor w-[298px] h-[280px] shadow-[0_0_25px_0_#00000014] rounded-[18px] backdrop-blur-[8px]'>
<div className='flex justify-start align-middle mt-6 ml-8'>
              <Image
                 src='/images/check3.png'
                alt='Apply Logo'
                width={60}
                height={60}
              />
            </div>
            <p className='ml-8 font-normal mt-8 mb-2 text-[20px]'>Verify Your Information</p>
            <p className='ml-8 text-[17px] text-[#5A5A5A]'>Provide the required details to process your loan application quick and easy.</p>
           

</div>
<div className='bg-navcolor w-[298px] h-[280px] shadow-[0_0_25px_0_#00000014] rounded-[18px] backdrop-blur-[8px]'>
<div className='flex justify-start align-middle mt-6 ml-8'>
              <Image
                src='/images/checked1.png'
                alt='Apply Logo'
                width={60}
                height={60}
              />
            </div>
            <p className='ml-8 font-normal mt-8 mb-2 text-[20px]'>Get Instant Approval</p>
            <p className='ml-8 text-[17px] text-[#5A5A5A]'>Your loan gets approved in minutes and disbursed to your account.</p>
            

</div>

        </div>
      
          <p className='mb-2 w-full   text-center font-outfit mt-28  lg:text-[64px] md:text-[42px] text-[60px] font-bold bg-gradient10 leading-70 lg:leading-none bg-clip-text md:leading-none text-transparent '> Fast, Flexible Loans for Personal <br/> and Business Needs</p>
        
        
    </>
  );
}

export default ApplyCard;
