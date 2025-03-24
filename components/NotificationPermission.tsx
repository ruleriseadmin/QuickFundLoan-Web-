import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type NotificationPermissionProps = {
  toggleNotificationPermission: () => void;
  isOpen: boolean;
};

const NotificationPermission: React.FC<NotificationPermissionProps> = ({ toggleNotificationPermission, isOpen }) => {
  const [browser, setBrowser] = useState<string>('');

  // Detect the user's browser
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome')) setBrowser('Chrome');
    else if (userAgent.includes('firefox')) setBrowser('Firefox');
    else if (userAgent.includes('edg')) setBrowser('Edge');
    else if (userAgent.includes('safari')) setBrowser('Safari');
    else setBrowser('Unknown');
  }, []);

  // Instructions for enabling notifications
  const getInstructions = () => {
    switch (browser) {
      case 'Chrome':
        return '1️⃣ Open Chrome Settings → Privacy and Security → Site Settings.\n2️⃣ Click "Notifications" and enable for this site.';
      case 'Firefox':
        return '1️⃣ Open Firefox Settings → Privacy & Security.\n2️⃣ Scroll to "Permissions" → "Notifications".\n3️⃣ Allow notifications for this site.';
      case 'Edge':
        return '1️⃣ Open Edge Settings → Cookies and Site Permissions.\n2️⃣ Click "Notifications" and enable for this site.';
      case 'Safari':
        return '1️⃣ Open Safari Preferences → Websites → Notifications.\n2️⃣ Find this site and allow notifications.';
      default:
        return '⚠️ Unable to detect your browser. Please check your settings manually.';
    }
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="notifybanner w-[400px] lg:w-[400px] md:w-[400px] min-h-[400px] h-auto mx-2 lg:mx-0 md:mx-0 font-outfit rounded-[22px] py-6 px-6 shadow-md transition-transform duration-300 transform bg-white">
        <div className="w-full mb-4 rounded-[22px] flex justify-start">
          <Image src="/images/failed.png" alt="Notification Icon" width={54} height={54} />
        </div>

        <div className="text-[16px] font-normal text-[#030602] ">
          <p className='leading-7'>
            You will miss important information like <strong>New loan offers, Bonus & Discounts on loans, Financial tips</strong>, and more if you disable notifications.
            <br />
            <br />
             <span>How to enable notifications in {browser}?</span>
          </ p>
          <pre className="bg-gray-100 p-3 rounded-lg text-sm text-left whitespace-pre-wrap">{getInstructions()}</pre>
        </div>

        <div className="mt-2 flex justify-center">
        
              <button
                onClick={async () => {
                  toggleNotificationPermission();
                  
                }}
                type="button"
                className=" ml-4 bg-[#282828] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed h-[47px]  w-[162px] rounded-[12px] px-4 py-2 mt-4 font-medium"
              >
                Got it
              </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPermission;
