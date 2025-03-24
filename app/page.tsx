'use client'
import NavBar from "@/components/NavBar";
import Hero from '@/components/landingPage/Hero';
import Stat from "@/components/landingPage/Stat";
import ApplyCard from "@/components/landingPage/ApplyCard";
import Hero2 from "@/components/landingPage/Hero2";
import Hero3 from '@/components/landingPage/Hero3';
import Hero4 from '@/components/landingPage/Hero4';
import MeetCustomers from '@/components/landingPage/MeetCustomers';
import Partners from "@/components/landingPage/Partners";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState,useRef } from 'react';
import Entry from '@/components/getStarted/Entry';
import PushNotification from "@/components/PushNotification";
import useFcmToken from "@/components/FcmFunctions";
import NotificationPermission from '@/components/NotificationPermission'
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
  const [openLogin, setOpenLogin] = useState(false);

  // Query parameter values
  const status = searchParams.get('status') || '';
  const hero2Ref = useRef<HTMLDivElement | null>(null);
  const title = searchParams.get('title') || '';
  const message = searchParams.get('message') || '';
  const subMessage = searchParams.get('subMessage') || '';
  const body = searchParams.get('body') || '';
  const section = searchParams.get('section') || '';
  const [scrollToHero, setScrollToHero] = useState(false);

  useEffect(() => {
    if (pathname === '/' && section === 'hero2') {
      setScrollToHero(true);
    } else {
      setScrollToHero(false); // Reset scrollToHero if conditions are not met
    }
  }, [pathname, section]);
  


  useEffect(() => {
    if (section === 'hero2' ) {
      setScrollToHero(true);
    }
  }, [section]);



  useEffect(() => {
    if (scrollToHero && hero2Ref.current ) {
      hero2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToHero]);
  

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
      if(message === "Please log in to continue.") {
        setTimeout(() => {
          setOpenLogin(true);
        }, 3000);
      }
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

  // Toggle login modal
  const toggleLoginModal = () => {
    setOpenLogin(!openLogin);
  };
// toggle push notification
const togglePushNotification = () => {
  setOpenPushNotification(!openPushNotification);
};

return (
  <div className=" lg:my-10 md:my-10  ">
    <div className="bg-[#ffffff] lg:hidden md:hidden h-10">

    </div>
    <main className="  bg-background w-full h-full overflow-auto scrollbar-hide">
      <NavBar />
      <Hero />
      <Stat />
      <ApplyCard />
      <div ref={hero2Ref}>
          <Hero2 />
      </div>
      <Hero3 />
      <Hero4 />
      <MeetCustomers />
      <Partners />
      <Footer />
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

    {openLogin && <Entry isOpen={openLogin} closeModal={toggleLoginModal} />}

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

export default Homepage;