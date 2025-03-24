import React from 'react';
import Image from 'next/image';


type MandateNotificationProps = {
  toggleMandateNotification: () => void;
  isOpen: boolean;
  message: string;
  
};


const MandateNotification: React.FC<MandateNotificationProps> = ({ toggleMandateNotification, isOpen,message}) => {
  

  return (
    <div
    onClick={toggleMandateNotification}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
       onClick={(e) => e.stopPropagation()}
      className={`notifybanner w-[463px] h-[401px]  mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] p-6 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <div className=' w-full mb-6 rounded-[22px]'>

            <Image
              src= '/images/failed.png' 
              alt="MandateNotification Icon"
              width={100}
              height={100}
              className= 'ml-4'
            />
  
        </div>
        <div className='text-[20px] font-normal text-[#030602] ml-4'>
            <p className='text-start'>{message}</p>
        </div>
        <div className='flex items-center justify-start gap-2 mt-6 ml-4'>
          <Image
          src= '/images/gift.png'
          alt="gift Icon"
          width={20}
          height={20}
          />
          <p className='text-[15px] font-medium text-[#282828]'>Did you know?</p>
        </div>
        <p className='text-[13px] ml-4 font-normal text-[#282828] my-2'>You can get up to N500,000 instant loan on QuickCred in less than 5 minutes. Your consistency and loyalty as our customer will unlock juicy loan offers for you.</p>
        

      </div>
      
    </div>
  );
};

export default MandateNotification;