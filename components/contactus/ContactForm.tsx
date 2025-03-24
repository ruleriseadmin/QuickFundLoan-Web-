import React, { useState } from 'react';
import { IoClose, IoCopy } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import Notification from "../Notification";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

type ContactFormProps = {
  isOpen: boolean;
  toggleContact: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, toggleContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [success, setSuccess] = useState('');
  const [successNotification, setSuccessNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState('')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 500);
  };

   // Toggle notification
   const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
};

// Toggle success notification
const toggleSuccessNotification = () => {
  setSuccessNotification(!successNotification);
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/contact_us`, {
           message,
            email,
            name
        }, {
            headers: {
                'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`
            }
        });
        
        setSuccess(res?.data?.message);
        setSuccessNotification(true);
        setLoading(false);
        setEmail("")
        setMessage("")
        setName("")
    } catch (error: any) {
        console.error(error?.response);
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
        setLoading(false);
    }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black font-outfit bg-opacity-50">
      <div className="bg-[#ffff] rounded-[20px] lg:w-4/12 md:w-7/12 min-h-[530px] h-auto relative">
        <button onClick={toggleContact} className="absolute top-3 right-10 text-xl z-30 font-bold">
          <IoClose className="text-navfont rounded-full bg-[#ffff] text-3xl mt-2 mr-2 p-1 font-bold" />
        </button>
        <div className="w-full h-full mt-0 ">
          <div className="w-full h-full mt-4 ml-6  p-6  ">  
          </div>
          <div className=" ">
            <div className='w-full h-full flex justify-end'>
              <div className='w-[141px] h-[417px] bg-[#F6011B40] rounded-e-[10px] z-20 absolute top-0'></div>
            </div>
            <div className='absolute w-[420px]  h-[380px] bg-[#4A494914] right-0 z-40 top-16'>
              <div className='bg-[#ffff] w-[378px] h-[341px] rounded-[3px] z-50 mx-auto mt-3'>
                <p className='text-[22.05px] font-bold pt-6 pb-4 ml-6 text-[#030602]'>Reach us on</p>
                <div className='flex flex-col gap-6 ml-6 '>
                <div className='grid grid-cols-2 w-11/12  items-center'>
  <div className='flex items-center'>
    <Image src='/images/mail.png' alt='email' width={41} height={41} className='rounded-full mr-2' />
    <p className='text-[15px]'>Email <br /> support@quickcred.com.ng</p>
  </div>
  <div className='flex items-center justify-end'>
    <button className='text-start' onClick={() => handleCopy('support@quickcred.com.ng')}>
      <IoCopy className='text-[#263238]' />
    </button>
    {copiedText === 'support@quickcred.com.ng' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
  </div>
</div>

<div className='grid grid-cols-3 w-11/12 items-center'>
  <div className='flex items-between col-span-2 w-full '>
    <div className="w-[46px] h-[46px] rounded-full bg-[#B0F6BF80] relative flex items-center justify-center">
      <Image src="/images/watsapp.png" alt="whatsapp" width={30.29} height={30.29} className="rounded-full" />
    </div>
    <p className='text-[15px] ml-2'>
      WhatsApp <br /> +2349166000043
    </p>
  </div>

  <div className='flex items-center col-span-1 justify-end'>
    <button className='text-start' onClick={() => handleCopy('+2349166000043')}>
      <IoCopy className='text-[#263238]' />
    </button>
    {copiedText === '+2349166000043' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
  </div>
</div>

<div className='grid grid-cols-3 w-11/12 items-center'>
  <div className='flex items-center col-span-2 w-full'>
    <div className="w-[39px] h-[39px] rounded-full bg-[#1C1C1E] flex items-center justify-center">
      <Image src="/images/bgcall.png" alt="call" width={22} height={20} className="rounded-full" />
    </div>
    <p className='text-[15px] ml-2'>
      Call <br /> +2349166000043
    </p>
  </div>

  <div className='flex items-center col-span-1 justify-end'>
    <button className='text-start' onClick={() => handleCopy('+2349166000043')}>
      <IoCopy className='text-[#263238]' />
    </button>
    {copiedText === '+2349166000043' && <p className='text-xs text-[#263238] ml-2'>Copied</p>}
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

            <div className='flex justify-center items-center mt-10 text-[12px] gap-6 font-normal text-[#282828]'>
              
              <Link href="" target="_blank" className='flex justify-center lg:gap-2 md:gap-1 items-center'>
                <Image src='/images/twitter.png' width={19} alt='facebook' height={19} />
                <p>quickcredng</p>
              </Link>
              <Link href="https://www.instagram.com/quickcredng?igsh=eTY4Y25kMzM3ZnF1" target="_blank" className='flex justify-center lg:gap-2 md:gap-1 items-center'>
                <Image src='/images/instagram.png' width={19} alt='instagram' height={19} />
                <p>quickcredng</p>
              </Link>
              <Link href="" target="_blank" className='flex justify-center lg:gap-2 md:gap-1 items-center'>
                <Image src='/images/linkedin.png' width={20} alt='linkedin' height={20} />
                <p>QuickFund</p>
              </Link>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Success Notification */}
       {successNotification && (
                <Notification
                    status="success"
                    title="Success!"
                    message={success || "Message sent successfully"}
                    toggleNotification={toggleSuccessNotification}
                    isOpen={successNotification}
                />
            )}

      {isNotificationOpen && (
                <Notification
                    status="error"
                    
                    message={error}
                    toggleNotification={toggleNotification}
                    isOpen={isNotificationOpen}
                />
            )}
    </div>
  );
};

export default ContactForm;
