'use client';
import React, { useState, useEffect } from 'react';
import SideBar from '@/components/mainDashboard/SideBar';
import DashboardHeader from '@/components/mainDashboard/DashboardHeader';
import HistoryCard from '@/components/loanHistory/HistoryCard';
import Image from 'next/image';
import { RiArrowRightSFill } from 'react-icons/ri';
import apiClient from '@/utils/apiClient';
import { decryptToken } from '@/utils/protect';
import LoadingPage from '../loading';
import MainOffer from '@/components/offers/MainOffer';
import FaceScan from '@/components/slideDashboard/FaceScan';
import SideModal from '@/components/slideDashboard/SideModal';
import { withAuth } from '@/components/auth/EnsureLogin';
import Notification from '@/components/Notification';
import AccountNotification from '@/components/mainDashboard/AccountNotification';
import WelcomeNotice from '@/components/WelcomeNotice';
import { useSearchParams, useRouter } from 'next/navigation';


type Loan = {
  loan_schedules: any[];
  [key: string]: any;
};

const LoanHistoryPage: React.FC = () => {
  const [history, setHistory] = useState<Loan[]>([]);
  const [error, setError] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [initialization, setInitialization] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMainOffer, setShowMainOffer] = useState<boolean>(false);
  const [onboarding, setOnboarding] = useState<any>({});
  const [openFaceScan, setOpenFaceScan] = useState(false);
  const [loanHistory, setloanHistory] = useState<any>([]);
  const [visibleLoans, setVisibleLoans] = useState(2);
  const [bankAccounts, setBankAccounts] = useState<any>([]);
  const directDebitReference : string | null = localStorage.getItem('direct_debit')
  const [verificationRan, setVerificationRan] = useState(false)
  const [debitMessage, setDebitMessage] = useState('');
  const [openAccountNotification, setOpenAccountNotification] = useState(false);
    const [openWelcomeNotice, setOpenWelcomeNotice] = useState(false);
    const [bankCodeRan, setBankCodeRan] = useState(false);
    const showWelcomeNoticeAgain = localStorage.getItem('showWelcomeNoticeAgain');
   const [messageCard, setMessageCard] = useState('');
    const card_reference : string | null = localStorage.getItem('card_reference')

    const [userOffers,setUserOffers] = useState<any>([]);
    

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  

   //toggle main offer view
   const toggleMainOffer = () => {
    setShowMainOffer(!showMainOffer);
  };

  //toggle face scan
  const toggleFaceScan = () => {
    setOpenFaceScan(!openFaceScan);
  };

  useEffect(() => {
    const fetchUsersBankAccounts = async () => {
      try {
        const response = await apiClient.get(
          `/account`
        );

        setBankAccounts(response?.data?.data || []);
      } catch (error: any) {
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
      } finally {
        setBankCodeRan(true);
      }
    };

    fetchUsersBankAccounts();
  }, []);


  useEffect(() => {
    const fetchLoanHistory = async () => {
      try {
        setLoading(true);
        const token = await decryptToken();
        const response = await apiClient.get(
          `/loan`
        );
        setHistory(response?.data?.data || []);
        setLoading(false);
      } catch (error: any) {
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
        setLoading(false);
      }
    };
    fetchLoanHistory();
  }, []);

  // Sort loans by due date
  const sortedLoanHistory =history.sort((a: any, b: any) => {
    return new Date(b.id).getTime() - new Date(a.id).getTime();
  });


 // Show more loans
const handleSeeMore = () => {
  setVisibleLoans((prev) => Math.min(prev + 2, sortedLoanHistory.length));
};

// Show less loans
const handleSeeLess = () => {
  setVisibleLoans((prev) => Math.max(2,  2));
};


