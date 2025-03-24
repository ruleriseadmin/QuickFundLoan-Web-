import React, { useState, useEffect, useRef } from "react";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import LoadingPage from '@/app/loading';



const LinkAccount = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [monoLink, setMonoLink] = useState('');

 

      useEffect(() => {
        const getMonoLink = async () => {
          try {
            setLoading(true);
            
            const response = await apiClient.post(
              `/account/mono/account`,
              { }
            );
            
            setMonoLink(response?.data?.data?.mono_url);
            setLoading(false);
          } catch (error:any) {
            console.error(error);
            const errorMessage =
              error?.response?.data?.message ||
              error?.response?.data?.error ||
              'An error occurred, please try again';
           router.push(`/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent(errorMessage)}`);
            setLoading(false);
            setIsIframeLoading(false);
          }
        };
       
          getMonoLink();
      }, []);
      

 

  return (
    <div className='w-full mx-auto font-outfit font-normal'>
      
       <div className={` h-auto w-full mb-8 relative min-h-[700px]`}>
        {isIframeLoading && <LoadingPage />}
        
        {monoLink && (
          <iframe
            src={monoLink}
            onLoad={() => setIsIframeLoading(false)}
            scrolling="no"
            allow="camera"
            className={`absolute w-full top-0 left-0 h-full overflow-hidden ${isIframeLoading ? 'hidden' : 'block'}`}
          />
        )}
      </div>

      {loading && <LoadingPage />}     
    </div>
  );
};

export default LinkAccount;