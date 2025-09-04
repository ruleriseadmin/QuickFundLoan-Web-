'use client';

import React, { useState, useEffect } from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import LoanAgreementDocument from '@/components/pdf/LoanAgreementDocument';
import { useSearchParams } from 'next/navigation';
import apiClient from '@/utils/apiClient';
import LoadingPage from '../loading';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const amountId = searchParams.get('amountId') || '';
  const tenorId = searchParams.get('tenorId') || '';
  const interest = searchParams.get('interest') || '';
  const [loanSchedule, setLoanSchedule] = useState([]);
  const [fetchedUserData, setFetchedUserData] = useState<any>({});
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const getLoanSchedule = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/loan/schedule/${amountId}/${tenorId}`
        );
        setLoanSchedule(res?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (tenorId && amountId) {
      getLoanSchedule();
    }
  }, [tenorId, amountId]);

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/profile');
        setFetchedUserData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleDownload = async () => {
    try {
      const blob = await pdf(
        <LoanAgreementDocument loanSchedule={loanSchedule} user={fetchedUserData} interest={interest} />
      ).toBlob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Loan_Agreement.pdf';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };
  

  return (
    <main className="w-full h-full overflow-auto scrollbar-hide my-10">
      <NavBar />
      {loading && <LoadingPage />}
      {isClient && loanSchedule && fetchedUserData && (
        <div className="flex justify-center w-full h-full">
          <PDFViewer showToolbar={false} style={{ width: '60%', height: '60vh' }}>
            <LoanAgreementDocument loanSchedule={loanSchedule} user={fetchedUserData} interest={interest}/>
          </PDFViewer>
        </div>
      )}
      {isClient && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-[#282828] text-white py-2 hover:bg-[#1F96A9] px-8 rounded-lg"
            onClick={handleDownload}
          >
            Download loan agreement
          </button>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Page;
