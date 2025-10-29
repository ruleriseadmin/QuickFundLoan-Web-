'use client'
import { useState, useEffect } from 'react';
import { IoTime } from "react-icons/io5";
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";
import Image from 'next/image';
import { GrFormEdit } from "react-icons/gr";
import apiClient from '@/utils/apiClient';
import Notification from '../Notification';
import LoadingPage from '@/app/loading';
import { useRouter } from 'next/navigation';
import useFcmToken from '../FcmFunctions';
import Loader from '../Loader';
import InterestWarning from './InterestWarning';

type UserInterestData = {
  id: number;
  interest_rate: string;
  period: string;
  upfront_payment_amount:number;
}[];

  type UserOffer = {
    id : number;
    amount: string;
    upfront_payment:boolean;
  }[]

  type LoanSchedule = {
    principal_payment: number;
    payment_amount: number;
    due_date: string;
    interest_payment: number;
    disbursed_amount: number;
  }[];
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formatter.format(date);
  };
  

  
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '₦ 0';
    return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  type DisplayOfferProps = {
  closeModal: () => void;
    handleShowLoan: () => void;
    usersOffer: UserOffer | null;
    toggleShowAllOffers: () => void;
    showAllOffers: boolean;
    onboarding: any;
    setRemoveOverflow: (value: boolean) => void;
  };


const DisplayOffer: React.FC<DisplayOfferProps> = ({handleShowLoan, usersOffer, closeModal,showAllOffers,toggleShowAllOffers ,onboarding,setRemoveOverflow }) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [selectedOfferHasUpfrontPayment, setSelectedOfferHasUpfrontPayment] = useState<boolean | null>(null);
    const [upfrontAmount,setUpfrontAmount] = useState<number | null>(null);
    const [amountId, setAmountId] = useState<number | null>(null);
    const [selectedTenor, setSelectedTenor] = useState<string | null>(null);
    const [tenorId, setTenorId] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTenorDropdownOpen, setIsTenorDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [loanSchedule, setLoanSchedule] = useState<LoanSchedule>([]);
    const [loadingTimeout, setLoadingTimeout] = useState(false)
    const [error, setError] = useState('');
    const router = useRouter();
    const [loanResponse, setLoanResponse] = useState<any[]>([]);
    const [banks, setBanks] = useState<any[]>([]);
    const { payload } = useFcmToken();
    const [loanLoading,setLoanLoading] = useState(false)
    const [openInterestWarning, setOpenInterestWarning] = useState(false);
    const [proceedToSchedule, setProceedToSchedule] = useState<boolean>(false);
    const [warningType, setWarningType] = useState<string>('');
    const toggleInterestWarning = () => {
      setOpenInterestWarning(!openInterestWarning);
    };
    const [userInterests,setUserInterests] = useState<UserInterestData | null >(null);
    const [doesLoanHave28DaysTenor, setDoesLoanHave28DaysTenor] = useState<boolean>(false);

    



  //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  }

  
    const handleSelectAmount = (amount: number, id: number,upfront_payment: boolean) => {
      setSelectedAmount(amount === selectedAmount ? null : amount);
      setSelectedOfferHasUpfrontPayment(upfront_payment === selectedOfferHasUpfrontPayment ? selectedOfferHasUpfrontPayment : upfront_payment);
      setAmountId(id === amountId ? null : id);
      setProceedToSchedule(false);
      setSelectedTenor(null);
      setTenorId(null);
      setUpfrontAmount(null);
      setLoanSchedule([]);
      
      showAllOffers ? toggleShowAllOffers() : null;
      setIsDropdownOpen(false);
    };

    
    
    const handleSelectTenor = (tenor: string, id: number, upfront_payment:number) => {
      setSelectedTenor(prevTenor => prevTenor === tenor ? null : tenor);
      setTenorId(id === tenorId ? null : id);
      setUpfrontAmount( upfront_payment);
      if(upfront_payment > 0) {
        setProceedToSchedule(false);
        setWarningType('upfront');
        setOpenInterestWarning(true);
      }else{
        setProceedToSchedule(true);
        setWarningType('');
      }
      setIsTenorDropdownOpen(false);
    };

    useEffect(() => {
      if (payload?.notification?.title === 'Transfer Successful!') {
        setLoading(false);
        
        router.push(
          `/dashboard?status=success&title=${encodeURIComponent(
            payload.notification.title
          )}&subMessage=${encodeURIComponent(payload.notification.body)}`
        );
       
      }
    }),[payload, router];



