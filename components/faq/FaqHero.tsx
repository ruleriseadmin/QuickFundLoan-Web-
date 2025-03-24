import React, { useState } from "react";
import Image from "next/image";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqHeroProps {
  faqs: FaqItem[];
}

const FaqHero: React.FC<FaqHeroProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 h-auto mx-auto my-20 font-outfit">
      <div className="w-[349px] h-[281px] relative mx-auto">
        <Image
          src="/images/faq.png"
          alt="faq-image"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="w-10/12 h-auto mx-auto mt-10 mb-20">
        {faqs?.map((faq, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-[18px] font-bold">{faq.question}</p>
              <button onClick={() => toggleFaq(index)}>
                {openIndex === index ? (
                  <FaMinusSquare className="text-[#F6011BCC] text-[24px]" />
                ) : (
                  <FaPlusSquare className="text-[#F6011BCC] text-[24px]" />
                )}
              </button>
            </div>
            {openIndex === index && (
              <p className="text-navfont text-[18px] w-11/12">{faq.answer}</p>
            )}
            <hr className="my-4 border-t-2 border-[#C8C8C8]" />
          </div>
        ))}
      </div>
      <div>
       
      </div>
      <p className="text-[20px] text-navfont text-center ">
              Still need help?  Contact us.
        </p>
        <div className="flex justify-center items-center mt-8 gap-5 mb-28">
          <button className="w-[162px] h-[45px] rounded-[22px] text-[16px] text-[#ffff] bg-[#F6011BCC] flex items-center font-light justify-center gap-1">
           
            <MdEmail className=" text-[#ffff] text-xl"/>
            <a href="mailto:info@quickcred.com.ng">Send an email</a>
            </button>
          <button
          className="w-[119px] h-[45px] rounded-[8px] border-solid text-[16px] text-[#282828] border-[#282828] border  flex items-center  justify-center gap-1"
          >
          <MdCallEnd className=" text-[#282828] -rotate-90 text-xl"/>
          Call us
          </button>
        </div>
    </div>
  );
};

export default FaqHero;
