import React from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

type Loan = {
  [key: string]: any;
};

type DetailedHistoryProps = {
  toggleDetailedHistory: () => void;
  loanHistory: Loan; 
  isOpen: boolean;
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

const formatCurrency = (amount: number) => {
  return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};



const DetailedHistory: React.FC<DetailedHistoryProps> = ({ toggleDetailedHistory, loanHistory, isOpen }) => {

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formatter.format(date);
  };


  function calculateDaysBetween(dateString: string): number {
    // Parse the input date string into a Date object
    const inputDate = new Date(dateString);
    const today = new Date();
  
    // Calculate the difference in time (in milliseconds)
    const timeDifference = today.getTime() - inputDate.getTime();
  
    // Convert the time difference to days (1 day = 24 * 60 * 60 * 1000 ms)
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }
  
  

  return (
    <div
    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div
      className={`w-[483px] bg-white lg:ml-32 md:ml-32 mx-2 min-h-[637px] h-auto font-outfit rounded-[22px] p-6 shadow-md max-h-[80vh] overflow-y-auto  loan-content  ${isOpen  ? 'loan-enter' : ' loan-exit'}`}
    >
      <div className="w-full rounded-[22px] flex justify-between items-center align-middle">
      <div className='flex items-center justify-start'>
        <Image
          src='/images/loanDetails.png'
          alt='Icon'
          width={15}
          height={19}
        />
      <p className=" lg:text-[18px] ml-2 text-[#1C1C1E] font-bold ">
      Loan Details
        </p>
      </div>
            <button
              onClick={toggleDetailedHistory}
              className="rounded-full w-[36px]  h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center align-middle justify-center"
            >
              <FaTimes className="text-navfont text-2xl" />
            </button>

          
      </div>
      <div className='h-auto bg-[#F1F1F1] rounded-[8px] mt-6 pb-8'>
  {loanHistory?.loan_schedules?.map((loan: any, index: number) => (
    <div key={index} className='grid gap-3  font-medium  text-[16px] grid-cols-2  lg:px-4 md:px-4 px-2 pt-8 '>
      
     <p className=''>Loan ID</p>
     <p className='text-end text-[#5A5A5A]'>{loanHistory?.id}</p>
     <p className=''>Loan Status</p>
     <p className='text-end text-[#E33838]'>{loanHistory?.status}</p>
     <p className=''>Amount Disbursed</p>
     <p className='text-end text-[#5A5A5A]'>{formatCurrency(loanHistory?.amount)}</p>
     <p className=''>Original Amount Due</p>
     <p className='text-end text-[#5A5A5A]'>{formatCurrency(loanHistory?.total_payable - loanHistory?.penalty_remaining)}</p>
     <p className=''>Due Date</p>
     <p className='text-end text-[#5A5A5A]'>{formatDate(loanHistory?.expiry_date)}</p>
     <p className=''>Penalty Accrued</p>
     <p className='text-end text-[#5A5A5A]'>{formatCurrency(loanHistory?.penalty_remaining)}</p>
     <p className=''>Days Past Due Date</p>
     <p className='text-end text-[#5A5A5A]'>{calculateDaysBetween(loanHistory?.expiry_date)} Day(s)</p>
     <p className=''>Amount Collected</p>
     <p className='text-end text-[#5A5A5A]'>{formatCurrency(loanHistory?.total_payable - loanHistory?.amount_remaining )}</p>
    </div>
    
  ))}
</div>
<div className='h-[64px] bg-[#F1F1F1]  px-4 rounded-[8px] text-[#E33838] py-4 flex justify-between items-center mt-6 '>
<p className=''>Total Amount Payable</p>
<p className='text-end '>{formatCurrency(loanHistory?.amount_remaining)}</p>
</div>



</div>
</div>
);
};

export default DetailedHistory;
