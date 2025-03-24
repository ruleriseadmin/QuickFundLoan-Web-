import Image from "next/image";
import { useState } from "react";
import LoadingPage from '@/app/loading';
import Notification from "../Notification";
import axios from 'axios';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

type resetPasswordType = {
  handleShowOtp: (phone:string, title:string, subtitle:string) => void;
  handleLogin: () => void;
}

const ResetPassword : React.FC<resetPasswordType> = ({handleShowOtp, handleLogin}) => {
    const [phone_number, setPhone_number] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isNotificationOpen, setNotificationOpen] = useState(false);


     // Toggle error notification
     const toggleNotification = () => {
      setNotificationOpen(!isNotificationOpen);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      try {
          setLoading(true);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/send-otp`, {
              phone_number
          }, {
              headers: {
                  'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`
              }
          });
          
          handleShowOtp(phone_number, 'Reset password', '');
          setLoading(false);
      } catch (error: any) {
          console.log(error?.response);
          setError(error?.response?.data?.message || 'An error occurred, please try again');
          setNotificationOpen(true);
          setLoading(false);
      }
  };

  
        


  return (
    <div>
         {/* ResetPassword */}
         <div className='w-full h-full items-center font-outfit'>
          <div className="flex items-center gap-6 mt-6">
          <button
          onClick={handleLogin}
              className="text-[18px]]  font-bold  rounded-full  hover:text-[#030602] flex items-center "
            >
             <MdOutlineArrowBackIosNew className="text-[#5A5A5A] text-xl font-bold" />
            </button>
            <p className="text-[20px] font-bold ">Recover your  password</p>
          </div>
            
            <p className="mt-6 text-[15px] text-[#282828] lg:w-10/12 md:w-11/12 leading-6">
            You can request a password reset below. 
            We will send a security code to the email address, 
            please make sure it is correct.
            </p>
           

            <form className="lg:w-11/12 md:w-11/12 w-full h-auto mt-10 mb-10" onSubmit={handleSubmit}>
              {/* Phone number input */}
              <div className="relative mb-6">
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  name="phone_number"
                  onChange={(e) => setPhone_number(e.target.value)}
                  className="w-full lg:w-11/12 pl-12 py-2 placeholder-[#5A5A5A]  border border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Image
                    src="/images/call.png"
                    alt="Phone Icon"
                    width={20}
                    height={20}
                    className="text-gray-400"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!phone_number  || loading}
                
                className="disabled:opacity-50 disabled:cursor-not-allowed  w-full lg:w-11/12 bg-[#F6011BB2]  text-white font-outfit  rounded-full h-[55px] py-1 px-4 text-[15px] mt-4"
              >
                Request password Reset
              </button>
            </form>
            {loading && <LoadingPage />}
            <p 
            className="text-center w-full lg:w-11/12 text-[13px] text-navfont">
           For further support, you may visit the Help Center or contact our customer service team.
            </p>
          </div>
          {/* Error notification */}
          {isNotificationOpen && (
            <Notification
              status="error"
              
              message={error}
              toggleNotification={toggleNotification}
              isOpen={isNotificationOpen}
            />
          )}


    </div>
  )
}

export default ResetPassword