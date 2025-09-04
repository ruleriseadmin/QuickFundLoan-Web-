'use client';
import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import Image from 'next/image';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';
import { usePathname } from 'next/navigation';

type MonoScreenProps = {
  isOpen: boolean;
  toggleMonoPayment: () => void;
  toggleRemoveOverflow?: () => void;
  bank: { [key: string]: any };
};

const MonoScreen: React.FC<MonoScreenProps> = ({
  isOpen,
  toggleMonoPayment,
  toggleRemoveOverflow,
  bank,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sentMoney, setSentMoney] = useState(false);
  const [bankDetails, setBankDetails] = useState<
    { id: string; bank_name: string; account_number: string; icon?: string }[]
  >([]);
  const [copyMessages, setCopyMessages] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState('');
  const [loadingPending, setLoadingPending] = useState(false);
  const loadingRef = useRef(false);
  const pathname = usePathname();

useEffect(() => {
  const fetchPaymentLink = async () => {
    if (!bank?.id || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const paymentResponse = await apiClient.post(`/account/direct_debit`, {
        bank_account_id: bank.id,
      });

      setBankDetails(paymentResponse?.data?.data?.transfer_destinations || []);
      setMessage(paymentResponse?.data?.message || '');
    } catch (error: any) {
      console.error('Error:', error.response);
      router.push(`/dashboard?status=error&message=${ error?.response?.data?.message || 'An error occurred'}`);
      
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  fetchPaymentLink();
}, [bank?.id]);


  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessages((prev) => ({ ...prev, [key]: 'Copied!' }));

    setTimeout(() => {
      setCopyMessages((prev) => ({ ...prev, [key]: '' }));
    }, 2000);
  };

  

  const changeMandateStatus = async () => {
    try {
      setLoadingPending(true);
      const response = await apiClient.get(`/account/mono/${bank?.id}/confirm-payment`);
      console.log('Mandate status changed:', response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingPending(false);
    }
  };

  //verify if the user has sent money
  const verifyPayment = async () => {
    try {
      const response = await apiClient.get(`/account/mono/${bank?.id}/verify-payment`);
      
     
    } catch (error: any) {
      console.error('Error:', error.response);
    } finally {
        window.location.reload();
    }
  }

  return (
    <div
      onClick={() => {
        toggleMonoPayment();
        toggleRemoveOverflow?.();
      }}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-full h-screen flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full min-h-[474px] h-auto card-content ${
          isOpen ? 'card-enter' : 'card-exit'
        } p-6  ${pathname === '/payment-methods' ? 'lg:mt-[284px] md:mt-[290px] mt-[270px]' : 'lg:mt-[100px] md:mt-[100px] mt-[150px]'}  font-outfit rounded-[22px] shadow-md`}
      >
        {bankDetails.length > 0 && (
          <div>
            <Image src="/images/icon.png" alt="Logo" width={91} height={37} />
            <p className="mt-4 font-outfit text-[17px] font-medium text-[#282828]">
              {message.split('to')[0]} - {bank?.account_number}.{' '}
              <span className="font-light">Pay to any of the account below.</span>
            </p>

            {loading ? (
              <LoadingPage />
            ) : (
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-6">
                {bankDetails.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#F2F2F2] w-full p-4 rounded-[12px] min-h-[179px] h-auto"
                  >
                    <Image
                      src={item.icon ?? '/images/quickfundlogo.png'}
                      alt="Icon"
                      width={30}
                      height={30}
                    />
                    <p className="mt-3">
                      <span className="text-[15px] text-[#5A5A5A] font-normal">Bank</span>
                      <br />
                      <span className="text-[15px] text-[#A92125] font-bold">
                        {item?.bank_name}
                      </span>
                    </p>
                    <p className="mt-3">
                      <span className="text-[15px] text-[#5A5A5A] font-normal">A/C Number</span>
                      <br />
                      <span className="text-[15px] text-[#A92125] font-bold">
                        {item?.account_number}
                      </span>
                      <span
                        onClick={() => handleCopy(item.account_number, `accountNumber_${index}`)}
                        className="cursor-pointer bg-[#282828] border border-solid px-2 py-1 ml-2 w-[46px] h-[19px] rounded-[7px] font-semibold hover:text-gray-300 text-[#D7D7D7] text-[10px]"
                        tabIndex={0}
                        role="button"
                        onKeyPress={(e) =>
                          e.key === 'Enter' &&
                          handleCopy(item.account_number, `accountNumber_${index}`)
                        }
                      >
                        Copy
                      </span>
                    </p>
                    {copyMessages[`accountNumber_${index}`] && (
                      <span className="ml-2 text-green-400 text-sm">
                        {copyMessages[`accountNumber_${index}`]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!sentMoney ? (
              <button
                type="button"
                onClick={async () => {
                pathname !== '/payment-methods' ?  await changeMandateStatus() : ''
                  setSentMoney(true);
                }}
                className="text-[#5A5A5A] flex justify-center w-full items-center font-semibold text-[16px]"
              >
                <p>I Have Transferred The Money</p>
              </button>
            ) : loadingPending ? (
              <div className="flex justify-center items-center w-full ">
                <ThreeDots
                  height="19"
                  width="38"
                  radius="8"
                  color="#282828"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center text-center space-y-2 mt-4">
                <div className="flex items-center justify-center w-full  p-3 rounded-lg">
                  <BsExclamationDiamondFill className="text-[#0A48B2] text-2xl mr-2" />
                  <span className="text-[#5A5A5A] font-semibold text-[16px]">
                    We are currently confirming your payment
                  </span>
                </div>
                <p className="text-[16px] text-[#282828] font-normal lg:w-8/12 ">
                  Please ensure you have paid this amount before you refresh
                </p>
                <p 
                onClick={async() => await verifyPayment()}
                className="text-[18px] font-medium text-[#F6011BCC] cursor-pointer underline">
                  Refresh Page
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonoScreen;
