import React from 'react';
import {
  Page,
  Svg,
  Text,
  Path,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import {getFormattedDateTime,
  formatDateLoan, 
  formatCurrency} from '@/utils/bankFunctions';


Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/fonts/montserrat/Montserrat Regular 400.ttf', fontWeight: 'normal' },
    { src: '/fonts/montserrat/Montserrat Bold 700.ttf', fontWeight: 'bold' },
    { src: '/fonts/montserrat/Montserrat SemiBold 600.ttf', fontWeight: 'semibold' },
    { src: '/fonts/montserrat/Montserrat Medium 500.ttf', fontWeight: 'medium' },
    { src: '/fonts/montserrat/Montserrat Italic 400.ttf', fontStyle: 'italic' },
  ],
});

Font.register({
  family: 'Euclid',
  fonts: [
    { src: '/fonts/euclid/Euclid Circular A Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/euclid/Euclid Circular A Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/euclid/Euclid Circular A Medium.ttf', fontWeight: 'medium' },
    { src: '/fonts/euclid/Euclid Circular A Italic.ttf', fontStyle: 'italic' },
  ],
});

// Register the Outfit font
Font.register({
  family: 'Outfit',
  fonts: [
    { src: '/fonts/outfit/Outfit-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/outfit/Outfit-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/outfit/Outfit-Medium.ttf', fontWeight: 'medium' },
  
  ],
});


// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
    fontFamily: 'Montserrat',
    backgroundColor: '#FFFFFF',
    color: '#282828',
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    marginBottom: 5,
  },
});

// Define types for props
interface LoanSchedule {
  [key: string]: any;
}

interface User {
  [key: string]: any;
}

interface LoanAgreementDocumentProps {
  loanSchedule: LoanSchedule;
  user: User;
  interest:string | null
}



const LoanAgreementDocument: React.FC<LoanAgreementDocumentProps> = ({loanSchedule,user,interest}) => { 
  const totaDate = loanSchedule[loanSchedule?.length - 1]?.due_date;
  const now = new Date();
  const dueDate = new Date(totaDate);

  // Calculate the difference in time (milliseconds)
  const diffInMilliseconds = dueDate.getTime() - now.getTime();

  // Convert milliseconds to days
  const days = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  
  
  return (
  <Document>
    {/* Page 1 */}
    <Page size="A4" style={styles.page}>
      <Text style={{ color: '#F6011BCC', textAlign:'center',fontWeight:'semibold', fontSize:'13px',paddingTop:'20px' }}>Loan Agreement</Text>
      <Text style={{ color: '#282828', textAlign:'center',fontWeight:'medium', fontSize:'13px',paddingTop:'10px' }}>{getFormattedDateTime()}</Text>
      <Image 
       style={{ width: 158, height: 65, margin: '10px' }} 
       src="/images/icon.png"
       />
      <View style={styles.section}>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'23px' }}>Quickfund Nig. Limited,</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'23px' }}>2, Allen Avenue, Ikeja, Lagos Nigeria.</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'23px' }}>09166000043, support@quickfund.com.ng</Text>
       
      </View>
      <View style={{ width: '90%', height: 1, backgroundColor: '#D2D2D2',marginVertical: '5px',marginHorizontal:'20px' }} />
      <View style={styles.section}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'23px',marginBottom:'10px' }}>Dear {user?.first_name} {user?.last_name}.</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px' }}>We are pleased to inform you that your loan application of amount ₦{loanSchedule?.reduce((acc:any, schedule:any) => acc + schedule.principal_payment,0)} has been approved and
