'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {useState} from 'react'
import Notification from '@/components/Notification';


const SideBar = () => {
  const path = usePathname()
  const [error, setError] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  



  const isActive = (pathname:string) => {
    return pathname === path ? 'bg-[#F7F7F71F] border border-[#F7F7F71F] md:w-11/12  rounded-[18px] h-[53px]' : ''
  }

  return (
    <div className='w-11/12 md:w-full ml-2 my-3 h-full bg-[#282828] rounded-[18px] font-outfit'>
      <div className='h-6'></div>
      <Image
        src='/images/profile.png'
        width={64}
        height={64}
        alt='profile'
        className='lg:ml-6 mb-4 md:ml-4' 
      />
      
      <Link href='/dashboard' className={`flex justify-start lg:gap-2 md:gap-0 mt-10 w-10/12 items-center align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/dashboard')}`}>
        <Image 
          src='/images/status.png'
          width={24}
          height={24}
          alt='status icon'
        />
        <p className='lg:ml-2 md:ml-1 lg:text-[18px] md:text-[16px] font-bold text-[#CDCDCD]'>Dashboard</p> 
      </Link>

      <Link href='/loan-history' className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/loan-history')}`}>
        <Image 
          src='/images/empty-wallet.png'
          width={24}
          height={24}
          alt='loan history icon'
        />
        <p className='lg:ml-2 md:ml-1 lg:text-[18px] md:text-[16px] font-bold text-[#CDCDCD]'>Loan history</p> 
      </Link>

      <Link
       href='/payment-methods'
       className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/payment-methods')}`}>
        <Image 
          src='/images/cards.png'
          width={23}
          height={24}
          alt='payment methods icon'
        />
        <p className=' lg:ml-2 lg:text-[18px] md:text-[16px] font-bold text-[#CDCDCD]'>Payment methods</p> 
      </Link>

      <Link
      href='/account-settings'
      className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle md:ml-2 lg:ml-4 p-2 ${isActive('/account-settings')}`}>
        <Image 
          src='/images/bubble.png'
          width={24}
          height={24}
          alt='account settings icon'
        />
        <p className='lg:ml-2 md:ml-1 lg:text-[18px] md:text-[16px] font-bold text-[#CDCDCD]'>Account settings</p> 
      </Link>

     

      <Link href='/faq' 
      className={`flex justify-start lg:gap-2 md:gap-0 w-full items-center mt-10 align-middle lg:ml-4 md:ml-2 p-2 ${isActive('/help')}`}>
        <Image 
          src='/images/message-question.png'
          width={24}
          height={24}
          alt='help icon'
        />
        <p className='lg:ml-2 md:ml-1 lg:text-[18px] md:text-[16px] font-bold text-[#CDCDCD]'>Help</p> 
      </Link>
     
      {notificationOpen && (
        <Notification
          status="error"
          
          message={
            error ||
            'You are not qualified for a loan at the moment. Please pay your outstanding loans and try again.'
          }
          toggleNotification={() => setNotificationOpen(false)}
          isOpen={notificationOpen}
        />
      )}
      
    </div>
  )
}

export default SideBar
