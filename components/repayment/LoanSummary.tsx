import React, { useState, useEffect } from 'react';
import Notification from '../Notification';
import LoadingPage from '@/app/loading';

type Loan = {
  [key: string]: any;
};

type LoanSummaryProps = {
  handleShowPaymentMethod: ( loanId: number | null, amount: number | null) => void;
  loanHistory: Loan[];
};

const formatCurrency = (amount: number | null) => {
  if (amount === null) return '₦ 0';
  return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const LoanSummary: React.FC<LoanSummaryProps> = ({ handleShowPaymentMethod, loanHistory }) => {
  const [dueAmount, setDueAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  useEffect(() => {
    if (loanHistory.length > 0) {
      const pendingArray = loanHistory[0]?.loan_schedules
        ?.filter((loan: any) => loan.status === 'pending')
        ?.sort((a: any, b: any) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
      const initialAmount = pendingArray?.[0]?.payment_amount || '';
      setDueAmount(initialAmount);
    }
  }, [loanHistory]);
  

  const handleDueAmountChange = (value: number) => {
    setDueAmount(value);
    setTotalAmount(null);
    setCustomAmount(null);
  };

  const handleTotalAmountChange = (value:number) => {
    setTotalAmount(value);
    setDueAmount(null);
    setCustomAmount(null);
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || null;
    setDueAmount(null);
    setTotalAmount(null);
    setCustomAmount(value);
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountToPay = customAmount || dueAmount || totalAmount;
    
    handleShowPaymentMethod(loanId, amountToPay);
    
   
  };


  const loanArray = loanHistory[0]?.loan_schedules
  ?.filter((loan: any) => loan.status === 'pending' || (loan.status === 'partially_paid'  && loan.remaining_balance !== 0) )
  ?.sort((a: any, b: any) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  const firstLoanSchedule = loanArray?.[0];
  const loanDetails = loanHistory[0];
  const loanId = firstLoanSchedule?.loan_id;

  return (
    <div>
      <div className="font-outfit">
        <p className="text-[18px] text-[#5A5A5A] mt-8 mb-3">Upcoming repayments</p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Option 1 */}
        {firstLoanSchedule && (
          <label
            className={`border border-[#1F96A9] rounded-[8px] w-full h-[77px] lg:gap-7 md:gap-7 gap-1 bg-[#F3F3F5] pl-4 cursor-pointer flex ${
              dueAmount === firstLoanSchedule?.payment_amount || firstLoanSchedule?.remaining_balance ? 'border-2' : 'border'
            }`}
            onClick={() => handleDueAmountChange(firstLoanSchedule.status === 'partially_paid' ? firstLoanSchedule?.remaining_balance : firstLoanSchedule?.payment_amount)}
          >
            <input
              type="radio"
              name="dueamount"
              value={dueAmount || ''}
              checked={dueAmount !== null }
              onChange={() => handleDueAmountChange(firstLoanSchedule.status === 'partially_paid' ? firstLoanSchedule?.remaining_balance : firstLoanSchedule?.payment_amount)}
              className="w-6 h-6 accent-[#1F96A9] mt-6"
            />
            <p className="text-[14px] lg:text-[15px] md:text-[15px] text-[#5A5A5A] mb-6 p-2 leading-7">
              Next amount due <br />
              <span className="text-[#1C1C1E] lg:text-[18px] md:text-[18px] text-[16px] font-bold">
                {firstLoanSchedule.status === 'partially_paid' ? formatCurrency(firstLoanSchedule.remaining_balance) : formatCurrency(firstLoanSchedule.payment_amount)}
              </span>
            </p>
            <p className="text-[#5A5A5A] text-[12px] lg:text-[13px] md:text-[13px] mt-4 ml-10">
              {firstLoanSchedule.due_date?.split(' ')[0] || ''}
            </p>
          </label>
        )}

        {/* Option 2 */}
        {loanDetails?.total_payable && (
          <label
            className={`border- border-[#1F96A9] rounded-[8px] w-full mt-6 h-[77px] lg:gap-7 md:gap-7 gap-1 bg-[#F3F3F5] pl-4 cursor-pointer flex ${
             totalAmount === loanDetails?.total_payable -
             loanDetails?.loan_schedules
               ?.filter((l: any) => l.status === 'completed' || l.status === 'partially_paid')
               ?.reduce(
                 (total: number, l: any) =>
                   total + (l.status === 'completed' ? l.payment_amount : (l.payment_amount - l.remaining_balance)),
                 0
               ) ? 'border-2' : 'border'
            }`}
            onClick={() =>
              handleTotalAmountChange(loanDetails?.amount_remaining)
              
            }
          >
            <input
              type="radio"
              name="totalamount"
              value={totalAmount || ''}
              checked={totalAmount !== null }
              onChange={() =>
                handleTotalAmountChange(loanDetails?.amount_remaining)
              }
              className="w-6 h-6 accent-[#1F96A9] mt-6"
            />
            <p className="text-[14px] lg:text-[15px] md:text-[15px] text-[#5A5A5A] mb-6 p-2 leading-7">
              Total Amount Due <br />
              <span className="text-[#1C1C1E] lg:text-[18px] md:text-[18px] text-[16px] font-bold">
                {formatCurrency(loanDetails?.amount_remaining)}
              </span>
            </p>
            <p className="text-[#5A5A5A] text-[12px] lg:text-[13px] md:text-[13px] mt-4 lg:ml-10 md:ml-10 ml-8">
              {loanDetails?.expiry_date?.split(' ')[0] || ''}
            </p>
          </label>
        )}

        {/* Custom Amount */}
        <div className="w-full relative">
          <label htmlFor="customAmount" className="block text-[#5A5A5A] text-[16px] mt-6 mb-3">
            Pay other amount
          </label>
          <input
            type="number"
            id="customAmount"
            value={customAmount || ''}
            onChange={handleCustomAmountChange}
            className="w-full pl-8 font-normal h-[58px] px-4 py-2 border text-[18px] border-[#1F96A9] rounded-[8px] bg-[#F3F3F5] focus:outline-none text-[#1C1C1E]"
          />
          <p className="absolute font-normal inset-y-0 pt-9 left-4 text-[18px] text-[#282828] flex justify-center items-center pointer-events-none">
            ₦ 
          </p>
        </div>

        {/* Loan Summary */}
        <div className="font-comic text-[#5A5A5A]">
          <p className="text-[17px] mb-2 mt-6 font-semibold flex justify-between">Loan summary:</p>
          <p className="mb-2 text-[14px] flex justify-between">
            <span>Loan disbursed</span>
            <span>{ loanDetails ? formatCurrency(loanDetails?.amount) : '-' }</span>
          </p>
          <p className="mb-2 text-[14px] flex justify-between">
  <span>Amount paid</span>
  <span>
    {loanDetails ? formatCurrency(
      loanDetails?.total_payable -
        loanDetails?.amount_remaining
    ) : '-'}
  </span>
</p>

          <p className="mb-2 text-[14px] flex justify-between">
            <span>Balance to pay</span>
            <span>{loanDetails ? formatCurrency(
    loanDetails?.total_payable -
    loanDetails?.loan_schedules
      ?.filter((l: any) => l.status === 'completed' || l.status === 'partially_paid')
      ?.reduce(
        (total: number, l: any) =>
          total + (l.status === 'completed' ? l.payment_amount : (l.payment_amount - l.remaining_balance)),
        0
      )
  ) : '-'}</span>
          </p>
        </div>

        <button
        type="submit"
       
          disabled={!dueAmount && !totalAmount && !customAmount}
          className="bg-[#1C1C1E] text-white disabled:opacity-50 disabled:cursor-not-allowed h-[47px] w-full rounded-[8px] px-4 py-2 mt-2 font-semibold"
        >
          {loading && <LoadingPage />}
          {loading ? 'Processing...' : 'Continue'}
        </button>
      </form>
      {isNotificationOpen && (
        <Notification
          isOpen={isNotificationOpen}
          toggleNotification={toggleNotification}
          message={error}
          status='error'
        />
      )}
    </div>
  );
};

export default LoanSummary;
