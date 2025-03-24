'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SideBar from '@/components/mainDashboard/SideBar';
import DashboardHeader from '@/components/mainDashboard/DashboardHeader';
import DashboardHero from '@/components/mainDashboard/DashboardHero';
import Transactions from '@/components/mainDashboard/Transactions';
import Notification from '@/components/Notification';
import { useRouter } from 'next/navigation';
import FaceScan from '@/components/slideDashboard/FaceScan';
import OptionalAccount from '@/components/slideDashboard/OptionalAccount';
import MainOffer from '@/components/offers/MainOffer';
import {withAuth} from '@/components/auth/EnsureLogin';
import { useEffect, useState } from "react";
import {  clearToken } from '../../utils/protect';
import useFcmToken from '@/components/FcmFunctions';
import PushNotification from '@/components/PushNotification';
import MonoAccount from '@/components/slideDashboard/MonoAccount';
import AccountNotification from '@/components/mainDashboard/AccountNotification';
import MainRepayment from '@/components/repayment/MainRepayment';
import apiClient from '@/utils/apiClient';

type Loan = {
  [key: string]: any;
};
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isFaceScanOpen, setIsFaceScanOpen] = useState(false);
  const [openRepayment,setOpenRepayment] = useState(false)
  const [optionalAccountOpen, setOptionalAccountOpen] = useState(false);
  const [isMainOfferOpen, setIsMainOfferOpen] = useState(false);
  const [openPushNotification, setOpenPushNotification] = useState(false);
  const [activeLoan, setActiveLoan] = useState<Loan[]>([]); 
  const [loading, setLoading] = useState(false);
  const [openMono, setOpenMono] = useState(false);
  const [error, setError] = useState('');
  const [openAccountNotification, setOpenAccountNotification] = useState(false);

 
   

  
  // Query parameter values
  const status = searchParams.get('status') || '';
  const title = searchParams.get('title') || '';
  const message = searchParams.get('message') || '';
  const subMessage = searchParams.get('subMessage') || '';
  const body = searchParams.get('body') || '';
  const faceScan = searchParams.get('faceScan');
  const repayment = searchParams.get('repayment')
  const optionalAccount = searchParams.get('optionalAccount');
  const offer = searchParams.get('offer');
  const mono = searchParams.get('mono');

  const [notificationData, setNotificationData] = useState({
    status: '',
    title: '',
    message: '',
    subMessage: '',
  });

  const [pushNotificationData, setPushNotificationData] = useState({
    title: '',
    body: '',
    status: '',
  });
 

  useEffect(() => {
    if(!title && !status && message){
      setNotificationData({status, title, message, subMessage })
      setOpenAccountNotification(true)
    }
    else if (message || subMessage) {
      setNotificationData({ status, title, message, subMessage });
      setNotificationOpen(true);
    } else if (title && body) {
      setPushNotificationData({ title, body, status });
      setOpenPushNotification(true);
    }
  }, [status, title, message, subMessage, body]);

  useEffect(() => {
    if (faceScan) {
      setIsFaceScanOpen(true);
    }
  }, [faceScan]);

  useEffect(() => {
    if (repayment) {
      setOpenRepayment(true)
    }
  }, [repayment]);

  useEffect(() => {
    if (mono) {
      setOpenMono(true);
    }
  }, [mono]);

  useEffect(() => {
    if (offer) {
      setIsMainOfferOpen(true);
    }
  }, [offer]);

  useEffect(() => {
    if (optionalAccount) {
      setOptionalAccountOpen(true);
    }
  }, [optionalAccount]);

  // toggle push notification
const togglePushNotification = () => {
  setOpenPushNotification(!openPushNotification);
};

