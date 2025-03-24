'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Define the Job type
type Job = {
  [key: string]: any; // Allows dynamic keys with any type of value
};

const CareerHero = () => {
  const router = useRouter();
  const jobData: Job[] = []

  return (
    <div className="w-11/12 h-auto min-h-[564px] mt-10 mx-auto rounded-[44px] overflow-hidden font-outfit flex justify-center items-center">
      <div className="h-auto min-h-[444px] w-11/12 flex flex-col-reverse lg:flex-row md:flex-row mx-auto my-10 gap-6">
        {/* Text Section */}
        <div className="w-full md:mr-4 mt-4">
          <p className="font-bold mb-6 text-transparent bg-gradient6 bg-clip-text lg:text-[46px] text-[35px] leading-none">
            Careers @ QuickCred
          </p>
          <p className="font-normal mb-6 tracking-tighter text-[#282828] lg:text-[24px] text-[20px]">
            At QuickCred, our work culture is built on trust, well-being, results, and a healthy work-life balance.
          </p>
          <p className="text-[#5A5A5A] text-[18px] font-semibold mb-6">All Openings</p>
          {jobData?.length > 0 ? (jobData?.map((job, index) => (
            <div
              key={index} // Added a key prop for unique identification
              className="flex justify-start items-center mt-2"
            >
              <Image
                src="/images/briefcase.png"
                alt="Job Icon"
                width={18}
                height={18}
                priority={true}
              />
              <p className="text-[#5A5A5A] text-[16px] font-normal ml-2">
                {job?.title} -
              </p>
              <button
                onClick={() => router.push(`/career/${job?.id}`)} // Assuming index is used for the dynamic route
                className="text-[#0A48B2] font-medium text-[16px] ml-2"
              >
                Apply
              </button>
            </div>
          ))) : (
            <div className='flex justify-start items-center mt-8 gap-2 w-11/12'>
          <Image
                src="/images/failed.png"
                alt="Job Icon"
                width={50}
                height={50}
                priority={true}
              />
              <p className='font-normal text-[15px] '>We currently do not have an opening, please check 
                again some other time or follow us on social media to get updates.</p>
          </div>
          )}
          
        </div>

        {/* Image Section */}
        <div className="my-auto h-[444px] sm:mt-4 w-full">
          <Image
            className="w-full rounded-[22px] object-cover h-full"
            src="/images/career.png"
            alt="Hero Image"
            width={491}
            height={444}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerHero;
