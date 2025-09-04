'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { RiArrowRightSFill } from "react-icons/ri";
import SideModal from '../slideDashboard/SideModal';
import MainOffer from '../offers/MainOffer';
import FaceScan from '../slideDashboard/FaceScan';
import Notification from '../Notification';
import LoanTransactions from './LoanTransations';
import {useRouter} from 'next/navigation';
import AccountNotification from './AccountNotification';
import LoadingPage from '@/app/loading';
import { formatCurrency } from '@/utils/bankFunctions';
import WelcomeNotice from '../WelcomeNotice';
import { useSearchParams } from 'next/navigation';
import apiClient from '@/utils/apiClient';

const Transactions = () => {
  const [userVerified, setUserVerified] = useState(false);
  const [initialization, setInitialization] = useState(false)
 const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMainOffer, setShowMainOffer] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [onboarding, setOnboarding] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [openFaceScan, setOpenFaceScan] = useState(false);
  const [openLoanTransactions, setOpenLoanTransactions] = useState(false);
  const [loanHistory, setloanHistory] = useState<any>([]);
  const [AllLoanTransactions, setAllLoanTransactions] = useState<any>([]);
  const [bankCodeRan, setBankCodeRan] = useState(false);
  const [messageCard, setMessageCard] = useState('');
  const loanReference : string | null = localStorage.getItem('loan_reference')
  const card_reference : string | null = localStorage.getItem('card_reference')
  const [openAccountNotification, setOpenAccountNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [openWelcomeNotice, setOpenWelcomeNotice] = useState(false);
  const [verificationRan, setVerificationRan] = useState(false)
  const directDebitReference : string | null = localStorage.getItem('direct_debit')
  const [debitMessage, setDebitMessage] = useState('');
  const showWelcomeNoticeAgain = localStorage.getItem('showWelcomeNoticeAgain');
  
  const [loanCodeRan, setLoanCodeRan] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userOffers,setUserOffers] = useState<any>([]);
  



  //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  //toggle loan transactions
  const toggleLoanTransactions = () => {
    setOpenLoanTransactions(!openLoanTransactions);
  };

  //toggle welcome notice
  const toggleWelcomeNotice = () => {
    setOpenWelcomeNotice(!openWelcomeNotice);
  };

  //toggle face scan
  const toggleFaceScan = () => {
    setOpenFaceScan(!openFaceScan);
  };

  //toggle account notification
  const toggleAccountNotification = () => {
    setOpenAccountNotification(!openAccountNotification);
  };

  //get all loans
useEffect(() => {
  const fetchUsersActiveLoan = async () => {
    try {
      const response = await apiClient.get(`/loan`);
     
      // Sort loan transactions by created_at in descending order
      const sortedLoanHistory = response?.data?.data.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
    setloanHistory(sortedLoanHistory);
   
      
    } catch (error: any) {
      console.log(error.response);
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } finally{
      setLoanCodeRan(true)
    }
  };
  fetchUsersActiveLoan();
  }, []);

  
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
      } finally{
        setBankCodeRan(true);
      }
    };

    fetchUsersBankAccounts();
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
  


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   //toggle main offer view
   const toggleMainOffer = () => {
    setShowMainOffer(!showMainOffer);
  };

  


  //this ensures all the async functions have run before the apply now button is enabled so the right conditions apply
  useEffect(() => {
    if (onboarding && bankCodeRan  && loanCodeRan && verificationRan) {
      setInitialization(true);
      console.log('initialization now true')
      
    }else{
      console.log('initialization failed')
    }
  }, [onboarding, bankCodeRan,loanCodeRan, verificationRan]);

 



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
      } else if (userVerified  && onboarding?.live_check === null || onboarding?.live_check === 'failed') {
        
        await toggleFaceScan();
      }  else if(bankAccounts[0]?.authorization_code !== 'complete' && debitMessage && debitMessage !== 'Authorization does not exist or does not belong to integration'){
        setNotificationMessage('Dear customer, your bank account E-Mandate activation is in progress. We will notify you once it is done.');
        await setOpenAccountNotification(true);

      } else if (
        loanHistory[0]?.loan_schedules?.filter(
          (loan: any) =>
            loan?.status === "pending" ||
          loanHistory?.some(
            (l: any) => l.status === "OVERDUE" && l.amount_remaining !== 0
          )  ||
            (loan.status === "partially_paid" && loan.remaining_balance !== 0)
        ).length > 0
      ) {
        console.log('there is active loan',)
        
        setNotificationOpen(true);
      }else if (userVerified && onboarding?.live_check === 'completed' && userOffers?.length <= 0) {
        setNotificationOpen(true)
      } else if (userVerified && onboarding?.live_check === 'completed') {
        toggleMainOffer();
      }else{
        console.log('no condition met')
      }
    } catch (error: any) {
      console.error("Error in handleApplyNow:", error);
    } 
  };
  
  