the amount will be disbursed to the bank account number provided by you. This document contains the terms
and conditions applicable to this loan facility, and may be considered as your copy of the loan agreement.</Text>
      </View>
      <View style={{  width: '90%', height: 1, backgroundColor: '#D2D2D2',marginVertical: '5px',marginHorizontal:'20px'  }} />
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Lender Name:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>Quickfund Nigeria Limited</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Borrower Name:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>{user?.first_name} {user?.last_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Amount:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px',fontFamily:'Montserrat' }}> ₦{loanSchedule?.reduce((acc:any, schedule:any) => acc + schedule.principal_payment,0)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
  <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Duration:</Text>
  <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>
    {days}day(s)
  </Text>
</View>

        
      </View>
      <View style={{  width: '90%', height: 1, backgroundColor: '#D2D2D2',marginVertical: '5px',marginHorizontal:'20px'  }} />

      <View style={styles.section}>
       
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Total Loan Amount:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px',fontFamily:'Montserrat' }}> ₦ {loanSchedule?.reduce((acc:any, schedule:any) => acc + schedule.principal_payment,0)}</Text>
        </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: '5px', fontFamily: 'Euclid' }}>
  <Text style={{ fontWeight: 'semibold', fontSize: '13px', lineHeight: '25px' }}>Total Interest:</Text>
  <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '25px', fontFamily: 'Montserrat' }}>
    ₦ {loanSchedule[0]?.payment_amount - loanSchedule[0]?.principal_payment}
  </Text>
  <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '25px', fontStyle: 'italic' }}>
    {!loanSchedule[0]?.has_upfront_payment
      ? '(Total interest you will pay across the tenure of the loan)'
      : '(To be collected upfront)'}
  </Text>
</View>

        {loanSchedule[0]?.has_upfront_payment && (
          <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
            <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Total Amount Receivable:</Text>
            <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px',fontFamily:'Montserrat' }}>₦ {loanSchedule[0]?.principal_payment}</Text>
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Total Repayment Amount:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px',fontFamily:'Montserrat' }}>₦ {loanSchedule?.reduce((acc:any, schedule:any) => acc + schedule?.payment_amount,0)}</Text>
        </View>
      </View>
      <View style={{  width: '90%', height: 46, backgroundColor: '#F6011BCC',marginTop: '30px',marginHorizontal:'20px',borderRadius:'3px'  }} >
      <View style={{ flexDirection: 'row', justifyContent:'space-between',paddingTop:'16px' ,color:'#FFFFFF', fontFamily:'Montserrat',paddingHorizontal:'15px' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Agreement</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>09166000043, support@quickfund.com.ng</Text>
        </View>
      </View>
    </Page>

   {/* Page 2 */}
<Page size="A4" style={styles.page}>
  <Image 
    style={{ width: 158, height: 65, marginHorizontal: '10px', marginVertical: '25px' }} 
    src="/images/icon.png"
  />
  <View style={styles.section}>
    <Text style={{ fontWeight: 'semibold', fontSize: '13px', lineHeight: '23px' }}>Repayment Schedule</Text>
    <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '20px' }}>
      Note: The amount required to be paid (for each repayment and total) does not include fees which are dependent on events that may not occur 
      (for example, late payment fees, card payment charges).
    </Text>
  </View>

  <View style={{ width: '90%', backgroundColor: '#ECECEC', marginBottom: '10px', marginHorizontal: '20px', borderRadius: '3px', paddingVertical: '5px' }}>
    {loanSchedule?.map((schedule: any, index: number) => (
      <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '25px', marginBottom: '10px',paddingVertical:'5px' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <Image 
    style={{ width: 15, height: 15 }} 
    src="/images/timer.png"
  />
          <Text style={{ fontWeight: 'semibold', fontSize: '13px', lineHeight: '15px' }}>Repayment {index + 1}</Text>
        </View>
        <Text style={{ fontWeight: 'semibold', fontSize: '13px', lineHeight: '15px' }}>{formatCurrency(schedule.payment_amount)}</Text>
        <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '15px', color: '#5A5A5A' }}>
          Due on {schedule.due_date ? formatDateLoan(schedule.due_date) : ''}
        </Text>
      </View>
    ))}
  </View>

  <View style={{ width: '90%', height: 1, backgroundColor: '#D2D2D2', marginTop: '10px', marginHorizontal: '20px' }} />

  <View style={styles.section}>
    <Text style={{ fontWeight: 'semibold', fontSize: '13px', lineHeight: '23px' }}>Advance and Repayment</Text>
    <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '20px', marginTop: '15px' }}>
      1. The Lender agrees to advance the Loan and the Borrower agrees to take the Loan subject to
      the terms and conditions as set out in the Loan application form and also in this offer letter.
    </Text>
    <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '20px', marginTop: '15px' }}>
      2. The Borrower agrees to repay the Loan (principal plus accrued interest) in accordance with the
      dedicated repayment schedule as provided above.
    </Text>
    <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '20px', marginTop: '15px' }}>
      3. The Borrower may terminate the offer letter and repay back all or any part of the borrowed
      amount on any day before the scheduled maturity date, by paying to the Lender, all interest,
      fees, and other monies then accrued or due under this offer letter to the date of early
      repayment (whether or not yet payable), including any interest arising out of delay in previous
      repayments.
    </Text>
    <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '20px', marginTop: '15px' }}>
      4. In the event that the lender is unable to charge the repayment account (due to technical
      reasons / because the account is not funded), the repayment shall be re-attempted across all the repayment sources added by the borrower at the
      discretion of the lender, wholly, or in part, till the amount for that installment is paid.
    </Text>
  </View>

  <View style={{  width: '90%', height: 46, backgroundColor: '#F6011BCC',marginTop: '10px',marginHorizontal:'20px',borderRadius:'3px'  }} >
      <View style={{ flexDirection: 'row', justifyContent:'space-between',paddingTop:'16px' ,color:'#FFFFFF', fontFamily:'Montserrat',paddingHorizontal:'15px' }}>
      <Text style={{ fontWeight: 'semibold', fontSize: '13px', lineHeight: '25px' }}>Loan Agreement</Text>
      <Text style={{ fontWeight: 'normal', fontSize: '13px', lineHeight: '25px' }}>09166000043, support@quickfund.com.ng</Text>
    </View>
  </View>
