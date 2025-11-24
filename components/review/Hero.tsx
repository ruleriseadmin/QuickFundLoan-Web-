import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-11/12 h-auto mx-auto font-outfit  text-center'>
      <div className='flex justify-center items-center gap-4 mt-6 lg:mt-0 md:mt-0'>
        <p className='font-outfit font-bold lg:text-[46px] md:text-[46px] text-[30px] '>Can We Get a Five Star?</p>
        <Image src='/images/reviewIcon.png' alt='review' width={42} height={42} />
      </div>
      <p className='lg:w-[801px]  mx-auto mt-1 lg:text-[24px] md:text-[24px] text-[18px]'>We appreciate every review and love we receive
         from all our customers. Leave us a heart warming review today.</p>
         <div className='flex justify-center items-center gap-6 mt-6 text-[#FFFFFF]'>
            <button className='flex items-center p-4 bg-[#F24C5D] w-[236px] h-[58px] rounded-[12px] gap-2'>
               <Image src='/images/playstore.png' alt='googlePlay' width={18} height={18} />
               <p className='semi-bold text-[15px]'>Rate our App on Android</p> 
            </button>
            <button className='flex items-center p-4 bg-[#F24C5D] w-[236px] h-[58px] rounded-[12px] gap-2'>
                <Image src='/images/apple.png' alt='googlePlay' width={18} height={18} />
               <p className='semi-bold text-[15px]'>Rate our App on iphone</p> 
            </button>
         </div>
    </div>
  )
}

export default Hero
