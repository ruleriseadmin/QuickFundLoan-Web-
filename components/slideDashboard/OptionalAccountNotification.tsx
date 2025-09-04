import React from 'react';
import Image from 'next/image';


type OptionalAccountNotificationProps = {
  toggleOptionalAccountNotification: () => void;
  isOpen: boolean;
  
};


const OptionalAccountNotification: React.FC<OptionalAccountNotificationProps> = ({ toggleOptionalAccountNotification, isOpen}) => {
  

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`notifybanner w-[493px] lg:w-[493px] md:w-[493px] min-h-[502px]  h-auto lg:h-[502px] md:h-[502px] mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] p-6 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <div className=' w-full mb-12 rounded-[22px]'>

            <Image
              src= '/images/failed.png' 
              alt="OptionalAccountNotification Icon"
              width={100}
              height={100}
              className= 'ml-4'
            />
  
        </div>
        <div className='text-[20px] font-normal text-[#030602] ml-4'>
            <p className='text-start'>Are you sure you want to skip this step? It can increase your loan amount and eligibility.</p>
        </div>
        <div className='flex items-center justify-start gap-2 mt-8 ml-4'>
          <Image
          src= '/images/gift.png'
          alt="gift Icon"
          width={20}
          height={20}
          />
          <p className='text-[15px] font-medium text-[#282828]'>Did you know?</p>
        </div>
        <p className='text-[13px] ml-4 font-normal text-[#282828] my-4'>You can get up to N500,000 instant loan on QuickCred in less than 5 minutes. Your consistency and loyalty as our customer will unlock juicy loan offers for you.</p>
        
        <div className='ml-4'>
        <button
                type="button"
                onClick={ toggleOptionalAccountNotification}
                className="bg-[#1C1C1E]  text-white disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
              >
                Link account
              </button>
              <button
                onClick={async () => {
                  toggleOptionalAccountNotification();
                  window.location.reload();
                toggleOptionalAccountNotification();
                }}
                type="button"
                className=" ml-4 bg-[#46A4B51F] text-[#46A4B5] disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
              >
                Skip to proceed
              </button>
          </div>

      </div>
      
    </div>
  );
};

export default OptionalAccountNotification;