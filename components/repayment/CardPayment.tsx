import { useState, useEffect } from 'react';
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import Notification from '@/components/Notification';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Loader from '../Loader'

type BankProps = {
  toggleRepayment: () => void;
  handleShowOptions: () => void;
  loanId: number | null;
  amount: number | null;
};

const CardPayment: React.FC<BankProps> = ({ toggleRepayment, handleShowOptions,loanId,amount }) => {
  const [error, setError] = useState<string>('');
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [tokenizedCard, setTokenizedCard] = useState<any[]>([]);
  const [cardLoading, setCardLoading] = useState<boolean>(false);
  const router = useRouter();

  // Toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  // Fetch user's tokenized cards
  useEffect(() => {
    const fetchUsersCards = async () => {
      try {
        setCardLoading(true);
        const response = await apiClient.get(
          `/account/cards`
        );
        const cards = response?.data?.data?.filter(
          (card: any) => card.authorization === 'completed'
        );
        
        setTokenizedCard(cards);
      } catch (error: any) {
        setError(
          error?.response?.data?.message || 
          error?.message || 
          'An error occurred, please try again'
        );
        setNotificationOpen(true);
      } finally {
        setCardLoading(false);
      }
    };

    fetchUsersCards();
  }, []);

  const fetchUsersActiveLoan = async () => {
    try {
      const response = await apiClient.get(`/loan`);


    const loanHistory = response?.data?.data.filter((loan: any) => loan.status !== 'CLOSED');
    return loanHistory;
      
    } catch (error: any) {
      console.log(error.response);
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } 
  }
  

// Repay loan
  const handleLoanRepayment = async () => {
    try {
      setLoading(true);

      const response = await apiClient.post(
        `/loan/pay`,
        {
          amount_paid: amount,
          loan_id: loanId,
          payment_method: 'card',
          payment_id: selectedOption,
        }
      );
      const loanHistory = await fetchUsersActiveLoan();
      if (loanHistory.length > 0) {
        router.push(
          '/dashboard?status=success&title=Loan repayment Successful!&subMessage=You are doing well'
        );
      } else {
        router.push(
          '/dashboard?status=success&title=Loan repayment Successful!&subMessage=Well done! You have successfully repaid all your outstanding loan. You may Qualify for a new loan offer.'
        );
      }
      
      
      toggleRepayment();
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.message || 'An error occurred, please try again');
      setNotificationOpen(true);
    } finally {
      setLoading(false); // Ensure loading is stopped even if an error occurs
    }
  }




  return (
    <div className="w-full mx-auto font-outfit font-normal">
      <p className="font-normal my-8">
        <span className="text-[18px] font-semibold">Saved Bank Accounts</span>
        <br />
        <span className="text-[14px]">
          Please ensure you have sufficient funds in your <br /> bank account.
        </span>
      </p>

      <div>
        {cardLoading ? (<LoadingPage />) : tokenizedCard?.length > 0 ? (
          tokenizedCard?.map((card, index) => (
            <div
              key={index}
              className="border rounded-[12px] w-full mt-6 h-[76px] lg:gap-4 md:gap-7 gap-1 bg-[#F7F7F7] pl-4 cursor-pointer flex"
              onClick={() => handleOptionChange(card.id)}
            >
              <input
                type="radio"
                name="bank_accounts"
                value={card.id}
                checked={selectedOption === card.id}
                onChange={() => handleOptionChange(card.id)}
                className="w-6 h-6 accent-[#F83449] text-[#F83449] mt-6"
              />
              <div className=" px-1">
                <div className="lg:text-[20px] md:text[20px] text-[16px] text-[#282828] mt-4 text-center tracking-widest flex  items-center">
                  <span className=" mr-2 pt-2 font-bold">**** **** **** </span>
                  <span>{card.last4}</span>
                  <Image
                src={`${card.brand === 'visa' ? '/images/visa.png' : '/images/mastercard.png'}`}
                width={41}
                height={24}
                alt="master card"
                className="lg:ml-12 ml-6"
              />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex justify-between items-center'>
            <p>No cards available</p>
            <Link href='/payment-methods' className='text-[#F83449] text-[13px] border-b border-solid border-b-[#F83449]'>Add card</Link>
          </div>
          
        )}
      </div>      

      <button
        onClick={handleShowOptions}
        className="text-[#282828] mt-32 text-start hover:text-[red] disabled:cursor-not-allowed disabled:opacity-50 text-[15px] rounded-[45px] py-2 my-2 font-semibold"
      >
        Change Payment Method
      </button>

      {loading && <Loader title='Repayment in progress' text='Your loan status will automatically update upon successful payment' />}

      <button
        className="bg-[#F83449] text-white disabled:cursor-not-allowed disabled:opacity-50 h-[47px] w-full rounded-[45px] px-4 py-2 mt-6 font-semibold"
        disabled={!selectedOption || loading}
        onClick={handleLoanRepayment}
      >
        Continue
      </button>

      {notificationOpen && (
        <Notification
          message={error}
          isOpen={notificationOpen}
          status="error"
          
          toggleNotification={toggleNotification}
        />
      )}

    </div>
  );
};

export default CardPayment;
