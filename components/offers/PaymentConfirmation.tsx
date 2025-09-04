import React from 'react';
import Image from 'next/image';


type ConfirmationProps = {
  toggleConfirmation: () => void;
  isOpen: boolean;
  handleSubmit: () => void;
  amount: number | null;
  bank: any[];
};


const formatCurrency = (amount: number | null) => {
  if (amount === null) return '₦ 0';
  return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PaymentConfirmation: React.FC<ConfirmationProps> = ({ toggleConfirmation, isOpen,handleSubmit,amount,bank}) => {
  

  return (
    <div
    onClick={toggleConfirmation}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full min-h-screen h-auto index -translate-y-1/2  flex justify-center items-center  bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
   
      <div 
       onClick={(e) => e.stopPropagation()}
      className={`bg-[#FFFFFF] lg:w-[439px] md:w-[419px] w-[390px] h-[504px]  card-content ${isOpen  ? 'card-enter' : ' card-exit'}  mx-auto  lg:mt-[270px] md:mt-[213px]  mt-[200px]  font-outfit rounded-[22px] py-6 px-4 shadow-md  `}>
     <div className=' lg:w-full w-11/12 md:w-11/12 mb-8 '>
     
                 <Image
                   src= '/images/debit_image.png' 
                   alt="OptionalConfirmation Icon"
                   width={384}
                   height={137}
                   className= 'object-cover ml-4'
                 />
       
             </div>
        <div className=' text-[16px] font-normal text-[#030602] ml-4 '>
            <p className='text-start my-4'>To verify that we are disbursing to the right bank account, 
              we will debit <strong>₦5</strong> from your <strong>{bank[0]?.bank_name}</strong> Bank Account and refund you back immediately.
 </p>
 <p className='mt-6'>See the image above for reference.</p>
        </div>
       
          <div className=' flex justify-start items-center lg:mt-20 mt-20 md:mt-20 ml-4'>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
                toggleConfirmation();
              }}
             className="bg-[#F6011BCC] w-full text-white disabled:opacity-50 disabled:cursor-not-allowed h-[50px] mb-4 rounded-[45px] px-4 py-2 mt-4 font-medium"
            >
              Disburse {formatCurrency(amount)}
            </button>
            
          </div>
       
        
          </div>
      </div>
      
    
  );
};

export default PaymentConfirmation