import React from 'react';
import Image from 'next/image';


type BankReasonProps = {
  toggleBankReason: () => void;
  isOpen: boolean;
};


const BankReason: React.FC<BankReasonProps> = ({ toggleBankReason, isOpen}) => {
  

  return (
    <div
    onClick={toggleBankReason}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-screen  index -translate-y-1/2  flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
   
      <div 
       onClick={(e) => e.stopPropagation()}
      className={`notifybanner lg:w-[439px] md:w-[419px] w-[390px] h-[257px] card-content ${isOpen  ? 'card-enter' : ' card-exit'}  mx-auto  lg:mt-[380px] md:mt-[480px]  mt-[480px]  font-outfit rounded-[22px] py-6 px-4 shadow-md  `}>
      <div className=' w-full mb-3 rounded-[22px]'>

            <Image
              src= '/images/failed.png' 
              alt="OptionalBankReason Icon"
              width={54}
              height={54}
              className= 'ml-4'
            />
  
        </div>
        <div className='lg:text-[18px] md:text-[18px] text-[16px] font-normal text-[#030602] ml-4'>
            <p className='text-start'>
            Due to our E-Mandate policy, your bank may not be listed as an approved institution for us to initiate Direct-Debit. See <span className="text-[#007BA1]">Direct Debit policy.</span> 
            </p>
        </div>
       
          <div className=' flex justify-start items-center ml-4'>
           
            <button
               
                type="button"
                onClick={toggleBankReason}
                className=" ml-4 bg-[#ED32371F] text-[#ED3237] disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
              >
                Go Back
              </button>
          </div>
       
        
          </div>
      </div>
      
    
  );
};

export default BankReason