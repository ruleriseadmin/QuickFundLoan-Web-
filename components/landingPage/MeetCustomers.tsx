'use client';
import React, { useState, useEffect } from 'react';


const MeetCustomers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3); // Default to 3 items per slide
  const [currentIndex, setCurrentIndex] = useState(0);


  const gridItems = [
    { id: 1, name: 'Adebayo Oluyemi', text: 'AD', testimonial: 'Using QuickFund was a great experience! The loan application was simple, and I got my funds within minutes without any hassle. I loved that no collateral was required, and the repayment terms were very flexible.' },
    { id: 2, name: 'Olashile Ayobami', text: 'OA', testimonial: 'QuickFund made getting a loan so easy and fast. I received my funds in minutes with no collateral required. Their repayment terms are flexible, and the entire process is stress-free!.' },
    { id: 3, name: 'Obafemi Ogunleye', text: 'OO', testimonial: 'QuickFund is defintely  a lifesaver! The loan process was simple, and I got the funds I needed right when I needed them, with no stress or delays.' },
    { id: 4, name: 'Rita Echere  ', text: 'RE',testimonial: 'QuickFund has been a lifesaver! I needed an emergency loan to cover a medical bill, and the process was so fast and seamless. The app is user-friendly, and the repayment terms are fair. I would Highly recommend!' },
    { id: 5, name: 'Temilade Damola', text: 'TD', testimonial: 'QuickFund makes managing my finances so much easier. I love the repayment reminders and flexible loan options. It’s perfect for anyone who needs quick cash without the stress.' },
    { id: 6, name: 'Chinenye Nmoh', text: 'CN', testimonial: 'I’ve used QuickFund multiple times for short-term loans, and it’s always been a smooth experience. The dashboard makes it easy to track payments, and their customer service is excellent. Keep up the great work!"' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gridItems.length);
    }, 5000); 
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [gridItems.length, currentIndex]);
  
  // Get visible items based on current index 
  const visibleGridItemsSmall = gridItems.slice(currentIndex, currentIndex + itemsPerSlide);

  const totalSlides = Math.ceil(gridItems.length / itemsPerSlide); // Total slides

  

  // Handle slide change
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  // Get visible items based on current slide
  const visibleGridItems = gridItems.slice(
    currentSlide * itemsPerSlide,
    currentSlide * itemsPerSlide + itemsPerSlide
  );

  // Rotation classes based on index
  const getRotationClass = (index: number) => {
    const rotations = ['rotate-[-3.80deg]', 'rotate-[0.88deg]', 'rotate-[4.00deg]'];
    return rotations[index % 3]; // Apply rotation in a cyclic manner
  };

 

  // Effect to update itemsPerSlide based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerSlide(3); // Large screens
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(2); // Medium screens
      } else {
        setItemsPerSlide(1); // Small screens
      }
    };

    // Set initial items per slide
    handleResize();
    
    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='w-11/12 h-auto mt-10 mx-auto rounded-[44px] overflow-hidden font-outfit'>
        <div className='mx-auto  text-center font-outfit mt-28 '>
          <p className='lg:leading-none md:leading-none leading-[60px] text-[#282828] lg:text-[58px] text-[50px] font-bold'>
            Meet some of
          </p>
          <p className='mb-1  font-bold lg:text-[58px] text-[50px]  md:text-[35px] bg-gradient4 bg-clip-text text-transparent'>
            Our Happy Customers
          </p>
          <p className='text-[24px]  leading-[35px] text-center px-6 lg:px-0 md:px-0 text-[#282828] mt-4  font-medium'>
          Our customers are at the heart of everything we do. see how we’ve helped <br/> them achieve their goals.
          </p>
        </div>
         {/* small screen Carousel Grid */}
         <div className='w-full md:hidden  flex overflow-x-auto space-x-4 mx-auto mt-20 gap-0 mb-10 lg:hidden'>
  {gridItems.map((item, index) => (
    <div
      key={item.id}
      className={`bg-[#FFFFFF] flex-shrink-0 mx-auto lg:w-[387.41px] w-[334.41px] md:w-[337.41px] h-[340.96px] my-2  overflow-y-hidden shadow-[0_0_25px_0_#0000000D] rounded-[22px] md:rounded-[44px] lg:rounded-[44px] backdrop-blur-[5px] opacity-100 z-20 text-white text-2xl font-bold`}
    >
      <div className='w-[80px] h-[80px] rounded-full  bg-[#F6011B40]  flex justify-center items-center leading-none text-[32px] text-[#F6011B] font-comic  relative  mt-4 ml-8'>
       <p >{item.text}</p>
      </div>
      <div>
        <p className='text-[20px] mt-4 ml-4 font-comic font-bold text-[#282828]'>{item.name}</p>
        <p className='text-[16px] w-10/12 ml-4  font-comic font-thin text-[#5A5A5A]'>{item.testimonial}</p>
      </div>
    </div>
  ))}
</div>



        {/* Carousel Grid */}
        <div className='w-full hidden lg:grid  md:w-10/12 lg:w-10/12 md:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto mt-20 gap-0 mb-10'>
          {visibleGridItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-[#ffff] mx-auto  lg:w-[387.41px] w-[394.41px] md:w-[337.41px] h-[350.96px] lg:h-[434.96px] md:h-[450.96px]  shadow-[0_0_25px_0_#0000000D] rounded-[22px] md:rounded-[44px] lg:rounded-[44px] backdrop-blur-[5px] opacity-100 z-6 text-white text-2xl font-bold ${itemsPerSlide === 1 ? '' : getRotationClass(index)}`}

              >
              <div className='w-[80px] h-[80px] rounded-full flex justify-center items-center text-[32px] text-[#F6011B] font-comic bg-[#F6011B40] relative lg:mt-10 md:mt-16 mt-4 ml-8'>
              <p >{item.text}</p>
              </div>
              <div>
                <p className='text-[20px] mt-4 ml-8 font-comic font-bold text-[#282828] '>{item.name}</p>
                <p className='text-[18px] w-9/12  ml-8 font-comic font-thin  text-[#5A5A5A]'>{item.testimonial}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className=' hidden lg:flex mt-8 md:flex justify-center gap-2'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-6 h-6 rounded-full ${
                currentSlide === index ? 'bg-[#282828]' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MeetCustomers;
