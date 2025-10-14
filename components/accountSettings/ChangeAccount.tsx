'use client'
import { useState, useEffect } from 'react';
import apiClient from '@/utils/apiClient';
import Notification from '../Notification';
import LoadingPage from '@/app/loading';
import Image from 'next/image';



const ChangeAccount = () => {
    const [loading, setLoading] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [banks, setBanks] = useState([]);
    const [authorizedBank, setAuthorizedBank] = useState([]);
    const [userId,setUserId] = useState('')
    const [successNotification, setSuccessNotification] = useState(false);

    const toggleNotification = () => {
        setNotificationOpen(!notificationOpen);
    };

      //toggle notification
  const toggleSuccessNotification = () => {
      setSuccessNotification(!successNotification);
  }

    const handleSaveChanges = async () => {        
        try {
          setLoading(true);
          const response = await apiClient.post(`/account/set_defaut`, 
            { 
              bank_account_id:userId
            });
         setSuccess(response?.data?.message || 'Account updated successfully');
         setSuccessNotification(true);
        
          setLoading(false);
        } catch (error: any) {
          console.log(error.response);
          setError(error?.response?.data?.message || 'An error occurred, please try again');
         setNotificationOpen(true);
          setLoading(false);
        }
        
      };

    useEffect(() => {
          const fetchUsersBankAccounts = async () => {
            try {
                setLoading(true)
              const response = await apiClient.get(
                `/account`
              );
              setBanks(response?.data?.data);
              
                const defaultBank = response?.data?.data.find((bank: any) => bank.default);
                if (defaultBank) setUserId(defaultBank.id);
            } catch (error: any) {
              setError(error?.response?.data?.message || 'An error occurred, please try again');
              setNotificationOpen(true);
            }finally{
                setLoading(false)
            }
          };
      
          fetchUsersBankAccounts();
        }, []);

        console.log('userId',userId)
  return (
    <div className="lg:w-7/12 md:w-10/12 w-11/12 mx-auto lg:ml-14 md:ml-10 h-auto font-outfit mt-10">
      <p className="text-[16px] text-[#282828]">
       Change the bank account you want to receive <br/> your disbursed loan. 
      </p>

      {loading && <LoadingPage/>}
      <div className='mt-10'>
        {banks.length > 0 && (
        banks.map((bank: any) => (
            <div key={bank.id} className=' h-auto min-h-[76px] mb-2 bg-[#F5F5F5] flex justify-between px-4 items-center  rounded-[8px]'>
<div className='flex justify-start'>
     <input
                    type="radio"
                    id={`bank-${bank.id}`}
                    name="bank"
                    value={bank.id}
                    disabled={bank.authorization_code !== 'complete'}
                    checked={bank.id === userId}
                    onChange={() => {
                        setUserId(bank.id)
                    }}
                    
                   
                    className="w-6 h-6   bg-gray-100 rounded-full accent-[#F6011BCC] border-2 border-[#C4C4C4] focus:ring-[#C4C4C4]"
                  />
                  <label
                    htmlFor={`tenor-${bank.id}`}
                    className={`ml-4 font-medium ${bank.authorization_code === 'complete' ? 'text-[#282828]' : 'text-[#C4C4C4]'}  lg:text-[16px] text-[12px] `}
                  >
                    {bank.bank_name} - {bank.account_number}
                   
                  </label>
</div>
<div 


className={`min-w-[164px] w-auto cursor-pointer text-nowrap  h-[32px] ${ bank.authorization_code === 'complete' ? 'bg-[#000000]' : 'bg-[#E05F2C]'} flex justify-center px-2 items-center rounded-[22px]`}>
     <Image
                       src='/images/bankMandate.png'
                       width={15}
                       height={15}
                       alt="eMandate"
                     />
                           <p className='lg:text-[13px] md:text-[13px] text-[10px] text-[#FFFFFF]'>{bank.authorization_code === 'complete' ? 'E-mandate activated' : 'E-mandate pending'}</p>

</div>
           
                </div>
        ))
    )}
     <button
            className={`flex justify-center  mt-10 disabled:opacity-50 items-center font-outfit rounded-full w-[140px]  bg-[#282828] disabled:bg-[#28282880] text-[#ffff] h-[41px] py-1 px-4  transition-colors duration-300`}
            type="button"
            disabled={loading || !userId}
            onClick={handleSaveChanges}
          >
            Save changes
          </button>

      </div>
    

      {success && (
        <Notification
          message={success}
          toggleNotification={toggleSuccessNotification}
          isOpen={successNotification}
          status='success'
        />
      )}

         {error && 
            <Notification 
            message={error} 
            toggleNotification={toggleNotification} 
            isOpen={notificationOpen}
            status='error'
            
            />}
      
    </div>
  )
}

export default ChangeAccount
