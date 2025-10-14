'use client'
import { useState, useEffect } from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import DisplayOffer from "./DisplayOffer";
import LoanRepayment from "./LoanRepayment";
import { FaTimes } from "react-icons/fa";
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import Notification from '../Notification';


type MainOfferProps = {
  isOpen: boolean;
  toggleMainOffer: () => void;
};

type UserData = {
  id: number;
  amount: string;
  upfront_payment:boolean;
 
}[];



const MainOffer: React.FC<MainOfferProps> = ({ isOpen, toggleMainOffer }) => {

  const [showOffer, setShowOffer] = useState(true);
  const [showLoan, setShowLoan] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userOffers, setUserOffers] = useState<UserData | null>(null);
  const [error, setError] = useState('');
  const [removeOverFlow, setRemoveOverFlow] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onboarding, setOnboarding] = useState<any>({});

 


  //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  //toggle show all offers
  const toggleShowAllOffers = () => {
    setShowAllOffers(!showAllOffers);
  };

  //get onboarding process 
 useEffect(() => {
  const fetchBoardingProcess = async () => {
    try {
      const response = await apiClient.get(`/onboarding`);
      setOnboarding(response?.data?.data);
      
    } catch (error: any) {
      
      console.log('error',error);
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } 
  };
  fetchBoardingProcess();
  }, []);
  

  //get user offers
  useEffect(() => {
    const fetchUserOffers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/loan/user_offers?${showAllOffers ? 'show_all_offers=true' : ''}`);

       setUserOffers(response?.data?.data);
        
      } catch (error: any) {
        console.log(error.response);
       setError(error?.response?.data?.message ||  'An error occurred, please try again');
        setNotificationOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOffers();
    }, [showAllOffers]);

  


 

  const handleShowOffer = () => {
    setShowOffer(true);
    setShowLoan(false);
  };

  const handleShowLoan = () => {
    setShowOffer(false);
    setShowLoan(true);
  };

  //toggle remove overflow
  const toggleRemoveOverflow = () => {
    setRemoveOverFlow(!removeOverFlow);
  }

 
  
  return (
    <div
    onClick={toggleMainOffer} 
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-40 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[463px] bg-white lg:ml-32 md:ml-32 mx-2 min-h-[617px] h-auto font-outfit rounded-[22px] p-6 shadow-md max-h-[80vh] ${!removeOverFlow ? 'overflow-y-auto' : ''} transition-transform duration-300 transform ${
          isOpen ? 'scale-100' : 'scale-75'
        }`}
      >
        <div className="w-11/12 mx-auto rounded-[22px]">
        <div className='flex align-middle items-center justify-start'>
              {/* Back Button, only visible when findUs is false */}
              {!showOffer && (
            <button
              className="text-[18px]] bg-[#F6F6F6] px-2 py-2 font-bold  rounded-full  hover:text-[#030602] flex items-center "
              onClick={() => {
                if (showLoan) handleShowOffer();
              }}
            >
             <MdOutlineArrowBackIosNew className="text-[#1C1C1E] text-2xl" />
            </button>
          )}
       
          <p className="flex-grow lg:text-[18px] md:text-[16px] text-[14px] text-[#1C1C1E] font-bold ml-2">
           {showOffer ? 'Eligible Offers' : ''}
          </p>
{showOffer && (
          <button
            onClick={toggleMainOffer}
            className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center justify-center"
          >
            <FaTimes className="text-navfont text-2xl" />
          </button>
)}


        </div>
        {loading && <LoadingPage />}
          {/* Offer and Loan Tabs */}
          {showOffer && (
            <DisplayOffer 
            handleShowLoan={handleShowLoan}
            usersOffer={userOffers}
            closeModal={toggleMainOffer}
            toggleShowAllOffers={toggleShowAllOffers}
            showAllOffers={showAllOffers}
            onboarding={onboarding}
            />
          )}

          {showLoan && (
            <LoanRepayment
            closeModal={toggleMainOffer}
           toggleRemoveOverflow={toggleRemoveOverflow}
            />
            
          )}


          
        </div>
        {notificationOpen &&
         <Notification 
         isOpen={notificationOpen}
         status='error'
         
         message={error} 
         toggleNotification={toggleNotification} />}
      </div>
    </div>
  );
};

export default MainOffer;
