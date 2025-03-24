'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SlideSideModal from './SlideSideBar';
import LoadingPage from '@/app/loading';
import { clearToken } from '../../utils/protect';
import Notification from '../Notification';
import apiClient from '@/utils/apiClient';

interface DashboardHeaderProps {
  path: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ path = '' }) => {
  const [openSideModal, setOpenSideModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const toggleSideBar = () => {
    if (openSideModal) {
      setIsExiting(true); // Start exit animation
      setTimeout(() => {
        setOpenSideModal(false); // After the animation, close the modal
        setIsExiting(false); // Reset exit animation
      }, 300);
    } else {
      setOpenSideModal(true); // Open modal immediately
    }
  };

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleLogout = async () => {
    try {
      const device_id = localStorage.getItem("device_id");
      setLoading(true);

      await apiClient.post(`/auth/logout`,
        { device_id },
      );
      clearToken('');
      router.push('/');
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'An error occurred, please try again'
      );
      setNotificationOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="font-outfit flex mt-8 mx-auto w-11/12 justify-between">
      {!path ? (
        <p className="text-[15px] text-[#5A5A5A] pt-6">
          Welcome to <br />
          <span className="text-[#030602] text-[20px] font-bold">QuickFund</span>
        </p>
      ) : (
        <p className="text-[24px] font-bold text-[#030602] pt-8">{path}</p>
      )}
      
      <div className="md:hidden lg:hidden text-[#282828]">
        <button onClick={toggleSideBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h10" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12h18" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18h13" />
          </svg>
        </button>
      </div>

      {loading && <LoadingPage />}

      <button
        onClick={handleLogout}
        className="text-[#F24C5D] text-[15px] font-bold hover:text-[#F97870] hidden lg:block md:block"
      >
        Logout
      </button>

      {openSideModal && (
        <SlideSideModal isOpen={!isExiting} toggleSideBar={toggleSideBar} />
      )}

      {notificationOpen && (
        <Notification
          status="error"
          
          message={error}
          toggleNotification={toggleNotification}
          isOpen={notificationOpen}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
