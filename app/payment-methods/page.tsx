'use client';
import React, { useState, useEffect } from 'react';
import SideBar from '@/components/mainDashboard/SideBar';
import DashboardHeader from '@/components/mainDashboard/DashboardHeader';
import Image from 'next/image';
import { IoCardSharp } from 'react-icons/io5';
import { GoPlus } from 'react-icons/go';
import CardMethod from '@/components/paymentMethods/CardMethod';
import Notification from '@/components/Notification';
import LoadingPage from '../loading';
import { useSearchParams, useRouter } from 'next/navigation';
import BankMethod from '@/components/paymentMethods/BankMethod';
import apiClient from '@/utils/apiClient';
import {withAuth} from '@/components/auth/EnsureLogin';
import FaceScan from '@/components/slideDashboard/FaceScan';
import SideModal from '@/components/slideDashboard/SideModal';
import AccountNotification from '@/components/mainDashboard/AccountNotification';
import WelcomeNotice from '@/components/WelcomeNotice';



const PaymentMethodPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardMethod, setCardMethod] = useState(false);
  const [bankMethod, setBankMethod] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationData, setNotificationData] = useState({
    status: '',
    title: '',
    message: '',
    subMessage: '',
  });
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [userVerified, setUserVerified] = useState(false);
  const [initialization, setInitialization] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onboarding, setOnboarding] = useState<any>({});
  const [openFaceScan, setOpenFaceScan] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openAccountNotification, setOpenAccountNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [openWelcomeNotice, setOpenWelcomeNotice] = useState(false);
  const [bankCodeRan, setBankCodeRan] = useState(false);
  const [debitMessage, setDebitMessage] = useState('');
  const directDebitReference : string | null = localStorage.getItem('direct_debit')
  const showWelcomeNoticeAgain = localStorage.getItem('showWelcomeNoticeAgain');
  const monoSuccess: string | boolean = localStorage.getItem('monoSuccess') || false;
  const [verificationRan, setVerificationRan] = useState(false)
  const status = searchParams.get('status');
  const reason = searchParams.get('reason');
  
   //know mono has been successfully linked
    useEffect(() => {
      if (status === 'linked' && reason === 'account_linked') {
        localStorage.setItem('monoSuccess', 'true');
      }
    }, [status, reason]);
  



  const handleMethodChange = (method: string) => setSelectedMethod(method);

  const toggleCardMethod = () => setCardMethod(!cardMethod);
  const toggleBankMethod = () => setBankMethod(!bankMethod);

  const handleAddCard = () => {
    selectedMethod === 'card' ? setCardMethod(true) : setBankMethod(true);
  };

  const closeNotification = () => setNotificationOpen(false);



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
      } 
    };

    fetchUsersBankAccounts();
  }, []);

    //fetch link for direct debit
    const fetchPaymentLink = async (bankId:number | string) => {
    
      try {
        
        if(!bankId) return;
        const paymentResponse = await apiClient.post(
          `/account/direct_debit`,
          {bank_account_id: bankId},
          
        );
        console.log(paymentResponse?.data);
        if(paymentResponse?.data?.data?.reference){
        localStorage.setItem("direct_debit", paymentResponse?.data?.data?.reference);
        const link = paymentResponse?.data?.data?.payment_link;
        return link;
        }else{
          const url = `/dashboard?status=${encodeURIComponent('success')}&title=${encodeURIComponent('E-Mandate Registration Successful!')}&subMessage=${encodeURIComponent('You have successfully registered your E-Mandate. Continue for loan disbursment')}`;
  
          router.push(url); 
          setLoading(false);
        }
      } catch (error: any) {
        console.error("Payment Error:", error.response);
        const url = `/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred during payment processing.')}`;
        router.push(url); 
        setLoading(false);
    
      }
    };
      



