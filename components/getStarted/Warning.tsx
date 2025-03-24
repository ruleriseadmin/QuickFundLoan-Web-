import React from 'react';
import Image from 'next/image';


type WarningProps = {
  toggleWarning: () => void;
  isOpen: boolean;
  message: string;
  proceedToRegister: () => void;
  
};


const Warning: React.FC<WarningProps> = ({ toggleWarning, isOpen,message, proceedToRegister}) => {
  

  return (
    <div
    onClick={toggleWarning}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
       onClick={(e) => e.stopPropagation()}
      className={`notifybanner w-[449px] h-[257px]  mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] py-6 px-4 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <div className=' w-full mb-3 rounded-[22px]'>

            <Image
              src= '/images/failed.png' 
              alt="OptionalWarning Icon"
              width={54}
              height={54}
              className= 'ml-4'
            />
  
        </div>
        <div className='text-[18px] font-normal text-[#030602] ml-4'>
            <p className='text-start'>{message}</p>
        </div>
        {message === 'For best loan eligibility result, please use the phone number linked with your BVN (Bank Verification Number)' && (
          <div className='pl-4'>
            <button
              type="button"
              onClick={() => {
                proceedToRegister();
                toggleWarning();
              }}
             className="bg-[#1C1C1E]  text-white disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
            >
              Continue
            </button>
          </div>
        )}
        

      </div>
      
    </div>
  );
};

export default Warning;