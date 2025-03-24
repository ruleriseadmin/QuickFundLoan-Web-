'use client';
import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

const Careers = () => {
  const router = useRouter();
  
  return (
    <div className='w-11/12 min-h-[564px] h-auto mt-16  mx-auto rounded-[44px] overflow-hidden font-outfit flex justify-center items-center'>
      <div className='min-h-[444px] h-auto w-11/12 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mx-auto my-auto'>

        <div className="my-auto h-full">
          <Image
            className="w-full rounded-[22px] object-cover h-full"
            src='/images/career.png'
            alt="Logo"
            width={491}
            height={444}
            priority={true}
          />
        </div>

        {/* Update the styles of the second grid */}
        <div className=" lg:ml-6 md:ml-8 w-full mt-4">
          <p className='font-bold mb-3 tracking-tighter text-[#282828] lg:text-[38px] text-[31px] leading-none '>Careers at Quickcred</p>
          <p className='font-normal mb-6 tracking-tighter text-[#282828] lg:text-[24px] text-[20px] '>
          At Quickcred, we're committed to creating opportunities for individuals and businesses to thrive. To bring this vision to life, we need passionate, talented, and ambitious people like you.
          We foster an environment where innovation, collaboration, and growth are at the core of everything we do. Every role at Quickcred is essential to our mission of providing exceptional financial solutions to individuals and businesses.
          </p>

          <div className='flex justify-start align-middle gap-6 '>
          <button
          onClick={() => router.push('/career')}
         className='bg-inherit border border-solid border-[#F24C5D] hover:bg-[#ffff]  text-[#F24C5D] font-outfit font-bold rounded-full lg:w-[146px] w-[146px] h-[54px] py-1 px-4 text-[18px]'
          >
            See openings

          </button>
    </div>
        </div>

      </div>
    </div>
  );
};

export default Careers;
