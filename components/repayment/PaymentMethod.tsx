import React, { useState } from 'react';
import PaystackPayment from './PaystackPayment';
import BankAccount from './BankAccount';
import WalletPayment from './Wallet';
import CardPayment from './CardPayment';

type Loan = {
  [key: string]: any;
};

type PaymentMethodProps = {
  toggleRepayment: () => void;
  amount: number | null;
  loanId: number | null;
  loanHistory: Loan[];
};

const PaymentMethod: React.FC<PaymentMethodProps> = ({ toggleRepayment,  loanHistory,loanId,amount }) => {
  
 
  const [selectedOption, setSelectedOption] = useState('');
  const [hideSelectedOption, setHideSelectedOption] = useState(false);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleClick = () => {
   
    if (selectedOption) setHideSelectedOption(true);
  };

  const handleShowOptions = () => {
    setSelectedOption('');
    setHideSelectedOption(false);
  };

  return (
    <div className="w-full mx-auto font-outfit font-normal mt-10">
      {/* Render payment options if not hidden */}
      {!hideSelectedOption && (
        <>
          {/* Paystack Payment Option */}
          <div
            className="border rounded-[12px] w-full mt-6 h-[76px] flex bg-[#F7F7F7] pl-4 cursor-pointer"
            onClick={() => handleOptionChange('paystack')}
          >
            <input
              type="radio"
              name="payment_method"
              value="paystack"
              checked={selectedOption === 'paystack'}
              onChange={() => handleOptionChange('paystack')}
              className="w-6 h-6 accent-[#1F96A9] mt-6"
            />
            <div className="my-4 pt-2 pl-4">
              <p className="text-[#282828] text-[15px] font-semibold mb-2 ">Pay with Link</p>
            </div>
          </div>

          {/* Bank Account Payment Option */}
          <div
            className="border rounded-[12px] w-full mt-6 h-[76px] flex bg-[#F7F7F7] pl-4 cursor-pointer"
            onClick={() => handleOptionChange('bank_account')}
          >
            <input
              type="radio"
              name="payment_method"
              value="bank_account"
              checked={selectedOption === 'bank_account'}
              onChange={() => handleOptionChange('bank_account')}
              className="w-6 h-6 accent-[#1F96A9] mt-6"
            />
            <div className="my-4 pt-2 pl-4">
              <p className="text-[#282828] text-[15px] font-semibold mb-2">Pay with Bank Account</p>
            </div>
          </div>

          {/* Wallet Payment Option */}
          <div
            className="border rounded-[12px] w-full mt-6 h-[76px] flex bg-[#F7F7F7] pl-4 cursor-pointer"
            onClick={() => handleOptionChange('wallet')}
          >
            <input
              type="radio"
              name="payment_method"
              value="wallet"
              checked={selectedOption === 'wallet'}
              onChange={() => handleOptionChange('wallet')}
              className="w-6 h-6 accent-[#1F96A9] mt-6"
            />
            <div className="my-4 pt-2 pl-4">
              <p className="text-[#282828] text-[15px] font-semibold mb-2">Pay with Wallet</p>
            </div>
          </div>

          {/* Card Payment Option */}
          <div
            className="border rounded-[12px] w-full mt-6 h-[76px] flex bg-[#F7F7F7] pl-4 cursor-pointer"
            onClick={() => handleOptionChange('card')}
          >
            <input
              type="radio"
              name="payment_method"
              value="card"
              checked={selectedOption === 'card'}
              onChange={() => handleOptionChange('card')}
              className="w-6 h-6 accent-[#1F96A9] mt-6"
            />
            <div className="my-4 pt-2 pl-4">
              <p className="text-[#282828] text-[15px] font-semibold mb-2">Pay via Card</p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            className="bg-[#46A4B5] text-white disabled:cursor-not-allowed disabled:opacity-50 h-[47px] w-full rounded-[45px] px-4 py-2 mt-8 font-semibold"
            onClick={handleClick}
            disabled={selectedOption === ''}
          >
            Continue
          </button>
        </>
      )}

      {/* Conditionally render the selected payment method's component */}
      {selectedOption === 'paystack' && hideSelectedOption && (
        <PaystackPayment
          toggleRepayment={toggleRepayment}
          loanHistory={loanHistory}
          handleShowOptions={handleShowOptions}
          amount={amount}
          loanId={loanId}
        />
      )}

      {selectedOption === 'bank_account' && hideSelectedOption && (
        <BankAccount
          toggleRepayment={toggleRepayment}
          handleShowOptions={handleShowOptions}
          amount={amount}
          loanId={loanId}
         
        />
      )}

      {selectedOption === 'wallet' && hideSelectedOption && (
        <WalletPayment
          toggleRepayment={toggleRepayment}
          handleShowOptions={handleShowOptions}
          amount={amount}
          loanId={loanId}
         
        />
      )}

      {selectedOption === 'card' && hideSelectedOption && (
        <CardPayment
        handleShowOptions={handleShowOptions}
          toggleRepayment={toggleRepayment}
          amount={amount}
          loanId={loanId}
          
        />
      )}
    </div>
  );
};

export default PaymentMethod;
