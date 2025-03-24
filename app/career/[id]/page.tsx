'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import NavBar from "@/components/NavBar";
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation'
import { FaLongArrowAltLeft } from "react-icons/fa";
import Image from 'next/image';
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { BsLink } from "react-icons/bs";

type Job = {
  [key: string]: any;
};
const page = () => {
    const { id } = useParams()
    const jobData: Job[] = []
    const job = jobData?.find(job => job?.id?.toString() === id.toString())
    const router = useRouter()
    const shareJob = (platform: string) => {
      const shareUrl = window.location.href; // Current page URL
      const title = encodeURIComponent(job?.title || "Check out this job opportunity!");
      const text = encodeURIComponent("Check out this amazing job opportunity!");
    
      let url = "";
      switch (platform) {
        case "twitter":
          url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`;
          break;
        case "facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
          break;
        case "linkedin":
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
          break;
        case "pinterest":
          url = `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${title}`;
          break;
        case "email":
          url = `mailto:?subject=${title}&body=${text} - ${shareUrl}`;
          break;
        case "whatsapp":
          url = `https://api.whatsapp.com/send?text=${title} - ${shareUrl}`;
          break;
        default:
          break;
      }
    
      window.open(url, "_blank");
    };
    return (
      <div className="my-10">
          <main className="w-full min-h-screen h-full font-outfit overflow-hidden">
              <NavBar />
              <div className='w-11/12 lg:w-full md:w-full lg:ml-24 md:ml-10 mx-auto'>
                <button
                          onClick={() => router.back()}
                          className="bg-inherit border-2 flex justify-center items-center border-[#282828] rounded-full w-[126px] h-[44px] gap-1 font-semibold py-1 px-4 text-[16px]"
                        >
                          <FaLongArrowAltLeft className='text-xl'/>
                          Go back
                        </button>
                        
                <p className='text-[#282828] font-black lg:text-[56px] md:text-[46px] text-[30px] mt-10 mb-4 lg:mb-0 md:mb-0'>{job?.title}</p>
  <div className='flex justify-between  items-center mt-2  w-full lg:w-5/12 md:w-8/12'>
  <div className='flex items-center'>
    <Image
      src="/images/location.png"
      alt="Job Icon"
      width={20}
      height={20}
      priority={true}
    />
    <p className="text-[#5A5A5A] text-[18px] font-normal ml-2">
      {job?.location}
    </p>
  </div>

  <div className='flex items-center  '>
    <Image
      src="/images/work_mode.png"
      alt="Job Icon"
      width={20}
      height={20}
      priority={true}
    />
    <p className="text-[#5A5A5A] text-[18px] font-normal ml-2">
      {job?.type}
    </p>
  </div>

  <div className='flex items-center ml-6 lg:ml-0 md:ml-0  '>
    <Image
      src="/images/amount.png"
      alt="Job Icon"
      width={20}
      height={20}
      priority={true}
      className='ml-5'
    />
    <p className="text-[#5A5A5A] text-[18px] font-normal ml-2">
      {job?.payRange}
    </p>
  </div>
</div>

              <div className='w-full mt-8 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2   h-full '>
                  <div className='w-full mt-8 '>
                  <p className='text-[#282828] font-semibold text-[20px]'>About the role</p>
                  <p className='text-[#5A5A5A] font-normal text-[18px] mt-4 text-start'>{job?.role}</p>
                </div>
                <div className='w-full mt-8  flex flex-col justify-start items-center gap-6'>
                <button
          type="button"
         
          className="lg:w-[386px] md:w-[300px] w-[386px]  bg-[#282828] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-[#FFFFFF] rounded-[45px] h-[54px] py-1 px-4 text-[18px]"
        >
          Apply for this position
        </button>
        <div className="lg:w-[386px] md:w-[300px] w-[386px] bg-[#D4EEF3] text-[#FFFFFF] rounded-[12px] h-[113px] text-[18px]">
  <div className="mx-4 mt-3 text-[#282828] font-semibold">
    <p className="text-[18px]">Share this job</p>
    <div className="flex justify-center items-center mt-6">
      <RiTwitterXFill
        className="text-[24px] hover:cursor-pointer"
        onClick={() => shareJob("twitter")}
      />
      <FaInstagram className='text-[24px] ml-4 hover:cursor-pointer' 
      onClick={() => shareJob("instagram")}
      />
      <FaFacebookSquare
        className="text-[24px] ml-4 hover:cursor-pointer"
        onClick={() => shareJob("facebook")}
      />
      <FaLinkedin
        className="text-[24px] ml-4 hover:cursor-pointer"
        onClick={() => shareJob("linkedin")}
      />
      <FaPinterest
        className="text-[24px] ml-4 hover:cursor-pointer"
        onClick={() => shareJob("pinterest")}
      />
      <img
        src="/images/blackwatsapp.png"
        alt="WhatsApp Icon"
        className="ml-4 w-[24px] h-[24px] hover:cursor-pointer"
        onClick={() => shareJob("whatsapp")}
      />
               <img
              src="/images/sent.png"
              alt="Mail Icon"
              className='ml-4 md:h-[15px] md:w-[15px] lg:w-[24px] lg:h-[24px] w-[24px] h-[24px] hover:cursor-pointer'
              />
      <TbMailFilled
        className="text-[24px] ml-4 hover:cursor-pointer"
        onClick={() => shareJob("email")}
      />
      <BsLink className='text-[30px] ml-4' />
    </div>
  </div>
</div>
                </div>


                </div>
                <div className='w-full mt-8 '>
                  <p className='text-[#282828] font-semibold text-[20px] mb-3'>Key responsibilities</p>
                  <ul>
                {job?.responsibilities.map((responsibility:any, index:number) => (
                  <li key={index} className='text-[#5A5A5A] font-normal text-[18px] mt-2 ml-2'>{responsibility}</li>
                ))}
              </ul>
                    
                </div>
                <div className='w-full mt-8 '>
                  <p className='text-[#282828] font-semibold text-[20px] mb-3'>What We’re Looking For</p>
                  <ul>
                  {job?.looking_for.map((look:any, index:number) => (
                    <li key={index} className='text-[#5A5A5A] font-normal text-[18px] mt-2 ml-2'>{look}</li>
                  ))}
                </ul>
                    
                </div>
                <div className='w-full mt-8 '>
  <p className='text-[#282828] font-semibold text-[20px] mb-3'>What We Offer</p>
  <ul>
  {job?.what_we_offer.map((what:any, index:number) => (
    <li key={index} className='text-[#5A5A5A] font-normal text-[18px] mt-2 ml-2'>
      {what}
    </li>
  ))}
</ul>
</div>
 <p className='text-[#5A5A5A] font-normal text-[18px] mt-7 lg:w-5/12 w-full ml-2'>{job?.closing_sentence}</p>
                
  
              </div>
              
              
              <Footer />
          </main>
      </div>
    );
}

export default page