//toggle welcome notice
const toggleWelcomeNotice = () => {
  setOpenWelcomeNotice(!openWelcomeNotice);
}


  //toggle account notification
  const toggleAccountNotification = () => {
    setOpenAccountNotification(!openAccountNotification);
  };


   //get onboarding process
 useEffect(() => {
  const fetchBoardingProcess = async () => {
    try {
      const response = await apiClient.get(`/onboarding`);
      setOnboarding(response?.data?.data);
      
    } catch (error: any) {
      console.log(error.response);
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } 
  };
  fetchBoardingProcess();
  }, []);

 //check if user has completed onboarding process
   useEffect(() => {
    if(onboarding){
      onboarding.bank_account_exists 
      && onboarding.card_tokenized     
     && onboarding.profile_exists
     && onboarding.bvn_nin_exists
     && onboarding.bvn_nin_is_verified
     && setUserVerified(true);
    }
   }, [onboarding]);


   //initialization
  useEffect(() => {
      if (onboarding && bankCodeRan && verificationRan ) {
        setInitialization(true);
      }else{
        console.log('initialization failed')
      }
    }, [onboarding, bankCodeRan, verificationRan]);

  

  //get user offers
useEffect(() => {
  const fetchUserOffers = async () => {
    try {
      const response = await apiClient.get(`/loan/user_offers`);
     setUserOffers(response?.data?.data);
      
    } catch (error: any) {
      console.log(error.response);
       setError(error?.response?.data?.message || 'Dear customer, We discovered that you have an overdue loan with another bank or loan app. When you pay off this loan, you may be eligible for a loan offer.');
    
    } 
  };
  fetchUserOffers();
  }, []);

 
  //verify card tokenization
  useEffect(() => {
    const verifyCardTokenization = async () => {
      if (onboarding && !onboarding.card_tokenized && card_reference) {
       
        try {
          const response = await apiClient.get(
            `/paystack/verify/${card_reference}`
          );
          if(response?.data?.message === "Successful") {
            setMessageCard(response?.data?.message);
          }
         
          
        } catch (error: any) {
          console.log('error',error?.response?.data);
          setError(
            error?.response?.data?.message || 'An error occurred, please try again'
          );
          setNotificationOpen(true);
        }
      }
    };
    if(Object.keys(onboarding).length > 0)
    verifyCardTokenization();
  }, [onboarding, card_reference]);

  //verify account direct debit
 useEffect(() => {
  const verifyPayment = async () => {
    if (directDebitReference && bankAccounts.length > 0 && bankAccounts.filter((account:any) => account?.authorization_code  === 'pending').length > 0) {
      try {
  
        const response = await apiClient.get(
          `/paystack/verify/${directDebitReference}`,
        );
       
        setDebitMessage(response?.data?.message);

      } catch (error: any) {
        console.error('Error during payment verification:', error);
      } finally{
        setVerificationRan(true)
      }
    }else{
      setVerificationRan(true)
    }
  };

  verifyPayment();
  }, [directDebitReference, bankAccounts]);

  

