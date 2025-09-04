import {FaTimes} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from "react";
import apiClient from '@/utils/apiClient';
import Image from 'next/image';
import OptionalMandate from './OptionalMandate';
import LoadingPage from '@/app/loading';
import Link from 'next/link';


type BankMethodProps = {
  isOpen: boolean;
  toggleBankMethod: () => void;
};

const BankMethod: React.FC<BankMethodProps> = ({ isOpen, toggleBankMethod }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [accountNumber, setAccountNumber] = useState<string | ''>('');  
  const [accountName, setAccountName] = useState<string>('');
  const [bankNameLoading, setBankNameLoading] = useState(false);
  const [bankList, setBankList] = useState<any[]>([]);
  const [showLinkAccount, setShowLinkAccount] = useState(true);
  const [showOptionalMandate, setShowOptionalMandate] = useState(false);
  const [bankId, setBankId] = useState<number | string>('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [bankCode, setBankCode] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  //handle show optional mandate  
  const handleShowOptionalMandate = () => {
    setShowLinkAccount(false);
    setShowOptionalMandate(true);
  }
  
     
   useEffect(() => {
        const fetchUsersBankAccounts = async () => {
          try {
            const response = await apiClient.get(
              `/get-banks`
            );
    
            setBankList(response?.data?.data || []);
          } catch (error: any) {
            console.error('Error fetching user bank accounts:', error);
          } 
        };
    
        fetchUsersBankAccounts();
      }, []);
    


  // Filtered bank list based on search term
  const filteredBanks = bankList?.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      const fetchAccountName = async () => {
        try {
          setBankNameLoading(true);
          const response = await apiClient.post(
            `/account/verification`,
            { account_number: accountNumber, bank_code: bankCode });
          setAccountName(response?.data?.data?.account_name);
          setBankNameLoading(false);
        } catch (error: any) {
          const url = `/payment-methods?status=${encodeURIComponent('error')}&message=${encodeURIComponent(
            error?.response?.data?.message || 'An error occurred, please try again')}`;
          router.push(url);
          setBankNameLoading(false);
        }
      };

      fetchAccountName();
    }
  }, [accountNumber, bankCode]);

 

  // Handle form submission
  const handleDoneClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post(`/account`, 
        { bank_name: selectedOption, account_number: accountNumber, bank_code: bankCode });
        

      
      if (response?.data?.data?.id) {

       setBankId(response?.data?.data?.id);
       setLoading(false);
       handleShowOptionalMandate();
      }

    } catch (error: any) {
      console.log( error.response);
      router.push(`/payment-methods?status=error&message=${ error?.response?.data?.message || 'Your Bank account could not be linked. Please try again'}`);
      setLoading(false);
    }
  };
  
  // Update selected bank and bank code
  const handleBankSelect = (bankName: string, bankCode: string) => {
    setSelectedOption(bankName);
    setBankCode(bankCode);
    setSearchTerm(bankName);
    setDropdownOpen(false);
  };

  return (
    <div
    onClick={toggleBankMethod}
      className={`fixed inset-0 z-20 flex bg-black bg-opacity-50 mt-0 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white  w-11/12 lg:w-4/12 md:w-6/12 p-6  overflow-y-auto h-auto relative transform transition-transform duration-300 ease-in-out ${
           isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full mx-auto rounded-[22px]">
          {showLinkAccount && (
            <>
            <div className='flex align-middle items-center justify-start'>
           
            <p className="flex-grow lg:text-[18px] md:text-[16px] text-[14px] text-[#1C1C1E] font-bold ml-6">
              Link your bank account
            </p>
            <button
              onClick={toggleBankMethod}
              className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center justify-center"
            >
              <FaTimes className="text-navfont text-2xl" />
            </button>
          </div>
          <div className={`w-full font-outfit font-normal ${loading ? 'overflow-hidden' : 'overflow-y-auto'}`}>

          <div className="bg-[#904A3F] w-full  h-[120px] relative rounded-[12px] mt-6 flex items-center">
  <Image
    src="/images/linkaccount.png"
    alt="link-account-image"
    layout="fill"
    objectFit="cover"
    className="m-auto rounded-[12px]"
  />
  <p className="text-[#FFFFFF] text-[15px]  px-4 font-light z-10">
    This is where you will receive your loan disbursement.
    Ensure that your registration phone number is linked to this bank account to increase eligibility.
  </p>
</div>

<form className="my-4" onSubmit={handleDoneClick}>
        <div className="mb-4">
          <label htmlFor="bank" className="text-[#5A5A5A] mt-8 ml-6 text-[15px] font-semibold">
            Bank name <span className='text-[#ED3237]'>*</span>
          </label>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setDropdownOpen(true)}
            onFocus={() => setDropdownOpen(true)}
            className="relative bg-[#F5F5F5] border-2 border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            placeholder="Search or select bank"
          />

          <div className="relative" ref={dropdownRef}>
            {dropdownOpen && (
              <div className="absolute z-10 bg-white border border-[#BEBEBE] rounded-lg w-full max-h-[200px] overflow-y-auto mt-2 shadow-lg">
                {filteredBanks.length > 0 ? (
                  filteredBanks.map((bank, index) => (
                    <div
                      key={index}
                      onClick={() => handleBankSelect(bank.name, bank.code)}
                      className="cursor-pointer px-4 py-2 hover:bg-[#F5F5F5] text-[#1C1C1E]"
                    >
                      {bank.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-[#5A5A5A]">No banks found</div>
                )}
              </div>
            )}
          </div>
        </div>


        {/* Account Number Field */}
        <div className="mb-4">
          <label htmlFor="accountNumber" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
            Account Number <span className='text-[#ED3237]'>*</span>
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="bg-[#F5F5F5] border-2 text-[#5A5A5A] border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            placeholder="Enter your account number"
            required
          />
        </div>

        {/* Account Name Field */}
        <div className="mb-4">
          <label htmlFor="accountName" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
            Account Name 
          </label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="bg-[#F5F5F5] border-2 border-solid border-[#BEBEBE] w-full h-[55px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            placeholder="Enter your account name"
            disabled
            required
          />
        </div>

        <div className="flex justify-center">
          {bankNameLoading && <LoadingPage />}
        </div>
        <p className='text-[15px] text-[#5A5A5A] font-semibold mt-4 text-center'>
      By proceeding, you give us the permission to run credit 
      check on the information you have provided 
      and collect financial information. 
      You also agree with our 
     
                  .
      </p>
      <Link href="" className="text-[15px] font-semibold underline underline-offset-2 mx-1 text-[#282828] px-4 flex justify-center">
      Direct Debit policies.
        </Link>
        {loading && <LoadingPage />}
        <button
          type="submit"
          disabled={ !selectedOption || !accountNumber || !accountName || loading }
          className="bg-[#1C1C1E] text-white disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-full rounded-[8px] px-4 py-2 mt-4 font-semibold"
        >
          Next
        </button>
      </form>

          </div>
          </>
          ) }
          {showOptionalMandate && (
            <OptionalMandate id={bankId}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankMethod;
