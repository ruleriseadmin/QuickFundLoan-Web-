'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from 'next/link'
import Footer from '@/components/Footer';

const Page = () => {
  const router = useRouter()
  
  return (
    <div className="bg-background w-full lg:w-11/12 mx-auto h-auto font-outfit text-[#282828] overflow-x-hidden">
      <div className="flex justify-between w-full lg:w-11/12 items-center mt-8 px-4 lg:px-8">
        <Link href='/'>
          <Image
            src='/images/quickcredlogo.png'
            width={128}
            height={35}
            alt='logo'
            className='ml-4'
          />
        </Link>
        <button
          onClick={() => router.back()}
          className="bg-inherit border-2 flex justify-center items-center border-[#282828] rounded-full w-[126px] h-[44px] gap-1 font-semibold py-1 px-4 text-[16px]"
        >
          <FaLongArrowAltLeft className='text-xl'/>
          Go back
        </button>
      </div>

      <div className='w-full mt-6 px-4 lg:px-8 font-outfit'>
        <p className='font-bold text-[18px]'>PRIVACY POLICY</p>
        <p className='font-bold text-[18px]'>Quickcrd Nigeria LTD</p>
        <p className='font-medium text-[18px]'>Effective Date: 10/01/2025</p>

        <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
        <ol className="list-decimal pl-4">
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Introduction</p>
              <p className='text-[15px] font-medium'>
                This Privacy Policy applies to all information collected and processed by Quickcred Nigeria LTD (“Quickcred”), a Nigerian credit card processing company. By using Quickcred, you consent to the collection, use, disclosure, storage, and protection of this information.
              </p>
              <p className='text-[15px] mt-2 font-medium'>
              By using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please refrain from using our Services.
              </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Information We Collect</p>
              <p className='text-[15px] font-medium'>
               We collect the following types of personal and financial information:
              </p>
                
                <p className='text-[18px] font-semibold mt-2'> <span className='text-[16px]'>2.1.</span> Personal Information</p>
                <ul className='list-disc pl-8 font-medium'>
                    <li>Full Name</li>
                    <li>Contact Details (Phone Number, Email Address)</li>
                    <li>Date of Birth</li>
                    <li>Residential and Work Address</li>
                    <li>Government-Issued Identification (BVN and NIN)</li>
                </ul>
                <p className='text-[18px] font-semibold mt-2'> <span className='text-[16px]'>2.2.</span> Financial Information</p>
                <ul className='list-disc pl-8 font-medium'>
                    <li>Bank Account Details</li>
                    <li>Credit History</li>
                    <li>Employment and Income Details</li>
                    <li>Loan Repayment Behavior</li>
                    
                </ul>
                <p className='text-[18px] font-semibold mt-2'> <span className='text-[16px]'>2.3.</span> Device and Usage Information</p>
                <ul className='list-disc pl-8 font-medium'>
                    <li>IP Address</li>
                    <li>Device ID and Type</li>
                    <li>Geolocation Data</li>
                    <li>App and Website Usage Statistics</li>
                    <li>Browser and Operating System Details</li>
                </ul>
                <p className='text-[18px] font-semibold mt-2'> <span className='text-[16px]'>2.4.</span> Communications and Support Data</p>
                <ul className='list-disc pl-8 font-medium'>
                    <li>Customer Service Requests</li>
                    <li>Call, Email, and Chat Correspondence</li>
                    <li>Feedback and Survey Responses</li>
                    
                </ul>

                    
                
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>How We Use Your Information</p>
              <p className='text-[15px] font-medium'>
              We use your information for the following purposes:
              </p>
                <ul className='list-disc pl-8 font-medium'>
                        <li><strong>Loan Processing:</strong> Assess eligibility, process applications, and manage loan disbursement and repayment.</li>
                        <li><strong>Identity Verification and Security:</strong> Confirm your identity and prevent fraud.</li>
                        <li><strong>Customer Support: </strong>Respond to inquiries and resolve issues.</li>
                        <li><strong>Regulatory Compliance:</strong> Adhere to legal and financial regulations.</li>
                        <li><strong>Marketing and Promotions:</strong> Provide you with personalized loan offers and updates (with your consent).</li>
                        <li><strong>Service Improvement:</strong> Enhance user experience through analytics and performance monitoring.</li>
                    </ul>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>How We Share Your Information</p>
              <p className='text-[15px] font-medium'>
              We may share your information with:
              </p>
                <ul className='list-disc pl-8 font-medium'>
                        <li><strong>Financial Institutions & Credit Bureaus: </strong> For credit assessment and reporting.</li>
                        <li><strong>Regulatory Authorities: </strong> To comply with legal obligations.</li>
                        <li><strong>Service Providers & Partners: </strong>For payment processing, fraud prevention, and analytics.</li>
                        <li><strong>Debt Recovery Agencies: </strong> In cases of loan default.</li>
                        <li><strong>Legal & Compliance Entities: </strong> As required by law or in response to lawful requests.</li>
                        
                    </ul>
                    <p className='text-[15px] font-medium'>
                    We <strong>do not</strong> sell or rent your personal information to third parties for marketing purposes.
                    </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Data Security</p>
              <p className='text-[15px] font-medium'>
              We implement industry-standard security measures to protect your personal and financial data, including:
              </p>
                <ul className='list-disc pl-8 font-medium'>
                        <li><strong>Encryption:  </strong> Secure transmission and storage of sensitive information.</li>
                        <li><strong>Access Controls:  </strong> Restricted data access to authorized personnel only.</li>
                        <li><strong>Regular Security Audits:  </strong>Monitoring for vulnerabilities and threats.</li>
                        
                    </ul>
                    <p className='text-[15px] font-medium'>
                    Despite our efforts, no system is 100% secure. You are responsible for keeping your login credentials confidential.
                    </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Your Rights and Choices</p>
              <p className='text-[15px] font-medium'>
              You have the right to:
              </p>
                <ul className='list-disc pl-8 font-medium'>
                        <li><strong>Access:  </strong> Request a copy of your personal data.</li>
                        <li><strong>Correction:  </strong> Update inaccurate or incomplete information.</li>
                        <li><strong>Deletion:  </strong>Request the removal of your data, subject to legal and contractual obligations.</li>
                        <li><strong>Opt-Out:   </strong> Withdraw consent for marketing communications.</li>
                        <li><strong>Data Portability:  </strong>Obtain your data in a structured format where applicable.</li>
                        
                    </ul>
                    <p className='text-[15px] font-medium '>
                    To exercise your rights, contact us at  <a href="mailto:support@quickcred.com.ng" className='underline'>support@quickcred.com.ng</a>
                    </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Data Retention</p>
              <p className='text-[15px] font-medium'>
              We retain your data for as long as necessary to fulfill our contractual and legal obligations. When no longer required, we securely delete or anonymize your information.
              </p>
               
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Third-Party Links & Services</p>
              <p className='text-[15px] font-medium'>
              Our Services may contain links to third-party websites or services. We are not responsible for their privacy practices. Please review their policies before providing any information.
               </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Children's Privacy</p>
              <p className='text-[15px] font-medium'>
              Our Services are <strong>not intended for individuals under the age of 18.</strong> We do not knowingly collect information from minors. If we discover that a minor has provided us with personal data, we will take steps to delete it.
               </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Updates to This Privacy Policy</p>
              <p className='text-[15px] font-medium'>
              We may update this Privacy Policy from time to time. 
              Any changes will be posted with a revised "Effective Date." We encourage you to review this policy periodically.
               </p>
            </li>
            <hr className='border-b-2 text-[#E1E3E4] my-7 rounded-full' />
            <li className='my-4 font-semibold'>
              <p className=' text-[18px]'>Contact Us</p>
              <p className='text-[15px] font-medium'>
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
               </p>
               <ul className='list-disc pl-8 font-medium'>
                        <li><strong>Quickcrd Nigeria LTD </strong> </li>
                        <li>Email:<strong>info@quickcred.com.ng  </strong> </li>
                        <li>Address: <strong>2 Allen Avenue Ikeja Lagos </strong></li>
                        
                        
                    </ul>
                    <p className='text-[15px] font-medium'>
                        By using our Services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
                </p>
            </li>
        </ol>
        
        
      </div>
      <Footer />
    </div>
  )
}

export default Page;
