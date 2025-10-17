'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";
import Image from 'next/image'
import CardConfirmation from "./CardConfirmation";
import apiClient from "@/utils/apiClient";


type CardProps = {
  handleCardLink: () => void;
};

const Card:React.FC<CardProps>  = ({handleCardLink}) => {
const [loading, setLoading] = useState(false);
const [openConfirmation, setOpenConfirmation] = useState(false);
const [isExiting, setIsExiting] = useState(false);
const [openCardTokenize, setOpenCardTokenize] = useState(false);
const [onboardingFee, setOnboardingFee] = useState<string>('');


//toggle card tokenize modal
 const toggleCardTokenize = () => {
  setOpenCardTokenize(!openCardTokenize);
}

const toggleSlideCard = () => {
  if (!openConfirmation) {
    setOpenConfirmation(true); // Open the modal when it is currently closed
  } else {
    setIsExiting(true); // Start exit animation
    setTimeout(() => {
      setIsExiting(false);
      setOpenConfirmation(false); // Close the modal after exit animation
    }, 300);
  }
};

useEffect(() => {
  if(openCardTokenize){
    handleCardLink();
  }
}, [openCardTokenize])

//get onboarding fee
 useEffect(() => {
  const fetchBoardingFee = async () => {
    try {
      const response = await apiClient.get(`/settings-public/onboarding-fee`);
      setOnboardingFee(response?.data?.data?.value);
      
    } catch (error: any) {
      
      console.log('error',error);
    } 
  };
  fetchBoardingFee();
  }, []);

  return (
    <div className="font-outfit overflow-hidden mb-6 z-10">
      <div className="flex flex-col justify-center items-center ">
      <Image
      src='/images/cardMandate.png'
     alt='card'
     width={70}
     height={70}
     />
<p className="text-[#030602] text-[24px] font-medium mt-5">Link your ATM Card</p>
<p className="text-[#5A5A5A] text-[15px] text-center w-9/12">We will debit this card on your due dates for easy loan repayment.</p>
      </div>
      <div className="mt-6">
      <div className="text-[16px] mt-3 text-[#282828]  font-comic w-[380px]  h-[91px] flex items-start bg-[#F3F3F3] rounded-[12px] pl-3 ">
    <Image
    src='/images/creditCard.png'
     alt='cd'
     width={20}
     height={20}
     className="pt-3"
     />
     <p className="px-2  pt-3">You can link any of your Bank ATM card available. We accept physical or virtual card.</p>

        </div>
    <div className="lg:text-[16px] mt-3 md:text-[15px] text-[#282828]  font-comic w-[380px]  h-[91px] flex items-start bg-[#F3F3F3] rounded-[12px] pl-3 ">
    <Image
    src='/images/card1.png'
     alt='cd'
     width={20}
     height={20}
     className="pt-3"
     />
     <p className="px-2  pt-3">You will be charged a one-time fee of <strong>₦{onboardingFee || "200"}</strong> for card linking. Please ensure you have sufficient funds on this card.</p>

        </div>
        <div className="text-[16px] text-[#282828] mt-3 font-comic w-[380px]  h-[91px] flex items-start bg-[#F3F3F3] rounded-[12px] pl-3 ">
    <Image
    src='/images/exclamation.png'
     alt='cd'
     width={20}
     height={20}
     className="pt-3"
     />
     <p className="px-2  pt-3">To qualify for a loan, ensure you do not have any overdue repayment with another bank or loan app.</p>

        </div>

      
      </div>

      <p className="mt-12 text-[#ED3237] font-black text-center w-full text-[15px] font-saira">Secured by PAYSTACK</p>
     {loading && <LoadingPage />}
      <button
          type='button'
          onClick={() => setOpenConfirmation(true)}
          className="bg-[#1C1C1E] text-white h-[47px] w-[380px] rounded-[8px] z-10 px-4 py-2 mt-4 font-semibold"
        >
          Continue
        </button>

        {openConfirmation && 
        <CardConfirmation 
        toggleConfirmation={toggleSlideCard} 
       isOpen={!isExiting}
       openCardTokenize={toggleCardTokenize}
        />}
        
      
    </div>
  );
};

export default Card;