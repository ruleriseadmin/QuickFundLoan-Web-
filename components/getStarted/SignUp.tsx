import React, { useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import Notification from '../Notification';
import LoadingPage from '@/app/loading';
import Warning from './Warning';

type signUpType = {
    handleShowLogin: () => void;
    handleShowOtp: (phone: string, title: string, subtitle: string) => void;
};

const SignUp: React.FC<signUpType> = ({ handleShowLogin, handleShowOtp }) => {
    const [phone_number, setPhone_number] = useState("");
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openNoWarning, setOpenNoWarning] = useState(false);
    const [proceedToRegister, setProceedToRegister] = useState(false);

    // Toggle notification
    const toggleNotification = () => {
        setNotificationOpen(!isNotificationOpen);
    };

    //toggle warning
    const toggleNoWarning = () => {
        setOpenNoWarning(!openNoWarning);
    };

    // Proceed to registration
    const proceedToRegisterHandler = () => {
        setProceedToRegister(true);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/register`, {
                phone_number,
               
            }, {
                headers: {
                    'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`
                }
            });
            
            handleShowOtp(phone_number, 'Create an account', 'Get started with your phone number');
            setLoading(false);
        } catch (error: any) {
            console.error(error?.response);
            setError(error?.response?.data?.message || 'An error occurred, please try again');
            setNotificationOpen(true);
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full items-center">
            <p className="text-[20px] font-bold mt-4">Create an account</p>
            <div className='flex justify-start lg:gap-16 gap-12 md:gap-4 items-center'>
            <p className="text-[15px] text-[#282828] mt-2">Get started with your phone number.</p>
           
                <p
                    className="text-[#F24C5D] hover:cursor-pointer hover:text-red-900 ml-1 pt-1"
                    onClick={handleShowLogin}
                >
                    Login
                </p>
            

            </div>
           

            <form className="lg:w-11/12 md:w-11/12 w-full h-auto mt-4 " onSubmit={handleSubmit}>
                {/* Phone number input */}
                <div className="relative mb-4">
                    <input
                        type="number"
                        placeholder="Enter your phone number"
                        name="phone_number"
                        required
                        onClick={!proceedToRegister ? toggleNoWarning : undefined}
                        onChange={(e) => setPhone_number(e.target.value)}
                        className="w-full lg:w-11/12 pl-12 py-2 border border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#BEBEBE] focus:outline-none placeholder-[#5A5A5A]"
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
                    disabled={!phone_number || loading}
                    className="disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-11/12 bg-[#F6011BB2] text-white font-outfit rounded-full h-[55px] py-1 px-4 text-[15px] mt-2"
                >
                    Next
                </button>
            </form>

            {loading && <LoadingPage />}

            <div className="w-full lg:w-11/12 text-center mt-4 mx-auto  mr-14 ">
                <p className="text-[#5A5A5A] pr-4 w-full mx-auto lg:text-[16px] text-[14px] md:text-[14px]  leading-7">
                    We will send you an SMS. Please enter the 6-digit code on the next screen to verify your phone number.
                </p>
            </div>

            

            {isNotificationOpen && (
                <Notification
                    status="error"
                    
                    message={error}
                    toggleNotification={toggleNotification}
                    isOpen={isNotificationOpen}
                />
            )}

            {openNoWarning && (
                <Warning
                    toggleWarning={toggleNoWarning}
                    proceedToRegister={proceedToRegisterHandler}
                    isOpen={openNoWarning}
                    message='For best loan eligibility result, please use the phone number linked with your BVN (Bank Verification Number)'
                />
            )}
        </div>
    );
};

export default SignUp;
