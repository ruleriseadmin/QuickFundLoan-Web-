'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactForm from '@/components/contactus/ContactForm';
import SlideContactForm from './contactus/SlideContactForm';
import Entry from './getStarted/Entry';
import { decryptToken } from '@/utils/protect';
import { useRouter } from 'next/navigation';


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();
   const router = useRouter();
  

   //open login modal
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  

    //close login modal
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  // Toggle contact form
  const toggleContact = () => {
    setOpenContact(!openContact);
  };

  // Check if user is logged in
    const handleCheckUserStatus = async() => {
      const token = await decryptToken();
      if (token) {
        router.push('/dashboard');
      } else {
        handleOpenModal();
      }
    }
  

    const navigateToHero2 = () => {
      
      router.push('/?section=hero2'); // Navigates to landing page with the query parameter
    };


  const toggleSlideContact = () => {
    if (!openContactModal) {
      setOpenContactModal(true); // Open the modal when it is currently closed
    } else {
      setIsExiting(true); // Start exit animation
      setTimeout(() => {
        setIsExiting(false);
        setOpenContactModal(false); // Close the modal after exit animation
      }, 300);
    }
  };
  


  const isActive = (route: string) => {
    return route === pathname ? 'text-[#F6011BB2]' : 'text-navfont';
  };

  return (
    <>
      <nav className={`w-full lg:11/12 md:w-11/12 h-[78px] lg:bg-navcolor md:bg-navcolor ${pathname === '/' ? 'bg-[#ffffff]' : 'bg-background'} relative mx-auto lg:rounded-full md:rounded-full rounded-none lg:shadow-[0_0_15px_0_#0000000D] md:shadow-[0_0_15px_0_#0000000D] lg:backdrop-blur-[8px] md:backdrop-blur-[8px] pb-10 lg:mb-10 md:mb-10 z-50`}>
        <div className="absolute flex  justify-between w-full items-center align-middle lg:mt-1 md:mt-[12px] lg:py-2 md:py-1 ">
          <Link href="/">
            <Image
              src="/images/quick-logo.png"
              width={128}
              height={52}
              alt="logo"
              className="lg:ml-8 ml-6 md:ml-2"
            />
          </Link>

          <div className="md:hidden lg:hidden text-[#282828] mr-6">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h10" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18h13" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex md:flex justify-center items-center font-outfit gap-6 font-medium text-[14px] md:text-[15px] lg:md:text-[18px] ">
          <button
      
      className="py-2 text-navfont text-[18px] hover:text-[#F6011BB2] ml-4 transition-colors duration-300"
      onClick={navigateToHero2}
    >
      Loan solutions
    </button>
           
            <button 
            className={`hover:text-[#F6011BB2] ${isActive('')}`}
            onClick={toggleContact}
            >
              Contact
            </button>
           
          </div>
          <button
            onClick={handleCheckUserStatus}
            className="bg-[#282828] hidden lg:flex md:flex hover:bg-[#F6011BB2] text-white font-outfit font-bold rounded-full lg:w-[146px] m:w-[126px] h-[54px] text-center md:py-4 md:px-6 lg:items-center lg:text-[18px] lg:justify-center lg:mr-8 mr-4 md:text-[15px]"
          >
           Apply now
          </button>
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-20 z-40"
              onClick={() => setMenuOpen(false)}
            ></div>

            <div className="md:hidden lg:hidden absolute top-[60px] right-3 w-8/12 min-h-[415px] h-auto bg-white rounded-xl shadow-lg flex flex-col items-start font-outfit font-medium py-4 z-50">
              <Link
                href="#hero2"
                className={`py-2 text-navfont text-[18px] hover:text-[#F6011BB2] ml-4 transition-colors duration-300 ${isActive(
                  ''
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Loan solutions
              </Link>
              <Link
                href="/aboutus"
                className={`py-2 ml-4 text-navfont text-[18px] hover:text-[#F6011BB2] transition-colors duration-300 ${isActive(
                  '/aboutus'
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                About us
              </Link>
              <button
                
                className={`py-2 ml-4 text-navfont text-[18px] hover:text-[#F6011BB2] transition-colors duration-300 ${isActive(
                  '/aboutus'
                )}`}
                onClick={() => {
                  toggleSlideContact();
                  setMenuOpen(false); // Close the mobile menu
                }}
              >
                Contact
              </button>
              
              <Link
                href="/faq"
                className={`py-2 ml-4 text-navfont text-[18px] hover:text-[#F6011BB2] transition-colors duration-300 ${isActive(
                  '/faq'
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/career"
                className={`py-2 ml-4 text-navfont text-[18px] hover:text-[#F6011BB2] transition-colors duration-300 ${isActive(
                  '/career'
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Career
              </Link>

              <button
                onClick={() => {
                  handleCheckUserStatus();
                  setMenuOpen(false); // Close the mobile menu
                }}
                className="py-2 ml-4 text-navfont text-[18px] hover:text-[#F6011BB2] transition-colors duration-300"
              >
                Apply now
              </button>
              <button
                type="button"
                className="w-[215px]  ml-4  bg-[#2B2323]  flex justify-between align-middle items-center text-white font-outfit  rounded-full h-[58px] py-1 px-2 text-[15px] mt-8"
              >
                <p className="pl-2">Download for android</p>
                <Image
                    src='/images/playstore.png'
                    alt="Android Icon"
                    width={20}
                    height={20}
                    className="flex-shrink-0 mr-2"
                />
              </button>
              <button
                type="button"
                className="w-[215px] ml-4 bg-[#2B2323] flex justify-between  align-middle items-center text-white font-outfit  rounded-full h-[58px] py-1 px-2 text-[15px] mt-4"
              >
                <p className="pl-2">Download for apple</p>
                <Image
                    src='/images/apple.png'
                    alt="Apple Icon"
                    width={20}
                    height={20}
                    className="flex-shrink-0 mr-4"
                />
              </button>
            </div>
          </>
        )}
      </nav>

      {/* Contact Form overlay */}
      {openContact && <ContactForm isOpen={openContact} toggleContact={toggleContact} />}

      {/* mobile Contact Form modal */}
      {openContactModal && (
  <SlideContactForm
    isOpen={!isExiting}
    toggleSlideContact={toggleSlideContact}
  />
)}

<Entry isOpen={isModalOpen} closeModal={handleCloseModal} />

    </>
  );
};

export default NavBar;
