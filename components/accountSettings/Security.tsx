import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import { useRouter } from 'next/router';
import Notification from '../Notification';


const Security = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState('');
  const [error, setError] = useState("");
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);


  //toggle notification
  const toggleNotification = () => {
      setNotificationOpen(!isNotificationOpen);
  }

  //toggle notification
  const toggleSuccessNotification = () => {
      setSuccessNotification(!successNotification);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post(`/auth/change-password`, 
        { 
          old_password: formData.currentPassword,
          new_password: formData.password
        });
     setSuccess(response?.data?.message || 'Password changed successfully');
     setSuccessNotification(true);
    
      setLoading(false);
    } catch (error: any) {
      console.log(error.response);
      setError(error?.response?.data?.message || 'An error occurred, please try again');
     setNotificationOpen(true);
      setLoading(false);
    }
    
  };

  return (
    <div className="w-full h-auto font-outfit mt-10">
      <div className="bg-[#F1F1F1] w-11/12 lg:w-8/12 md:w-11/12 lg:ml-10 mx-auto h-auto p-4 rounded-[5px]">
      {loading && <LoadingPage />}
      <form onSubmit={handleSaveChanges}>
        <div className="text-[#5A5A5A] flex justify-between align-middle items-center mb-10">
          <p className='text-[18px]'>Change password</p>
          <button
            className="flex justify-center disabled:opacity-50 items-center font-outfit rounded-full w-[140px] mt-2 bg-[#282828] text-[#ffff] h-[41px] py-1 px-4  transition-colors duration-300"
           type='submit'
            disabled={!formData.password && !formData.confirmPassword && !formData.currentPassword || loading || formData.password !== formData.confirmPassword}
          >
            Save changes
          </button>
          
        </div>

        
          {/* Current Password */}
          <div className="relative mb-6">
            <label htmlFor="currentPassword" className="text-[#5A5A5A] text-[15px] font-semibold ml-4">
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              onChange={handleInputChange}
              className="bg-background  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
            <button
              type="button"
              className="absolute  top-14 right-4 flex items-center text-[#5A5A5A] text-[16px]"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <label htmlFor="password" className="text-[#5A5A5A] text-[15px] font-semibold ml-4">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              onChange={handleInputChange}
              className="bg-background  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
            <button
              type="button"
              className="absolute top-14 right-4 flex items-center text-[#5A5A5A] text-[16px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="text-[#5A5A5A] text-[15px] font-semibold ml-4">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              className="bg-background  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
            <button
              type="button"
              className="absolute  top-14 right-4 flex items-center text-[#5A5A5A] text-[16px]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </form>
       {isNotificationOpen && (
         <Notification
         isOpen={isNotificationOpen}
         toggleNotification={toggleNotification}
         status='error'
        
         message={error || 'An error occurred, please try again'}
       />
       )}
       {successNotification && (
         <Notification
         isOpen={successNotification}
         toggleNotification={toggleSuccessNotification}
         status='success'
         title='Success!'
         message={success || 'Password changed successfully'}
        />
       )}
      </div>
    </div>
  );
};

export default Security;
