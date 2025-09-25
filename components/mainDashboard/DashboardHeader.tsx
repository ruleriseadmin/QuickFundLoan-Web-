'use client'
import React, { useState,useEffect,useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SlideSideModal from './SlideSideBar';
import LoadingPage from '@/app/loading';
import { clearToken } from '../../utils/protect';
import Notification from '../Notification';
import apiClient from '@/utils/apiClient';
import Image from 'next/image';
import MessageModal from './MessageModal';

interface DashboardHeaderProps {
  path: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ path = '' }) => {
  const [openSideModal, setOpenSideModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState('');
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const router = useRouter();
  const [refetch, setRefetch] = useState(false);

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


  // Function to toggle the message modal
  const toggleMessageModal = () => {
    setOpenMessageModal(!openMessageModal);
  };

 

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get(`/notification?page=1&per_page=10&sort_by=created_at`, );
      setMessages(response?.data?.data?.notifications || []); 
      setRefetch(false); // Reset refetch state after fetching
    } catch (error: any) {
      console.error(error);
      setError(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'An error occurred while fetching notifications'
      );
      setNotificationOpen(true);
    }
  };

  fetchNotifications();
}, [refetch]);

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

 const noMessages = useMemo(() => {
  return messages?.filter((message: any) => message.read_at === null).length === 0;
}, [messages]);



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
      
      <div 
      onClick={toggleMessageModal}
      className="md:hidden lg:hidden cursor-pointer flex justify-between items-center gap-2 text-[#282828]">
        <Image
        src={`/images/${ noMessages ? 'nomessage' : 'bellicon'}.png`}
        alt='notification'
        width={40}
        height={40}
        
      />
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
      <div 
      

      className='items-center cursor-pointer gap-4 justify-between hidden lg:flex md:flex'>
      <Image
        src={`/images/${noMessages ? 'nomessage' : 'bellicon'}.png`}
        alt='notification'
        width={45}
        height={45}
        onClick={
        toggleMessageModal}
        
      />
        <button
        onClick={handleLogout}
        className="text-[#F24C5D] text-[15px] font-bold hover:text-[#F97870]  z-50"
      >
        Logout
      </button>


      </div>

      
      {openSideModal && (
        <SlideSideModal isOpen={!isExiting} toggleSideBar={toggleSideBar} />
      )}

      {openMessageModal && (
        <MessageModal
          isOpen={openMessageModal}
          toggleMessageModal={toggleMessageModal}
          messages={messages}
          setRefetch={setRefetch}
        />
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