</Page>

        {/* Page 3 */}
        <Page size="A4" style={styles.page}>
      <Image 
       style={{ width: 158, height: 65, marginHorizontal: '10px',marginVertical:'25px' }} 
       src="/images/icon.png"
       />
      <View style={styles.section}>
      <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px' }}>5. For every day of delay past the payment due date, interest will continue to accrue daily, at the rate
      mentioned in this agreement.
</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>6. Failure to make repayments as at when due will attract a penalty fee of 1% per day on
unpaid amount in addition to charging current rate of interest.
</Text>
      </View>
      
      <View style={{  width: '90%', height: 1, backgroundColor: '#D2D2D2',marginVertical: '10px',marginHorizontal:'20px'  }} />
      <View style={styles.section}>
      <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'23px' }}>Representations and Warranties      </Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px' }}>The Borrower represents and warrants that:</Text>
       
      </View>
      <View style={styles.section}>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px' }}>1. He/she has the right to accept this facility and has taken all necessary actions to authorize the same upon the terms and conditions herein.
</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>2. He/she is not in default under any obligation in respect of any borrowed money that the acceptance of this facility will be or result in breach of or default under any provision of any other agreement to which the Borrower is a party. 

</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginVertical:'15px' }}>3. The information given to the Lender in the course of the application process is true, accurate and complete. The Borrower is solely responsible for the correctness of such information and the Lender shall have no obligation to verify the authenticity of any documentation provided by the Borrower. The Lender accepts no liability 
  for consequences arising out of any erroneous, incorrect or incomplete information supplied by the Borrower. If the Borrower suspects that there is an error in the information he or she has provided to the Lender, he or she shall advise the Lender accordingly without delay. The Lender will endeavor to correct the error whenever and wherever possible on a 'best effort' basis but shall have no liability arising there from. 
