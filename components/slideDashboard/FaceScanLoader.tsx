// FaceScan Component
import React from 'react';

type loaderProps = {
  title: string;
  text: string;
  type?: string;
};


const Loader: React.FC<loaderProps> = ({title, text,type}) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300">
    <div
      className="w-[483px] bg-background lg:ml-32 md:ml-32 mx-2 h-[627px]  font-outfit rounded-[22px] p-6 shadow-md transition-transform duration-300 transform scale-100"
    >
        <div className='w-11/12 mx-auto rounded-[22px] '>
        <img 
            src="/images/loader.gif" 
            alt="Description of the gif"
            width={181}
            height={158}
            className='mx-auto mt-8'
          />
          <p className='text-[18px] mt-4 mb-4 text-[#1C1C1E] text-center w-full mx-auto font-bold'>
           {title}
             </p>
            <p className='text-[16px]  mb-4 text-[#1C1C1E] text-center w-full mx-auto '>{text}</p>
             
      <p 
      className='text-[15px] font-comic  text-[#5A5A5A] font-bold text-start mt-8 w-10/12 mx-auto '
      >
      Pro Tip:</p>
      {type === 'faceScan' ? (
        <ul
        className='text-[14px]  font-comic text-[#5A5A5A] mb-8 font-thin text-start mt-2 w-11/12 mx-auto'
        >
        <li>Do not close the app while the credit check is still ongoing.</li>
        <li>If you pay back your loan on time you will get better loan offers.</li>
        <li>If you pay back your loan on time, you will be considered for offer rewards.</li>
        <li>Loan defaulters will be reported to the Credit Bureaus and this will affect your credit history.</li>
        </ul>
      ) : (
        <ul
      className='text-[14px]  font-comic text-[#5A5A5A] mb-8 font-thin text-start mt-2 w-10/12 mx-auto'
      >
      <li>If you pay back your loan on time, you will be considered for offer rewards.</li>
      <li>If you pay back your loan on time, you will be considered for offer rewards.</li>
      <li>Loan defaulters will be reported to the Credit Bureaus and this will affect your credit history.</li>
      </ul>

      )}
      
   
        </div>
      </div>
    </div>
  );
};

export default Loader;