//fetch users cards
  useEffect(() => {
    const fetchUsersCards = async () => {
      try {
        const response = await apiClient.get(
          `/account/cards`
        );

        setCards(response?.data?.data || []);
      } catch (error: any) {
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
      }
    };

    fetchUsersCards();
  }, []);

  // Handle query params for notifications
  useEffect(() => {
    const status = searchParams.get('status');
    const title = searchParams.get('title') || '';
    const message = searchParams.get('message') || '';
    const subMessage = searchParams.get('subMessage') || '';

    if (status && (message || title || subMessage)) {
      setNotificationData({ status, title, message, subMessage });
      setNotificationOpen(true);
      router.replace(window.location.pathname);
    }
    else if (error) {
      setNotificationData({ status: 'error', title: '', message: error, subMessage: '' });
      setNotificationOpen(true);
    }
  }, [searchParams, router,error]);

   //toggle welcome notice
   const toggleWelcomeNotice = () => {
    setOpenWelcomeNotice(!openWelcomeNotice);
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
      } finally{
        setBankCodeRan(true);
      }
    };

    fetchUsersBankAccounts();
  }, []);


  //verify account direct debit
  useEffect(() => {
    const verifyPayment = async () => {
      if (directDebitReference && bankAccounts.length > 0 && bankAccounts.filter((account) => account?.authorization_code  === 'pending').length > 0) {
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




  //open kyc modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  //toggle face scan
  const toggleFaceScan = () => {
    setOpenFaceScan(!openFaceScan);
  };


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
      && setUserVerified(true);
     }
    }, [onboarding]);


    
  



  //this ensures all the async functions have run before the apply now button is enabled so the right conditions apply
    useEffect(() => {
      if (onboarding && bankCodeRan && verificationRan ) {
        setInitialization(true);
      }else{
        console.log('initialization failed')
      }
    }, [onboarding, bankCodeRan,verificationRan]);
  



 //handle apply now logic on what should be displayed
 const handleApplyNow = async () => {
  if (!initialization) return; // Prevent further execution if already loading

  try {
    
    if (onboarding && !onboarding?.profile_exists  && showWelcomeNoticeAgain === null){
      await toggleWelcomeNotice();
    }  
    else if (onboarding?.bank_account_exists === 'pending' && monoSuccess) {
      setError(
         'Dear customer, your bank account verification is in progress. We will notify you shortly once it is done .'
      );
      setNotificationOpen(true);
  }
        
    else if (!userVerified) {
      await handleOpenModal();
    } else if (userVerified && onboarding?.live_check === null || onboarding?.live_check === 'failed') {
      await toggleFaceScan();
    } else if(debitMessage && debitMessage !== 'Authorization does not exist or does not belong to integration'){
      await setOpenAccountNotification(true);

    }  else if (userVerified && onboarding?.live_check === 'completed') {
        handleAddCard();
      }
    } catch (error: any) {
      console.error("Error in handleApplyNow:", error);
    } 
  };
  
  

  return (
    <div className="mb-6 font-outfit">
      <main className="w-full h-screen overflow-hidden scrollbar-hide">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="hidden lg:block md:block col-span-3 w-full h-full my-2">
            <SideBar />
          </div>
          <div className="lg:col-span-9 md:col-span-9 col-span-12 w-full h-full my-2">
            <DashboardHeader path="Payment Methods" />
            <div className="ml-10 flex justify-start items-center gap-7">
              <button
                className={`flex items-center rounded-full w-[118px] h-[39px] py-1 px-4 text-[18px] mt-6 transition-colors duration-300 ${
                  selectedMethod === 'card' ? 'bg-[#282828] text-[#FFFFFF]' : 'bg-transparent text-[#5A5A5A]'
                }`}
                onClick={() => handleMethodChange('card')}
              >
                <IoCardSharp className="text-xl mr-1" />
                Cards
              </button>
              <button
                className={`flex items-center rounded-full w-[184px] h-[39px] py-1 px-4 text-[18px] mt-6 transition-colors duration-300 ${
                  selectedMethod === 'bank' ? 'bg-[#282828] text-[#FFFFFF]' : 'bg-transparent text-[#5A5A5A]'
                }`}
                onClick={() => handleMethodChange('bank')}
              >
                <Image
                  src={`/images/${selectedMethod === 'bank' ? 'whitebank.png' : 'bank.png'}`}
                  width={20}
                  height={20}
                  alt="bank"
                />
                Bank Accounts
              </button>
            </div>

            {selectedMethod === 'card' ? (     
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-11/12 mx-auto gap-8 lg:gap-6 md:gap-0">
               {cards?.length > 0 && (
                  cards?.filter((card) => card.authorization === 'completed')
                  .map((account, index) => (
                    <div key={index} className=' h-full min-h-[170px]  rounded-[12px] w-full mt-8 card '
     >
      <div className='flex justify-between items-center align-middle mx-auto mt-8 w-10/12'>
      <Image
                src={`${account.brand === 'visa' ? '/images/visa.png' : '/images/mastercard.png'}`}
                width={51}
                height={34}
                alt="master card"
                className=""
              />
             
      </div>
      <div>
                <p>{}</p>
              </div>
      <p className=' text-[20px] text-[#FFF4F4] mt-5 text-center tracking-widest flex justify-center items-center'>
        <span className='pt-2 mr-2'>**** **** **** </span> 
        <span>{account.last4}</span>
        </p>

        <p className=' text-[12px] text-[#FFF4F4] mt-5 text-center tracking-widest flex ml-9 items-center'>
        <span className='leading-none mr-1'>VALID <br/> THRU</span>
        <span className=''>{account.exp_month} </span>/ 
        <span>{account.exp_year}</span>
        </p>
   </div>
                  ))
               )}
                
   <div className=' hover:bg-[#FFE9E9] h-full min-h-[170px] md:ml-6 rounded-[12px] flex items-center justify-center bg-[#F1F1F1] gap-4 lg:mt-8 mt-8 '
     >
      <button
      className='flex flex-col disabled:cursor-not-allowed items-center justify-center '
      disabled={!initialization}
      onClick={() => handleApplyNow()}>
       <GoPlus className='text-[#282828] text-6xl' />
       <p className='text-[16px]'>Add a new debit card</p>
     </button>
   </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-11/12 mx-auto gap-8 lg:gap-6 md:gap-0">
                {bankAccounts.map((account, index) => (
                  <div key={index} className="h-full min-h-[170px] rounded-[12px] flex flex-col justify-center items-center  w-full mt-8 bank">
                    <p className=' text-[18px] text-[#FFFFFF] text-center '>{account.account_name}</p>
                    <p  className=' text-[20px] text-[#F1F1F1]  text-center '>{account.account_number}</p>
                     <p className=' text-[16px] text-[#F1F1F1] text-center '>{account.bank_name}</p>
                     {account.authorization_code === 'complete' && (
                      <div className='w-[164px] h-[32px] rounded-[22px] bg-[#00000057] flex justify-center items-center mt-6 gap-2'>
                      <Image
                   src='/images/bankMandate.png'
                   width={15}
                   height={15}
                   alt="eMandate"
                 />
                       <p className='text-[13px] text-[#FFFFFF]'>E-mandate activated</p>
 
                      </div>

                     )}
                     {account.authorization_code !== 'complete' && onboarding?.live_check === 'completed'  && (
                      <div 
                      onClick={async () => {
                        setLoading(true)
                        const link = await fetchPaymentLink(account.id);
                        
                        if(link){
                          window.location.href = link;
                        }else{
                          
                          setLoading(false)
                        }
                      }
                      }

                      className='w-[164px] h-[32px] hover:cursor-pointer rounded-[22px] bg-[#00000057] flex justify-center items-center mt-6 gap-2'>
                      <Image
                   src='/images/bankMandate.png'
                   width={15}
                   height={15}
                   alt="eMandate"
                 />
                       <p className='text-[13px] text-[#FFFFFF]'> Activate </p>
 
                      </div>

                     )}
                     
                  </div>
                ))}
                
                  <div className='hover:bg-[#EAECFE]  h-full min-h-[170px] w-full mt-8 md:ml-6 rounded-[12px] flex items-center justify-center bg-[#F1F1F1] gap-4 '>
                  <button
                    className='flex flex-col items-center justify-center'
                    disabled={!initialization}
                    onClick={() => handleApplyNow()}>
                    <GoPlus className='text-[#282828] text-6xl' />
                    <p className='text-[16px]'>Link a new bank account</p>
                  </button>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </main>
      {loading && <LoadingPage />}

      {/* Modals */}
    

      {/* Notification */}
      {isNotificationOpen && (
        <Notification
          toggleNotification={closeNotification}
          isOpen={isNotificationOpen}
          {...notificationData}
        />
      )}

{bankMethod && (
        <BankMethod 
          toggleBankMethod={toggleBankMethod}
          isOpen={bankMethod}
        />
      )}

      {cardMethod && (
        <CardMethod 
          toggleCardMethod={toggleCardMethod}
          isOpen={cardMethod}
        />
      )}

  <SideModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      {openFaceScan && (
        <FaceScan isOpen={openFaceScan} toggleFaceScan={() => setOpenFaceScan(false)} />
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

export default withAuth(PaymentMethodPage);
