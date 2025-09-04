import { useState, useEffect } from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Image from 'next/image';
import { FaTimes } from "react-icons/fa";
import LoanSummary from './LoanSummary';
import LoanSchedule from './LoanSchedule';
import PaymentMethod from './PaymentMethod';
import apiClient from '@/utils/apiClient';
import Notification from '../Notification';


type MainRepaymentProps = {
  isOpen: boolean;
  toggleRepayment: () => void;
};

type Loan = {
  [key: string]: any;
};

const MainRepayment: React.FC<MainRepaymentProps> = ({ isOpen, toggleRepayment }) => {
  const [showSummary, setShowSummary] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [activeLoan, setActiveLoan] = useState<Loan[]>([]); 
  const [error, setError] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loanId, setLoanId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [removeOverFlow, setRemoveOverFlow] = useState(false);

  //toggle remove overflow
  const toggleRemoveOverflow = () => {
    setRemoveOverFlow(!removeOverFlow);
  }


  //get active loans
useEffect(() => {
  const fetchUsersActiveLoan = async () => {
    try {
      const response = await apiClient.get(`/loan/active`);
     
    setActiveLoan(response?.data?.data);
      
    } catch (error: any) {
      console.log(error.response);
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } 
  };
  fetchUsersActiveLoan();
  }, []);

  //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  }


  const handleShowSummary = () => {
    setShowSummary(true);
    setShowSchedule(false);
    setShowPaymentMethod(false);
  };

  const handleShowSchedule = () => {
    setShowSummary(false);
    setShowSchedule(true);
    setShowPaymentMethod(false);
  };
  const handleShowPaymentMethod = (  loanId: number | null, amount: number | null) => {
    setShowSummary(false);
    setAmount(amount);
    setLoanId(loanId);
    setShowSchedule(false);
    setShowPaymentMethod(true);
  };

  return (
    <div
    onClick={toggleRepayment}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
       onClick={(e) => e.stopPropagation()}
        className={`w-[483px] bg-white lg:ml-32 md:ml-32 mx-2 min-h-[637px] h-auto font-outfit rounded-[22px] p-6 shadow-md max-h-[80vh] ${!removeOverFlow ? 'overflow-y-auto' : ''}  transition-transform duration-300 transform ${
          isOpen ? 'scale-100' : 'scale-75'
        }`}
      >
        <div className="w-11/12 mx-auto rounded-[22px]">
          <div className={`flex items-center ${showSummary ? 'justify-between' : 'justify-start'}  items-center`}>
            
            {/* Close button on the left if showSummary is true */}
            {showSummary ? (
              <button
                onClick={toggleRepayment}
                className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center align-middle justify-center"
              >
                <FaTimes className="text-navfont text-2xl" />
              </button>
            ) : (
              <button
                className="text-[18px] font-bold rounded-full hover:text-[#030602] flex items-center"
                onClick={() => {
                  if (showSchedule) handleShowSummary();
                  if (showPaymentMethod) handleShowSummary();
                }}
              >
                <MdOutlineArrowBackIosNew className="text-[#5A5A5A] text-2xl mt-1" />
              </button>
            )}

            {/* Title */}
            <p className="flex-grow lg:text-[18px] md:text-[16px]   text-[14px] text-[#1C1C1E] font-bold lg:ml-6 md:ml-6 ml-4">
              {showSummary ? 'Loan summary' : showSchedule? 'Loan schedule' : 'Choose payment methods'}
            </p>

            {!showSummary && (
              <button
                onClick={toggleRepayment}
                className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center align-middle justify-center"
              >
                <FaTimes className="text-navfont text-2xl" />
              </button>
            )}

            {/* View loan schedule button on the right if showSummary is true */}
            {showSummary && (
              <button className=" text-[13px]  lg:text-[15px] md:text-[15px] rounded-sm text-[#F83449] flex items-center" onClick={handleShowSchedule}>
                <Image
                  src="/images/subtitle.png"
                  alt="loan"
                  width={15}
                  height={15}
                  className="mr-1 text-[#F83449] bg-[#F83449] rounded-md text-2xl"
                />
                View loan schedule
              </button>
            )}
          </div>
          {showSummary && <LoanSummary 
          handleShowPaymentMethod={( loanId: number | null, amount: number | null) => handleShowPaymentMethod( loanId, amount)} 
          loanHistory={activeLoan}
         
          />}
          {showSchedule && <LoanSchedule 
          handleShowSummary={handleShowSummary}
          loanHistory={activeLoan}
         
          />}
          {showPaymentMethod && <PaymentMethod 
          toggleRepayment={toggleRepayment}
          loanId={loanId}
          amount={amount}
          loanHistory={activeLoan}
          toggleRemoveOverflow={toggleRemoveOverflow}
          
          />}
        </div>
      </div>
      {notificationOpen && 
      <Notification 
      message={error}
      isOpen={notificationOpen}
      status='error'
      
      toggleNotification={toggleNotification} />}
    </div>
  );
};

export default MainRepayment;
