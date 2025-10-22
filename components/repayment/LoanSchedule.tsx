import React from 'react';
import { IoTime } from "react-icons/io5";
import {useEffect, useState} from 'react';
import DetailedRepayment from './DetailedRepayment';

type Loan = {
  [key: string]: any;
};

type LoanScheduleProps = {
  handleShowSummary: () => void;
  loanHistory: Loan;

};



const formatCurrency = (amount: number) => {
  return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return formatter.format(date);
};


const LoanSchedule: React.FC<LoanScheduleProps> = ({ handleShowSummary, loanHistory }) => {
  const [loanArray, setLoanArray] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const toggleDetails = () => {
    if (!openDetails) {
      setOpenDetails(true); // Open the modal
    } else {
      setIsExiting(true); // Start the exit animation
      setTimeout(() => {
        setIsExiting(false);
        setOpenDetails(false); // Close the modal
      }, 300); // Match the animation duration (500ms)
    }
  };
    
useEffect(() => {
  if(loanHistory.length > 0){
    setLoanArray(loanHistory[0]?.loan_schedules);
  }
  }, [loanHistory]);

 
  

  return (
    <div className='w-full'>
    <div className='h-auto bg-[#F1F1F1] rounded-[8px] mt-6 pb-8'>
  {loanArray.map((loan:any, index) => (
    <div key={index} className='grid lg:gap-2 md:gap-2  text-[16px] grid-cols-2 align-middle lg:px-4 md:px-4 px-2 pt-8 '>
      <div className='w-full flex gap-3'>
        {/* Fixed-width container for Paid status or IoTime icon */}
      <div className="w-[60px] ">
              {loan.status === 'completed' ? (
                <span className="px-3 py-1 text-white bg-[#1F96A9] rounded-full text-[13px] font-light">Paid</span>
              )  : loanHistory[0]?.status === 'OVERDUE' ? (
                <span className="px-2 pb-2 pt-1 text-white bg-[#ED3237] rounded-full text-[13px] font-light mr-1 ">Overdue</span>
              ) : loan.status === 'partially_paid' ? (<span className="px-3  py-1 text-white bg-[#FFD166] rounded-full text-[13px] font-light">Part</span>) : (
                <IoTime className='text-blue-700 text-lg lg:text-xl md:text-xl' />
              )}
            </div>

      {/* Payment title */}
      <p className={`${loan.status === 'completed' ? 'text-[#5A5A5A]' : 'text-[#282828] '} lg:text-[16px] text-[13px] md:text-[16px]`}>
        Payment {index + 1}
      </p>
        
      </div>
      

      {/* Amount and Date section */}
      <div className={`${loan.status === 'completed' ? 'text-[#5A5A5A]' : 'text-[#282828] '} text-[16px]  leading-7 flex  flex-col`}>
        <div className='flex flex-col justify-end items-end'>
        <span className='font-normal'>{loanHistory[0]?.status === 'OVERDUE' ? formatCurrency(loan.remaining_balance + loanHistory[0]?.penalty_remaining) : formatCurrency(loan?.payment_amount)}</span>
        
        {loanHistory[0]?.status !== 'OVERDUE' && loan.status === 'partially_paid' && (
          <span className='font-thin text-[13px]  '><span className='font-bold text-[#1F96A9]'>paid</span> {formatCurrency(loan.payment_amount - loan.remaining_balance)}</span>
        )}
        <span className='text-[#5A5A5A] lg:text-[14px] md:text-[14px] text-[12px]  '>{loan.status === 'completed' ? 'Paid' : 'Due'} {formatDate(loan.due_date.split(' ')[0])}</span>
        {loanHistory[0]?.status === 'OVERDUE' && (
          <span
          onClick={toggleDetails}
          className='font-medium hover:cursor-pointer text-[14px] text-[#F83449] '>View loan details</span>
        )}
        </div>
       
      </div>

    </div>
  ))}
</div>

      <div className='font-comic text-[#5A5A5A] mb-4'>
            <p className='text-[17px] mb-2 mt-8 font-semibold flex justify-between '>Loan summary:</p>
            <p className='mb-2 text-[14px] flex justify-between'>
                <span>Loan disbursed</span>
                <span>{ formatCurrency(loanHistory[0]?.amount)}</span>
            </p>
            <p className='mb-2 text-[14px] flex justify-between'>
                <span>Amount paid</span>
                <span>{formatCurrency(loanHistory[0]?.total_payable - loanHistory[0]?.amount_remaining)}</span>
            </p>
            <p className='mb-2 text-[14px] flex justify-between text-[#282828]'>
                <span >Balance to pay</span>
                <span>{formatCurrency(
    loanHistory[0]?.amount_remaining)}</span>
            </p>
        </div>
        <button
      onClick={handleShowSummary} 
      className="bg-[#F83449] text-white h-[47px] mb-4 w-full rounded-[8px] px-4 py-2  font-semibold">
       Done
      </button>
      {openDetails && 
<DetailedRepayment
  loanHistory={loanHistory} 
  toggleDetailedRepayment={toggleDetails} 
  isOpen={!isExiting}
  />}
    </div>
  );
};

export default LoanSchedule;
