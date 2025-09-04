import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import apiClient from '@/utils/apiClient';

type AccountNotificationProps = {
  toggleAccountNotification: () => void;
  isOpen: boolean;
};

const AccountNotification: React.FC<AccountNotificationProps> = ({ toggleAccountNotification, isOpen }) => {
  const [fetchedUserData, setFetchedUserData] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
  const [showResend, setShowResend] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/profile`);
        setFetchedUserData(response?.data?.data);

        // Set timer start time in localStorage if not already set
        if (!localStorage.getItem('timerStartTime')) {
          localStorage.setItem('timerStartTime', Date.now().toString());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Initialize and calculate remaining time
  useEffect(() => {
    const storedStartTime = localStorage.getItem('timerStartTime');
    if (storedStartTime) {
      const startTime = parseInt(storedStartTime, 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(3600 - elapsedTime, 0);

      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        localStorage.removeItem('timerStartTime'); // Clear timer when finished
        setShowResend(true);
      }
    }
  }, [isOpen]);

  // Countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const updatedTime = prevTime - 1;
          if (updatedTime <= 0) {
            clearInterval(timerId);
            localStorage.removeItem('timerStartTime');
            setShowResend(true);
          }
          return updatedTime;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  // Format time as hh:mm:ss
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      onClick={toggleAccountNotification}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gradient11 w-[414px] h-[483px] mx-2 lg:mx-0 md:mx-0 font-outfit rounded-[22px] p-6 shadow-md transition-transform duration-300 transform ${
          isOpen ? 'scale-100' : 'scale-75'
        }`}
      >
        <div className="flex flex-col justify-center items-center mt-10">
          <Image src="/images/mandateThankyou.png" alt="card" width={70} height={70} />

          <p className="text-[#1C1C1E] text-[18px] font-medium text-center w-9/12 mt-6">
            Thank you {fetchedUserData?.first_name} {fetchedUserData?.last_name}
          </p>
          
          <p className="text-[#282828] text-[16px] font-normal text-center w-11/12 mt-18">
          We are currently confirming your payment
          </p>
          <Image src="/images/timmer.png" alt="card" width={24} height={24} className="mt-6" />
          <p className="text-center text-[16px] font-semibold text-[#282828] mt-4 lg:w-10/12">
            {timeLeft > 0 ? formatTime(timeLeft) : 'Time expired'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-[#1C1C1E] text-[#FFFFFF] h-[47px] w-full rounded-[45px] px-4 py-2 mt-16 font-semibold"
        >
          Go back to homepage
        </button>
      </div>
    </div>
  );
};

export default AccountNotification;
