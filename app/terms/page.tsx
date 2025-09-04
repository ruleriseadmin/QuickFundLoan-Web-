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
            src='/images/icon.png'
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

      <div className="mt-12 px-4 lg:px-8">
        <p className="text-[15px] mb-6">Last updated: July 15, 2024.</p>
        <div className="text-[15px] leading-10">
          <span className="text-[#ED3237] font-bold text-[18px] mb-2">TERMS OF USE</span> <br />
          <p className='font-bold'>1. Definitions</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>Applicable Law</li>
            Means the laws of the Jurisdiction applicable to these Terms and Conditions which the Borrower is subject to;
            <li className='ml-4 font-medium mb-0'>Borrowers Account</li>
            Refers to the Borrowers wallet where the Loan will be disbursed and collected from, by the Lender;
            <li className='ml-4 font-medium mb-0'>Borrower</li>
            Refers to the customer taking up the Loan, in this instance the principal owner of the Agent wallet account, who is also the Primary contact;
            <li className='ml-4 font-medium mb-0'>Jurisdiction</li>
            Means Nigeria where the Lender is resident and established;
            <li className='ml-4 font-medium mb-0'>Lender</li>
            refers to Quickfund
            <li className='ml-4 font-medium mb-0'>Loan</li>
            refers to the Instant Loan by Quickfund to a customer subject of these Terms & Conditions;
            <li className='ml-4 font-medium mb-0'>Loan Agreement</li>
            means the agreement to lend the Borrower the Loan which is constituted by these Terms and Conditions and the Loan Application Portal completed by the Borrower and the term Agreement "shall be construed equally;
            <li className='ml-4 font-medium mb-0'>Loan Amount</li>
            means the total amount loaned by the Borrower pursuant to these Terms and Conditions, which amount shall include principal amount, interest and other applicable fees and charges as maybe advised by the Lender;
            <li className='ml-4 font-medium mb-0'>Loan Application Portal</li>
            means the mobile or online or electronic application portal for the Loan completed by the Borrower for assessment inconsideration for granting of the Loan where the Borrower provides all the required information and is provided with the relevant terms of the Loan;
            <li className='ml-4 font-medium mb-0'>Repayment Amount</li>
            refers to the principal amount due with the corresponding interest and other fees and charges as may be advised by the Lender to be repaid by the Borrower on agreed due date;