</Text>

      </View>
      <View style={{  width: '90%', height: 46, backgroundColor: '#F6011BCC',marginTop: '15px',marginHorizontal:'20px',borderRadius:'3px'  }} >
      <View style={{ flexDirection: 'row', justifyContent:'space-between',paddingTop:'16px' ,color:'#FFFFFF', fontFamily:'Montserrat',paddingHorizontal:'15px' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Agreement</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>09166000043, support@quickfund.com.ng</Text>
        </View>
      </View>
    </Page>
            {/* Page 4 */}
            <Page size="A4" style={styles.page}>
      <Image 
       style={{ width: 158, height: 65, marginHorizontal: '10px',marginVertical:'25px' }} 
       src="/images/icon.png"
       />
      <View style={styles.section}>
      <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px' }}>4. He/she has the right to access and operate the bank account(s)/ card(s) that has been connected for repayment. 
</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>5. Under no circumstance will the Lender be liable for any loss, expense or damage of any kind incurred by the Borrower due to non-compliance with this requirement.
</Text>
      </View>
      
      <View style={{  width: '90%', height: 1, backgroundColor: '#D2D2D2',marginVertical: '10px',marginHorizontal:'20px'  }} />
      <View style={styles.section}>
      <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'23px' }}>Events of Default
      </Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px' }}>The occurrence of any of the following events shall cause all outstanding amounts under this facility
to become immediately due and payable:
</Text>
       
      </View>
      <View style={styles.section}>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px' }}>1. The Borrower fails to make a repayment or payment of principal, interest or other amount in
respect of the Loan on the date it was due to be paid.

</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>2. The Borrower breaches any of the terms and conditions of the Loan including any
representation or confirmation given by the Borrower in this loan agreement.
 

</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginVertical:'15px' }}>3. Where a bankruptcy petition is filed against the Borrower.

</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginVertical:'15px' }}>4. Where fraud is detected at any time during the lifespan of the facility.

</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginVertical:'15px' }}>5. Where the Borrower is unable to pay any other party within the meaning of Section 1 of the
Bankruptcy Act (Cap 30) Laws of the Federation of Nigeria.

</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginVertical:'15px' }}>6. Where a situation arises, which in the Lenderʼs opinion makes it inappropriate to continue to
extend the facility to the Borrower.
</Text>

      </View>
      <View style={{  width: '90%', height: 46, backgroundColor: '#F6011BCC',marginTop: '15px',marginHorizontal:'20px',borderRadius:'3px'  }} >
      <View style={{ flexDirection: 'row', justifyContent:'space-between',paddingTop:'16px' ,color:'#FFFFFF', fontFamily:'Montserrat',paddingHorizontal:'15px' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Agreement</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>09166000043, support@quickfund.com.ng</Text>
        </View>
      </View>
    </Page>

     {/* Page 5 */}
     <Page size="A4" style={styles.page}>
      <Image 
       style={{ width: 158, height: 65, marginHorizontal: '10px',marginVertical:'25px' }} 
       src="/images/icon.png"
       />
      
      <View style={styles.section}>
      <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'23px' }}>Assignment and Disclosure of Information
      </Text>
      <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:"15px" }}>1. The Borrower consents irrevocably to any future transfer and assignment, however arising, of
the loan, whether as part of a Loan transfer scheme or otherwise.
</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>
2. The Borrower authorizes the Lender to disclose any information or documentation relating to
the Loan to third parties including credit reference agencies, authorized collection agencies,
law enforcement agencies including but not limited to the Economic and Financial Crimes
Commission and the Special Fraud Unit of the Nigerian Police Force as well in the event that
the Loan has ceased to be serviced by the Borrower.
</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>
3. By accepting this offer, you hereby expressly and unequivocally instruct Quickfund to initiate a
global standing instruction to recover outstanding repayments, in the event of a default, from
any/all accounts which you maintain with any Financial Institutions and/or linked to your BVN.
</Text>
       
      </View>
      <View style={{  width: '90%', height: 1, backgroundColor: '#D2D2D2',marginVertical: '10px',marginHorizontal:'20px'  }} />
      <View style={styles.section}>
      <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'23px' }}>Variation of Conditions
      </Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>1. The Lender reserves the right at all times to vary the terms and conditions of the Loan
