import { useState, useEffect, useRef } from 'react';
import apiClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import useFcmToken from '../FcmFunctions';
import LoadingPage from '@/app/loading';

type CardLinkProps = {
  handleVerifyIdentity: () => void;
};

const CardLink: React.FC<CardLinkProps> = ({ handleVerifyIdentity }) => {
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
    router.push('/dashboard?status=error&message=We are unable to link your debit card at this moment due to error from our third-party partner. You can try again or proceed to the next step.');
    
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
     <div className='w-full mx-auto font-outfit font-normal'>
            <p className='font-bold text-[18px] text-[#282828] font-comic my-8'>
            You will be charged a one-time fee of ₦200 for card linking. This amount is non-refundable.
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
              className={`bg-[#ED3237] text-white px-4 py-2 rounded-md font-medium ${
                !showManualVerify && 'opacity-50 cursor-not-allowed'
              }`}
            >
              Redirect
            </button>
          </div>
          
        </div>
          </div>
      
  );
};

export default CardLink;