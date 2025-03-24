import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

type NotificationProps = {
  toggleNotification: () => void;
  isOpen: boolean;
  status?: string; 
  title: string;
 body: string;
};


const PushNotification: React.FC<NotificationProps> = ({ toggleNotification, isOpen, status='', title, body }) => {
 
    return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`notifybanner w-[493px] lg:w-[493px] md:w-[493px]  min-h-[502px] h-auto lg:h-[502px] md:h-[502px] mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] p-6 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <div className={` w-full mb-12 rounded-[22px]`}>

            <Image
              src='/images/pushnotify.png'
              alt="Notification Icon"
              width={113}
              height={113}
              className='ml-4 mt-10'
            />
  
        </div>
        <div className='text-[20px] text-[#030602] mx-1'>
            <p className='text-center font-bold mb-2'> <strong>{status}!!</strong> {' '} {title}  </p>
            <p className='text-center  mb-2'>{body}  </p>
        </div>
        <button
          onClick={toggleNotification}
          className='mt-28 w-1/2 bg-navfont  h-[55px] text-[18px] text-white rounded-full  font-bold block mx-auto py-2'
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default PushNotification;