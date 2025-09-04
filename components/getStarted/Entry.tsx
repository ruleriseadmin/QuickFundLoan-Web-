import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Password from "./Password";  
import SignUp from "./SignUp";
import Login from "./Login";
import Otp from "./Otp";
import ResetPassword from "./ResetPassword";

type EntryProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const Entry: React.FC<EntryProps> = ({ isOpen, closeModal }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [phone_number, setPhone_number] = useState("");
  const [title, setTitle] = useState(""); 
  const [subtitle, setSubtitle] = useState("");

  // Function to show login screen
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowOtp(false);
    setShowSetPassword(false);
    setShowResetPassword(false);
  };

  // Function to show signup screen
  const handleShowSignUp = () => {
    setShowLogin(false);
    setShowSignup(true);
    setShowOtp(false);
    setShowSetPassword(false);
    setShowResetPassword(false);
  };

  // Function to show OTP screen with dynamic title and subtitle
  const handleShowOtp = (phone_number: string, title: string, subtitle: string) => {
    setPhone_number(phone_number);
    setTitle(title);
    setSubtitle(subtitle);
    setShowLogin(false);
    setShowSignup(false);
    setShowOtp(true);
    setShowSetPassword(false);
    setShowResetPassword(false);
  };

  // Function to show set password screen
  const handleShowPassword = (phone_number: string) => {
    setPhone_number(phone_number);
    setShowLogin(false);
    setShowSignup(false);
    setShowOtp(false);
    setShowSetPassword(true);
    setShowResetPassword(false);
  };

  // Function to show reset password screen
  const handleShowResetPassword = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowOtp(false);
    setShowSetPassword(false);
    setShowResetPassword(true);
  };

  if (!isOpen) return null; // Do not render if not open

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black font-outfit bg-opacity-50">
      <div className="bg-white rounded-xl lg:w-8/12 w-11/12 min-h-[498px] h-auto p-6 relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold">
          <IoClose className="text-navfont rounded-full bg-[#E2E2E2] text-3xl mt-2 mr-2 p-1 font-bold" />
        </button>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 lg:mx-4 w-full h-full">
          {showLogin && (
            <Login
              handleShowSignUp={handleShowSignUp}
              handleShowResetPassword={handleShowResetPassword}
            />
          )}
          {showSignup && (
            <SignUp
            handleShowLogin={handleShowLogin}
            handleShowOtp={(phone: string) => handleShowOtp(phone, 'Create an account', 'Get started with your phone number')}
          />
          )}
          {showOtp && (
            <Otp
            handleShowPassword={() => handleShowPassword(phone_number)}
            phone_number={phone_number}
            title={title}
            subtitle={subtitle}
          />
          )}
          {showSetPassword && (
            <Password
              handleShowLogin={handleShowLogin}
              phone_number={phone_number}
            />
          )}
          {showResetPassword && (
            <ResetPassword
            handleShowOtp={(phone: string) => handleShowOtp(phone, 'Reset Password', '')}
            handleLogin={handleShowLogin}
          />
          )}

          {/* Divider between columns */}
          <div className="absolute inset-y-0 left-1/2 w-[2px] h-5/6 my-auto hidden lg:block md:block bg-[#C8C8C8]" />

          {/* Right Side */}
          <div className="w-full h-full lg:mt-12 md:mt-12 lg:ml-8 md:ml-6 md:w-11/12">
            <p className="font-bold text-[28px] lg:text-[28px] lg:text-start md:text-start text-center text-[#F24C5D] md:text-[24px]">GET THE APP TODAY!</p>
            <p className="text-navfont mt-2 text-[18px] md:text-[15px] lg:text-[18px]  mb-6 hidden lg:block md:block">Financial solutions for you and your business</p>
            <p className="text-navfont mt-2 text-[18px] text-center mb-6 block lg:hidden md:hidden">Apply for instant, stress-free loans.</p>
            <button
              type="button"
             onClick={() => window.open('https://play.google.com/store/apps/details?id=com.quickfund.quickfund', '_blank')}
              className="w-full lg:w-10/12 bg-[#2B2323] hover:bg-[#F24C5D] flex justify-between align-middle items-center text-white font-outfit rounded-full h-[58px] py-1 px-4 text-[15px] mt-4"
            >
              <p className="ml-4">Download for android</p>
              <Image
                src='/images/playstore.png'
                alt="Android Icon"
                width={27}
                height={27}
                className="flex-shrink-0 mr-4"
              />
            </button>
            <button
              type="button"
              onClick={() => window.open('https://apps.apple.com/ng/app/quickfund/id6740584720', '_blank')}
              className="w-full lg:w-10/12 bg-[#2B2323] flex justify-between hover:bg-[#F24C5D] align-middle items-center text-white font-outfit rounded-full h-[58px] py-1 px-4 text-[15px] mt-4"
            >
              <p className="ml-4">Download for apple</p>
              <Image
                src='/images/apple.png'
                alt="Apple Icon"
                width={27}
                height={27}
                className="flex-shrink-0 mr-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
