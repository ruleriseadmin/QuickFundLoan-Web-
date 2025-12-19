'use client'
import Entry from "@/components/getStarted/Entry";
import Notification from "@/components/Notification";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState,useRef } from 'react';
import PushNotification from "@/components/PushNotification";
import useFcmToken from "@/components/FcmFunctions";
import NotificationPermission from '@/components/NotificationPermission'
import { withNotAuth } from "@/components/auth/EnsureNotLogin";
const Homepage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const {
    openNotificationPermission,
    toggleNotificationPermission,
    
  } = useFcmToken();
  

  


  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [openPushNotification, setOpenPushNotification] = useState(false);

  // Query parameter values
  const status = searchParams.get('status') || '';
  const title = searchParams.get('title') || '';
  const message = searchParams.get('message') || '';
  const subMessage = searchParams.get('subMessage') || '';
  const body = searchParams.get('body') || '';
  const section = searchParams.get('section') || '';


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
    if (message || subMessage) {
      setNotificationData({ status, title, message, subMessage });
      setIsNotificationOpen(true);
    } else if (title && body) {
      setPushNotificationData({ title, body, status });
      setOpenPushNotification(true);
    }
  
    // Delay clearing query params
    const timeout = setTimeout(() => {
      if(section !== 'hero2') {
      router.replace(window.location.pathname); // Clears query params from URL
      }
    }, 1000); // Delay for 1 second
  
    // Cleanup timeout on unmount or rerender
    return () => clearTimeout(timeout);
  }, [status, title, message, subMessage, router, body]);
  

  // Close notification and open login modal
  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

// toggle push notification
const togglePushNotification = () => {
  setOpenPushNotification(!openPushNotification);
};

 

return (
  <div className="bg-[#ffffff]  ">
    <main className="  bg-background w-full h-full overflow-auto scrollbar-hide">
     <Entry />
    </main>

    {isNotificationOpen && (
      <Notification
        isOpen={isNotificationOpen}
        toggleNotification={closeNotification}
        status={notificationData.status}
        title={notificationData.title}
        message={notificationData.message}
        subMessage={notificationData.subMessage}
      />
    )}

   

    {openPushNotification && (
      <PushNotification
        isOpen={openPushNotification}
        toggleNotification={togglePushNotification}
        title={pushNotificationData.title}
        body={pushNotificationData.body}
        status={pushNotificationData.status}
      />
    )}
    {openNotificationPermission && 
    <NotificationPermission
      isOpen={openNotificationPermission}
      toggleNotificationPermission={toggleNotificationPermission}
      
    /> }
  </div>
);
};

export default withNotAuth(Homepage);