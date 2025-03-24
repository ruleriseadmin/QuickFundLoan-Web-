import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import Notification from '../Notification';
import axios from 'axios';
import LoadingPage from '@/app/loading';

type PasswordProps = {
    phone_number: string;
    handleShowLogin: () => void;
};

const Password: React.FC<PasswordProps> = ({phone_number, handleShowLogin}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [success, setSuccess] = useState('');
    const [successNotification, setSuccessNotification] = useState(false);


    //toggle notification
    const toggleNotification = () => {
        setNotificationOpen(!isNotificationOpen);
    }

    //toggle success notification
    const toggleSuccessNotification = () => {
        setSuccessNotification(!successNotification);
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
       
          setLoading(true);
          
          const res = await axios.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/set-password`, {
              phone_number,
              password,
              password_confirmation

          }, {
              headers: {
                  'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`
              }
          });
          
          setSuccess(res?.data?.message);
          setSuccessNotification(true);
          // Wait a moment to show the success notification before proceeding
        setTimeout(() => {
          handleShowLogin();
      }, 3000); 
          setLoading(false);
      } catch (error: any) {
          console.log(error?.response);
          setError(error?.response?.data?.error?.password[0] || error?.response?.data?.message  || 'An error occurred, please try again');
          setNotificationOpen(true);
          setLoading(false);
      }
       
    };

  return (
    <div>
         {/* Password form */}
         <div className='w-full h-full items-center'>
            <p className="text-[20px] font-bold mt-4">Create a password</p>
            <p className="text-[15px] text-[#282828] mt-2">Create your login password.</p>

            <form className="lg:w-11/12 md:w-11/12 w-full h-auto mt-10" onSubmit={handleSubmit}>
              {/* Password input */}
              <div className="relative mb-6">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between password and text
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full lg:w-11/12 pl-12 pr-12 py-2 border placeholder-[#5A5A5A] border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Image src="/images/lock-circle.png" alt="Lock Icon" width={16} height={16} className="text-gray-400" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-6 lg:right-12 flex items-center text-[#5A5A5A] text-[16px] font-bold"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password input */}
              <div className="relative mb-6">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle between password and text
                  placeholder="Confirm your password"
                  name="password_confirmation"
                  disabled={!password}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  className="w-full lg:w-11/12 pl-12 pr-12 py-2 border placeholder-[#5A5A5A] border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Image src="/images/lock-circle.png" alt="Lock Icon" width={16} height={16} className="text-gray-400" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-6 lg:right-12 flex items-center text-[#5A5A5A] text-[16px] font-bold"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Password match error */}
              { password_confirmation && password_confirmation !== password && (
                <div className="flex items-center text-red-600  text-[13px] font-light">Passwords do not match</div>
              )}

              {/* Next button */}
              <button
                type="submit"
                disabled={!password && !password_confirmation || password !== password_confirmation || loading}
                className="w-full lg:w-11/12 bg-[#F6011BB2]  text-white font-outfit rounded-full h-[55px] py-1 px-4 text-[15px] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
               Finish up
              </button>
            </form>
            {loading && <LoadingPage />}

            <div className="w-full lg:w-10/12 text-center mt-4 ">
              <p className="text-[#5A5A5A] px-4 w-full mx-auto text-[16px] leading-7">
                Ensure you use a secured password you can easily remember.
              </p>
            </div>
          </div>
          {isNotificationOpen && (
            <Notification
              status="error"
              message={error}
              toggleNotification={toggleNotification}
              isOpen={isNotificationOpen}
            />
          )}

           {/* Success Notification */}
           {successNotification && (
                <Notification
                    status="success"
                    title="Success!"
                    message={success || "password set successfully"}
                    subMessage='Login to your account to access your loan dashboard'
                    toggleNotification={toggleSuccessNotification}
                    isOpen={successNotification}
                />
            )}
    </div>
  );
}

export default Password;
