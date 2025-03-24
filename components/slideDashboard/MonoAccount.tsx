import { useState,useEffect } from 'react';
import { customAlphabet } from "nanoid";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { decryptToken } from "../../utils/protect";
import Notification from '../Notification';
import LoadingPage from '@/app/loading';


type MonoPageProps = {
  isOpen: boolean;
  toggleMonoAccount: () => void;
};

const MonoPage : React.FC<MonoPageProps> = ({ isOpen, toggleMonoAccount }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [bankId, setBankId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [notification, setNotification] = useState(false);
  const [closeMono, setCloseMono] = useState(false);

  const toggleNotification = () => {
    setNotification(!notification);
  };


  const openMonoWidget = async () => {
    try {
      const MonoConnect = (await import('@mono.co/connect.js')).default;

      const customer = { id: '67591d0aa357ae930effa33c' }

      const monoInstance = new MonoConnect({
        key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY || '',
        scope: 'auth',
        data: { customer },
        onClose: () => {
          console.log('Widget closed')
          setCloseMono(true);
        },
        onLoad: () => {
          console.log('Mono widget loaded');
          setScriptLoaded(true);
        },

        onEvent: (eventName, data) => {
          console.log(eventName);
          console.log(data);
          if (eventName === 'INSTITUTION_SELECTED') {
            setBankId(data.institution.id);
          }
        },
        onSuccess: ({ code}) => {
          console.log(`Linked successfully: ${code}`);
        },
      });

      monoInstance.setup()
      monoInstance.open()
    } catch (error) {
      console.error('Failed to load Mono widget:', error);
    }
  };

 

useEffect(() => {
    const SendMonoId = async () => {
      console.log('Sending mono id from function');
      try {
        setLoading(true);
        const token = await decryptToken();
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/account/mono_id`,
          { mono_id: bankId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'x-api-key': process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY,
            },
          }
        );
        
        console.log('sending mono info', response.data);
        window.location.reload();
        setLoading(false);
      } catch (error:any) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          'An error occurred, please try again';
        setError(errorMessage);
        setNotification(true);
        setLoading(false);
      }
    };

    if (closeMono && bankId ) {
      console.log('Sending mono id');
      SendMonoId();
    }else{
      console.log('No bank id');
    }
  }, [closeMono, bankId]);



  return (
    <>
      {/* Modal for Mono Account */}
      {isOpen && (
        <div
          onClick={toggleMonoAccount}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`h-[347px] notifybanner w-[383px]  rounded-[22px] p-6 shadow-md`}
          >
            <div className="flex flex-col items-center justify-center h-full">
             
              <div className="mt-6">
              {loading && <LoadingPage/>}
                <button
                  onClick={openMonoWidget}
                  
                  className={`px-6 py-3 text-white bg-[#282828]  font-medium rounded-[12px] shadow-md `}
                >
                 {loading ? 'Linking...' : 'Link Account'}
                </button>
              </div>
            </div>
          </div>
          {notification && (
             <Notification
             isOpen={notification}
             status="error"
             
             message={error}
             toggleNotification={toggleNotification}
           />
          )}

        </div>
      )}
    </>
  );
};

export default MonoPage;
