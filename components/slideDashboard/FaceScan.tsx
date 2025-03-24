import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { customAlphabet } from 'nanoid';
import apiClient from '@/utils/apiClient';
import Image from 'next/image';
import axios from 'axios';
import LoadingPage from '@/app/loading';


type FaceScanProps = {
  isOpen: boolean;
  toggleFaceScan: () => void;
};

declare global {
  interface Window {
    getLiveDetails: () => void;
  }
}


const FaceScan: React.FC<FaceScanProps> = ({ isOpen, toggleFaceScan }) => {
  const [loading, setLoading] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState<any | null>(null);
  const[imageUrl, setImageUrl] = useState<string>('');
  const [userOffers, setUserOffers] = useState<any | null>(null);
  const router = useRouter();


  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/profile`
        );
        setFetchedUserData(response?.data?.data);
       
      } catch (error: any) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);



  //get user offers
useEffect(() => {
  const fetchUserOffers = async () => {
    try {
      const response = await apiClient.get(`/loan/user_offers`);

     setUserOffers(response?.data?.data);
      
    } catch (error: any) {
      console.log(error.response);
     
    } 
  };
  fetchUserOffers();
  }, []);
  



  
    const updateLiveDetails = async (img:string) => {
      console.log('image',img);
        try {
          setLoading(true);
          const response = await apiClient.post(
            `/livieliness`,
            { img_url: img })
            console.log(response?.data);


          if(userOffers?.length <= 0){
            router.push(
              `/dashboard?status=error&message=${encodeURIComponent('Unfortunately, you are not eligible for a loan at this time as you do not meet the required criteria.')}`
            );
          }else{
           router.push('/dashboard?offer=true');
            toggleFaceScan();
          }
          
        } catch (error: any) {
          console.error('Error updating live details:', error);
         router.push(`/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred while processing your request')}`);
        toggleFaceScan();
        } finally {
          setLoading(false); 
        }
      }


  //get access token
  const getAccessToken = async () => {
    try {
      const response = await apiClient.get(`/livieliness/get-token`)
      return response?.data?.data?.token;
    } catch (error: any) {
      console.error('Error fetching access token:', error);
      router.push(`/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred while processing your request')}`);
      toggleFaceScan();
    }
  };


  // Fetch User Log
const getUserLog = async () => {
  try {
    setLoading(true);
    const response = await axios.post(
      'https://ind.idv.hyperverge.co/v1/link-kyc/results',
      { transactionId: fetchedUserData?.phone_number },
      {
        headers: {
          'Content-Type': 'application/json',
          appId: process.env.NEXT_PUBLIC_TEST_APP_ID,
          appKey: process.env.NEXT_PUBLIC_TEST_APP_KEY,
          transactionId: fetchedUserData?.phone_number,
        },
      }
    );
    return response?.data?.result?.results.at(-1)?.imageUrl;
  } catch (error: any) {
    console.error('Error fetching user log:', error);
  }finally{
    setLoading(false);
  }
};

// Start Liveness Check
const startLiveness = async () => {
  setLoading(true);
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error('Failed to get access token');
    setLoading(false);
    return;
  }

  const workflowID = process.env.NEXT_PUBLIC_HYPERVERGE_WORKFLOW_ID;
  const transactionID = fetchedUserData?.phone_number;

  const hyperKycConfig = new window.HyperKycConfig(accessToken, workflowID, transactionID);

  HyperKYCModule.launch(hyperKycConfig, async (HyperKycResult: any) => {
    try {
      if (HyperKycResult?.status === 'auto_approved') {
        const log = await getUserLog();
        setImageUrl(log);
        
        await updateLiveDetails(log);
      } else {
        router.push(`/dashboard?status=error&message=${encodeURIComponent('Liveness check failed')}`);
        toggleFaceScan();
      }
    } catch (error) {
      console.error('Error handling HyperKYC result:', error);
    }finally{
      setLoading(false);
    }
  });
};

  
  return (
    <>
      {isOpen && (
        <div
          onClick={toggleFaceScan}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[483px] bg-background lg:ml-32 md:ml-32 mx-2 min-h-[547px] h-auto font-outfit rounded-[22px] p-6 shadow-md transition-transform duration-300 transform scale-100"
          >
            <div className="w-11/12 mx-auto rounded-[22px]">
              <p className="font-bold text-[18px] text-[#030602] mb-4">Final stage!</p>
              <p className="text-[15px] text-navfont">
                This last stage will require you to upload your live selfie with your device camera.
              </p>
              <Image
                src="/images/facescan.png"
                alt="FaceScan Icon"
                width={160}
                height={160}
                className="mx-auto mt-12"
              />
              <p className="text-[15px] mt-4 text-navfont text-center w-9/12 mx-auto">
                Ensure you are doing this in a bright environment and show your face clearly.
              </p>
              <div className="flex flex-col items-center gap-4 justify-center min-h-10 h-auto mt-8 mb-8 w-full ">
                {loading && <LoadingPage />}
                <button
                  onClick={startLiveness}
                  disabled= {loading || imageUrl !== ''}
                  className='bg-[#1C1C1E] text-white w-[260px] rounded-[8px] py-2'
                   >
                  start liveness
                </button>
                <p
                  className="text-[15px] text-navfont font-semibold text-center hover:underline cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Do this later
                </p>
              </div>
              <p className="text-[13px] mt-4 text-[#F24C5D] text-center w-10/12 mx-auto">
                By clicking the start button, you agree to our user
                <Link href="/terms" className="underline underline-offset-2 mx-1">
                  terms
                </Link>
                and conditions and
                <Link href="/privacy-policy" className="underline underline-offset-2 mx-1">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
          
        </div>
      )}



    </>
  );
};

export default FaceScan;