//handle apply now logic on what should be displayed
const handleApplyNow = async () => {
  if (!initialization) return; // Prevent further execution if already loading

  try {
    
    if (onboarding && !onboarding?.profile_exists  && showWelcomeNoticeAgain === null){
      await toggleWelcomeNotice();
    }else if (onboarding && !onboarding?.card_tokenized && messageCard) {
      setError(
        'Your card has been successfully tokenized. Please wait while we confirm your details.'
     );
     setNotificationOpen(true)
    }       
    else if (!userVerified) {
      await handleOpenModal();
    } else if (userVerified && onboarding?.live_check === null || onboarding?.live_check === 'failed') {
      await toggleFaceScan();
    } else if(debitMessage && debitMessage !== 'Authorization does not exist or does not belong to integration'){
      await setOpenAccountNotification(true);

    } else if (
      loanHistory[0]?.loan_schedules?.filter(
        (loan: any) =>
          loan?.status === "pending" ||
        loan?.status === "overdue" ||
          (loan.status === "partially_paid" && loan.remaining_balance !== 0)
      ).length > 0
    ) {
      
      setNotificationOpen(true);
    }else if (userVerified && onboarding?.live_check === 'completed' && userOffers?.length <= 0) {
      setNotificationOpen(true)
    } else if (userVerified && onboarding?.live_check === 'completed') {
      toggleMainOffer();
    }
  } catch (error: any) {
    console.error("Error in handleApplyNow:", error);
  } 
};

  


  return (
    <div className="mb-6 font-outfit">
      <main
        className={`w-full ${
          sortedLoanHistory.length <= 0 ? 'h-screen' : 'h-auto'
        } overflow-hidden scrollbar-hide`}
      >
        <div className="grid grid-cols-12 w-full h-full">
          <div className="hidden lg:block md:block col-span-3 w-full h-screen my-2">
            <SideBar />
          </div>
          <div className="lg:col-span-9 md:col-span-9 col-span-12 w-full h-full my-2">
            <DashboardHeader path="Loan History" />
            {loading && <LoadingPage />}
            {sortedLoanHistory.length <= 0 && !loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center pb-48 justify-center">
                  <Image
                    src="/images/tag.png"
                    alt="transaction"
                    width={34}
                    height={44}
                    className="object-cover mb-3"
                  />
                  <p className="text-[#5A5A5A] text-[16px] text-center">
                    Nothing to see here yet
                  </p>
                  <button
                     onClick={handleApplyNow}
                     disabled={!initialization}
                    className="bg-[#F83449] flex align-middle justify-center mx-auto items-center cursor-pointer font-bold text-white text-[15px] w-[139px] h-[37px] rounded-[12px] px-4 py-2 mt-6"
                  >
                    Apply now <RiArrowRightSFill className="text-white ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-11/12 mx-auto h-auto mt-6">
                <div className="flex flex-col w-[368px] gap-4">
                  {sortedLoanHistory
                    .slice(0, visibleLoans) // Show only the visible loans
                    .map((loan: any, index: number) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          index < sortedLoanHistory.length
                            ? 'border-dashed border-b-2 border-gray-300'
                            : ''
                        } pb-4`}
                      >
                        <HistoryCard loanHistory={loan} />
                      </div>
                    ))}
                </div>
                {visibleLoans < sortedLoanHistory.length && (
  <div className="flex justify-center mt-4">
    <button
      onClick={handleSeeMore}
      className="bg-[#F83449] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#fd4c5e] transition"
    >
      See More
    </button>
  </div>
)}

{visibleLoans > 2 && (
  <div className="flex justify-center mt-4">
    <button
      onClick={handleSeeLess}
      className="bg-[#F83449] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#fd4c5e] transition"
    >
      See Less
    </button>
  </div>
)}

              </div>
            )}
          </div>
        </div>
      </main>
      <SideModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      {openFaceScan && (
        <FaceScan isOpen={openFaceScan} toggleFaceScan={() => setOpenFaceScan(false)} />
      )}
      {notificationOpen && (
        <Notification
          status="error"
          message={
            error ||
            'You are not qualified for a loan at the moment. Please pay your outstanding loans and try again.'
          }
          toggleNotification={() => setNotificationOpen(false)}
          isOpen={notificationOpen}
        />
      )}
      {showMainOffer && (
        <MainOffer isOpen={showMainOffer} toggleMainOffer={() => setShowMainOffer(false)} />
      )}

       {/* Account Notification Modal */}
       {openAccountNotification && (
        <AccountNotification
          isOpen={openAccountNotification}
          toggleAccountNotification={toggleAccountNotification}
         
        />
      )}

        {/* Welcome Notice Modal */}
        {openWelcomeNotice && (
        <WelcomeNotice
          isOpen={openWelcomeNotice}
          toggleWelcomeNotice={toggleWelcomeNotice}
          handleOpenModal={handleOpenModal}
          
        />
      )}
    </div>
  );
};

export default withAuth(LoanHistoryPage);