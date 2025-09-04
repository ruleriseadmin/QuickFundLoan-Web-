import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from "react";
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import BankReason from './BankReason';


type LinkAcctountProps = {
  handleCard: () => void;
  
};

const LinkAccount:React.FC<LinkAcctountProps> = ({handleCard}) => {
   const [selectedOption, setSelectedOption] = useState("");
    const [accountNumber, setAccountNumber] = useState<string | ''>('');  
    const [accountName, setAccountName] = useState<string>('');
    const [bankNameLoading, setBankNameLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [bankList, setBankList] = useState<any[]>([]);
    const router = useRouter();
    const [bankCode, setBankCode] = useState<string>('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [openBankReason, setOpenBankReason] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
  
  

  const toggleSlideCard = () => {
    if (!openBankReason) {
      setOpenBankReason(true); // Open the modal when it is currently closed
    } else {
      setIsExiting(true); // Start exit animation
      setTimeout(() => {
        setIsExiting(false);
        setOpenBankReason(false); // Close the modal after exit animation
      }, 300);
    }
  };

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
      handleCard();
  
    } catch (error: any) {
      console.log( error.response);
      router.push(`/dashboard?status=error&message=${ error?.response?.data?.message || 'Your Bank account could not be linked. Please try again'}`);
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
  <div className='w-full mx-auto font-outfit font-normal'>
        <div className="w-full mx-auto rounded-[22px]">
          <div className={`w-full font-outfit font-normal ${loading ? 'overflow-hidden' : 'overflow-y-auto'}`}>

  <p className="text-[#904A3F] text-[18px] p-2  font-semibold mt-2 z-10">
  This the account you will receive your loan.
  Ensure you’re using your most active bank account for better eligibility.
  </p>


<form className="my-4" onSubmit={handleDoneClick}>
        <div className="mb-4">
          <label htmlFor="bank" className="text-[#5A5A5A] mt-10 ml-4 text-[15px] font-semibold">
          Select your bank <span className='text-[#ED3237]'>*</span>
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
          <label htmlFor="accountNumber" className="text-[#5A5A5A] text-[15px] font-semibold ml-4">
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
          <label htmlFor="accountName" className="text-[#5A5A5A] text-[15px] font-semibold ml-4">
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
          <button 
          type="button"
          onClick={() => setOpenBankReason(true)}
          className='font-medium text-[15px] mt-1 text-[#ED3237]'>Can’t find your bank? See why</button>
        </div>

        <div className="flex justify-center">
          {bankNameLoading && <LoadingPage />}
        </div>
        <p className='text-[15px] text-[#5A5A5A] font-normal mt-10 text-center'>
      By proceeding, you give us the permission to run credit 
      check on the information you have provided 
      and collect financial information. 
      You also agree with our 
     
                  .
      </p>
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

          
        </div>
        {/* Bank Reason Modal */}
        {openBankReason && (
          <BankReason 
          toggleBankReason={toggleSlideCard}
           isOpen={!isExiting} />
        )
        
        }

        
      </div>

    
  );
};
export default LinkAccount;