agreement. Any such variation will become effective upon notice to the Borrower by any
means the Lender considers reasonable in the circumstance.
</Text>
<Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:'15px' }}>
2. In the event that the Lender varies the rate of interest payable on the Facility Amount, the
Borrower shall be duly notified ten (10) days prior to the implementation of said variation.
</Text>


      </View>
      <View style={{  width: '90%', height: 46, backgroundColor: '#F6011BCC',marginTop: '55px',marginHorizontal:'20px',borderRadius:'3px'  }} >
      <View style={{ flexDirection: 'row', justifyContent:'space-between',paddingTop:'16px' ,color:'#FFFFFF', fontFamily:'Montserrat',paddingHorizontal:'15px' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Agreement</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>09166000043, support@quickfund.com.ng</Text>
        </View>
      </View>
    </Page>
    
     {/* Page 6 */}
     <Page size="A4" style={styles.page}>
      <Image 
       style={{ width: 158, height: 65, marginHorizontal: '10px',marginVertical:'25px' }} 
       src="/images/icon.png"
       />
      
      <View style={styles.section}>
      <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'23px' }}>Governing Law
      </Text>
      <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',marginTop:"15px" }}>1. This offer letter is governed by Nigerian law and the courts of the Federal Republic of Nigeria
have jurisdiction in any matter arising from it.

</Text>
 </View>
      <View style={{  width: '90%', height: 1, backgroundColor: '#D2D2D2',marginTop: '10px',marginHorizontal:'20px'  }} />
      <View style={styles.section}>
      <Text
       style={{ fontWeight:'medium',fontSize:'15px',lineHeight:'20px',color:'#000000' }}>If you have a complaint or a query, do not hesitate 
      </Text>
      <Text
       style={{ fontWeight:'medium',fontSize:'15px',color:'#000000' }}> to contact us at:
      </Text>
      </View>
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', color:'#F6011BCC', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>By Email:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>support@quickfund.com.ng</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', color:'#F6011BCC', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>By Call:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>09166000043</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'flex-start', color:'#F6011BCC', gap:'5px', fontFamily:'Euclid' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>By visiting our website:</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>https://quickfund-web.vercel.app</Text>
        </View>
        </View>

        <View style={styles.section}>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'20px',fontStyle:'italic' }}>If dissatisfied with the resolution of your complaint, you can escalate the complaint to the Consumer
Protection Department of the Central Bank of Nigeria by writing to the Director, Consumer Protection
Department, CBN, Abuja or send an email to: cpd@cbn.gov.ng.
mitted to providing you with the best service possible. If you are not satisfied with
          our services, please do not hesitate to contact us at any time. Your feedback is important to us.
        </Text>
        </View>
        

      <View style={{  width: '90%', height: 46, backgroundColor: '#F6011BCC',marginTop: '170px',marginHorizontal:'20px',borderRadius:'3px'  }} >
      <View style={{ flexDirection: 'row', justifyContent:'space-between',paddingTop:'16px' ,color:'#FFFFFF', fontFamily:'Montserrat',paddingHorizontal:'15px' }}>
        <Text style={{ fontWeight:'semibold',fontSize:'13px',lineHeight:'25px' }}>Loan Agreement</Text>
        <Text style={{ fontWeight:'normal',fontSize:'13px',lineHeight:'25px' }}>09166000043, support@quickfund.com.ng</Text>
        </View>
      </View>
    </Page>
  </Document>
);
};
export default LoanAgreementDocument;