useEffect(() => {
  const allTransactions = loanHistory?.reduce((acc: any[], loan: any) => {
    if (loan?.loan_transactions ) {
      acc = acc.concat(loan.loan_transactions.filter((transaction: any) => transaction.status !== 'pending' ));
    }
    return acc;
  }, []);

 

  // Sort the combined transactions by transaction_date
  if (allTransactions) {
    allTransactions.sort((a: any, b: any) => {
      return new Date(b.id).getTime() - new Date(a.id).getTime();
    });
    setAllLoanTransactions(allTransactions); // Set the combined and sorted loan transactions
  }
}, [loanHistory]);
const transactionsToDisplay =  AllLoanTransactions?.slice(0, 5);


 //verify loan status when it is stuck in processing
 useEffect(() => {
  const verifyLoanStatus = async () => {
    if ( loanHistory[0]?.status !== 'PROCESSING') return;
      try {
        if(loanReference === null) return;
        const response = await apiClient.get(
          `/paystack/verify/${loanReference}`,
        );
        if(response?.data?.message === 'Transaction already completed')
          localStorage.removeItem('loan_reference');

      } catch (error: any) {
        console.error('Error during payment verification:', error);
      } 
  };

  verifyLoanStatus();
}, [loanReference, loanHistory]);




  return (
    <div className="font-outfit mt-4 mx-auto gap-4 w-11/12 h-auto overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:h-[349px] md:h-[349px] h-[257px] w-full bg-[#60738C] rounded-[12px]">
        <div className="lg:w-9/12 md:w-10/12 w-6/12 lg:ml-4 md:ml-2 ml-4 mt-6 ">
          <p className="lg:text-[20px] md:text-[16px] md:font-bold lg:leading-9 text-[#FFFFFF]">Instant Loan</p>
          <p className="lg:text-[16px] md:text-[15px] text-[15px] md:leading-5  mt-1 font-light text-[#FFFFFF]">Get up to NGN500,000 loan in less than 5 minutes.</p>
        </div>
        <div className="lg:flex justify-start align-middle relative items-start md:w-11/12 md:ml-2 lg:w-full h-full lg:ml-2 ml-4">
          {loading && <LoadingPage />}
          <button
            onClick={handleApplyNow}
            disabled={!initialization || !onboarding || loading}
            className="bg-[#F6011BCC] disabled:cursor-not-allowed justify-center flex lg:ml-2 items-center hover:cursor-pointer z-20 lg:font-bold text-[#FFFFFF] text-[15px] lg:w-[139px] md:w-[119px] h-[37px] rounded-[12px] px-4 py-2 lg:mt-6 md:mt-6 mt-6"
          >
            <span className=''>
              {onboarding.card_tokenized && !userVerified  ? 'Continue' : 'Apply now'}
              </span>
             <RiArrowRightSFill className="text-white cursor-pointer" />
          </button>
          <div className="absolute  lg:right-2 md:-right-[13px] lg:-top-0 md:-top-[15px] -top-[112px] -right-2 ">
            <Image src="/images/cloneWoman.png" width={220.86} height={353.36} alt="Loan" />
          </div>
        </div>
      </div>
  
      <div className="lg:h-[349px] h-[267px]  md:h-[349px] w-full bg-[#A24A4C] rounded-[12px]">
        <div className="lg:w-9/12 md:w-10/12 lg:ml-4 md:ml-2 mt-6 w-6/12 ml-4">
          <p className="lg:text-[20px] md:text-[16px] md:font-bold lg:leading-9 text-[#FFFFFF]">Salary Loan</p>
          <p className="lg:text-[16px] md:text-[15px] text-[15px] md:leading-5  mt-1 font-light text-[#FFFFFF]">Get up to <br className='block lg:hidden md:hidden'/> NGN2,000,000 <br className='block lg:hidden md:hidden'/>loan and repay <br className='block lg:hidden md:block'/> within 12 months.</p>
        </div>
        <div className="lg:flex justify-start align-middle relative items-start w-full h-full lg:ml-2 md:ml-2 ml-4">
          <p className="text-[16px] text-navfont font-bold mt-6 lg:ml-2">Coming soon!</p>
          <div className="absolute lg:-right-[79px] md:-right-6  w-full lg:-top-5 md:-top-[57px]  -top-[168px] -right-[152px]">
            <Image 
            src="/images/cloneMan.png" width={226} height={210} alt="Loan" className="md:mt-0" />
          </div>
        </div>
      </div>
  
      <div className="h-[349px] w-full bg-[#F1F1F1] rounded-[12px] lg:col-span-1 md:col-span-2">
        <div className="flex justify-between items-center mt-6 ml-6 ">
          <p className="text-[16px] text-navfont font-bold">Recent transactions</p>
          <button 
          onClick={toggleLoanTransactions}
           className={`text-[14px] ${!history ? "text-[#5A5A5A]" : "text-[#ED3237]"} font-normal mr-4 z-30`}>
            View all
          </button>
        </div>
  
        {transactionsToDisplay.length < 1 ? (
          <div className="w-full h-auto mt-20">
            <div>
              <Image src="/images/tag.png" alt="transaction" width={33.8} height={44.2} className="object-cover m-auto mb-3" />
              <p className="text-[#5A5A5A] text-[16px] text-center">Nothing to see here yet</p>
            </div>
          </div>
        ) : (
          <div className="">
           
          {transactionsToDisplay?.map((loan: any, index: number) => (
          <div key={index} className="flex justify-between items-center mt-4 mx-4">
            <div className="flex items-center gap-2">
              <Image 
              src={`/images/${ loan.transaction_type === "loan" ? "credit.png" : loan.transaction_type === 'refund' ? 'credit.png' : "debit.png"}`}
              alt="Debit" 
              width={38} 
              height={38} 
              />
              <p className="text-[14px]">
                {loan.transaction_type === 'loan' ? 'Loan disbursement' : loan.transaction_type === 'refund'? 'Refund disbursement' : loan.transaction_type === 'penalty'? 'Penalty repayment' : 'Loan repayment'}<br />
                <span className="text-[#828282]">{loan?.transaction_date || 'N/A'}</span>
              </p>
            </div>
            <p className="text-[14px] font-semibold">{loan.transaction_type === 'loan' || loan.transaction_type === 'refund'  ? '' : '-'} {loan.transaction_type === 'loan' || loan.transaction_type === 'refund' ? formatCurrency(loan.amount) : formatCurrency(Number(loan.amount.toString().split('-')[1]))}</p>
          </div>
        ))}
          </div>
          )}
        
      
      </div>
        
  
      <SideModal isOpen={isModalOpen} closeModal={handleCloseModal} />

      {/* MainOffer Modal */}
      {showMainOffer && (
        <MainOffer
        isOpen={showMainOffer}
        toggleMainOffer={toggleMainOffer}
      />
      )}

      {/* Error Notification */}
      {notificationOpen && (
        <Notification
          status="error"
          
          message={error ||  'You are not qualified for a loan at the moment. Please pay your outstanding loans and try again.'}
          toggleNotification={toggleNotification}
          isOpen={notificationOpen}
        />
      )}

      {/* Face Scan Modal */}
      {openFaceScan && (
        <FaceScan
          isOpen={openFaceScan}
          toggleFaceScan={toggleFaceScan}
        />
      )}

      {/* Account Notification Modal */}
      {openAccountNotification && (
        <AccountNotification
          isOpen={openAccountNotification}
          toggleAccountNotification={toggleAccountNotification}
          
        />
      )}
  

      {/* Loan Transactions Modal */}
      {openLoanTransactions && (
        <LoanTransactions
          isOpen={openLoanTransactions}
          toggleLoanTransactions={toggleLoanTransactions}
          loanTransactions={AllLoanTransactions}
         
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
  


export default Transactions;