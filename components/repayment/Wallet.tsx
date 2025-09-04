import { useState, useEffect } from 'react';
import apiClient from '@/utils/apiClient';
import LoadingPage from '@/app/loading';
import { useRouter } from 'next/navigation';


interface Account {
  bank_name: string;
  account_number: string;
  account_name: string;
}

type WalletProps = {
  toggleRepayment: () => void;
  handleShowOptions: () => void;
  amount: number | null;
  loanId: number | null;
};

const Wallet: React.FC<WalletProps> = ({ toggleRepayment, handleShowOptions,loanId,amount }) => {
  const [copyMessages, setCopyMessages] = useState<{ [key: string]: string }>({});
  const [walletAccount, setWalletAccount] = useState<Account[]>([]); 
  const [error, setError] = useState<string>('');
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [bankLoading, setBankLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersWalletAccount = async () => {
      try {
        setBankLoading(true);
        const response = await apiClient.get(
          `/account/virtual`
        );

        setWalletAccount(response?.data?.data || []);
      } catch (error: any) {
        console.error(error?.response);
        setError(error?.response?.data?.message || 'An error occurred, please try again');
        setNotificationOpen(true);
      } finally {
        setBankLoading(false);
      }
    };

    fetchUsersWalletAccount();
  }, []);

  // Function to copy text
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessages((prev) => ({ ...prev, [key]: "Copied!" }));

    setTimeout(() => {
      setCopyMessages((prev) => ({ ...prev, [key]: "" }));
    }, 2000);
  };

  const router = useRouter();

  return (
    <div className="w-full mx-auto font-outfit">
      <p className="text-[#282828] text-[15px] mt-8">
        Money transferred to this account will automatically <br /> update your loan status.
      </p>

      {bankLoading ? (
        <LoadingPage />
      ) : walletAccount.length > 0 ? (
        <div className="mt-8 mr-6 w-10/12 ">
          <table className="w-full  min-h-[98px] h-auto bg-gradient7 text-[#FFFFFF] rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="text-[11px]">
                <th className="pt-6 px-2 lg:px-4 md:px-4 text-left">BANK</th>
                <th className="pt-6 px-2 lg:px-4 md:px-4 text-left">ACC NUMBER</th>
                <th className="pt-6 px-2 lg:px-4 md:px-4 text-left">ACC NAME</th>
              </tr>
            </thead>
            <tbody>
              {walletAccount.map((account, index) => (
                <tr key={index} className="mb-0 p-0 lg:text-[13px] text-[13px]">
                  <td className="px-2 lg:px-4 md:px-4 text-left">
                    <span
                      onClick={() => handleCopy(account.bank_name, `bank_${index}`)}
                      className="cursor-pointer hover:text-gray-300"
                      tabIndex={0}
                      role="button"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleCopy(account.bank_name, `bank_${index}`)
                      }
                    >
                      {account.bank_name}
                    </span>
                    <br />
                    {copyMessages[`bank_${index}`] && (
                      <span className="ml-2 text-green-400 text-sm">{copyMessages[`bank_${index}`]}</span>
                    )}
                  </td>
                  <td className="px-2 lg:px-4 md:px-4 text-left">
                    {account.account_number}
                    <span
                      onClick={() => handleCopy(account.account_number, `accountNumber_${index}`)}
                      className="cursor-pointer bg-[#282828] border-navfont border border-solid px-2 py-1 ml-2 w-[46px] h-[19px] rounded-[7px] font-semibold hover:text-gray-300 text-[#D7D7D7] text-[10px]"
                      tabIndex={0}
                      role="button"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        handleCopy(account.account_number, `accountNumber_${index}`)
                      }
                    >
                      Copy
                    </span>
                    <br />
                    {copyMessages[`accountNumber_${index}`] && (
                      <span className="ml-2 text-green-400 text-sm">
                        {copyMessages[`accountNumber_${index}`]}
                      </span>
                    )}
                  </td>
                  <td className="px-2 lg:px-4 md:px-4 text-left">
                    <span
                      onClick={() => handleCopy(account.account_name, `accountName_${index}`)}
                      className="cursor-pointer hover:text-gray-300"
                      tabIndex={0}
                      role="button"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        handleCopy(account.account_name, `accountName_${index}`)
                      }
                    >
                      {account.account_name}
                    </span>
                    <br />
                    {copyMessages[`accountName_${index}`] && (
                      <span className="text-green-400 text-sm">
                        {copyMessages[`accountName_${index}`]}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="my-16 text-center text-gray-500">No virtual account available</p>
      )}

      <button
        onClick={handleShowOptions}
        className="text-[#F24C5D] mt-12 text-start hover:text-[red] disabled:cursor-not-allowed disabled:opacity-50 text-[15px] rounded-[45px] py-2 my-2 font-semibold"
      >
        Change Payment Method
      </button>

      <button
      type='button'
      onClick={() => {
        router.push(
          '/dashboard?status=success&title=Repayment in progress&subMessage=Your loan status will automatically update upon successful payment'
        );
        toggleRepayment();
      }}
        className="bg-[#F83449] mt-16 text-white disabled:cursor-not-allowed disabled:opacity-50 h-[47px] w-full rounded-[45px] px-4 py-2 my-2 font-semibold"
      >
        Continue
      </button>
    </div>
  );
};

export default Wallet;
