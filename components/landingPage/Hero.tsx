'use client';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import Entry from '@/components/getStarted/Entry'
import { decryptToken } from '@/utils/protect';
import { useRouter } from 'next/navigation';


const Hero = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    const spans = document.querySelectorAll('.marquee-container span');
    let index = 0;

    const animateGreeting = () => {
      spans.forEach((span, i) => {
        if (i === index) {
          span.classList.add('animate-marquee');
          span.classList.remove('hidden'); // Show the current span
        } else {
          span.classList.remove('animate-marquee');
          span.classList.add('hidden'); // Hide other spans
        }
      });

      index = (index + 1) % spans.length; // Move to the next span
    };

    const greetingInterval = setInterval(animateGreeting, 5000);

    return () => clearInterval(greetingInterval); // Cleanup on unmount
  }, []);

  // Check if user is logged in
  const handleCheckUserStatus = async() => {
    const token = await decryptToken();
    if (token) {
      router.push('/dashboard');
    } else {
      handleOpenModal();
    }
  }

  return (
    <>
      <div
        className="lg:w-11/12 md:w-11/12 w-full herobanner h-[810px]  lg:h-[792px] mx-auto lg:rounded-[60px] md:rounded-[60px] lg:shadow-[0_0_25px_0_#0000000D] md:shadow-[0_0_25px_0_#0000000D] md:backdrop-blur-[8px] lg:backdrop-blur-[8px] overflow-hidden relative z-10"
      >
        <div className="relative flex w-full h-full herobanner  ">
          {/* Text Container */}
          <div className="w-full mx-4 h-auto lg:mx-auto md:mx-auto lg:mt-10 md:mt-10 z-50 relative ">
            {/* Dynamic Greeting */}
            <h1 className="lg:text-[72px] font-patrick text-[72px] md:text-[72px] lg:mt-8 md:mt-8 text-center py-auto font-normal text-[#282828]">
              <div className="marquee-container">
                <span >Hello,</span>
                <span className='hidden'>Kedu,</span>
                <span className='hidden'>Bawoni,</span>
                <span className='hidden'>Sannu,</span>
              </div>
            </h1>

            <p className=" lg:w-6/12 md:mx-auto md:w-8/12 lg:mx-auto custom-gradient lg:text-[65px] text-[48px] md:text-[55px] lg:leading-70 leading-50 md:leading-60 text-center py-auto font-outfit font-bold">
              We make borrowing easy and fast
            </p>

            <p className="lg:mt-6 md:mt-6 mt-4 lg:text-[28px] text-[24px] lg:leading-10 md:leading-10 leading-8 md:text-[24px] text-center font-outfit font-normal text-[#282828]">
              Get Instant, Hassle-free Loans with <br /> Just Your Phone Number
            </p>
            

            <button 
              className="bg-[#F6011BB2]  hover:bg-navfont   mt-9 lg:mt-8 mb-4 lg:mb-0 text-white font-outfit font-bold rounded-full lg:w-[210px] block mx-auto md:w-[180px] w-[221px] h-[63px] py-1 px-4 lg:px-6  text-[18px]"
              onClick={handleCheckUserStatus}
            >
              Apply Now
            </button>
  </div>
    </div>
      </div>
      
    </>
  );
};

export default Hero;