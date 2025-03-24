'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/apiClient';
import Notification from '../Notification';
import axios from 'axios';
import LoadingPage from '@/app/loading';

const VerifyIdentity: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [bvn, setBvn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const router = useRouter();

  // Toggle error notification
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);


  // Handle form submission for BVN
  const handleSubmitBVN = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post(`/account/nin-bvn`, { bvn });
      router.push('/dashboard?faceScan=true');
      closeModal();
    } catch (error: any) {
      setError(error?.response?.data?.message || 'An error occurred, please try again.');
      router.push(
        `/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred.')}`
      );
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto font-outfit font-normal h-full overflow-y-hidden">
        <form onSubmit={handleSubmitBVN}>
          <p className="text-[#904A3F] text-[18px] px-2 py-4 font-semibold">
            Your BVN is safe and secured. We use your BVN to verify your identity.
          </p>
          <input
            type="text"
            value={bvn}
            onChange={(e) => setBvn(e.target.value)}
            className="bg-[#F5F5F5] border-2 border-[#BEBEBE] w-full h-[58px] rounded-[8px] px-4 py-2"
            placeholder="Enter your BVN"
            required
          />
          <div className='flex justify-center flex-col mt-44'>
          <p className='text-[15px] text-navfont font-semibold text-center mb-1'>
            You don't know your BVN?
          </p>
          <p className='text-[13px] text-navfont font-normal text-center'>
            Dial *565*0# on the phone number <br/> registered with your BVN
          </p>
        </div>

        

        {loading && <LoadingPage />}
          <button 
          type="submit" 
          //onClick={handleShowVerifyBVN}
          className="bg-[#1C1C1E] text-white w-full rounded-[8px] py-2 mt-10">
            Finish Up
          </button>
        </form>

      

      {isNotificationOpen && (
        <Notification
          status="error"
          
          message={error}
          toggleNotification={toggleNotification}
          isOpen={isNotificationOpen}
        />
      )}

    </div>
  );
};

export default VerifyIdentity;
