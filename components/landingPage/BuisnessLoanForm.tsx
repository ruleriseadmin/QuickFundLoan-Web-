import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from "react-icons/fa";

type BusinessLoanFormProps = {
  isOpen: boolean;
  toggleBusinessLoanForm: () => void;
};

const BusinessLoanForm: React.FC<BusinessLoanFormProps> = ({ isOpen, toggleBusinessLoanForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [purpose, setPurpose] = useState('');
  const [seeForm, setSeeForm] = useState(true);
  const [seeSuccess, setSeeSuccess] = useState(false);

  // Toggle form and success message
  const toggleForm = () => {
    setSeeForm(true);
    setSeeSuccess(false);
  };

  const toggleSuccess = () => {
    setSeeForm(false);
    setSeeSuccess(true);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`lg:w-4/12 w-11/12 md:w-7/12 bg-white lg:ml-32 md:ml-32 mx-2 min-h-[637px] h-auto font-outfit rounded-[22px] p-6 shadow-md max-h-[80vh] overflow-y-auto transition-transform duration-300 transform ${
          isOpen ? 'scale-100' : 'scale-75'
        }`}
      >
        {seeForm && (
          <>
            <div className="ml-4">
              <div className="overflow-y-auto max-h-[80vh] flex justify-between items-center">
                <p className="flex-grow lg:text-[18px] md:text-[16px] text-[14px] text-[#1C1C1E] font-bold">
                  Business Loan
                </p>
                <button
                  onClick={toggleBusinessLoanForm}
                  className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center align-middle justify-center"
                >
                  <FaTimes className="text-[#282828] text-xl" />
                </button>
              </div>
              <p className="text-[#282828] text-[15px] mb-8">Please fill the form below</p>
              
              <form className="my-4 grid grid-cols-2 gap-4">
                {/* First Name Field */}
                <div className="mb-2 relative">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-[#F5F5F5] pl-10 placeholder:text-[#5A5A5A] text-[15px] border border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2"
                    placeholder="First name"
                    required
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Image src="/images/user.png" alt="Name Icon" width={18} height={18} />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="mb-2 relative">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-[#F5F5F5] pl-10 placeholder:text-[#5A5A5A] text-[15px] border border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2"
                    placeholder="Last name"
                    required
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Image src="/images/user.png" alt="Name Icon" width={18} height={18} />
                  </div>
                </div>

                {/* Phone number input */}
                <div className="relative col-span-2 mb-2">
                  <input
                    type="number"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 py-2 text-[15px] placeholder:text-[#5A5A5A] border border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Image src="/images/call.png" alt="Phone Icon" width={20} height={20} />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative col-span-2 mb-2">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-[15px] pl-12 py-2 placeholder:text-[#5A5A5A] border border-[#BEBEBE] h-[55px] bg-[#F5F5F5] rounded-lg focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Image src="/images/email.png" alt="Email Icon" width={15} height={13} />
                  </div>
                </div>

                {/* Amount Field */}
                <div className="col-span-2 mb-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : '')}
                    className="bg-[#F5F5F5] text-[15px] placeholder:text-[#5A5A5A] border border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2"
                    placeholder="How much do you need"
                    required
                  />
                </div>

                {/* Purpose Field */}
                <div className="col-span-2 mb-2">
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="bg-[#F5F5F5] text-[15px] border placeholder:text-[#5A5A5A] border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2"
                    placeholder="Purpose of the loan"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={toggleSuccess}
                  className="disabled:opacity-50 col-span-2 disabled:cursor-not-allowed block mx-auto w-full font-bold bg-[#282828]  text-[#ffff] font-outfit rounded-full h-[54px] py-1 px-4 text-[18px] mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
        {seeSuccess && (
          <div className="">
            <div className='flex justify-end'>
            <button
                  onClick={toggleBusinessLoanForm}
                  className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center align-middle justify-center"
                >
                  <FaTimes className="text-[#282828] text-xl" />
            </button>

            </div>
            
            <div className="flex flex-col w-full justify-center items-center align-middle my-auto  ">
    <Image src="/images/thumbsup.png" alt="Success" width={80} height={80} className='mt-16' />
    <p className="text-[#282828] lg:text-[20px] md:text-[20px]  text-[18px]  mt-10 font-bold">We have received your application!</p>
    <p className="text-[#282828] text-[14px] lg:text-[16px] md:text-[16px] font-semibold text-center">An account officer will reach out to you within 24hrs</p>
  </div>
            
            <button
              onClick={toggleBusinessLoanForm}
              className="disabled:opacity-50 disabled:cursor-not-allowed block mx-auto lg:w-[395px] md:w-[395px] w-[305px] font-bold bg-[#282828]  text-white font-outfit rounded-full h-[54px] py-1 px-4 text-[18px] mt-24"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessLoanForm;
