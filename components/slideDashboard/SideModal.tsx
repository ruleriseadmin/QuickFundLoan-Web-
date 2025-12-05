'use client';
import { useState, useEffect } from "react";
import LinkAccount from "./LinkAccount";
import PersonalInfo from "./PersonalInfo";
import VerifyIdentity from "./VerifyIdentity";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/apiClient";
import CardLink from "./CardLink";
import Card from "./Card";


type SideModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};



const SideModal: React.FC<SideModalProps> = ({ isOpen, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [card,setCard] = useState(false);
  const [cardLink, setCardLink] = useState(false);
  const [linkAccount, setLinkAccount] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [verifyIdentity, setVerifyIdentity] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [onboarding, setOnboarding] = useState<any>({});
  const [debitMessage, setDebitMessage] = useState('');
  const directDebitReference : string | null = localStorage.getItem('direct_debit')
  const [bankCodeRan, setBankCodeRan] = useState(false)
  const card_reference : string | null = localStorage.getItem('card_reference')
   const [messageCard, setMessageCard] = useState('');
  


  //get the state of the modal
 useEffect(() => {
  const fetchBoardingProcess = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/onboarding`);
      setOnboarding(response?.data?.data);
    } catch (error: any) {
      console.log(error.response);
      //const url = `/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent(error?.response?.data?.message ||  'An error occurred, please try again')}`;
      //router.push(url);
      setLoading(false);
    } 
  };
  fetchBoardingProcess();
  }, []);

  useEffect(() => {
    const fetchUsersBankAccounts = async () => {
      try {
        const response = await apiClient.get(
          `/account`
        );

        setBankAccounts(response?.data?.data || []);
      } catch (error: any) {
        console.log(error)
      } finally{
        setBankCodeRan(true)
      }
    };

    fetchUsersBankAccounts();
  }, []);

    //verify account direct debit
  useEffect(() => {
    const verifyPayment = async () => {
      if (directDebitReference && bankAccounts.length > 0 && bankAccounts.filter((account) => account?.authorization_code  === 'pending').length > 0) {
        try {

          const response = await apiClient.get(
            `/paystack/verify/${directDebitReference}`,
          );
          setDebitMessage(response?.data?.message);

        } catch (error: any) {
          console.error('Error during payment verification:', error);
        } 
      }
    };

    verifyPayment();
  }, [directDebitReference, bankAccounts]);

  //verify card tokenization
    useEffect(() => {
      const verifyCardTokenization = async () => {
        if (onboarding && !onboarding.card_tokenized && card_reference) {
         
          try {
            const response = await apiClient.get(
              `/paystack/verify/${card_reference}`
            );
            if(response?.data?.message === "Successful") {
              setMessageCard(response?.data?.message);
            }
            
            
          } catch (error: any) {
            console.log('error',error?.response?.data);
            router.push(
              `/dashboard?status=error&message=${
                error?.response?.data?.message || 'An error occurred'
              }`
            );
          }
        }
      };
      if(onboarding)
      verifyCardTokenization();
    }, [onboarding, card_reference]);




const showCard = () => {
 setCard(true)
  setLinkAccount(false);
  setPersonalInfo(false);
  setCardLink(false);
  setVerifyIdentity(false);
  setOnboarding(null);
  
}

  const showLinkAccount = ( ) => {
    setCard(false);
    setLinkAccount(true);
    setCardLink(false);
    setPersonalInfo(false);

    setVerifyIdentity(false);
  };

  const showPersonalInfo = () => {
    setCard(false);
    setLinkAccount(false);
    setPersonalInfo(true);
    setCardLink(false);

    setVerifyIdentity(false);
  };


  const showVerifyIdentity = () => {
    setCard(false);
    setLinkAccount(false);
    setPersonalInfo(false);
    setVerifyIdentity(true);
    setCardLink(false);
    
  };

  const showCardLink = () => {
    setCard(false);
    setLinkAccount(false);
    setPersonalInfo(false);
    setVerifyIdentity(false);
    setCardLink(true);
  }


  useEffect(() => {
    if (bankAccounts.length === 1 && bankAccounts[0]?.authorization_code === 'complete'){
      localStorage.removeItem('direct_debit')
      localStorage.removeItem('timerStartTime')
    }
  }, [bankAccounts]);

  useEffect(() => {
    if (card_reference && onboarding?.card_tokenized ) {
      localStorage.removeItem('card_reference')
    }
  }, [card_reference, onboarding?.card_tokenized]);

   

useEffect(() => {
  const handleOnboarding = async () => {
    if (!onboarding) return;
  if (!onboarding?.profile_exists ) {
       showPersonalInfo();
    } else if (!onboarding?.bank_account_exists) {
      showLinkAccount();
    } else if (
      !onboarding?.card_tokenized && messageCard) {
        const url = `/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent('Your card has been successfully tokenized. Please wait while we confirm your details.')}`;
        router.push(url);
    } else if (
      !onboarding?.card_tokenized) {
      await showCard();
    }else if (
      onboarding?.has_expired_card) {
       await showCard();
    } else if(!onboarding.bvn_nin_exists || !onboarding?.bvn_nin_is_verified) {
      showVerifyIdentity();
    } else if (onboarding.live_check === 'completed' && bankAccounts[0]?.authorization_code !== 'complete' && debitMessage  && debitMessage !== 'Authorization does not exist or does not belong to integration'){
      router.push(
        '/dashboard?message=Dear customer'
      );
    }
  };

  handleOnboarding();
}, [onboarding, bankAccounts, messageCard]);

    

  return (
    <div
    onClick={closeModal}
      className={`fixed inset-0 z-50 flex bg-black bg-opacity-50 mt-0 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white h-auto w-[400px] lg:w-4/12 md:w-[430px]  px-6 pt-4 relative transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex gap-4 items-center w-full  align-middle p-2`}>
          

          {/* Title */}
          <p className="flex-grow lg:text-[18px] md:text-[16px] text-[18px] text-[#1C1C1E] font-normal text-center">
            { linkAccount
              ?  'Link your active bank account'
              : card ? ''
              : cardLink ? 'Securely link your card'
              : personalInfo
              ? "Personal Information"
              : "BVN Verification"}
          </p>

          {/* Close Button Positioned with Flex */}
          <button
            onClick={closeModal}
            className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center justify-center"
          >
             <FaTimes className="text-navfont text-2xl" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto max-h-[80vh]">
          {/* Conditional Content */}
          
          {personalInfo && <PersonalInfo handleLinkAccount={showLinkAccount}  />}
          {linkAccount && <LinkAccount handleCard={showCard} /> }
          {card && <Card handleCardLink={showCardLink} />}
          {cardLink && <CardLink handleVerifyIdentity={showVerifyIdentity} />}
          {verifyIdentity && <VerifyIdentity onboarding={onboarding} closeModal={closeModal}
          
          />}
        </div>
      </div>
    </div>
  );
};

export default SideModal;