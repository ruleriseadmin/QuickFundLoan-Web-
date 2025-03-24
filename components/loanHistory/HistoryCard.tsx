import React, { useState } from 'react';
import Image from 'next/image';
import HistoryDetails from './HistoryDetails';

type Loan = {
  [key: string]: any;
};

type LoanProps = {
  loanHistory: Loan;
};

const formatCurrency = (amount: number) => {
  return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const HistoryCard: React.FC<LoanProps> = ({ loanHistory }) => {
  const [showLoanDetails, setShowLoanDetails] = useState(false);
const createdAt = loanHistory?.created_at || ''; 
const [dueDate, dueTime] = createdAt.split(' '); 




  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formatter.format(date);
  };

 
  

  const toggleLoanDetails = () => {
   setShowLoanDetails(!showLoanDetails);
  };


  return (
    <div className="bg-[#F1F1F1] font-kumbh rounded-[3px] p-4 flex flex-col mb-4">
          <div>
            <p
              className={`${
                loanHistory?.status === 'OVERDUE'
                  ? 'text-[#E33838]'
                  : loanHistory?.status === 'CLOSED'
                  ? 'text-[#5E8D35]'
                  : 'text-[#2290DF]'
              } text-[16px] flex justify-between items-center align-middle font-semibold mb-3`}
            >
              <span>LOAN ID {loanHistory?.id}</span>
              <span>{loanHistory.status === 'CLOSED' ? 'PAID' : loanHistory.status}</span>
            </p>
            <div className="text-[#282828] text-[13px] font-semibold">
              <p className="flex justify-between items-center align-middle mb-2">
                <span>Amount Disbursed:</span>
                <span>{formatCurrency(loanHistory?.amount)}</span>
              </p>
              <p className="flex justify-between items-center align-middle mb-2">
                <span>{ loanHistory?.status === 'OVERDUE' ? 'Original Amount Due:' : loanHistory?.status === 'CLOSED' ? 'Total Amount Paid' : 'Total Amount Due:'}</span>
                <span>{loanHistory?.status === 'OVERDUE' ? 
                formatCurrency(loanHistory?.total_payable - loanHistory?.penalty_remaining) : loanHistory?.status === 'CLOSED' ? formatCurrency(loanHistory?.total_payable) : formatCurrency(loanHistory?.amount_remaining)
              }</span>
              </p>
              {loanHistory?.status === 'OVERDUE' && (
                <p className="flex justify-between items-center text-[#ED3237] align-middle mb-2">
                  <span>Total Amount Payable:</span>
                  <span>{formatCurrency(loanHistory?.amount_remaining)}</span>
                </p>
              )}
              <p className="flex justify-between items-center align-middle mb-2">
                <span>Loan Date:</span>
                <span>{formatDate(dueDate)} </span>
              </p>
              <p className="flex justify-between items-center align-middle mb-2">
                <span>Due Date:</span>
                <span>{formatDate(loanHistory?.expiry_date)} {dueTime}</span>
              </p>
              <p className="flex justify-between items-center align-middle mb-2">
                <span>Loan Paid:</span>
                <span>
                  {loanHistory?.loan_schedules?.filter((l: any) => l.status === 'completed').length || 0}
                  /
                  {loanHistory?.loan_schedules?.length}
                </span>
              </p>
              
            </div>
            {loanHistory?.status !== 'CLOSED' && (
              <button
              onClick={toggleLoanDetails}
              className="text-[15px] rounded-sm text-[#1F96A9] flex items-center mt-6 mx-auto font-semibold"
            >
              <Image
                src="/images/subtitle.png"
                alt="loan"
                width={15}
                height={15}
                className="mr-1 text-[#1F96A9] bg-[#1F96A9] rounded-md text-2xl"
              />
              View Loan Schedule
            </button>

            )}
            

            {showLoanDetails && (
              <HistoryDetails
                toggleLoanDetails={toggleLoanDetails}
                isOpen={showLoanDetails}
                loanHistory={loanHistory}
              />
            )}
          </div>
        
     
    </div>
  );
};

export default HistoryCard;
