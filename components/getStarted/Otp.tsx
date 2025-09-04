import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingPage from '@/app/loading';
import Notification from '../Notification';

type otpType = {
    handleShowPassword: () => void;
    phone_number: string;
    title: string;
    subtitle: string;
};

const Otp: React.FC<otpType> = ({ handleShowPassword, phone_number, title, subtitle }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [success, setSuccess] = useState('');
    const [successNotification, setSuccessNotification] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
    const [showResend, setShowResend] = useState(false);
   

    // Toggle error notification
    const toggleNotification = () => {
        setNotificationOpen(!isNotificationOpen);
    };

    // Toggle success notification
    const toggleSuccessNotification = () => {
        setSuccessNotification(!successNotification);
    };

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

    // Handle submit of OTP
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/verify-otp`, {
                phone_number,
                otp
            }, {
                headers: {
                    'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`
                }
            });
            handleShowPassword();
            setLoading(false);
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            setError(error?.response?.data?.error?.otp[0] || error?.response?.data?.message || 'An error occurred, please try again');
            setNotificationOpen(true);
            setLoading(false);
        }
    };

    // Resend OTP
    const resendOtp = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/send-otp`, {
                phone_number
            }, {
                headers: {
                    'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`
                }
            });
            
            setSuccess(res?.data?.message);
            setSuccessNotification(true);
            setTimeLeft(30); // Reset countdown timer
            setShowResend(false); // Hide resend button
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
            {/* Otp */}
            <div className='w-full h-full items-center'>
                <p className="text-[20px] font-bold mt-4">{title}</p>
                <p className="text-[15px] text-[#282828] mt-2">{subtitle}</p>

                <form className="lg:w-11/12 md:w-11/12 w-full h-auto mt-10" onSubmit={handleSubmit}>
                    {/* OTP input */}
                    <div className="relative mb-6">
                        <input
                            type='number'
                            placeholder="Enter OTP"
                            name="otp"
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full lg:w-11/12 pl-6 pr-12 py-2 border placeholder-[#5A5A5A] border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                        />
                    </div>

                    {/* Next button */}
                    <button
                        type="submit"
                        disabled={!otp}
                        className="disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-11/12 bg-[#F24C5D]  text-white font-outfit rounded-full h-[55px] py-1 px-4 text-[15px] mt-4"
                    >
                        Next
                    </button>
                </form>
                {loading && <LoadingPage />}

                <div className="w-full lg:w-10/12 text-center mt-4 mb-8">
                    <p className="text-[#5A5A5A] px-4 w-full mx-auto text-[16px] leading-7">
                        A 6 digit code has been sent to your phone number. Check your SMS.
                    </p>
                </div>

                {/* Show countdown or resend button */}
                {showResend ? (
                    <button
                        onClick={resendOtp}
                        className="text-center w-full lg:w-10/12 mt-8 font-normal text-[#F24C5D] hover:cursor-pointer hover:text-red-900"
                    >
                        Resend code
                    </button>
                ) : (
                    <p className="text-center text-[15px] text-[#F24C5D] mt-4 lg:w-10/12">
                        Resend in {formatTime(timeLeft)}
                    </p>
                )}
            </div>

            {/* Error Notification */}
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
                    message={success || "We have sent you a new OTP."}
                    toggleNotification={toggleSuccessNotification}
                    isOpen={successNotification}
                />
            )}
        </div>
    );
};

export default Otp;
