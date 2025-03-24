import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation'

type NotificationProps = {
  toggleNotification: () => void;
  isOpen: boolean;
  status: string; 
  title?: string;
  message: string;
  subMessage?: string;
};


const Notification: React.FC<NotificationProps> = ({ toggleNotification, isOpen, status='', title='', message='', subMessage='' }) => {
  
  const [openRepayment, setOpenRepayment] = useState(false)
  const router = useRouter()



useEffect(() => {
  if(message === 'You are not qualified for a loan at the moment. Please pay your outstanding loans and try again.'){
    setOpenRepayment(true)
  }
},[message])
  
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`notifybanner ${status === 'error' ? 'w-[463px]' : 'w-[443px]'}   ${status === 'error' ? 'min-h-[401px] h-auto' : 'min-h-[480px] h-auto'}  mx-2 lg:mx-0 md:mx-0  font-outfit rounded-[22px] p-6 shadow-md  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <div className={`${message ? '' : 'mt-10'} w-full mb-8  ${status === 'error' ? 'mb-12' : ''} ${status === 'success' && !subMessage ? ' mt-10' : ''} rounded-[22px]`}>

            <Image
              src={title === 'Congratulations!' ? '/images/congratsLogin.gif' : status === 'success' ? '/images/success.png' :  '/images/failed.png' }
              alt="Notification Icon"
              width={100}
              height={100}
              className={status === 'success' ? 'mx-auto' : 'ml-4'}
            />
  
        </div>
        <div className='text-[20px] text-[#030602] '>
            <p className={`${status === 'error' ? 'text-start' : status === 'success' && !subMessage ? 'text-center mt-14' : 'text-center'} mb-2`}><span className='font-bold'>{title} </span>{message} </p>
            <p className={`${status === 'error' ? 'text-start' : 'text-center '}`}>{subMessage}</p>
        </div>
        <button
         onClick={() => {
          if (openRepayment) {
           router.push('/dashboard?repayment=true')
            toggleNotification(); // Close the notification
          } else if(
            title === 'Transfer Successful!' 
            || title === 'Account Linking Successful' 
            || title === 'Loan Application Successful!'
            || title === 'Account Authorized Successful!'
            || title === 'Loan repayment Successful!'
            || title === 'Payment Successful!'
            || title === 'Card Verification Successful!'
            || title === 'Card Tokenization Successful!'
            || title === 'E-Mandate Registration Successful!'
          ){
            window.location.reload()
          }else {
            toggleNotification(); // Just close the notification
          }
        }}
          className={`${!message ? 'mt-14' : openRepayment ? 'mt-8' : status === 'error' ? 'mt-20 ml-0' : 'mt-10'} w-1/2 bg-navfont h-[55px] text-[18px] text-white rounded-full font-bold block mx-auto ${openRepayment ? 'ml-0' : 'mx-auto'} py-2`}
        >
          {openRepayment ? 'Manage loan' : status === 'success' ? 'Awesome!' : 'Try again later'}
        </button>
      </div>

    </div>
  );
};

export default Notification;