import React from 'react';
import Image from 'next/image';


type OptionalAccountNotificationProps = {
  toggleLoanNotification: () => void;
  toggleRemoveOverflow: () => void;
  toggleSkipCardTokenization: () => void;
  isOpen: boolean;
  
};


const LinkCardNotification: React.FC<OptionalAccountNotificationProps> = ({ toggleLoanNotification, toggleRemoveOverflow, toggleSkipCardTokenization, isOpen}) => {
  
  

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`notifybanner w-[453px] h-[401px]   mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] p-6 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <div className=' w-full mb-12 rounded-[22px]'>

            <Image
              src= '/images/failed.png' 
              alt="OptionalAccountNotification Icon"
              width={100}
              height={100}
              className= 'ml-4'
            />
  
        </div>
        <div className='text-[18px] font-normal text-[#030602] ml-4'>
            <p className='text-start'>Are you sure you want to skip this step? It can increase your loan offer amount and eligibility.</p>
        </div>
      
       
        
        <div className='ml-4 mt-8'>
        <button
                type="button"
                onClick={ () => {
                    toggleRemoveOverflow();
                    toggleLoanNotification();
  
                }}
                className="bg-[#1C1C1E]  text-white disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
              >
                Link card
              </button>
              <button
                onClick={async () => {
                    toggleRemoveOverflow();
                    toggleSkipCardTokenization();
                    
                    toggleLoanNotification();
                }}
                type="button"
                className=" ml-4 bg-[#46A4B51F] text-[#ED3237] disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
              >
                Skip to proceed
              </button>
          </div>

      </div>
      
    </div>
  );
};

export default LinkCardNotification;