'use client'
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import Link from 'next/link';
import {  useState } from "react";

import { FaLocationDot } from "react-icons/fa6";

type SideModalProps = {
  isOpen: boolean;
  toggleSlideContact: () => void;
};



const SlideContactForm: React.FC<SideModalProps> = ({ isOpen, toggleSlideContact }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);




  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 500);
  };


  return (
      <div
        className={`contact-content ${isOpen  ? 'contact-enter' : ' contact-exit'}`}
      >
        <div>
        <div className="flex justify-end">
            <FaTimes className="cursor-pointer w-[27px] h-[27px] text-[#282828] mt-8 mr-8" onClick={toggleSlideContact} />
        </div>
        <div className='font-outfit mt-4 ml-8'>
                <p className='text-[28px] font-bold mb-6  text-[#030602]'>Reach us on</p>
                <div className='flex flex-col gap-10'>
                  <div className='grid grid-cols-2 w-11/12  items-center'>
                    <div className='flex items-center'>
                      <Image src='/images/mail.png' alt='email' width={41} height={41} className='rounded-full mr-2' />
                      <p className='text-[15px]'>Email <br /> support@quickfund.com.ng</p>
                    </div>
                    <div className='flex items-center justify-end'>
                      <button className='text-start' onClick={() => handleCopy('support@quickfund.com.ng')}>
                        <IoCopy className='text-[#263238]' />
                      </button>
                      {copiedText === 'support@quickfund.com.ng' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
                    </div>
                  </div>
                  
                  <div className='grid grid-cols-3 w-11/12 items-center'>
                    <div className='flex items-between col-span-2 w-full '>
                      <div className="w-[46px] h-[46px] rounded-full bg-[#B0F6BF80] relative flex items-center justify-center">
                        <Image src="/images/watsapp.png" alt="whatsapp" width={30.29} height={30.29} className="rounded-full" />
                      </div>
                      <p className='text-[15px] ml-2'>
                         WhatsApp  <br/> +2349166000040
                          <br/> +2349166000042 
                      </p>
                    </div>
                  
                    <div className='flex flex-col items-end pt-3 col-span-1 justify-end'>
                     
                    <button className='text-start pt-3' onClick={() => handleCopy('+2349166000040')}>
                          <IoCopy className='text-[#263238]' />
                        </button>
                        {copiedText === '+2349166000040' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
                        <button className='text-start pt-2' onClick={() => handleCopy('+2349166000042')}>
                              <IoCopy className='text-[#263238]' />
                            </button>
                            {copiedText === '+2349166000042' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
                    </div>
                  </div>
                  
                  <div className='grid grid-cols-3 w-11/12 items-center'>
                    <div className='flex items-center col-span-2 w-full'>
                      <div className="w-[39px] h-[39px] rounded-full bg-[#1C1C1E] flex items-center justify-center">
                        <Image src="/images/bgcall.png" alt="call" width={22} height={20} className="rounded-full" />
                      </div>
                      <p className='text-[15px] ml-2'>
                        Call <br /> +2349166000043
                         <br/> +2349166000042 
                      </p>
                    </div>
                  
                    <div className='flex flex-col items-end pt-3 col-span-1 justify-end'>
                      <button className='text-start' onClick={() => handleCopy('+2349166000043')}>
                        <IoCopy className='text-[#263238]' />
                      </button>
                      {copiedText === '+2349166000043' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
                      <button className='text-start pt-2' onClick={() => handleCopy('+2349166000042')}>
                            <IoCopy className='text-[#263238]' />
                          </button>
                          {copiedText === '+2349166000042' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
                    </div>
                  </div>
                  
                  <div className='grid grid-cols-3 w-11/12 items-center'>
                    <div className='flex items-center col-span-2 w-full'>
                      <div className="w-[39px] h-[39px] rounded-full bg-[#f7eced] flex items-center justify-center">
                        <FaLocationDot className="text-2xl text-[#e4394a]" />
                      </div>
                      <p className='text-[14px] ml-2'>
                        Visit <br /> 2 Allen Avenue Ikeja Lagos
                      </p>
                    </div>
                  
                    <div className='flex items-center col-span-1 justify-end'>
                      <button className='text-start' onClick={() => handleCopy('2 Allen Avenue Ikeja Lagos')}>
                        <IoCopy className='text-[#263238]' />
                      </button>
                      {copiedText === '2 Allen Avenue Ikeja Lagos' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
                    </div>
                  </div>
                </div>
        <p className=' text-[28px]  mt-12 text[#030602] font-bold'>Get in touch</p>
        <p className=' text-[15px] text-[#282828] mt-4 '>Feel free to contact us any time. we will get back to you <br/> as soon as we can!</p>
        
              <div className='flex justify-center gap-8 items-center mt-8 text-[12px] w-full'>
              <Link href="" target="_blank" className='flex justify-center gap-1 items-center'>
                <Image src='/images/twitter.png' width={19} alt='facebook' height={19} />
                <p>quickfundng</p>
              </Link>
              <Link href="https://www.instagram.com/quickfundng?igsh=eTY4Y25kMzM3ZnF1" target="_blank" className='flex justify-center gap-1  items-center'>
                <Image src='/images/instagram.png' width={19} alt='instagram' height={19} />
                <p>quickfundng</p>
              </Link>
              <Link href="https://www.linkedin.com/company/quickfundng/" target="_blank" className='flex justify-center gap-1   items-center'>
                <Image src='/images/linkedin.png' width={20} alt='linkedin' height={20} />
                <p>Quickfund</p>
              </Link>
            </div>
            
        </div>

        
    </div>
    </div>
  );
};

export default SlideContactForm;