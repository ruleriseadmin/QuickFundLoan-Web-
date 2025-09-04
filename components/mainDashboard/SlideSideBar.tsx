'use client'
import { MdLogout } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import {  clearToken } from '../../utils/protect';
import Notification from '../Notification';
import LoadingPage from '@/app/loading';
import apiClient from "@/utils/apiClient";



type SideModalProps = {
  isOpen: boolean;
  toggleSideBar: () => void;
};



const SlideSideModal: React.FC<SideModalProps> = ({ isOpen, toggleSideBar }) => {
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };



  useEffect(() => {
  }, [isOpen]);
  const isActive = (pathname: string) => {
    return pathname === path ? 'bg-[#F7F7F71F] border border-[#F7F7F71F] md:w-11/12 rounded-[18px] h-[53px]' : '';
  };
  
  // Decrypt and get token from local storage
  const handleLogout = async () => {
    try {
      const device_id = localStorage.getItem("device_id");
      setLoading(true);

      await apiClient.post(
        `/auth/logout`,
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
    <div
  onClick={toggleSideBar}
  className={`overlay ${isOpen ? 'opacity-100 bg-black' : 'opacity-0 pointer-events-none bg-transparent'}`}
>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`sidebar-content ${isOpen  ? 'sidebar-enter' : ' sidebar-exit'}`}
      >
        <div>
          <div className='h-6'></div>
          <div className="flex justify-between font-outfit">
            <Image
              src='/images/profile.png'
              width={64}
              height={64}
              alt='profile'
              className='mb-4'
            />
           
          </div>
          

          <Link href='/dashboard' className={`flex justify-start mt-10 w-10/12 items-center align-middle p-2 ${isActive('/dashboard')}`}>
            <Image 
              src='/images/status.png'
              width={24}
              height={24}
              alt='status icon'
            />
            <p className='ml-2 text-[18px] font-bold text-[#CDCDCD]'>Dashboard</p> 
          </Link>

          <Link href='/loan-history' className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/loan-history')}`}>
            <Image 
              src='/images/empty-wallet.png'
              width={24}
              height={24}
              alt='loan history icon'
            />
            <p className='ml-2 text-[18px] font-bold text-[#CDCDCD]'>Loan history</p> 
          </Link>

          <Link
       href='/payment-methods'
          className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/payment-methods')}`}>
            <Image 
              src='/images/cards.png'
              width={23}
              height={24}
              alt='payment methods icon'
            />
            <p className='ml-2 text-[18px] font-bold text-[#CDCDCD]'>Payment methods</p> 
          </Link>

          <Link
       href='/account-settings'
          className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/account-settings')}`}>
            <Image 
              src='/images/bubble.png'
              width={24}
              height={24}
              alt='account settings icon'
            />
            <p className='ml-2 text-[18px] font-bold text-[#CDCDCD]'>Account settings</p> 
          </Link>

          <Link href='/faq' className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle lg:ml-4 md:ml-2 p-2 ${isActive('/help')}`}>
            <Image 
              src='/images/message-question.png'
              width={24}
              height={24}
              alt='help icon'
            />
            <p className='ml-2 text-[18px] font-bold text-[#CDCDCD]'>Help</p> 
          </Link>

          <button
            onClick={handleLogout}
            className={`rounded-full w-[116px] mt-32 h-[36px] text-[18px] flex items-center align-middle justify-center text-[#CDCDCD]`}
          >
            <MdLogout className="text-[#6A6A6A] text-2xl mr-2" /> Log out
          </button>
          {loading && <LoadingPage />}
        </div>
      </div>
       {/* Error notification */}
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

export default SlideSideModal;