// toggle account notification
const toggleAccountNotification = () => {
  setOpenAccountNotification(!openAccountNotification);
}

  // Centralized cleanup
  useEffect(() => {
    if (status || title || message || faceScan || offer || mono || repayment || optionalAccount || subMessage || body) {
      router.replace(window.location.pathname);
    }
  }, [status, title, message, faceScan, offer, optionalAccount, mono, repayment]);

  // Close modals
  const closeNotification = () => setNotificationOpen(false);
  const closeFaceScan = () => setIsFaceScanOpen(false);
  const closeMainOffer = () => setIsMainOfferOpen(false);
  const closeOptionalAccount = () => setOptionalAccountOpen(false);
  const closeMono = () => setOpenMono(false);
  const closeRepayment = () => setOpenRepayment(false)
  

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

//get active loans
useEffect(() => {
  const fetchUsersActiveLoan = async () => {
    try { 
      const response = await apiClient.get('/loan/active')
    setActiveLoan(response?.data?.data);
      
    } catch (error: any) {
      
     setError(error?.response?.data?.message ||  'An error occurred, please try again');
      setNotificationOpen(true);
    } 
  };
  fetchUsersActiveLoan();
  }, []);

  const { payload } = useFcmToken();

 // Handle notification payload
useEffect(() => {
  if (payload) {
    
   if (payload.notification.title === 'Transfer Successful!') {
      router.push(
        `/dashboard?status=success&title=${payload.notification.title}&subMessage=${payload.notification.body}`
      )
    
    }else if(payload.notification.title === 'Account Creation Successful'){
      router.push(
        `/dashboard?status=success&title=${payload.notification.title}&subMessage=${payload.notification.body}`
      )
      
    }
    else if(payload.notification.title === 'Account Authorized Successful!'){
      router.push(
        `/dashboard?status=success&title=${payload.notification.title}&subMessage=${payload.notification.body}`
      )
     
    }
  }
}, [payload]);


  return (
    <div className="mb-6">
      <main className="w-full overflow-hidden scrollbar-hide">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="hidden lg:block md:block col-span-3 w-full h-screen my-2">
            <SideBar />
          </div>
          <div className="lg:col-span-9 md:col-span-9 col-span-12 w-full h-full my-2">
            <DashboardHeader path=""  />
            <DashboardHero loanHistory={activeLoan} />
            <Transactions  />
          </div>
        </div>
      </main>

      <div className="flex justify-center items-center lg:hidden md:hidden my-10"> {/* Adjust height as needed */}
        <button
          onClick={handleLogout}
          className='text-[#F24C5D] text-[15px] font-bold hover:text-[#F97870]'>
          Logout
        </button>
      </div>

      {isNotificationOpen && (
        <Notification
          toggleNotification={closeNotification}
          isOpen={isNotificationOpen}
          status={notificationData.status || 'error'}
          title={notificationData.title || ''}
          message={notificationData.message || error}
          subMessage={notificationData.subMessage}
        />
      )}

      {isFaceScanOpen && (
        <FaceScan
          isOpen={isFaceScanOpen}
          toggleFaceScan={closeFaceScan}
        />
      )}

      {isMainOfferOpen && (
        <MainOffer
          isOpen={isMainOfferOpen}
          toggleMainOffer={closeMainOffer}
        />
      )}

      {openMono && (
        <MonoAccount
          isOpen={openMono}
          toggleMonoAccount={closeMono}
        />
      )}

{optionalAccountOpen && 
<OptionalAccount 
  isOpen={optionalAccountOpen} 
  toggleOptionalAccount={closeOptionalAccount} 
/>}
{openPushNotification && (
      <PushNotification
        isOpen={openPushNotification}
        toggleNotification={togglePushNotification}
        title={pushNotificationData.title}
        body={pushNotificationData.body}
        status={pushNotificationData.status}
      />
    )}

     {/* Account Notification Modal */}
     {openAccountNotification && (
        <AccountNotification
          isOpen={openAccountNotification}
          toggleAccountNotification={toggleAccountNotification}
          
        />
      )}

{openRepayment && <MainRepayment isOpen={openRepayment} toggleRepayment={closeRepayment} />}
    </div>
  );
};

export default withAuth(Page); 
