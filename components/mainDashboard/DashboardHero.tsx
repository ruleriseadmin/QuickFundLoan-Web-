'use client'
import React from 'react'
import Image from 'next/image'
import { IoIosInformationCircleOutline } from "react-icons/io";
import MainRepayment from '../repayment/MainRepayment';
import { useState } from 'react'


const formatCurrency = (amount: number | null) => {
    if (amount === null) return '₦ 0';
    return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


type Loan = {
    [key: string]: any;
  };
  
  type DashboardHeroProps = {
    loanHistory: Loan[]; // Array containing a single Loan object
  };

const DashboardHero: React.FC<DashboardHeroProps> = ({loanHistory}) => {
  

    const [isRepaymentOpen, setIsRepaymentOpen] = useState(false)

    const toggleRepayment = () => {
        setIsRepaymentOpen(!isRepaymentOpen)
    }
    
  return (
    <div className='font-outfit bg-[#ED323717] rounded-[16px] mt-4 mx-auto lg:h-[193px] h-auto flex justify-between align-middle items-center  w-11/12'>
        <div className=' h-full ml-4 mt-6 lg:mt-8 md:mt-8'>
            <div className='text-[#030602] lg:text-[20px] md:text-[17px] text-[17px]  flex align-middle items-center'> <p>Total Outstanding Loan</p> <IoIosInformationCircleOutline className='text-lg text-[#5A5A5A] ml-1'/> </div>
            <p className='text-[#282828] text-[28px] lg:text-[30px] font-semibold mt-2'>{loanHistory.length > 0 ? formatCurrency(
    loanHistory[0]?.amount_remaining
  ) : '₦ 0.00'}</p>

        <button
        onClick={toggleRepayment}
        disabled={!loanHistory.length}
        className={`${loanHistory.length > 0 ? "bg-[#282828] text-[#FFFFFF]" : "bg-[#28282880] text-[#FFFFFF80]"} flex align-middle items-center disabled:cursor-not-allowed  text-[15px] w-[192px] h-[37px] md:mb-6 rounded-[12px] px-2 py-1 lg:mt-8 md:mt-8 mt-4`}>
            <Image
            src='/images/subtitle.png'
            alt='loan'
            width={15}
            height={15}
            sizes=''
            className='mr-1  text-[#FFFFFF80]'
            />
        <p> Manage & repay loan</p>
           
        </button>
        </div>
        <div className='md:hidden lg:hidden block '>
        <Image 
            src='/images/smalldashboard.png'
            width={131}
            height={187}
            alt='hero'
            sizes=''
            className='mt-9 rounded-b-lg'
        />

        </div>
        <div className='md:block lg:block hidden'>
        <Image 
            src='/images/dashboardhero.png'
            width={278}
            height={193}
            alt='hero'
            sizes=''
            className='lg:mt-2 md:mt-6 lg:mr-6 md:mr-2 '
        />

        </div>
        
        

        {isRepaymentOpen && <MainRepayment isOpen={isRepaymentOpen} toggleRepayment={toggleRepayment} />}

    </div>
  )
}

export default DashboardHero