// FaceScan.tsx
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from '../selfie/webCam';
import ReactWebcam, { WebcamProps } from "react-webcam";
import Image from 'next/image';
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';

type FaceScanProps = {
  isOpen: boolean;
  toggleFaceScan: () => void;
};
const FaceScan: React.FC<FaceScanProps>  = ({ isOpen, toggleFaceScan }) => {
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [startCamera, setStartCamera] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const webcamRef = useRef<ReactWebcam>(null);
  const router = useRouter();
  const [userOffers, setUserOffers] = useState<any | null>(null);
  const [showDoLater, setShowDoLater] = useState(true);


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
    if(!img)
      throw new Error('Image not found');
    try {
      setLoading(true);
      const response = await apiClient.post(
        `/livieliness`,
        { img_url: img })
       


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


  useEffect(() => {
    if (screen.orientation?.type === "portrait-primary") {
      setIsMobile(true);
    }
  }, []);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setStartCamera(false); // optional: stop camera after capture
    }
  };
  



  return (
    <>
      {isOpen && (
        <div
          onClick={toggleFaceScan}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[483px] bg-background mx-2 min-h-[547px] h-auto font-outfit rounded-[22px] p-6 shadow-md"
          >
            <div className="w-11/12 mx-auto rounded-[22px]">
              <p className="font-bold text-[18px] text-[#030602] mb-8">Final stage!</p>
              <p className="text-[15px] text-navfont">
                This last stage will require you to upload your live selfie with your device camera.
              </p>
             

              {!capturedImage && !startCamera && (
                <>
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
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => {
                      setStartCamera(true)
                      setShowDoLater(false);
                    }}
                    className="bg-[#1C1C1E] text-white rounded px-4 py-2"
                  >
                    Start Camera
                  </button>
                </div>
                </>
              )}

              {!capturedImage && startCamera && (
                <div>
                  <Webcam webcamRef={webcamRef} type='portrait' />
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleCapture}
                      className="bg-[#282828] text-white rounded px-4 py-2"
                    >
                      Capture Photo
                    </button>
                  </div>
                </div>
              )}

              {capturedImage && (
                <div className="text-center">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-auto mt-6 rounded-lg border"
                  />
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={() => {
                        setCapturedImage(null);
                        setStartCamera(true);
                      }}
                      className="bg-gray-300 text-[#282828] rounded px-4 py-2"
                    >
                      Retake
                    </button>
                    {loading && <LoadingPage />}
                    <button
                      onClick={() => updateLiveDetails(capturedImage)}
                      disabled={loading}
                      className="bg-[#1C1C1E] text-white rounded px-4 py-2"
                    >
                     Confirm Shot
                    </button>
                  </div>
                </div>
              )}
              {showDoLater && (
                 <p
                 className="text-[15px] text-navfont font-semibold text-center hover:underline cursor-pointer mt-6"
                 onClick={() => window.location.reload()}
               >
                 Do this later
               </p>
              )}

             

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
