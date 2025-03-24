import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import apiClient from '@/utils/apiClient';


type WelcomeNoticeProps = {
  toggleWelcomeNotice: () => void;
  isOpen: boolean;
  handleOpenModal: () => void;
  
  
};


const WelcomeNotice: React.FC<WelcomeNoticeProps> = ({ toggleWelcomeNotice, isOpen, handleOpenModal}) => {
    const [fetchedUserData, setFetchedUserData] = useState<any>(null);
    // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/auth/show-user`);
        setFetchedUserData(response?.data?.data);
      } catch (error: any) {
        console.error(error);
      } 
    };
    fetchUserData();
  }, []);

  

  return (
    <div
     onClick={toggleWelcomeNotice}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
       onClick={(e) => e.stopPropagation()}
      className={`notifybanner w-[493px] lg:w-[493px] md:w-[493px] min-h-[627px]  h-auto lg:h-[502px] md:h-[502px] mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] p-6 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
         <button onClick={toggleWelcomeNotice} className="absolute top-2 right-2 text-xl font-bold">
                  <IoClose className="text-navfont rounded-full bg-[#E2E2E2] text-3xl mt-2 mr-2 p-1 font-bold" />
                </button>
      <div className=' w-full mb-4 rounded-[22px]'>

            <Image
              src= '/images/failed.png' 
              alt="WelcomeNotice Icon"
              width={80}
              height={80}
              className= 'ml-4'
            />
  
        </div>
        <div className='ml-4 '>
            <p className='text-[18px] font-thin text-[#030602]'>Hello {fetchedUserData?.name}, to serve you best, we have put in extra security to protect your account and personal information from fraudulent activities. This is a one-time process, and it should only take some minutes.</p>
            <p className=' mt-2 text-[18px] font-thin text-[#030602]'> <span className='font-medium text-[18px] text-[#030602]'>BVN -</span> As directed by the CBN, you need to link your BVN and NIN as part of our kyc, for identity verification.</p>
            <p className=' mt-2 text-[18px] font-thin text-[#030602]'> <span className='font-medium text-[18px] text-[#030602]'>Bank Account -</span>Link your most active bank account for better eligibility and loan disbursement.</p>
            <p className=' mt-2 text-[18px] font-thin text-[#030602]'> <span className='font-medium text-[18px] text-[#030602]'>Bank Account Mandate -</span>You will be required to activate a mandate on your bank account for easy loan repayment.</p>          
            <p className=' mt-2 text-[18px] font-thin text-[#030602]'> <span className='font-medium text-[18px] text-[#030602]'>Liveness Check  -</span>  This is a facial biometrics detection to help prevent imposters from using your personal information to gain access to your account .  </p>
        </div>
        <div className='ml-4 flex  items-center lg:gap-14 md:gap-14 gap-8'>
    <button
        type="button"
        onClick={() => {
            handleOpenModal();
            toggleWelcomeNotice();
        }}
        className="bg-[#1C1C1E] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed h-[47px] text-[15px] mb-4 w-[142px] rounded-[12px] px-4 py-2 mt-4 font-medium"
    >
        Continue
    </button>

    <div className="ml-4  flex items-center ">
        <input
            type="checkbox"
            id="dont-show-again"
            onChange={async (e) => {
                if (e.target.checked) {
                    localStorage.setItem("showWelcomeNoticeAgain", "false");
                    
                }
            }}
            className="h-5 w-5 font-thin text-[#1C1C1E]  border border-[#1C1C1E] accent-[#1C1C1E] rounded "
        />
        <label
            htmlFor="dont-show-again"
            className="ml-2 font-thin text-[#1C1C1E] text-[14px]  cursor-pointer"
        >
            Don't show this again
        </label>
    </div>
</div>


      </div>
      
    </div>
  );
};

export default WelcomeNotice;