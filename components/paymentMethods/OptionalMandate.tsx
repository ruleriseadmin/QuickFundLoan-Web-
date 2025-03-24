import React, { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";
import Image from 'next/image'
import { FaTimes } from "react-icons/fa";


type OptionalMandateProps = {
  id: number | string;
};


const OptionalMandate: React.FC<OptionalMandateProps> = ({id}) => {
    console.log('id', id)

  const [loading, setLoading] = useState(false);
  const router = useRouter()
    const [error, setError] = useState('');
    const [bankAccounts, setBankAccounts] = useState<any[]>([]);
    const [notificationOpen, setNotificationOpen] = useState(false);

    //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  
    useEffect(() => {
      const fetchUsersBankAccounts = async () => {
        try {
         
          const response = await apiClient.get(
            `/account`
          );
  
          setBankAccounts(response?.data?.data || []);
        } catch (error: any) {
          setError(error?.response?.data?.message || 'An error occurred, please try again');
        } 
      };
      if(!id){
      fetchUsersBankAccounts();
        }
    }, [id]);
  
  
  
  //fetch link for direct debit
  const fetchPaymentLink = async (bankId:number | string) => {
    
    try {
      
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
      console.error("Payment Error:", error.response);
      const url = `/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred during payment processing.')}`;
      router.push(url); 
      setLoading(false);
  
    }
  };
    
  
  

  return (
    <div>
      
      <div className="flex flex-col justify-center items-center mt-8">
      <Image
      src='/images/mandateImage.png'
     alt='mandate'
     width={50}
     height={50}
     />
<p className="text-[#030602] text-[24px] font-medium mt-5">Activate E-Mandate <br/> on your bank account</p>
      </div>
      <div className="mt-6">
        <div className="lg:text-[17px] md:text-[17px] text-[15px] text-[#282828] font-comic w-full  mx-auto h-[91px] flex items-start bg-[#F3F3F3] rounded-[12px] pl-3 ">
        <Image
      src='/images/mandate1.png'
     alt='mandate'
     width={20}
     height={20}
     className="pt-3"
     />
     <p className="pl-2 pr-2 pt-3">This electronic mandate will authorize us to debit your bank account for loan repayments. See <span className="text-[#ED3237]">Direct Debit policy.</span></p>

        </div>
        <div className="lg:text-[17px] md:text-[17px] text-[15px] mt-3 text-[#282828] font-comic w-full  mx-auto h-[91px] flex items-start bg-[#F3F3F3] rounded-[12px] pl-3 ">
        <Image
      src='/images/mandate2.png'
     alt='mandate'
     width={20}
     height={20}
     className="pt-3"
     />
     <p className="pl-2 pr-2 pt-3">You will be required to transfer ₦100 from this account. This money will be refunded back to your account within 24hrs.</p>

        </div>
      </div>

      <p className="mt-12 text-[#ED3237] font-black text-center w-full text-[15px] font-saira">Secured by PAYSTACK</p>
     {loading && <LoadingPage />}
      <button
          type='button'
          onClick={async () => {
            setLoading(true)
        if(id){
            const link = await fetchPaymentLink(id);
            if(link){
              window.location.href = link;
            }else{
              console.log('no link')
              setLoading(false)
            }
          }
          }}
          className="bg-[#1C1C1E] text-white h-[47px] w-full rounded-[8px]  px-4 py-2 mt-8 font-semibold"
        >
          Continue
        </button>
      
    </div>
  );
};

export default OptionalMandate;
