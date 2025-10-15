'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/apiClient';
import Notification from '../Notification';
import LoadingPage from '@/app/loading';
import { FaHeadphones } from "react-icons/fa";


const VerifyIdentity: React.FC<{ 
  closeModal: () => void, 
  onboarding: { [key: string]: any } }> 
  = ({ closeModal, onboarding }) => {

  const [bvn, setBvn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedOtpOption, setSelectedOtpOption] = useState('');
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [showSelectionScreen, setShowSelectionScreen] = useState(false);
  const [showVerifyBVN, setShowVerifyBVN] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [showResend, setShowResend] = useState(false);
  const [email,setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [phoneNumber2,setPhoneNumber2] = useState('');
  const router = useRouter();

    //submit otp prefered means a user selected
  const submitOptSelection = async () => {
    const emailPayload ={email};
    const phonePayload ={phone_number:phoneNumber };
    const phone2Payload = {phone_number:phoneNumber2};

    if(selectedOtpOption === 'email' && email === null 
    || selectedOtpOption === 'phone' && phoneNumber === null 
    || selectedOtpOption === 'phone2' && phoneNumber2 === null ) 
    {
      setError('Please select a valid option');
      router.push(
        `/dashboard?status=error&message=${encodeURIComponent(error)}`
      );
      return;
    }
    console.log(selectedOtpOption, email, phoneNumber, phoneNumber2);
    try {
      setLoading(true);
      const response = await apiClient.post(`/account/send-otp`, 
      selectedOtpOption === 'email' ? emailPayload : selectedOtpOption === 'phone' ? phonePayload : phone2Payload
      );
      setEmail(response?.data?.data?.email);
      setPhoneNumber(response?.data?.data?.phone_number);
      handleShowOtpPage();
      setTimeLeft(60); // Reset countdown
  
    } catch (error: any) {
      setError(error?.response?.data?.message || 'An error occurred, please try again.');
      router.push(
        `/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred.')}`
      );
    } finally {
      setLoading(false);
    }
  }
  //this check ensures if a user has added bvn but has not verified it, it will show the otp page
  useEffect(() => {
    const init = async () => {
      if (!onboarding?.bvn_nin_exists) {
        handleShowVerifyBVN();
      } else {
        handleShowSelectionPage();
      }
    };
  
    init(); // call the async function
  }, [onboarding]);
  

  // Mask phone number function
  const maskPhone = (phone: string) => {
    if(!phone) return;
    return phone.replace(/.(?=.{4})/g, '*'); // masks all but last 4 digits
  };
  
  // Mask email function
  const maskEmail = (email: string) => {
    if(!email) return;
    const [user, domain] = email.split('@');
    const maskedUser = user.slice(0, 2) + '***' + user.slice(-1);
    return `${maskedUser}@${domain}`;
  };

  //handle show verify bvn page
  const handleShowVerifyBVN = () => {
    setShowVerifyBVN(true);
    setShowOtpPage(false);
    setShowSelectionScreen(false);
  };

  //handle show otp page
  const handleShowOtpPage = () => {
    setShowVerifyBVN(false);
    setShowOtpPage(true);
    setShowSelectionScreen(false);
  };

  //handle show selection page
  const handleShowSelectionPage = () => {
    setShowVerifyBVN(false);
    setShowOtpPage(false);
    setShowSelectionScreen(true);
  };

  //lets retrieve the users bvn no and email and phone number when a user comes back 
  // later to continue bvn verification
  useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const response = await apiClient.get('/account/get-detaills');
      setEmail(response?.data?.data?.email);
      setPhoneNumber(response?.data?.data?.phone_number);
      setPhoneNumber2(response?.data?.data?.phone_number_two)
    } catch (error:any) {
      console.error('Error fetching user details:', error);
      router.push(
        `/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred.')}`
      );
    }
  };

  if (showSelectionScreen && !email && !phoneNumber) {
    fetchUserDetails();
  }
}, [showSelectionScreen]);


   // Countdown effect for resend button
      useEffect(() => {
          if (timeLeft > 0) {
              const timerId = setInterval(() => {
                  setTimeLeft(prevTime => prevTime - 1);
              }, 1000);
  
              return () => clearInterval(timerId); // Clear timer on unmount
          } else {
              setShowResend(true); // Show resend button when timer runs out
          }
      }, [timeLeft]);
  
      // Format time as mm:ss
      const formatTime = (time: number) => {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };

  // Toggle error notification
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);


  // Handle form submission for BVN Number
  const handleSubmitBVN = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post(`/account/nin-bvn`, { bvn });
      setEmail(response?.data?.data?.email);
      setPhoneNumber(response?.data?.data?.phone_number);
      handleShowSelectionPage();
      
    } catch (error: any) {
      setError(error?.response?.data?.message || 'An error occurred, please try again.');
      router.push(
        `/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred.')}`
      );
      
    } finally {
      setLoading(false);
    }
  };


   // Handle form submission for otp code
   const handleSubmitOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post(`/account/verify-otp`, { otp });
        router.push('/dashboard?faceScan=true');
        closeModal();
      
    } catch (error: any) {
      setError(error?.response?.data?.message || 'An error occurred, please try again.');
      router.push(
        `/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred.')}`
      );
      closeModal();
      
    } finally {
      setLoading(false);
    }
  };

  const otpOptions = [
    { value: 'email', name: 'Email' },
    { value: 'phone', name: 'Phone No' },
    {value: 'phone2', name: 'Phone No'}
  ];




  return (
    <div className="w-full mx-auto font-outfit font-normal h-full overflow-y-hidden">
      {/**Show page to enter bvn */}
      {showVerifyBVN && (
         <form onSubmit={handleSubmitBVN}>
         <p className="text-[#275434] text-[18px] px-2 py-4 font-semibold">
           Your BVN is safe and secured. We use your BVN to verify your identity.
         </p>
         <input
           type="text"
           value={bvn}
           onChange={(e) => setBvn(e.target.value)}
           className="bg-[#F5F5F5] border-2 border-[#BEBEBE] w-full h-[58px] rounded-[8px] px-4 py-2"
           placeholder="Enter your BVN"
           required
         />
         <div className='flex justify-center flex-col mt-44'>
         <p className='text-[15px] text-navfont font-semibold text-center mb-1'>
           You don't know your BVN?
         </p>
         <p className='text-[13px] text-navfont font-normal text-center'>
           Dial *565*0# on the phone number <br/> registered with your BVN
         </p>
       </div>
       {loading && <LoadingPage />}
         <button 
         type="submit" 
         className="bg-[#1C1C1E] text-white w-full rounded-[8px] py-2 mt-10">
           Finish Up
         </button>
       </form>

      )} 
      
      {/**Show page to select otp option whether email or phone */}
      {showSelectionScreen && (
       
          <div    className='font-outfit px-2 py-4 text-[#282828]'>
            <p className='font-bold text-[18px] '>We will send you an OTP to verify your BVN</p>
            <p  className='font-normal text-[18px] mt-2'>Select one of the options tied to your bvn to receive the OTP</p>
            {otpOptions?.map((option) => (
        <div
                 key={option.value} 
                     className="border border-[#D4D4D4] rounded-[12px] w-full mt-4 h-[76px] lg:gap-4 md:gap-7 gap-1 bg-[#F7F7F7] pl-4 cursor-pointer flex justify-start items-center"
                   >
                     <input
                       type="radio"
                       name="otp_options"
                       value={option.value}
                       checked={selectedOtpOption === option.value}
                       onChange={() => setSelectedOtpOption(option.value)}
                       className="w-6 h-6 accent-[#F24C5D] bg-[#F24C5D] "
                     />
                     <div className=" px-1">
                       <div className="lg:text-[20px] md:text[20px] text-[16px] text-[#282828]  text-center tracking-widest flex  items-center">
                         <span className=" mr-2 font-normal text-[#5A5A5A]">{option.name}: </span>
                         <span className='font-semibold text-[20px]'>{option.value === 'email' ? maskEmail(email) : option.value === 'phone' ? maskPhone(phoneNumber) : maskPhone(phoneNumber2) }</span>
                         
                       </div>
                     </div >

                     
                   </div>
                   
        ))}

        <div className="border mt-20 border-[#D4D4D4] rounded-[12px] gap-3 w-full  min-h-[76px] h-auto  bg-[#F24C5D4D] p-3 cursor-pointer flex ">
        <FaHeadphones className='text-[#5A5A5A] text-3xl'/>
         <p className='text-[16px] '>
          If you are having trouble receiving OTP, please call 
           <span className='font-semibold'> 09166000040</span> or <span className='font-semibold'>09166000042.</span> 
          </p>
        </div>
        <button 
         type="button" 
       onClick={submitOptSelection}
       disabled={!selectedOtpOption || loading }
         className="bg-[#1C1C1E] disabled:opacity-50 text-white w-full h-[55px] rounded-full py-2 mt-6">
           {loading? 'Sending...' : 'Send OTP'}
         </button>
          </div>
      )}

      {/**Show page to enter otp code */}
      {showOtpPage && (
        <>
         <form onSubmit={handleSubmitOTP}>
         
         <p className='px-2 py-4 text-[#282828] leading-8'>Enter the 6 digit code sent to your bvn number {(selectedOtpOption === 'phone' || selectedOtpOption === 'phone2' )? maskPhone(phoneNumber) : maskEmail(email)}.</p>
         <input
           type="number"
           value={otp}
           onChange={(e) => setOtp(e.target.value)}
           className="bg-[#F5F5F5] border-2 border-[#BEBEBE] w-full h-[58px] rounded-[8px] px-6 py-2 mt-6"
           placeholder="Enter otp code"
           required
         />
         <div className='flex justify-between items-center w-full mt-4 '>
             {/* Show countdown or resend button */}
         {showResend ? (
                    <button
                        onClick={handleShowSelectionPage}
                        className="text-center  block font-normal text-[#F24C5D] hover:cursor-pointer hover:text-red-900"
                    >
                        Resend code
                    </button>
                ) : (
                    <p className="text-center text-[15px] text-[#F24C5D]  ">
                        Resend in {formatTime(timeLeft)}
                    </p>
          )}
           <button 
           onClick={handleShowSelectionPage}
           className='font-medium text-[15px]'>
          Change method
         </button>
         </div>
        
       

       {loading && <LoadingPage />}
         <button 
         type="submit" 
         className="bg-[#1C1C1E] text-white w-full rounded-[8px] py-2 mt-56">
           Continue
         </button>
       </form>

      
       </>
      )}
       
      {isNotificationOpen && (
        <Notification
          status="error"
          message={error}
          toggleNotification={toggleNotification}
          isOpen={isNotificationOpen}
        />
      )}

    </div>
  );
};

export default VerifyIdentity;
