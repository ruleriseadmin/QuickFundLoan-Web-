'use client'
import React from 'react'
import { FaFacebookSquare,FaYoutubeSquare, FaTwitterSquare } from "react-icons/fa";
import { FaInstagram,  FaLinkedin } from "react-icons/fa";

import {useRouter} from 'next/navigation'
import Link from 'next/link'

const Footer = () => {
  const router = useRouter()
  const currentYear: number = new Date().getFullYear();
  return (
    <>
    <div className='lg:w-10/12 md:w-10/12 w-11/12 h-auto bg-[#2F2D2D] font-outfit text-[#FFFFFF] lg:rounded-[45px] md:rounded[45px] rounded-[22px] grid grid-cols-1 lg:grid-cols-12 lg:gap-16 md:grid-cols-12 mx-auto mt-20'>
        <div className='mx-auto lg:col-span-5 md:col-span-6 col-span-1 w-full flex flex-col align-middle items-center my-10 '>
          <div className='my-auto lg:w-8/12 w-11/12 md:w-8/12  mb-4 '>
            <p className=' text-[28px] lg:text-[28px] md:text-[20px] font-bold leading-9 mb-4 lg:mt-0 lg:text-nowrap'>Fast, Flexible Loans for <br/> Personal and Business Needs</p>
            <p className='text-[16px] leading-7 font-thin'><a href="mailto:Info@quickfund.com.ng">support@quickfund.com.ng</a></p>
            <p className='text-[16px] leading-7 font-thin'>09166000043</p>
            <p className='text-[16px] leading-7 font-thin'>09166000042</p>
          
            <p  className='text-[16px] leading-7 font-thin'>2 Allen Avenue Ikeja Lagos</p>
            <div className='flex mt-4 gap-4'>
            <FaFacebookSquare className='text-[23px]'/>
            <Link
            href='https://www.instagram.com/quickfundng?igsh=eTY4Y25kMzM3ZnF1'
            >
              <FaInstagram className='text-[23px]'/>
            </Link>
            

            <FaLinkedin className='text-[23px]'/>
            <FaYoutubeSquare className='text-[23px]'/>
            <FaTwitterSquare className='text-[23px]'/>
        </div>
        </div>
        </div>
        <div className='mx-auto  lg:col-span-7 md:col-span-6 w-full col-span-1'>
        <div className='lg:mt-20 md:mt-20  mb-4 '>
        <div className='flex justify-start w-11/12 mx-auto lg:gap-20 gap-12 font-medium leading-9 mb-4 lg:mt-0 '>
        <Link href='/?section=hero2' className='lg:text-[18px] text-[18px] leading-7 font-thin'>Loan solution</Link>
        <Link href='/aboutus' className='lg:text-[18px] text-[18px] leading-7 font-thin'>Our company</Link>
            <Link href='/faq'  className='lg:text-[18px] text-[18px] leading-7 font-thin'>FAQ</Link>
           

        </div>
        <div className='flex justify-start w-11/12 mx-auto lg:gap-20 gap-12 font-medium leading-9 mb-4 lg:mt-0 mt-6 '>
            <Link 
            href='/privacy'
            className='lg:text-[18px] text-[18px] leading-7 font-thin'>Privacy policy</Link>
            <Link 
            className='lg:text-[18px] text-[18px] leading-7 font-thin'
            href='/terms'
            >
              Terms</Link>
        </div>

        <div className='lg:mt-20 mt-8 lg:ml-4 md:ml-2 ml-4 mb-6'>
          <p className='text-[15px] lg:text-[16px] md:text-[14px] text-[#F0F0F0]  sm:ml-2  md:mt-0 '>
          All rights reserved. Quickfund  &copy; {currentYear}
          </p>
        </div>
            
        </div>
           
        </div>
        
       

    </div>
    </>
  )
}

export default Footer