//get loan schedule
    useEffect(() => {
      if (proceedToSchedule && amountId && tenorId) { 
        const fetchLoanSchedule = async () => {
          try {
            setLoading(true);
            const response = await apiClient.get(
              `/loan/schedule/${amountId}/${tenorId}`
            );
    
            setLoanSchedule(response?.data?.data);
          } catch (error: any) {
            console.log(error.response);
            setError(error?.response?.data?.message || 'An error occurred, please try again');
            setNotificationOpen(true);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLoanSchedule();
      }
    }, [amountId, tenorId, proceedToSchedule]);

    


    useEffect(() => {
      const fetchUsersBankAccounts = async () => {
        try {
          const response = await apiClient.get(
            `/account`
          );
          setBanks(response?.data?.data);
        } catch (error: any) {
          setError(error?.response?.data?.message || 'An error occurred, please try again');
          setNotificationOpen(true);
        } 
      };
  
      fetchUsersBankAccounts();
    }, []);
    
  

    //lets tokenize the card to get reference for manual verification
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setRemoveOverflow(true);
    
      try {
      
        setLoanLoading(true);
        
        if (!onboarding['e-mandate']) {
          await handleShowLoan();
        } else {
          try {
           
            const loanResponse = await apiClient.post(
              `/loan/apply`,
              { 
                interest_id: tenorId, 
                loan_offer_id: amountId,
                source:'web', 
              }
            );
            setLoanResponse(loanResponse?.data?.data?.reference);
            localStorage.setItem('loan_reference', loanResponse?.data?.data?.reference)
            
    
          } catch (error: any) {
            console.log(error.response);
            const url = `/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent(
              error?.response?.data?.message || 'You are not qualified for a loan at the moment, please try again'
            )}`;
            router.push(url);
            setLoanLoading(false)
            closeModal();
          }
        }
      } catch (error: any) {
        console.log(error);
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
        setLoanLoading(false)
        setRemoveOverflow(false);
      } 
    };
    


    useEffect(() => {
      const verifyPayment = async () => {
        if (loanResponse && loanResponse.length > 0 && payload?.notification?.title !== 'Transfer Successful!') {
         
          try {
            setLoading(true);
            const response = await apiClient.get(
              `/paystack/verify/${loanResponse}`
            );
    

            if(!payload){
              const url = `/dashboard?status=${encodeURIComponent('success')}&title=${encodeURIComponent('Loan Application Successful!')}&subMessage=${encodeURIComponent(
                'Your loan application has been submitted successfully.You will receive the money in your bank account shortly.'
              )}`;
              router.push(url)
             
            }
            closeModal();
            setLoading(false)
          } catch (error: any) {
            console.log('error', error);
            router.push(
              `/dashboard?status=error&message=${
                error.response?.data?.message || 'An error occurred'
              }`
            );
            setLoading(false);
          } 
        }
      };
      if (loanResponse && loanResponse.length > 0 && payload?.notification?.title !== 'Transfer Successful!') {
        setLoadingTimeout(true)
        setLoading(true);
        setTimeout(() => {
          verifyPayment();
        }, 5000);
      
        setLoadingTimeout(false)
      }
    }, [ loanResponse,router]);

    
   
    //get user interest rate
  useEffect(() => {
    const fetchUserInterestRate = async () => {
      try {
        const response = await apiClient.get(`/loan/interest_rates?loan_offer_id=${amountId}`);
        
       setUserInterests(response?.data?.data || []);
        const has28DaysTenor = response?.data?.data.some((interest: { period: string }) => interest.period === '28 days');
        setDoesLoanHave28DaysTenor(has28DaysTenor);
      } catch (error: any) {
        console.log(error.response);
       setError(error?.response?.data?.message ||  'An error occurred, please try again');
        setNotificationOpen(true);
      } 
    };
    if(amountId)
    fetchUserInterestRate();
    }, [amountId]);

  
  return (
    <div>
        <form className="mt-8" onSubmit={handleSubmit}  >
            {/* Amount Selection */}
            <div 
            onClick={() => {
              setIsTenorDropdownOpen(false)
            }}
            className="mb-6 relative"> {/* Add relative positioning here */}
              <label htmlFor="amount" className="text-[#5A5A5A] mt-8 ml-1 text-[16px]">
                Choose amount
              </label>
              <div
                onClick={() => {
              showAllOffers?toggleShowAllOffers(): null;
                  setIsDropdownOpen(!isDropdownOpen)}}
                className="relative custom-select bg-[#F5F5F5] border border-solid border-[#282828] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2 flex items-center justify-between cursor-pointer"
              >
                <span className={`text-[#282828] text-[20px] ${selectedAmount && 'font-bold'} `}>
                {selectedAmount ? formatCurrency(selectedAmount) : 'Select an amount'}
                </span>
                <GrFormEdit className="bg-[#F6011BCC] text-white rounded-full  ml-4 text-xl" />
              </div>
              {isDropdownOpen && (
               <div 
               className="absolute z-50 bg-white border border-[#282828] rounded-[8px] mt-2 shadow-lg max-h-[372px] h-auto overflow-y-auto w-full custom-dropdown"
               style={{ transform: "translate3d(0,0,0)" }} 
             >
           
               
                  <div className="flex flex-col mt-2 px-4 py-2">
                    {usersOffer?.map((offer:any) => (
                      <div key={offer.id} className="flex items-center mb-4 font-extrabold">
                        <input
                          type="radio"
                          id={`amount-${offer.id}`}
                          value={offer.id}
                          checked={selectedAmount === offer.amount}
                          onChange={() => handleSelectAmount(offer.amount, offer.id, offer.upfront_payment)}
                          className="w-6 h-6 text-red-600 bg-gray-100 rounded-full font-extrabold border-2 border-[#C4C4C4] focus:ring-[#C4C4C4]" 
                        />
                        <label htmlFor={`amount-${offer.id}`} className="ml-4 text-[#282828] font-extrabold text-[18px]">
                          {formatCurrency(offer.amount)}
                        </label>
                      </div>
                    ))}
                    
                    
                  </div>
                </div>
              )}
            </div>

            {/* Loan Tenor Selection */}
            <div className="mb-4 relative"> {/* Add relative positioning here */}
              <label htmlFor="tenor" className="text-[#5A5A5A] mt-8 ml-1 text-[16px]">
                Choose loan tenor 
              </label>
              <div
                onClick={() => setIsTenorDropdownOpen(!isTenorDropdownOpen)}
                aria-disabled={!selectedAmount}
                className={`relative custom-select ${!selectedAmount ? " cursor-not-allowed" : " cursor-pointer"} border border-solid border-[#282828] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2 flex items-center justify-between`}
              >
                <span className="text-[#282828] text-[20px]">
                {selectedTenor ? `${selectedTenor}` : 'Select a tenor'}
                </span>
                <IoIosArrowDown className="text-[#F6011BCC] ml-4 text-xl" />
              </div>
              {isTenorDropdownOpen && selectedAmount && (
                <div className="absolute z-10 bg-white border border-solid border-[#282828] rounded-[8px]  shadow-lg h-auto overflow-y-auto w-full"> {/* Change to absolute positioning */}
                  <div className="flex flex-col mt-2 px-4 py-2">
    {userInterests?.map((interest) => {

  return (
    <div key={interest.id} className="flex items-center mb-4">
      <input
        type="radio"
        id={`tenor-${interest.interest_rate}`}
        value={interest.interest_rate}
        checked={selectedTenor === interest.period}
        onChange={() =>
          handleSelectTenor(interest.period, interest.id, interest.upfront_payment_amount)
        }
        className="w-6 h-6 text-red-600 disabled:opacity-50 bg-gray-100 rounded-full border-2 border-[#C4C4C4] focus:ring-[#C4C4C4]"
      />
      <label
        htmlFor={`tenor-${interest.interest_rate}`}
        className={`ml-4 font-extrabold text-[18px] text-[#282828]`}
      >
        {interest.period}
      </label>
    </div>
  );
})}
 {userInterests && userInterests.length > 0 && !doesLoanHave28DaysTenor && (
    <div  
    className="flex items-center mb-4 cursor-pointer"
    onClick={toggleInterestWarning}
    >
      <input
        type="radio"
        id={`tenor-dummy`}
        value={'dummy'}
        disabled={true}
        
        className="w-6 h-6 text-red-600 disabled:opacity-50 bg-gray-100 rounded-full border-2 border-[#C4C4C4] focus:ring-[#C4C4C4]"
      />
      <label
        htmlFor={`tenor-dummy`}
        className={`ml-4 font-extrabold text-[18px] text-[#C4C4C4]`}
      >
       1 month
          <Image
            src="/images/key.png"
            alt="lock Icon"
            width={15}
            height={15}
            className="inline ml-2"
          />
      </label>
    </div>

  )
 }
                  </div>
                </div>
              )}
            </div>
            {loading && <LoadingPage/>}
            {loanLoading && <Loader title="Disbursement in progress" text="Your loan will be disbursed into your bank account shortly" />}
           
          
{
  loanSchedule.length === 0   ? (
   
        
      <div>
      <div className='flex items-center justify-start gap-2 mt-6 '>
              <Image
              src= '/images/gift.png'
              alt="gift Icon"
              width={20}
              height={20}
              />
              <p className='text-[15px] font-medium text-[#282828]'>Did you know?</p>
            </div>
            <p className='text-[13px]  font-normal text-[#282828] my-2'>You can get up to N500,000 instant loan on QuickCred in less than 5 minutes. Your consistency and loyalty as our customer will unlock juicy loan offers for you.</p>
    </div>

  ) : 
 (
    <div>
      <>
      {!loanLoading && selectedOfferHasUpfrontPayment && tenorId && typeof upfrontAmount === 'number' && (
  <div className='h-auto min-h-[105px] grid grid-cols-12 w-full mb-6 bg-[#FDEAEB] px-4 py-2 rounded-[8px]'>
    <div className='col-span-1 flex flex-col justify-start'>
      <Image src='/images/exclamation.png' alt='warning Icon' width={20} height={20} className='mt-4' />
    </div>
    <div className='col-span-11 flex flex-col justify-center'>
      {(() => {
        const safeAmount = Number(selectedAmount || 0);
        const safeUpfront = Number(upfrontAmount || 0);
        const netDisbursement = Math.round(safeAmount - safeUpfront);
        const totalRepayment = Math.round(safeAmount);

        return (
          <p className='text-[16px] font-comic font-semibold text-[#282828] my-2'>
            Loan interest of <b>{formatCurrency(safeUpfront)}</b> will be deducted upfront.
            You’ll receive <b>{formatCurrency(netDisbursement)}</b>, and repay a total amount of
            <b> {formatCurrency(totalRepayment)}</b>.
          </p>
        );
      })()}
    </div>
  </div>
)}

      
      <div className=' h-auto min-h-[66px] bg-[#F1F1F1] rounded-[8px]'>
        {loanSchedule?.map((sch, index) => (
          <div key={index} className='grid gap-1 grid-cols-2 text-[15px] px-3 py-4 '>
            {!selectedOfferHasUpfrontPayment ? (
              <>
              <div className='flex items-center justify-start gap-2 my-auto'>
            <IoTime className=' text-blue-700 text-xl' />
            <p className='text-[#282828]  lg:text-[18px] md:text-[18px] text-[15px]  '>Payment {index + 1}</p>
            </div>
            <div className='flex flex-col justify-end items-end '>
            <p className='text-[#282828] lg:text-[18px] md:text-[18px] text-[15px] leading-4'>{formatCurrency( parseFloat(sch.payment_amount.toFixed(3)))}  </p>
            <p className='text-[#5A5A5A] text-[14px]'>Due on {formatDate(sch.due_date.split(' ')[0])}</p>

            </div>
              </>

            ) : (
              <>
              <div className='flex items-center justify-start gap-2 my-auto'>
            <IoTime className=' text-blue-700 text-xl' />
            <p className='text-[#282828]  lg:text-[15px] md:text-[15px] text-[15px]  '>We will disburse</p>
            </div>
            <div className='flex flex-col justify-end items-end '>
            <p className='text-[#282828] lg:text-[16px] md:text-[16px] text-[15px] leading-4'>{formatCurrency( parseFloat(sch.disbursed_amount.toFixed(3)))}  </p>

            </div>

             <div className='flex items-center justify-start gap-2 mt-4'>
            <IoTime className=' text-blue-700 text-xl' />
            <p className='text-[#282828]  lg:text-[15px] md:text-[15px] text-[15px]  '>Upfront Interest Fee</p>
            </div>
            <div className='flex flex-col justify-end items-end '>
            <p className='text-[#282828] lg:text-[15px] md:text-[15px] text-[15px] leading-4 pt-8'>{formatCurrency( sch?.interest_payment)}  </p>
            <p className='text-[#F24C5D] text-[14px]'>Due Today</p>

            </div>
              </>
            )}
            
            
          </div>
        ))}


      </div>
      <div className=' h-auto min-h-[66px] bg-[#F1F1F1] rounded-[8px] mt-4'>
      <div className='grid gap-1 grid-cols-2 text-[15px] px-3 py-4 '>
      <div className='flex items-center justify-start gap-2 my-auto'>
      <IoTime className=' text-blue-700 text-xl' />
            <p className='text-[#282828]  text-[15px] lg:text-[18px] md:text-[18px]'>{selectedOfferHasUpfrontPayment ? 'Total Repayment' : 'Total Payment'}</p>
            </div>
            <div className='flex flex-col justify-end items-end '>
              {!selectedOfferHasUpfrontPayment ? (
                <p className='text-[#282828] lg:text-[18px] md:text-[18px] text-[15px] '>
         {formatCurrency(parseFloat(
  loanSchedule?.reduce((acc, curr) => acc + curr.payment_amount, 0).toFixed(3)
))}
      </p>
                
              ) : (
                <div className='flex flex-col justify-end items-end '>
              <p className='text-[#282828] lg:text-[18px] md:text-[18px] text-[15px] mt-4'>
         {formatCurrency(parseFloat(
  loanSchedule?.reduce((acc, curr) => acc + curr.payment_amount, 0).toFixed(3)
))}
    </p>
      <p className='text-[#5A5A5A] text-[14px]'>Due on {formatDate(loanSchedule[loanSchedule.length - 1].due_date.split(' ')[0])}</p>
                </div>
      )}
      </div>
          </div>
      </div>
      </>

      <p className="text-[13px] mt-6 text-[#282828] text-center w-11/12 mx-auto mb-8">
                  By accepting this offer, you agree to our 
                  <button 
                   type="button"
                   onClick={() => window.open(`/loan-agreement?amountId=${amountId}&tenorId=${tenorId}&interest=`, '_blank')}
                   className="underline hover:text-[#F6011BCC] underline-offset-2 mx-1 font-semibold text-[#5A5A5A] text-[15px]">
                   Loan Terms
                  </button>
                  and 
                  <Link href="/terms" className="underline hover:text-[#F6011BCC] underline-offset-2 mx-1 font-semibold text-[#5A5A5A] text-[15px]">
                    Offer Contract
                  </Link>
                  .
          </p>

      <button
     type='submit'
      className="bg-[#1C1C1E] text-white h-[47px] mb-4 w-full rounded-[8px] px-4 py-2  font-semibold">
          Disburse&nbsp;{selectedOfferHasUpfrontPayment && upfrontAmount && selectedAmount ? formatCurrency(Math.round(selectedAmount - upfrontAmount)) : formatCurrency(selectedAmount)}
      </button>
      
    </div>
  )
}

</form>
{openInterestWarning && <InterestWarning
        toggleInterestWarning={toggleInterestWarning}
        isOpen={openInterestWarning}
        message= {warningType === 'upfront' ? 
        "The Loan Interest on disbursed amount will be taken upfront." :
        "You are currently not eligible for 30 days loan. Continue to pay back your loan on time to unlock this option."}
        setProceedToSchedule={setProceedToSchedule}
        warningType={warningType}
      />}

          {error && 
            <Notification 
            message={error} 
            toggleNotification={toggleNotification} 
            isOpen={notificationOpen}
            status='error'
            
            />}

    </div>
  )
}

export default DisplayOffer