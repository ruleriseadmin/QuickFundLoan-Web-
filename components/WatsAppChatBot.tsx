import React from 'react'
import Image from 'next/image';
import { FaWhatsapp } from "react-icons/fa";

const WatsAppChatBot = () => {
    const phoneNumber = "2349166000040"; // Replace with your WhatsApp number
    const message = encodeURIComponent("Hello, I need help!");

    const openWhatsApp = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      };
    
  return (
    <div>
      <button
      onClick={openWhatsApp}
      className="fixed bottom-4 flex z-50 justify-center items-center right-4 bg-[#282828] font-outfit w-[192px] h-[63px]  text-white px-4 py-2 rounded-full shadow-lg  "
    >
      <p className='text-[#ffffff] text-[18px] font-semibold'>Chat With Us</p>
       <Image
        src="/images/floatingWatsapp.png"
        alt="WhatsApp"
        width={30}
        height={30}
        className="ml-2" />
       
    </button>


    
    </div>
  )
}

export default WatsAppChatBot