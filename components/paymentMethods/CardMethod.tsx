import { useState, useEffect, useRef } from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import apiClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import useFcmToken from '../FcmFunctions';
import LoadingPage from '@/app/loading';


type CardMethodProps = {
  isOpen: boolean;
  toggleCardMethod: () => void;
};

const CardMethod: React.FC<CardMethodProps> = ({ isOpen, toggleCardMethod }) => {

  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState('');
  const [tokenizeLink, setTokenizeLink] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showManualVerify, setShowManualVerify] = useState(false);
  const [counter, setCounter] = useState(15);
  const [paymentDone, setPaymentDone] = useState(false);
  const router = useRouter();
  const { payload } = useFcmToken();
  

  useEffect(() => {
    const trustedOrigin = process.env.NEXT_PUBLIC_PAYSTACK_ORIGIN || 'https://checkout.paystack.com';

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== trustedOrigin) return;
      

      if ( event.data?.event === 'success') {
        setPaymentDone(true);
        setLoading(true);

        // Start countdown for manual verification
        const intervalId = setInterval(() => {
          setCounter((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setShowManualVerify(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setTimeout(() => {
          setLoading(false);
        }, 10700);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);



//tokenize card
useEffect(() => {
  const tokenizeCard = async () => {
    try {
    const response = await apiClient.post(
      `/account/card/tokenize`,
      {}
    );
   setTokenizeLink(response?.data?.data.payment_link);
    setReference(response?.data?.data.reference);
    localStorage.setItem('card_reference', response?.data?.data.reference);
  }catch (error: any) {
    console.error(error);
    router.push('/dashboard?status=error&message=An error occurred. Please try again.');
    
    }
  };
  if(!tokenizeLink)
  tokenizeCard();
}, []);

  //if card tokenization was successful, apply for loan
  useEffect(() => {
      if (payload?.notification?.title === 'Card Tokenization Successful!') {
        setLoading(false)
        router.push('/dashboard?status=success&title=Card Tokenization Successful!&&subMessage=Your card has been successfully verified');
       
    };
  }, [payload]);
  

  //handle manual verification and loan application
  const handleManualVerify = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/paystack/verify/${reference}`
      );
     
        router.push('/dashboard?status=success&title=Card Verification Successful!&subMessage=Your card has been successfully verified');
    } catch (error: any) {
      console.error(error.response);
      router.push(
        `/dashboard?status=error&message=${
          error.response?.data?.message || 'An error occurred'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div
    
      className={`fixed inset-0 z-50 flex bg-black bg-opacity-50 mt-0 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white h-auto w-11/12 lg:w-4/12 md:w-6/12 overflow-y-auto p-6 relative transform transition-transform duration-300 ease-in-out ${
           isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-11/12 mx-auto rounded-[22px]">
          <div className='flex align-middle items-center justify-start'>
            <button
              onClick={toggleCardMethod}
              className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center justify-center"
            >
              <MdOutlineArrowBackIosNew className="text-navfont text-2xl" />
            </button>
            <p className="flex-grow lg:text-[18px] md:text-[16px] text-[14px] text-[#1C1C1E] font-bold ml-6">
              Securely link your card
            </p>
          </div>
          <div className='w-full mx-auto font-outfit font-normal'>
            <p className='font-semibold text-[18px] my-8'>
              Please link your valid ATM card to authorize us to debit your account on your loan due date for easy and automatic repayment.
            </p>
            

           

            <div className={`${paymentDone ? 'hidden' : ''} h-auto w-full mb-8 relative min-h-[550px]`}>
        {isIframeLoading && <LoadingPage />}
        
        {tokenizeLink && (
          <iframe
            src={tokenizeLink}
            onLoad={() => setIsIframeLoading(false)}
            scrolling="no"
            className={`absolute w-full top-0 left-0 h-full ${isIframeLoading ? 'hidden' : 'block'}`}
          />
        )}
      </div>

      {loading && <LoadingPage />}

      <div className={`${!paymentDone  ? 'hidden' : ''}`}>
        <p className="mt-4 text-sm text-gray-500">
            If you are not redirected in {counter} seconds, click the button below
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleManualVerify}
              disabled={!showManualVerify}
              className={`bg-[#09A5DB] text-white px-4 py-2 rounded-md font-medium ${
                !showManualVerify && 'opacity-50 cursor-not-allowed'
              }`}
            >
              Redirect
            </button>
          </div>
          
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMethod;