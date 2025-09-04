import React, { useEffect, useState } from 'react';
import LoadingPage from '@/app/loading';
import apiClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import useFcmToken from '@/components/FcmFunctions';
import Notification from '@/components/Notification';

type PaymentProps = {
  toggleRepayment: () => void;
  amount: number | null;
  loanId: number | null;
  loanHistory: { [key: string]: any }[];
  handleShowOptions: () => void;
};

const PaystackPayment: React.FC<PaymentProps> = ({
  toggleRepayment,
  handleShowOptions,
  amount,
  loanId,
  loanHistory,
}) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showManualVerify, setShowManualVerify] = useState(false);
  const [counter, setCounter] = useState(15);
  const [paymentDone, setPaymentDone] = useState(false);
  const [reference, setReference] = useState('');
  const [paymentLink, setPaymentLink] = useState<string | ''>('');
  const [error, setError] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const router = useRouter();
  const { payload } = useFcmToken();

 
  const fetchUsersActiveLoan = async () => {
    try {
      const response = await apiClient.get(`/loan`);


    const activeLoan = response?.data?.data.filter((loan: any) => loan.status !== 'CLOSED');
    return activeLoan;
      
    } catch (error: any) {
      console.log(error.response);
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } 
  }
  


  useEffect(() => {
    const fetchPaymentLink = async () => {
      if (!paymentLink && !reference) {
        try {
          setLoading(true);
  
          const response = await apiClient.post(
            `/loan/pay`,
            {
              amount_paid: amount,
              loan_id: loanId,
              payment_method: 'link',
            }
          );
          setPaymentLink(response?.data?.data?.payment_link);
          setReference(response?.data?.data?.reference);
          setLoading(false);
        } catch (error: any) {
          console.error(error);
          setError(error?.response?.data?.message || 'An error occurred, please try again');
          setLoading(false);
          
        } 
      }
    };
  
    fetchPaymentLink();
  }, [reference, paymentLink, amount, loanId]);
  

  // Handle countdown for manual verification
  useEffect(() => {
    if (payload?.notification?.title === 'Payment Successful!') {
      setLoading(false);
      toggleRepayment();
      router.push(
        `/dashboard?status=success&title=${encodeURIComponent(
          payload.notification.title
        )}&subMessage=${encodeURIComponent(payload.notification.body)}`
      );

    } else if (payload) {
      const url = `/dashboard?status=${encodeURIComponent(
        'error'
      )}&message=${encodeURIComponent(
        'Payment failed, please try again.'
      )}`;
      router.push(url);
      toggleRepayment();
    }
  }, [payload, router, toggleRepayment]);

  //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };
  

  // Handle messages from the iframe
  useEffect(() => {
    const trustedOrigin = process.env.NEXT_PUBLIC_PAYSTACK_ORIGIN || 'https://checkout.paystack.com';
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== trustedOrigin) return;
      const eventData = event.data || {};
      if (eventData.event === 'success') {
        setPaymentDone(true);
        setLoading(true);
        // Start countdown for manual verification
        const intervalId = setInterval(() => {
          setCounter((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setShowManualVerify(true); // Show manual verify button after countdown
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        //settimeout for loader
        setTimeout(() => {
          setLoading(false);
        }, 11000);
        
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [router, toggleRepayment]);

  // Handle manual verification
  const handleManualVerify = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/paystack/verify/${reference}`
      );
      const activeLoan = await fetchUsersActiveLoan();
      if (activeLoan.length > 0) {
        router.push(
          '/dashboard?status=success&title=Loan repayment Successful!&subMessage=You are doing well'
        );
      } else {
        router.push(
           '/dashboard?status=success&title=Loan repayment Successful!&subMessage=Well done! You have successfully repaid all your outstanding loan. You may Qualify for a new loan offer.'
        );
      }
      
    } catch (error: any) {
      console.log('error', error);
      router.push(
        `/dashboard?status=error&message=${
          error.response?.data?.message || 'An error occurred'
        }`
      );
    } finally {
      setLoading(false);
      toggleRepayment();
    }
  };

  return (
    <div className="w-full mx-auto font-outfit font-normal">
      <div className={`${paymentDone ? 'hidden' : ''} h-auto w-full mb-8 relative min-h-[590px]`}>
        {isIframeLoading && <LoadingPage />}
        {paymentLink && (
          <iframe
            src={paymentLink}
            sandbox="allow-scripts allow-forms allow-same-origin"
            
            onLoad={() => setIsIframeLoading(false)}
            scrolling="no"
            className="absolute w-full top-0 left-0 h-full"
          />
        )}
      </div>
      <button
        onClick={handleShowOptions}
        className={` ${paymentDone  ? 'hidden' : ''} text-[#282828] text-start hover:text-[red] disabled:cursor-not-allowed disabled:opacity-50 text-[15px] rounded-[45px] py-2 my-2 font-semibold`}
      >
        Other Payment Methods
      </button>

      {loading && (<LoadingPage />)}
        <div className={`${!paymentDone  ? 'hidden' : ''}`}>
        
        <div>
        <p className="mt-4 text-sm text-gray-500">
            If you are not redirected in {counter} seconds, click the button below
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleManualVerify}
              disabled={!showManualVerify}
              className={`bg-[#F83449] text-white px-4 py-2 rounded-md font-medium ${
                !showManualVerify && 'opacity-50 cursor-not-allowed'
              }`}
            >
              Redirect
            </button>
          </div>
          
        </div>
          
         
        </div>
        {notificationOpen && (
        <Notification
          isOpen={notificationOpen}
          toggleNotification={toggleNotification}
          message={error}
          
          status='error'
        />
      )}
      
    </div>
  );
};

export default PaystackPayment;
