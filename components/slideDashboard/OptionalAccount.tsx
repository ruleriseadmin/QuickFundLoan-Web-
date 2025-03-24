import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { bankList } from "@/utils/bankList";
import LoadingPage from '@/app/loading';
import Notification from '@/components/Notification';
import FaceScanLoader from './FaceScanLoader';
import OptionalAccountNotification from './OptionalAccountNotification';
import apiClient from "@/utils/apiClient";

type OptionalAccountProps = {
  isOpen: boolean;
  toggleOptionalAccount: () => void;
};

type UserData = {
  [key: string]: string;
};

const OptionalAccount: React.FC<OptionalAccountProps> = ({ isOpen, toggleOptionalAccount }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [accountNumber, setAccountNumber] = useState<string>("");  
  const [accountName, setAccountName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [bankAccounts, setBankAccounts] = useState<any>([]);
  const [bankCode, setBankCode] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
 const [openOptionalAccountNotification, setOpenOptionalAccountNotification] = useState(false);


  //toggle notification
  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  //toggle notification
  const toggleOptionalAccountNotification = () => {
    setOpenOptionalAccountNotification(!openOptionalAccountNotification);
  };
 

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
          setLoading(true);
          const response = await apiClient.post(
            `/account/verification`,
            { account_number: accountNumber, bank_code: bankCode }
          );
          setAccountName(response?.data?.data?.account_name);
          setLoading(false);
        } catch (error: any) {
          setError(error?.response?.data?.message || "An error occurred, please try again");
          setNotificationOpen(true);
          setLoading(false);
        }
      };

      fetchAccountName();
    }
  }, [accountNumber, bankCode]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setFinalLoading(true);
      // Delay the loading state for a longer time (e.g., 5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 5000));
     
      const response = await apiClient.post(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/account`, 
        { bank_name: selectedOption, account_number: accountNumber, bank_code: bankCode }
      );
      const link = await fetchPaymentLink(bankAccounts[0]?.id);
      window.location.href = link;

      toggleOptionalAccount();
      setFinalLoading(false);
    } catch (error: any) {
      console.log(error.response);
      setError(error?.response?.data?.message || "An error occurred, please try again");
      setNotificationOpen(true);
      setFinalLoading(false);
    }
  };
  
  // Update selected bank and bank code
  const handleBankSelect = (bankName: string, bankCode: string) => {
    setSelectedOption(bankName);
    setBankCode(bankCode);
    setSearchTerm(bankName);
    setDropdownOpen(false);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/profile`);
        setUser(response?.data?.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsersBankAccounts = async () => {
      try {
        const response = await apiClient.get(
          `/account`
        );

        setBankAccounts(response?.data?.data || []);
      } catch (error: any) {
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
      } 
    };

    fetchUsersBankAccounts();
  }, []);

  //function to get direct debit link
 //fetch link for direct debit
 const fetchPaymentLink = async (bankId:number) => {
  try {
    const paymentResponse = await apiClient.post(
      `/account/direct_debit`,
      {bank_account_id: bankId},
    );
    const link = paymentResponse?.data?.data?.payment_link;
    return link;
  } catch (paymentError: any) {
    console.error("Payment Error:", paymentError.response);
    const url = `/dashboard?status=${encodeURIComponent('error')}&title=${encodeURIComponent('Oops!')}&message=${encodeURIComponent(paymentError?.response?.data?.message || 'An error occurred during payment processing.')}`;
    router.push(url); // Redirect to error page

  }
};

  return (
    <>
      {/* OptionalAccount Modal */}
      {isOpen && (
       <div className="fixed top-1/2 left-1/2  transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300">
            {finalLoading ? (
            <FaceScanLoader
              title={`Hi ${user?.first_name || ''},`}
              type='faceScan'
              text="We are conducting a quick check on the information you have provided to determine the best loan offer available for you."
            />
          ) : (
          <div
              className="w-[400px] bg-background lg:ml-32 md:ml-32 mx-2 h-[597px]  font-outfit rounded-[18px] px-6 shadow-md transition-transform duration-300 transform scale-100"
            >
             <p className="text-[16px] text-[#282828] mt-4 font-normal">
             Please provide a second bank account details. This is optional, but it will increase your loan offer amount and eligibility.
      </p>
            <form className="my-4" onSubmit={handleSubmit}>
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
                {loading && <LoadingPage />}
              </div>
              <p className='text-[14px] text-[#5A5A5A] font-normal  text-center'>
                By proceeding, you give us the permission to run a credit 
                check on the information you have provided 
                and collect financial information. 
                You also agree with our 
                <Link href="" className="text-[15px] font-semibold underline underline-offset-2 mx-1 text-[#282828] px-4 flex justify-center">
                  Direct Debit policies.
                </Link>
              </p>
              <div className="w-full flex justify-center items-center gap-3 mt-3">
              <button
                type="submit"
                disabled={!selectedOption || !accountNumber || !accountName || finalLoading}
                className="bg-[#1C1C1E] text-white disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-semibold"
              >
                Next
              </button>
              <button
               onClick={() => {
                toggleOptionalAccountNotification();
               } }
                type="button"
                className="bg-[#46A4B51F] text-[#ED3237] disabled:opacity-50 disabled:cursor-not-allowed h-[47px] mb-4 w-[162px] rounded-[12px] px-4 py-2 mt-4 font-semibold"
              >
                Skip
              </button>

              </div>
              
            </form>
          </div>
        )}
          </div> 
        )} 
        {notificationOpen && (
          <Notification
            message={error}
            isOpen={notificationOpen}
            status="error"
            title="Oops!"
            toggleNotification={toggleNotification}
          />
        )}

       {openOptionalAccountNotification && (
          <OptionalAccountNotification
            isOpen={openOptionalAccountNotification}
            toggleOptionalAccountNotification={toggleOptionalAccountNotification}
          />
        )}
          </> 
        ); 
    }; 
    export default OptionalAccount;