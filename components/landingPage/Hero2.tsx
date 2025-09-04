import React, {useState} from 'react';
import Image from 'next/image';
import Entry from '@/components/getStarted/Entry'
import { decryptToken } from '@/utils/protect';
import { useRouter } from 'next/navigation';



const Hero2 = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

     // Check if user is logged in
      const handleCheckUserStatus = async() => {
        const token = await decryptToken();
        if (token) {
          router.push('/dashboard');
        } else {
          handleOpenModal();
        }
      }
  
 
  return (
    <div
    id='hero2'
    className='w-11/12 h-auto min-h-[564px] mt-10 bg-[#F3F6F8] mx-auto rounded-[44px] overflow-hidden font-outfit flex justify-center items-center'>
      <div className='h-auto min-h-[444px] w-11/12 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mx-auto my-10 '>

        <div className="my-auto h-full">
          <Image
            className="w-full rounded-[22px] object-cover h-full "
            src="/images/hero2.png"
            alt="Logo"
            width={491}
            height={444}
            priority={true}
          />
        </div>

        {/* Update the styles of the second grid */}
        <div className="lg:mt-32 md:mt-32 lg:ml-6 md:ml-4 w-full ml-6 mt-4 ">
          <p className='font-bold mb-3 tracking-tighter text-[#282828] lg:text-[42px] text-[35px] leading-none '>Instant personal loan</p>
          <p className='font-normal mb-6 tracking-tighter text-[#282828] lg:text-[24px] text-[20px] '>
          Need cash fast? Get access to quick, hassle-free personal loans in less than 5 minutes, with flexible repayment terms and fast disbursement directly to your account

          </p>
          

          <button
          onClick={handleCheckUserStatus}
         className='bg-[#F24C5D] text-white font-outfit font-bold rounded-full lg:w-[146px] w-[141px] h-[54px] py-1 px-4 text-[18px]'
          >
            Apply Now

          </button>
        </div>

      </div>
      <Entry isOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
};

export default Hero2;
