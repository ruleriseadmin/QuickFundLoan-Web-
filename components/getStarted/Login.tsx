"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";
import Notification from "../Notification";
import { encryptToken } from "../../utils/protect";
import axios from "axios";
import { fetchToken } from "@/firebase"; // Import fetchToken to retrieve FCM tokens
import { customAlphabet } from "nanoid";
import apiClient from "@/utils/apiClient";

type LoginType = {
  handleShowSignUp: () => void;
  handleShowResetPassword: () => void;
};

// Generate a unique device ID
const generateDeviceId = () => {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
  return nanoid();
};

// Retrieve or generate a unique device ID
const getDeviceId = () => {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem("device_id", deviceId);
    console.log("Generated new device ID:", deviceId);
  } else {
    console.log("Existing device ID:", deviceId);
  }
  return deviceId;
};

const Login: React.FC<LoginType> = ({ handleShowSignUp, handleShowResetPassword }) => {
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [history, setHistory] = useState([]);

  // Toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/login`,
        { phone_number, password,source:'web' },
        {
          headers: {
            "x-api-key": `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`,
          },
        }
      );

      const accessToken = res.data.data.access_token;
      const refreshToken = res.data.data['refresh-token'];
      const encryptedToken = await encryptToken(accessToken);
      localStorage.setItem('refresh_token',refreshToken)
      const deviceId = getDeviceId();
      const fcmToken = await fetchToken(); // Fetch the FCM token for push notifications
      

      // Send token and deviceId to the server
      if (fcmToken) {
        await apiClient.post(
          `/auth/set-fcm`,
          { token: fcmToken, device_id: deviceId },

        );
       
      } else {
        console.warn("No FCM token available.");
      }

      try {

        const response = await apiClient.get(
          `/loan`
        );
        if(response?.data?.data?.length > 0){
          router.push(
            `/dashboard`
          );
        }else{
        const title = 'Congratulations!';
  const status = 'success';
  const message = 'You can apply for your first loan by choosing between our Instant Loan or Salary Advance Loan.';
  const subMessage = 'Your data privacy and security is important to us. We only use your personal information to provide you with our best offers and it will not be shared with any other parties.';
  
  router.push(
    `/dashboard?status=${encodeURIComponent(status)}&title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}&subMessage=${encodeURIComponent(subMessage)}`
  );
        }
      
        setLoading(false);
      } catch (error: any) {
        console.error(error);
      }
     

    } catch (error: any) {
      console.error(error);
      setError(
        error?.response?.data?.error || error?.response?.data?.message || "An error occurred, please try again."
      );
      setNotificationOpen(true);
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div>
         {/* Login */}
         <div className='w-full h-full items-center'>
            <p className="text-[20px] font-bold mt-4">Login</p>
            <p className="text-[15px] lg:text-[15px] md:text-[15px] text-[#282828] mt-2">Let’s get you back in. <span 
            className="text-[#F24C5D] text-[15px] hover:cursor-pointer hover:text-red-900 ml-10 lg:hidden md:hidden"
            onClick={() => handleShowSignUp()} 
            >
            Create an account
            </span></p>

            <form className="lg:w-11/12 md:w-11/12 w-full h-auto mt-10 mb-4" onSubmit={handleSubmit}>
              {/* Phone number input */}
              <div className="relative mb-6">
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  name="phone_number"
                  onChange={(e) => setPhone_number(e.target.value)}
                  className="w-full lg:w-11/12 pl-12 py-2 placeholder-[#5A5A5A]  border border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
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

              {/* Password input with visibility toggle */}
              <div className="relative mb-6">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between password and text
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full lg:w-11/12 pl-12 pr-12 py-2 border placeholder-[#5A5A5A] border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Image
                    src="/images/lock-circle.png"
                    alt="Lock Icon"
                    width={16}
                    height={16}
                    className="text-gray-400"
                  />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0  right-6 lg:right-20 flex items-center text-[#5A5A5A] text-[16px] font-bold"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                 {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="w-6/12">
              {loading && <LoadingPage />}

              </div>
             
              {/* Submit button */}
              <button
                type="submit"
                disabled={!phone_number || !password || loading}
                
                className="disabled:opacity-50 disabled:cursor-not-allowed  w-full lg:w-11/12 bg-[#F24C5D]  text-white font-outfit  rounded-full h-[55px] py-1 px-4 text-[15px] mt-4"
              >
                Login
              </button>
            </form>
            
            <button
              onClick={() => handleShowResetPassword()}
            className="text-center w-11/12 mb-6 text-[#F24C5D] hover:cursor-pointer  "
            >Reset password
            </button>
            <p 
            className="hidden lg:block md:block text-center w-full lg:w-11/12">Are you a new customer? 
            <span 
            className="text-[#ED3237] hover:cursor-pointer  ml-1"
            onClick={() => handleShowSignUp()} 
            >
            Create an account
            </span>
            </p>
          </div>
          {/* Error notification */}
          {isNotificationOpen && (
            <Notification
              status="error"
              
              message={error}
              toggleNotification={toggleNotification}
              isOpen={isNotificationOpen}
            />
          )}


    </div>
  )
}

export default Login