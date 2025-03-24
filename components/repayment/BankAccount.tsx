import { useState, useEffect } from 'react';
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import Notification from '@/components/Notification';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdPending } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import Loader from '../Loader'


type BankProps = {
  toggleRepayment: () => void;
  handleShowOptions: () => void;
  amount: number | null;
  loanId: number | null;
 
};

const BankAccount: React.FC<BankProps> = ({toggleRepayment, handleShowOptions,loanId,amount}) => {
  const [bankAccounts, setBankAccounts] = useState<any[]>([]); // Explicitly specify the type
  const [error, setError] = useState<string>('');
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [bankLoading, setBankLoading] = useState<boolean>(false);
  const [loanLoading, setLoanLoading] = useState<boolean>(false);
  const [debitMessage, setDebitMessage] = useState('');
const router = useRouter()
const directDebitReference : string | null = localStorage.getItem('direct_debit')




  // Toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleOptionChange = (option: number) => {
      setSelectedOption(option);
  };


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
  

  

  useEffect(() => {
    const fetchUsersBankAccounts = async () => {
      try {
       setBankLoading(true);
        const response = await apiClient.get(
          `/account`);

        setBankAccounts(response?.data?.data || []); 
      } catch (error: any) {
        console.error(error?.response);
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
      } finally {
        setBankLoading(false);
  
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
            `/paystack/verify/${directDebitReference}`);
            setDebitMessage(response?.data?.message);
  
        } catch (error: any) {
          console.error('Error during payment verification:', error);
        } 
      }
    };
  
    verifyPayment();
  }, [directDebitReference, bankAccounts]);


//get direct debit link for accounts that are not verified
  const verifyAccount = async (bankId:number) => {
    try {
      setLoading(true);
      if(!bankId) return;
      const paymentResponse = await apiClient.post(
        `/account/direct_debit`,
        {bank_account_id: bankId},
        
      );
      
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
      console.log(error);
      setError(error?.response?.data?.message || 'An error occurred, please try again');
      setNotificationOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanRepayment = async () => {
    try {
      setLoanLoading(true);
      const response = await apiClient.post(
        `/loan/pay`,
        {
          amount_paid: amount,
          loan_id: loanId,
          payment_method: 'direct_debit',
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
      
      
      toggleRepayment()
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.message || 'An error occurred, please try again');
      setNotificationOpen(true);
    } finally {
      setLoanLoading(false); // Ensure loading is stopped even if an error occurs
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
        {bankAccounts.map((account, index) => (
    <div
    key={index}
    className={`border rounded-[12px] w-full mt-6 h-[100px] bg-[#F7F7F7] pl-4 cursor-pointer grid grid-cols-12 items-center`}
    onClick={() => {
      if (account.authorization_code === 'complete') {
      handleOptionChange(account.id)
    }else{
      return;
    }
    }
    }
  >
    {/* Radio Button */}
    <input
      type="radio"
      name="bank_accounts"
      value={account.id}
      checked={selectedOption === account.id}
      onChange={() => handleOptionChange(account.id)}
      className="w-6 h-6 accent-[#1F96A9] col-span-1 self-center justify-self-center"
      disabled={ account.authorization_code === null || account.authorization_code === 'pending'}
    />
  
    {/* Bank Account Details */}
    <div className="col-span-8 px-4">
      <p className="text-[#282828] text-[15px] font-semibold mb-1">
        {account.bank_name}
      </p>
      <p className="text-[#282828] text-[14px]">{account.account_name}</p>
      <p className="text-[#1C1C1E] text-[18px] font-bold">{account.account_number}</p>
    </div>
  
    {/* Status and Button */}
    <div className="col-span-3 text-center">
      <div className="flex flex-col items-center">
        {account.authorization_code === 'complete' ? (
          <RiVerifiedBadgeFill className="text-2xl text-[#1F96A9]" />
        ) : account.authorization_code === 'pending' ? (
          <MdPending className="text-2xl text-[#FFD166]" />
        ) : (
          <FcCancel className="text-2xl" />
        )}
        {account.authorization_code === null && (
          <button
            className="text-[#ED3237] text-sm font-semibold mt-2 hover:underline"
            onClick={async () => {
              const link = await verifyAccount(account.id)
              console.log(link)
              if (link) {
                  window.location.href = link;
              }
            }}
          >
            Verify
          </button>
        )}
        {account.authorization_code === 'pending' && debitMessage === 'Authorization does not exist or does not belong to integration' && (
          <button
          className="text-[#ED3237] text-sm font-semibold mt-2 hover:underline"
          onClick={async () => {
              const link = await verifyAccount(account.id)
              console.log(link)
              if (link) {
                  window.location.href = link;
              }
            }}
        >
          Verify
        </button>
        )}
        {account.authorization_code === 'pending' && debitMessage !== 'Authorization does not exist or does not belong to integration' && (
          <p
            className="text-[#ED3237] text-sm font-semibold mt-2"
          >
            pending
          </p>
        )}
      </div>
    </div>
  </div>
  
        ))}
         {bankLoading && <LoadingPage />}

      <button
        onClick={handleShowOptions}
          className=" text-[#282828] mt-12 text-start hover:text-[red]  disabled:cursor-not-allowed disabled:opacity-50  text-[15px]   rounded-[45px]  py-2 my-2 font-semibold"
          
        >
          Change Payment Method
        </button>
        {loading && <LoadingPage />}
        {loanLoading &&  <Loader 
          title="Repayment in progress"
          text="Your loan status will automatically update upon successful payment"
        />}

        <button
          className="bg-[#46A4B5] text-white disabled:cursor-not-allowed disabled:opacity-50 h-[47px] w-full rounded-[45px] px-4 py-2 mt-10 font-semibold"
          disabled={!selectedOption || loading} // Disable if no option or loading
          onClick={handleLoanRepayment}
        >
          Continue
        </button>
      </div>

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

export default BankAccount;
