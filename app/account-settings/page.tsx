'use client';
import React, { useState, useEffect } from 'react';
import SideBar from '@/components/mainDashboard/SideBar';
import DashboardHeader from '@/components/mainDashboard/DashboardHeader';
import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import Profile from '@/components/accountSettings/Profile';
import VirtualAccount from '@/components/accountSettings/VirtualAccount';
import Security from '@/components/accountSettings/Security';
import ChangeAccount from '@/components/accountSettings/ChangeAccount';
import { withAuth } from '@/components/auth/EnsureLogin';
import Notification from '@/components/Notification';
import apiClient from '@/utils/apiClient';
import { FaSackDollar } from "react-icons/fa6";



type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  dob:string;
  phone: string;
  incomeLevel: string;
  source:string;
  marital: string;
  education: string;
  dependents: number;
  employment: string;
  employer?: string;
  fullName: string;
  kinNo: string;
  
}

const AccountSettings = () => {
  const [selectedMethod, setSelectedMethod] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState<any>({});
  const [user, setUser] = useState<UserData | null>(null);
  

  // Toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/profile`);
        setFetchedUserData(response?.data?.data);
      } catch (error: any) {
        console.error(error);
        setError(error?.response?.data?.error || error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  

  // Update user data
  useEffect(() => {
    if (fetchedUserData) {
      setUser({
        firstName: fetchedUserData?.first_name || '',
        lastName: fetchedUserData?.last_name || '',
        email: fetchedUserData?.email || '',
        phone: fetchedUserData?.phone_number || '',
        dob: fetchedUserData?.dob || '',
        source: fetchedUserData?.source || '',
        marital: fetchedUserData?.personal_data?.marital_status || '',
        incomeLevel: fetchedUserData?.personal_data?.income_level || '',
        education: fetchedUserData?.personal_data?.educational_level || '',
        dependents: fetchedUserData?.personal_data?.dependents || 0,
        employment: fetchedUserData?.employment_status || '',
        employer: fetchedUserData?.personal_data?.employer || '',
        fullName: fetchedUserData?.next_of_kin?.name || '',
        kinNo: fetchedUserData?.next_of_kin?.phone_number || ''
        
      });
    }
  }, [fetchedUserData]);


  const handleMethodChange = (method: string) => setSelectedMethod(method);

  return (
    <div className="mb-6">
      <main className="w-full min-h-screen h-auto overflow-hidden scrollbar-hide">
        <div className="grid grid-cols-12 w-full  h-full">
          <div className="hidden lg:block md:block col-span-3 w-full h-screen my-2">
            <SideBar />
          </div>
          <div className="lg:col-span-9  md:col-span-9 col-span-12 w-full h-full my-2">
            <DashboardHeader path="Account settings" />
            <div className=" ml-4 grid lg:grid-cols-6 mt-10 lg:w-10/12 md:w-full w-full md:grid-cols-5 grid-cols-3">
  {/* Profile Button */}
  <button
    className={`  md:ml-2 ml-2 lg:ml-4 flex items-center justify-start lg:justify-center  font-outfit rounded-full w-[118px] h-[39px] py-1 transition-colors duration-300 ${
      selectedMethod === 'profile' ? 'bg-[#282828] text-[#FFFFFF]' : 'bg-transparent text-[#5A5A5A]'
    }`}
    onClick={() => handleMethodChange('profile')}
  >
    <FaUser className="inline-block text-base lg:text-xl md:text-xl mr-1 " />
    <p className="text-[15px] md:text-[18px] lg:text-[20px]">Profile</p>
  </button>


  {/* Virtual Account Button */}
  <button
    className={`flex items-center justify-center font-outfit rounded-full lg:col-span-2  md:col-span-2 lg:ml-10 md:ml-10   lg:w-9/12 md:w-10/12 w-full  h-[39px] py-1  transition-colors duration-300 ${
      selectedMethod === 'account' ? 'bg-[#282828] text-[#FFFFFF]' : 'bg-transparent text-[#5A5A5A]'
    }`}
    onClick={() => handleMethodChange('account')}
  >
    <Image
      src={`/images/${selectedMethod === 'account' ? 'whitebank.png' : 'bank.png'}`}
      width={20}
      height={20}
      alt="account"
    />
    <p className="text-[15px] md:text-[18px] lg:text-[20px] lg:ml-2 ml-1 mt-1">Virtual account</p>
  </button>

  {/* Security Button */}
  <button
    className={`flex items-center justify-center font-outfit  rounded-full lg:w-[138px] md:w-[110px] w-8/12 md:mr-4 h-[39px] py-1  transition-colors duration-300 ${
      selectedMethod === 'security' ? 'bg-[#282828] text-[#FFFFFF]' : 'bg-transparent text-[#5A5A5A]'
    }`}
    onClick={() => handleMethodChange('security')}
  >
    <MdSecurity className="inline-block text-base lg:text-xl md:text-xl mr-1" />
    <p className="text-[15px] md:text-[18px] lg:text-[20px]">Security</p>
  </button>

  {/* Change bank */}
  <button
    className={`flex items-center justify-start lg:justify-center md:justify-start font-outfit rounded-full lg:col-span-2  md:col-span-3 col-span-4 lg:ml-10   lg:w-11/12 md:w-8/12 w-6/12  h-[39px] py-1  transition-colors duration-300 ${
      selectedMethod === 'bank' ? 'bg-[#282828] text-[#FFFFFF]' : 'bg-transparent text-[#5A5A5A]'
    }`}
    onClick={() => handleMethodChange('bank')}
  >
    <FaSackDollar className="inline-block text-[30px]  mr-1 lg:ml-0  pl-2" />
    <p className="text-[15px] md:text-[18px] lg:text-[20px] lg:ml-2 ml-1 md:ml-0 ">Change bank account</p>
  </button>
</div>


            {selectedMethod === 'profile' && 
              <Profile data={user}  />
            }
            {selectedMethod === 'account' && <VirtualAccount />}
            {selectedMethod === 'security' && <Security />}
            {selectedMethod === 'bank' && <ChangeAccount />}

          </div>
        </div>
      </main>
      {notificationOpen && (
        <Notification
          isOpen={notificationOpen}
          toggleNotification={toggleNotification}
          status='error'
          message={error}
        />
      )}
    </div>
  );
};

export default withAuth(AccountSettings);
