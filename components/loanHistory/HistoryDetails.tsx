import React, {useState} from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import DetailedHistory from './DetailedHistory';

type Loan = {
  [key: string]: any;
};

type HistoryDetailsProps = {
  toggleLoanDetails: () => void;
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



const HistoryDetails: React.FC<HistoryDetailsProps> = ({ toggleLoanDetails, loanHistory, isOpen }) => {
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
  

  return (
    <div
    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div
      className={`w-[483px] bg-white lg:ml-32 md:ml-32 mx-2 min-h-[637px] h-auto font-outfit rounded-[22px] p-6 shadow-md max-h-[80vh] overflow-y-auto  transition-transform duration-300 transform ${
        isOpen ? 'scale-100' : 'scale-75'
      }`}
    >
      <div className="w-11/12 mx-auto rounded-[22px] flex justify-between items-center align-middle">
      <p className=" lg:text-[18px]  text-[#1C1C1E] font-bold ">
      Loan schedule
        </p>
            <button
              onClick={toggleLoanDetails}
              className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center align-middle justify-center"
            >
              <MdOutlineArrowBackIosNew className="text-navfont text-2xl" />
            </button>

          
      </div>
      <div className='h-auto bg-[#F1F1F1] rounded-[8px] mt-6 pb-8'>
  {loanHistory?.loan_schedules.map((loan: any, index: number) => (
    <div key={index} className='grid lg:gap-2 md:gap-2  text-[16px] grid-cols-2 align-middle lg:px-4 md:px-4 px-2 pt-8 '>
      
      {/* Fixed-width container for Paid status or IoTime icon */}
      <div className='w-full flex  gap-3'>
        {/* Fixed-width container for Paid status or IoTime icon */}
      <div className="w-[60px] ">
        {loan.status === 'completed' ? (
          <span className="px-3 py-1 text-white bg-[#1F96A9] rounded-full text-[13px] font-light">Paid</span>
        )  : loanHistory?.status === 'OVERDUE' ? (
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
        <span className='font-normal'>{loanHistory?.status === 'OVERDUE' ? formatCurrency(loan.remaining_balance + loanHistory?.penalty_remaining) : formatCurrency(loan?.payment_amount)}</span>
        
        {loanHistory?.status !== 'OVERDUE' && loan.status === 'partially_paid' && (
          <span className='font-thin text-[13px]  '><span className='font-bold text-[#1F96A9]'>paid</span> {formatCurrency(loan.payment_amount - loan.remaining_balance)}</span>
        )}
        <span className='text-[#5A5A5A] lg:text-[14px] md:text-[14px] text-[12px]  '>{loan.status === 'completed' ? 'Paid' : 'Due'} {formatDate(loan.due_date.split(' ')[0])}</span>
        {loanHistory.status === 'OVERDUE' && (
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
                <span>{formatCurrency(loanHistory?.disbursed_amount)}</span>
            </p>
            <p className='mb-2 text-[14px] flex justify-between'>
                <span>Amount paid</span>
                <span>{formatCurrency(loanHistory?.total_payable - loanHistory?.amount_remaining)}</span>
            </p>
            <p className='mb-2 text-[14px] flex justify-between text-[#282828]'>
                <span >Balance to pay</span>
                <span>{formatCurrency(
    loanHistory?.amount_remaining)}</span>
            </p>
        </div>

</div>
{openDetails && 
<DetailedHistory 
  loanHistory={loanHistory} 
  toggleDetailedHistory={toggleDetails} 
  isOpen={!isExiting}
  />}
</div>
);
};

export default HistoryDetails;