<br/>In the event of any conflict or inconsistency between these Terms & Conditions and the Loan Application Portal, the provisions set forth in these Terms & Conditions shall prevail, unless otherwise expressly provided
          </ul> 
          <p className='font-bold mt-3'>2. Eligibility and Application</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>To apply for a Loan, the Borrower must:</li>
            <li className='ml-4 font-medium mb-0'>have a registered and active on ISW platform with updated KYC and AML requirements.</li>
            <li className='ml-4 font-medium mb-0'>must be financially active with a consistent source on income which in this regard is commission; and</li>
            <li className='ml-4 font-medium mb-0'>must be financially active with a consistent source on income which in this regard is commission; and</li>
            <li className='ml-4 font-medium mb-0'>The Borrower must provide true and accurate information, requirements, and additional information if needed, for the 
            processing of the application and which will be the basis of approval of the loan. The Lender has the right to approve, cancel at any stage prior to loan disbursement, 
            or reject/decline the loan application based on the Lenders Credit guidelines, and is not obligated to disclose any underlying reasons for cancelling, rejecting, or declining the loan application.
            </li>
            <li className='ml-4 font-medium mb-0'>The borrower agrees that all personal and financial information with supporting documentation will, for the purposes of regulatory compliance and credit scoring, be shared with the Lender. These data and documents will be stored and maintained in accordance with regulatory requirements. It remains the Borrowers responsibility to inform the Lender of changes to any personal and financial information and circunstances.</li>
            </ul>
            <p className='font-bold mt-3'>3. LOAN, INTEREST, REPAYMENT AND DUE DATE</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>With effect from the date of approval of the Loan application to the Borrower and/or date of disbursement into the designated wallet account by the Lender (“Effective Date”), the Borrower agrees that the amount for the Loan, interest, 
            and other fees and charges as may be advised by the Lender Repayment Amount has been set out in the Loan Application Portal which he/she has consented to.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees to repay the Loan on or before due date of the agreed period in the Loan Application Portal, failing which a penalty fee stated in the Loan Application Portal will be applied on the total amount due. The borrower should provide sufficient funds in the borrowers Account. Loan payments shall be made in full (inclusive of the Lender fees or charges, which shall be for the account of the Borrower). The determination by the Lender of the amount of principal, fees, and charges due and payable on the 
              payment date shall be final and conclusive on the Borrower, except for manifest error in computation.</li>
            <li className='ml-4 font-medium mb-0'>The Borrower understands, agrees, and undertakes that he/she will not close the Borrowers Account until the full repayment of the Loan including all applicable fees, charges, and penalties.</li>
            <li className='ml-4 font-medium mb-0'>must be financially active with a consistent source on income which in this regard is commission; and</li>
            <li className='ml-4 font-medium mb-0'>In case any payment is not sufficient to pay the total amount payable on the applicable due date or any other given date, 
            the Lender may at its discretion and subject to future determination by the Lender, apply the payment in the following order: first against applicable taxes (if any), then against interest, then against the principal amount due, then against penalty fees or penalty interest, and then against charges.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower must provide true and accurate information, requirements, and additional information if needed, for the processing of the application and which will be the basis of approval of the loan. The Lender has the right to approve, cancel at any stage prior to loan disbursement, or reject/decline the loan application based on the Lenders Credit guidelines, and is not obligated 
              to disclose any underlying reasons for cancelling, rejecting, or declining the loan application.</li>
            <li className='ml-4 font-medium mb-0'>The borrower agrees that all personal and financial information with supporting documentation will, for the purposes of regulatory compliance and credit scoring, be shared with the Lender. These data and documents will be stored and maintained in accordance with regulatory requirements. 
              It remains the Borrowers responsibility to inform the Lender of changes to any personal and financial information and circunstances.</li>
            
            </ul>
            <p className='font-bold mt-3'>4. LATE PAYMENT FEES AND PENALTIES</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees to pay the late payment fee as specified in the Loan Agreement Portal and Pricing Guide, 
              in the event that the borrower is unable to fully pay the once -off instalment on the due date.
            </li>
            <li className='ml-4 font-medium mb-0'>The Lender will collect the late payment fee, applicable penalties, and interest on the next dates after the missed due date stipulated in the Loan Application Portal, and on any date thereafter until all overdue amounts have been satisfied.</li>
            </ul>
            <p className='font-bold mt-3'>5. WARRANTIES AND REPRESENTATIONS</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower represents and warrants that:
            </li>
            <li className='ml-4 font-medium mb-0'>The borrower does not have any criminal record and is freely and voluntarily entering into the Loan Agreement;</li>
            <li className='ml-4 font-medium mb-0'>The borrower does not have any criminal record and is freely and voluntarily entering into the Loan Agreement;</li>
            <li className='ml-4 font-medium mb-0'>All information, communication, and information provided during the Loan application process and in the Loan Application Portal is complete, accurate, and true;</li>
            <li className='ml-4 font-medium mb-0'>The representations made by the Borrower as of the Effective Date are deemed repeated until repayment of the Loan;</li>
            <li className='ml-4 font-medium mb-0'>This Agreement has been drafted in a language that the borrower understands, alternatively that the borrower is fully aware of the meaning and consequences of this Agreement and that this Agreement has been explained to him/her in a language that he understands;</li>
            <li className='ml-4 font-medium mb-0'>The borrower is in a position, financially and legally, to enter this Agreement; and</li>
            <li className='ml-4 font-medium mb-0'>The borrower has truthfully disclosed all relevant facts regarding the borrowers current and expected future financial position.</li>
            </ul>
            <p className='font-bold mt-3'>6. OBLIGATIONS AND COVENANTS</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower undertakes to properly and promptly inform the Lender regarding any updates in the Borrowers necessary information such as place of residence and any changes in the information provided in Loan Application Portal.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees to abide by and be bound by these Terms and Conditions. The Borrower further agrees that once the loan is approved and credited to the borrowers Account, the Loan is effective and the Borrower is bound by these Terms and Conditions, and the provisions of the Loan.</li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees to abide by and be bound by these Terms and Conditions. The Borrower further agrees that once the loan is approved and credited to the borrowers Account, the Loan is effective and the Borrower is bound by these Terms and Conditions, and the provisions of the Loan.</li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees to use the Loan responsibly and not for any unlawful purposes or activities.</li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees that these Terms and Conditions shall be binding upon and inure to the benefit of the Lender and the Borrower, and their respective estate, heirs, personal representatives, assigns and/or successors-in-title and any other person for the time being deriving title under them.</li>
            <li className='ml-4 font-medium mb-0'>In the event of the Borrowers death, the Borrowers estate, heirs and personal representatives are required to pay and repay the outstanding obligations of the Borrower under the Loan from the assets of the estate of the deceased Borrower, and no action will be taken against the heirs and personal representatives of the deceased Borrower in their personal capacity.</li>
        
            </ul>
            <p className='font-medium mb-0'>The borrower attests that the transactions conducted are not of any illegal activities , in any illegal, unfair, deceptive or unethical business practices whatsoever, whether with respect to the Products or otherwise.</p>
            <p className='font-bold mt-3'>7. EVENTS OF DEFAULT</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>At the sole discretion of the Lender, the Borrower shall be considered in default, irrespective of the reasons for its occurrence and regardless of whether it is voluntary or involuntary, when any of the following events occurs:
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower fails to pay any the Loan interest and fees or any other sum payable by the Borrower under these Terms and Conditions, as and when due and payable in the manner set out herein and therein;</li>
            <li className='ml-4 font-medium mb-0'>The Borrower provides any incorrect or misleading representation or warranty in connection with these Terms and Conditions, Loan Application Portal and other information required by or submitted to the Lender;</li>
            <li className='ml-4 font-medium mb-0'>The Lender believes on reasonable grounds that the Borrower fraudulently misrepresented any information in order to facilitate the granting of the Loan; or</li>
            <li className='ml-4 font-medium mb-0'>	Any event or circumstance transpires that, in the Lender‘s reasonable opinion, will adversely affect the Borrower‘s performance or ability to pay the obligations as they fall due under the Loan.</li>
            </ul>
            <p className='font-bold mt-3'>8. CONSEQUENCES OF DEFAULT</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>Upon the occurrence of an Event of Default, the Lender has the right, but not the obligation, to declare the entire unpaid principal amount of the Loan and all interest accrued and unpaid thereon along with any unpaid penalties to be forthwith due and payable, whereupon the same shall become immediately due and payable, without need of presentment, demand, protest or further notice of any kind, all of which are hereby expressly waived by the Borrower. Should the Borrower fail to comply with the demand for payment of all its outstanding obligations to the Lender, the Lender shall have full power and authority to proceed against the Borrower and to take such other steps or actions against the Borrower as are provided under these Terms and Conditions, or under any applicable law, as the Lender 
              may deem necessary and proper for the full protection or enforcement of its rights and remedies.
            </li>
            <li className='ml-4 font-medium mb-0'>Upon default and in addition to the principal amount, interest and late payment charges, the Borrower agrees to pay the charges on the outstanding amount due and such charges may consist of Collection fee and/or Credit Bureau listing.</li>
            <li className='ml-4 font-medium mb-0'>The Borrower likewise agrees that in case of default hereunder, the Lender, at its sole discretion, may also appoint or designate representatives, agents, attorney-in-fact, or upon prior written notice, a third-party collection agency or legal counsel to perform any and all acts which may be required or necessary to enforce its rights under the Loan given thereon. For such purpose, the Borrower hereby gives consent to the disclosure of all relevant information in connection with the Loan or account to such authorized representative, agent or attorney-in-fact and agrees to hold the Lender free and harmless against any and all damage, cost or liability arising from such disclosure.</li>
           
            </ul>
            <p className='font-bold mt-3'>9. CROSS DEFAULT</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>In the event an Event of Default has occurred, the Lender has the right to recall and demand repayment of all sums owing by the Borrower to the Lender in respect of other facilities granted by the Lender.
            </li>
            </ul>
            <p className='font-bold mt-3'>10. DELINQUENCY</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>Once the Borrower fails to pay the full Loan amount due on any due date, the account shall be considered delinquent‘
            </li>
            <li className='ml-4 font-medium mb-0'>In the event of any delinquency, the Borrower hereby authorizes the Lender to report and/or include the Borrower‘s name, loan details and any other necessary information, in the negative listings of any credit bureau or Lender, and/or databases of financial industry associations or financial industry bodies to the extent that the Loan remains unpaid by the Borrower.
            </li>
            </ul>
            <p className='font-bold mt-3'>11. INDEMNITY</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>All fees and charges applicable to the Loan application shall be payable by the Borrower. The Borrower shall indemnify and agree to hold harmless the Lender and each of its officers, directors and employees (each, an “Indemnified Party”) from and against any and all actual losses, judgments, liabilities, fees, awards, claims, demands damages, costs, and expenses, including legal expenses (collectively, “Losses”) that may be incurred by or awarded against any Indemnified Party, in each case arising out of or in connection with any claims, investigation, litigation or proceeding (or the preparation of any defence with respect thereto) commenced in relation to these Terms and Conditions, or the transactions contemplated hereby, or the use of the proceeds of the Loan, whether or not such claim, investigation, litigation or proceeding is brought by the Borrower, an Indemnified Party or any other person or entity.
            </li>
            </ul>
            <p className='font-bold mt-3'>12. CUMULATIVE REMEDIES</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>No remedy referred to in these Terms and Conditions or in any Loan agreement is intended to be exclusive, but each shall be cumulative and in addition to any other remedy referred to in these Terms and Conditions, the Loan agreements, or otherwise available under law or equity.
            </li>
            </ul>
            
            <p className='font-bold mt-3'>13. AUTHORIZATION AND CONSENT</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower authorizes the Lender to obtain and verify the information collected through government agencies or third parties including Lenders, financial Lenders, financial industry associations and/or financial 
              industry bodies and credit bureaus at any time throughout the duration 
              and existence of the Loan.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees that the Lender is required and allowed to 
              disclose and shall disclose from time to time, to the Credit Bureau and/or the Negative File 
              Information System of the regulatory-accredited organizations, the Borrower‘s basic credit data,
               and such information regarding the Borrower as may be required.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower also allows the Lender to conduct background checks on the borrower‘s financial capability, personal references, or any other legitimate purpose the Lender may deem necessary for the application process and/or approval of the Loan, 
              including the use of third party vendors or partners, and applications.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower represents and warrants that the third-party reference persons whose information are provided to the Lender are personally known to him/her, are of legal age, have sufficient legal capacity, and have existing local mobile numbers. The Borrower further warrants that he or she has obtained their prior consent before submitting the third parties‘s names and contact details to the Lender and such third parties have also consented to be contacted by the Lender for any verification purposes. The Borrower agrees that such reference persons may be contacted by the Lender in the event of a. delinquency, b. default of the Borrower, c. in the event the Borrower may not be contacted d. any verification that the Lender may want to perform as regards the Borrower. 
              The Borrower authorizes the Lender and the reference persons to share information and communicate with each other regarding the Loan.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower hereby waives their rights under existing laws relative to the confidentiality of the Loan, and such other information or information relative thereto in favour of the Lender, the proper courts and such other administrative and government offices which may require the disclosure of the aforementioned information and information.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees that the Lender, directly or through its affiliates, or third-party partners, may collect, retrieve, process, use and store the borrower‘s personal data including sensitive personal data in accordance with the Applicable Laws such as name, age, photographs, fingerprints, other biometric data (e.g., facial recognition and voice recognition), mobile number/s, mobile phone usage data, mobile phone device data, employment details, income, financial data, financial profile, credit standing, loan payment history, and other information required in the Loan Application for the purpose of reviewing and processing the Borrower‘s application.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower consents to the collection of their personal data from the Borrower her/himself, or from other personal information controllers such as, but not limited to, telecommunications companies for credit scoring purposes. The Borrower‘s personal data such as mobile number, email address, and address, will be shared to a credit scoring service provider for credit investigation, credit scoring, data analytics, and data profiling, which includes the regular updating of the Borrower‘s credit score.
            </li>
            <li className='ml-4 font-medium mb-0'>
            Throughout the processing of the Borrower‘s personal data, their rights under the Applicable Laws, relating to data protection, such as the: (1) right to be informed, (2) right to object to processing of the borrower‘s personal data, (3) right to access, (4) right to rectification of the borrower‘s data, (5) right to erasure or blocking, (6) right to complain, and (7) right to damages, shall be upheld. 
            Entities to whom we share your data will also respect the same rights.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees that the Lender may use the Borrower‘s personal data for the following purposes: (1) to process the Borrower‘s application for the Loan, (2) to evaluate the Borrower‘s creditworthiness, (3) to monitor the Borrower‘s loan repayment, (4) to update the Borrower on the status of the Loan, (5) to provide the Borrower with information on the Lender‘s products and services, (6) to conduct surveys, research, and studies for the improvement of the Lender‘s products and services, and (7) to comply with legal and regulatory requirements.
            Borrower agrees and gives their continuing consent to the authorizations contained herein throughout the duration and existence of the Loan.
              </li>
            </ul>
            <p className='font-bold mt-3'>14. COMMUNICATION</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower agrees to receive updates and notification in relation to the borrower‘s Loan. The Borrower agrees that the Lender and third-party service provider, as well as their authorized representative may reach out to the Borrower for any marketing initiatives and communications, special offers, or promotional activities through e-email, SMS, telephone calls, 
              social media, e-commerce or other means of communication or channels.
            </li>
            <li className='ml-4 font-medium mb-0'>The Lender will obtain the consent of the Borrower prior to the sending of marketing and promotional communications, and the Borrower may opt to no longer receive said communications at any time by informing the Lender through the contact details 
              provided in the Loan Application Portal.
            </li>
            
            </ul>
            <p className='font-bold mt-3'>15. ASSIGNMENT</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower shall not assign any of the borrower‘s rights and obligations under these Terms and Conditions. The Lender may at any time, and from time to time, transfer, assign, or grant a participation or allow the grant of a sub-participation to one or more persons or entities all or any part of its rights, benefits, and obligations under these Terms and Conditions without need of consent or notice to the Borrower. Upon any assignment, participation, or sub participation by the Lender, the assignee, participant, or sub participant shall be entitled, to the extent of the interest assigned, participated, or sub participated, to the benefit of the indemnities, reimbursements,
               and rights of set-off of the Lender pursuant to the provisions of these Terms and Conditions.
            </li>
            <li className='ml-4 font-medium mb-0'>The Lender will obtain the consent of the Borrower prior to the sending of marketing and promotional communications, and the Borrower may opt to no longer receive said communications at any time by informing the Lender through the contact details 
              provided in the Loan Application Portal.
            </li>
            <li className='ml-4 font-medium mb-0'>In the event of such transfer, assignment or grant by the Lender to an assignee or any successor-in-interest, the Borrower shall not assert against the assignee or the successor-in-interest the right to set-off any obligations owed by the Lender to the Borrower.
            </li>
            <li className='ml-4 font-medium mb-0'>In the event of such transfer, assignment, or grant, the Borrower further agrees that he/she shall remain liable to the Lender‘s assignee or successor-in-interest for all obligations under these Terms and Conditions.
            </li>
            <li className='ml-4 font-medium mb-0'>In the event of the acquisition of the Lender by another entity or the 
              sale of the Loan obligations of the Borrower to another entity by the Lender, 
              the Borrower also agrees that he/she shall be liable to the acquiring entity for all 
              obligations under these Terms and Conditions. The Borrower further agrees that the 
              Lender may act as a via-media between him/her and the acquiring entity to facilitate the 
              fulfilment of the borrower‘s liabilities/obligations towards the acquiring entity 
              and shall follow the necessary directions from the Lender or the acquiring entity on the subject.
            </li>
            </ul>
            <p className='font-bold mt-3'>16. WAIVERS</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>No failure, omission or delay on the Lender in exercising any right, power, privilege or remedy accruing to the Lender under these Terms and Conditions shall impair any such right, power, privilege or remedy nor shall it be construed as a waiver of any such breach or default thereafter occurring, nor shall a waiver of any single breach or default be deemed a waiver of any other breach or default theretofore or thereafter occurring. All remedies, either under the Promissory Note or by law or otherwise afforded the Lender shall be cumulative and not alternative. No notice to or demand on the Borrower in 
              any case shall entitle it to any other or further notice or demand in similar or other circumstances.
            </li>
            </ul>
            <p className='font-bold mt-3'>17. DISCLOSURE OF INFORMATION AND PRIVACY</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>In compliance with the Applicable Laws relevant to data protection, the Borrower hereby agrees to give the borrower‘s true, correct information and consent to gather, 
              process, verify and use the borrower‘s personal data or information to process, the application for a Loan, and to implement, grant, monitor, and enforce the Loan, these Terms and Conditions.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower gives consent to the Lender to capture, process, store and share as may be deemed necessary the borrower‘s personal data or information to process the borrower‘s eligibility of this Loan application and to be used in any market research or study of the Lender on its loan products.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower allows the Lender, to use the borrower‘s personal data to disclose and verify information to agents/third party service providers, the Credit Bureau, which processes information, transactions, services, or accounts, on behalf of the Lender.
            </li>
            <li className='ml-4 font-medium mb-0'>	Borrower also agrees to treat as confidential information any information of the Lender obtained during the course of the loan application process, including but without limitation, the loan products and services offered by the Lender, as well as any information pertaining to the Lender, its business, its operations, its processes, its affiliates, the Lender‘s and its affiliates‘ shareholders, directors, officers, employees, advisors, and agents. The Borrower hereby undertakes to hold all confidential information in strict confidence, and not directly or 
              indirectly disclose or permit to be disclosed any confidential information to any 
              other person or entity.
            </li>
           
            </ul>
            <p className='font-bold mt-3'>18. DATA PROTECTION</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Lender is committed to keeping the Borrower‘s personal data confidential.
            </li>
            <li className='ml-4 font-medium mb-0'>The Lender shall process any personal data we collect from the Borrower in accordance with Nigerian Data Protection Laws and Regulations and the provisions of the Lender‘s Data Privacy Policy as well as the Lender‘s Data Retention Policy. Unless restricted by applicable laws, the Borrower agrees that any and all personal data relating to the Borrower collected by the Lender in respect to their account may from time to time be used and disclosed for the below purposes and to such persons as may be in 
              accordance with the Lender‘s prevailing Privacy Policy as amended from time to time.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower acknowledges that to provide lending services, the Lender may need to transfer and process some of the Borrower‘s personal data with our group companies and their agents, counterparties, support service, data providers or regulator, wherever located. The Lender will take precautions to ensure that the information is treated in a manner consistent with the Nigerian Data Protection Laws and Regulations.
            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower consents to the Lender collecting their personal information directly from them and where lawful and reasonable, from public sources for the purposes set out below and in the Lender‘s Data Privacy Policy:
            </li>
            </ul>
            <div className='ml-10 font-medium mb-0'>
            <p className=' '>1.	To check and verify your identity of any identification documents you provide with the issuing authority of those documents in order to protect the Borrower and the Borrower‘s assets</p>
            <p>2.	To licensed credit reference agencies to verify your financial standing</p>
            <p>3.	To carry out our obligations from any contracts entered into between the Borrower and the Lender or to take steps to enter into an agreement with Borrower, to meet our regulatory compliance and reporting obligations</p>
            <p>4.	To the Lender‘s external lawyers, auditors, debt collection agencies and subcontractors or other Persons acting as agents of the Lender.</p>
            <p>5.	To provide the Lender services to you, manage your accounts and the Lender‘s relationship with the Borrower,</p>
            </div>
            <p className='font-medium'>Time that you do not wish us to do so,</p>
            <div className='ml-10 font-medium mb-0'>
            <p className=' '>6.	To prevent, detect, and investigate fraud and alleged fraudulent practices and other crimes,</p>
            <p>7.	To protect the Lender‘s legitimate interests</p>
            <p>8.	To contact you, by post, phone, text, email or other methods in relation to the accounts that you hold with us and the products and services we provide</p>
            <p>9.	To any person who may assume the rights of the Lender hereunder.</p>
            <p>10.	If the Lender has a right or duty to disclose or is permitted or compelled to do so by law including but not limited to the Foreign Account Tax Compliance Act and the Customer agrees that disclosure of 
              information set out above does not violate any duty that may be owed by the Lender to the Borrower.</p>
            </div>
            <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Borrower confirms and understands that he/she is not obliged to consent to such collection, use, processing and transfer of personal data. However, the Borrower understands that failure to provide such consent may affect the effective operation of his/her Lender Account.
            </li>
            <li className='ml-4 font-medium mb-0'>The Lender shall keep your information for as long as you have a relationship with us. After it ends we‘ll keep it for a minimum period of Seven (7) years. However, we may retain your information for a longer period where we may need it for our legitimate purposes e.g. to help us respond to queries or complaints, 
              or for other reasons e.g. fighting fraud and financial crime, and responding to requests from regulators.
            </li>
            <li className='ml-4 font-medium mb-0'>In the event that you fail to repay 
              the loan as agreed, and the loan becomes delinquent,  
              Quickfund shall have the right to report the delinquent loan to the CBN through 
              the Credit Risk Management System (CRMS) or by any other means, and request the CBN 
              to exercise its regulatory power to direct all banks and other financial institutions under 
              its regulatory purview to set-off such indebtedness from any money standing to your credit 
              in any bank account and from any financial assets they may be holding for your benefit. 
              You also covenant and warrant that Quickfund shall have power to activate a global standing 
              instruction (GSI) to set-off your indebtedness from all such monies and funds standing to your 
              credit/benefit in any and all such accounts or from any other financial assets belonging to you and in 
              the custody of any such bank. Accordingly, you agree that you hereby waive any right of confidentiality 
              whether arising under common law or statute or in any other manner whatsoever and irrevocably agree that 
              you shall not argue to the contrary before any court of law, tribunal administrative authority or any other body acting in any judicial or quasi-judicial capacity.

            </li>
            <li className='ml-4 font-medium mb-0'>The Borrower has several rights in regards to the information that the Lenders holds about the Customer including:
            </li>
            
            </ul>
            <div className='ml-5 font-medium mb-0'>
            <div className=' '>
            <div className='ml-5 font-medium mb-0'>
            <p className=' '>1.	To prevent, detect, and investigate fraud and alleged fraudulent practices and other crimes,</p>
            <p>
            2.	The right to access your personal data in our custody;
            </p>
            <p>3.	The right to object or restrict to the processing of all or part of the Borrower‘s personal data. We may however continue to process where we have a legitimate reason to do so, or required by law;</p>
            <p>4.	The right to correction of false or misleading data; and</p>
            <p>5.	The right to request that we delete false or misleading data about you. The customer can enforce the rights stated above by notice to the Lender in writing to <a 
            href="mailto:info@Quickfund.com.ng"
            className='text-[#ED3237]'
            >info@Quickfund.com.ng</a>
            (email of DPO) The Lender shall within Fourteen (14) days from receipt of the notice inform the Customer in writing of the Lender‘s decision and the reasons thereof.</p>
            </div>
            </div>
           
            </div>
            <p className='font-bold mt-3'>19. SEVERABILITY</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>If any one or more of the provisions contained in these Terms and Conditions or any document executed in connection therewith shall be declared by any court of competent jurisdiction as invalid, illegal or unenforceable under any applicable law, the validity, legality and enforceability of the remaining provisions contained therein or such document executed in connection therewith shall not in any way be affected or impaired.
            </li>
            </ ul>
            <p className='font-bold mt-3'>20. GOVERNING LAW AND JURISDICTION</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Loan Agreement and these Terms and Conditions shall be governed by, and construed in accordance with, the Applicable Law of the Jurisdiction in which the loan was given. The Borrower irrevocably agrees that any legal action, suit or proceeding arising out of or relating to this Agreement shall be instituted before the suited or competent court, and the Borrower submits to and accepts with regard to any such action or proceeding for himself/herself and in respect of the borrower‘s properties or assets, generally and unconditionally, the jurisdiction of any such court, to the exclusion of all other courts and venue. The Borrower hereby waives any objection which he/she may now or hereafter have to the laying of the venue of any such action, suit or proceeding, 
              and further waives any claim that any such suit, action 
              or proceeding has been brought in an inconvenient forum. The foregoing, however, shall not limit or be construed to limit the rights of the Lender to commence proceedings or to obtain execution of judgment against the Borrower in any jurisdiction where assets of the latter may be found.
              <br/>
              Any dispute arising out of this Agreement will in the first instance be resolved by good faith negotiation between the Parties. The negotiations shall be held within thirty (30) days after notification in writing (by either Party) of a dispute.
            <br/>
            Pending final settlement or determination of a dispute, the Parties shall continue to perform their subsisting obligations hereunder.
            <br/>
            If the negotiations should fail the parties will have the discretion to terminate the agreement as per clause 17 of this Agreement or refer the dispute to a court of competent jurisdiction.
            <br/>
            This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria and the Customer irrevocably submits to the non-exclusive jurisdiction of the Nigerian courts.
            </li>
            </ ul>
            <p className='font-bold mt-3'>21. TERMINATION</p>
          <ul className='leading-8 list-disc'>
          <li className='ml-4 font-medium mb-0'>Either Party may terminate this Agreement by giving at least 30 (thirty) days written notice to the other Party, provided that such termination of this Agreement shall not affect any rights or obligations of either of the Parties which may have arisen or are in 
            existence at the date of such termination and such rights or obligations shall survive such termination.
              <br/>
              Either Party may terminate forthwith this Agreement by written notice to the other if that other Party:
            <br/>
            is incapable of performing its obligations hereunder or shall commit any material breach of its obligations hereunder;
            <br/>
            becomes insolvent, or has a liquidator, receiver, manager or receiver manager appointed over it;
            <br/>
            is subject to any procedure for its de-registration or denial of license to conduct business;
            <br/>
            Either party is found to have been fraudulent in the course of fulfilling its obligations under this Agreement. For the purpose of this clause acts of fraud include but are not limited to all those activities involving dishonesty and deception that can drain value 
            from the other Party‘s business and accrued goodwill, directly or indirectly, whether or not there is personal benefit; or
            <br/>
            The Borrower is found to be guilty of gross misconduct, poor performance of duties, or any breach of this Agreement.
            <br/>
            Either Party may terminate forthwith this Agreement by a written notice to the other Party if the other Party is in breach of the confidentiality obligations in clause 13 of this Agreement.
            <br/>
            Notwithstanding the terms of this clause 21, nothing shall preclude the Lender from terminating this agreement at any time without reason by giving at least 30 (thirty) days written notice to the other Party.

            </li>
            </ ul>
            
            <p className='font-bold mt-3'>22. CHANGES</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>The Lender reserves the right to change these Terms and Conditions by way of addition, modification, amendment, etc. (“Changes”) at any time and from time to time; provided that notice shall be given to the Borrower at least (3) calendar days prior to implementation. The Borrower shall be notified of such Changes through the methods of communication set out in the Loan Application. The Changes shall apply on the effective date specified by the Lender in the Lender‘s notice.
            </li>
            </ ul>
            <p className='font-bold mt-3'>23. CUSTOMER COMPLAINTS PROCESS</p>
          <ul className='leading-8 list-disc'>
            <li className='ml-4 font-medium mb-0'>
            In the event that the Borrower has a complaint regarding the service offered or dispute regarding this loan application, the Borrower must approach the Lender to register their complaint by providing full description of the complaint and contact details. This should be done through the Customer experience platform where borrower should provide full description of the complaint and contact details through Quickfund Customer Care.
            </li>
            </ ul>

          
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page;
