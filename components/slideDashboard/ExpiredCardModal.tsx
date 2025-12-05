import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import apiClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import { FaHeadphones } from "react-icons/fa";
import SideModal from '../slideDashboard/SideModal';
import LoadingPage from '@/app/loading';
type ExpiredCardModalProps = {
  toggleExpiredCardModal: () => void;
  isOpen: boolean;
 hasExpiredCard: boolean
  
};


const ExpiredCardModal: React.FC<ExpiredCardModalProps> = ({ toggleExpiredCardModal, isOpen, hasExpiredCard}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expiredCards, setExpiredCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
const router = useRouter();
//fetch users cards
  useEffect(() => {
    const fetchUsersCards = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/account/cards`
        );

        setExpiredCards(response?.data?.data.filter((card: any) => !card.active));
      } catch (error: any) {
       router.push(`/dashboard?status=error&message=${encodeURIComponent(error?.response?.data?.message || 'An error occurred while processing your request')}`);
      }finally{
        setLoading(false);
      }
    };

    fetchUsersCards();
  }, []);
  console.log(expiredCards);
  return (
    <div
    onClick={toggleExpiredCardModal}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
       onClick={(e) => e.stopPropagation()}
      className={`bg-[#FFFFFF] w-[430px] h-[637px]  overflow-y-auto  mx-2 lg:mx-0 md:mx-0  font-outfit  p-6  transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-75"}`}>
      <h1 className='font-semibold text-[24px] mt-10'>Bank card expired!</h1>
      <p className='text-[18px]'>The bank cards linked to your profile is expired. Link a new active debit card to continue.</p>
       {expiredCards?.length > 0 && (
                        expiredCards.map((account, index) => (
                          <div key={index} className=' h-auto min-h-[229px] mx-auto p-4  rounded-[12px] w-full mt-8 card '
           >
            <div className='flex justify-between items-center align-middle mx-auto '>
            <Image
                      src={`${account.brand === 'visa' ? '/images/visa.png' : '/images/mastercard.png'}`}
                      width={51}
                      height={34}
                      alt="master card"
                      className=""
                    />
             <Image
                      src= '/images/cardwarning.png'
                      width={20}
                      height={20}
                      alt="master card"
                      className=""
                    />
                   
            </div>
            
            <p className=' text-[20px] text-[#FFF4F4] mt-5 text-center tracking-widest flex justify-center items-center'>
              <span className='pt-2 mr-2'>**** **** **** </span> 
              <span>{account.last4}</span>
              </p>
      
              <p className=' text-[12px] text-[#FFF4F4] mt-10 text-center tracking-widest flex ml-9 items-center'>
              <span className='leading-none mr-1'>VALID <br/> THRU</span>
              <span className=''>{account.exp_month} </span>/ 
              <span>{account.exp_year}</span>
              </p>
         </div>
                        ))
                     )}
                     {loading && <LoadingPage />}
        <button 
                 type="button" 
                 onClick={() => {
                    hasExpiredCard ? toggleModal () : toggleExpiredCardModal();
                 }}
                 className="bg-[#F24C5D] disabled:opacity-50 text-white w-full h-[55px] rounded-full py-2 mt-6">
                 <p className='text-center'>Link a new ATM Card</p>
        </button>

        <div className="border mt-20 border-[#D4D4D4] rounded-[12px] gap-3 w-full  min-h-[76px] h-auto  bg-[#E1ECF6] p-3 cursor-pointer flex ">
                <FaHeadphones className='text-[#5A5A5A] text-3xl'/>
                 <p className='text-[16px] '>
                  If you are having trouble linking your card, please call 
                   <span className='font-semibold'> 09166000040</span> or <span className='font-semibold'>09166000042.</span> 
                  </p>
                </div>
                
      </div>
       <SideModal isOpen={isModalOpen} closeModal={toggleModal} />
    </div>
  );
};

export default ExpiredCardModal;