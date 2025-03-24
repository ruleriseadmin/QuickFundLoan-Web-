"use client";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Image from "next/image";
import Notification from "../Notification";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";


type Loan = {
  [key: string]: any;
};

type LoanTransactionsProps = {
  isOpen: boolean;
  toggleLoanTransactions: () => void;
  loanTransactions: Loan[];
};

const LoanTransactions: React.FC<LoanTransactionsProps> = ({ isOpen, toggleLoanTransactions, loanTransactions }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(4); // Items per page
  const [selectedMethod, setSelectedMethod] = useState("all"); // Transaction filter

  const toggleNotification = () => setNotificationOpen(!notificationOpen);

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "₦ 0";
    return "₦ " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Filter transactions based on selected method
  const filteredTransactions = loanTransactions?.filter((loan) => {
    if (selectedMethod === "all") return true;
    if (selectedMethod === "repayment") return loan.transaction_type === "payment"  || loan.transaction_type === 'penalty';
    if (selectedMethod === "disbursement") return loan.transaction_type === "loan" || loan.transaction_type === 'refund';
    return false;
  });

  console.log(loanTransactions);

  // Pagination logic
  const paginateTransactions = (transactions: Loan[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const displayedTransactions = paginateTransactions(filteredTransactions);

  return (
    <div
      onClick={toggleLoanTransactions}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[420px] bg-white lg:ml-32 md:ml-32 mx-2 min-h-[617px] h-auto font-outfit rounded-[22px] px-4 pt-8 shadow-md max-h-[80vh] overflow-y-auto transition-transform duration-300 transform ${
          isOpen ? "scale-100" : "scale-75"
        }`}
      >
        <div className="flex align-middle items-center gap-4 justify-start">
          <button
            onClick={toggleLoanTransactions}
            className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center justify-center"
          >
            <MdOutlineArrowBackIosNew className="text-navfont text-2xl" />
          </button>
          <p className="text-[#1C1C1E] text-[18px] font-bold">Transaction History</p>
        </div>
        <hr className="w-[380px] mx-auto my-5 text-[#00000033]" />

        <div className="flex justify-center gap-4 items-center mb-10">
          <button
            className={`text-[15px] ${
              selectedMethod === "all"
                ? "bg-[#282828] text-white px-2 rounded-full py-1"
                : "bg-transparent text-[#5A5A5A]"
            }`}
            onClick={() => setSelectedMethod("all")}
          >
            All transactions
          </button>
          <button
            className={`text-[15px] ${
              selectedMethod === "repayment"
                ? "bg-[#282828] text-white px-2 rounded-full py-1"
                : "bg-transparent text-[#5A5A5A]"
            }`}
            onClick={() => setSelectedMethod("repayment")}
          >
            Repayment
          </button>
          <button
            className={`text-[15px] ${
              selectedMethod === "disbursement"
                ? "bg-[#282828] text-white px-2 rounded-full py-1"
                : "bg-transparent text-[#5A5A5A]"
            }`}
            onClick={() => setSelectedMethod("disbursement")}
          >
            Disbursement
          </button>
        </div>

        {filteredTransactions.length < 1 ? (
         <div className="w-full h-auto mt-20">
         <div>
           <Image src="/images/tag.png" alt="transaction" width={33.8} height={44.2} className="object-cover m-auto mb-3" />
           <p className="text-[#5A5A5A] text-[16px] text-center">Nothing to see here yet</p>
         </div>
       </div>
        ) : (
          displayedTransactions.map((loan: any, index: number) => (
            <div key={index} className="grid grid-cols-3 mb-4 mx-2 ">
              <div className="flex w-full items-center gap-2 col-span-2">
                <Image
                  src={`/images/${
                    loan.transaction_type === "loan" ? "credit.png" : loan.transaction_type === 'refund' ? 'credit.png' : "debit.png"
                  }`}
                  alt="Debit"
                  width={38}
                  height={38}
                />
                <p className="text-[16px] text-[#282828]">
                  {loan.transaction_type === "loan"
                    ? "Loan disbursement"
                    : loan.transaction_type === "refund"
                    ? "Refund disbursement"
                    : loan.transaction_type === 'penalty'
                     ? "Penalty repayment"
                    : "Loan repayment"}
                  <br />
                  <span className="text-[#828282] ">{loan?.transaction_date || "N/A"}</span>
                </p>
              </div>
              <p className="text-[16px] font-semibold w-full flex justify-end col-span-1">
                      {loan.transaction_type === 'loan' || loan.transaction_type === 'refund' ? '' : '- '}
                      {loan.transaction_type === 'loan' || loan.transaction_type === 'refund'
                        ? formatCurrency(loan.amount)
                        : formatCurrency(Number(loan.amount.toString().split('-')[1]))}
                    </p>
              <hr className="w-[380px] mx-auto mt-3 mb-2 text-[#00000033]" />
            </div>
          ))
        )}
{filteredTransactions.length > 0 &&  (
  <div className="flex justify-center gap-4 items-center mt-10">
  <button
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
    className={`${
      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
    } w-[72px] h-[25px] text-[10px] rounded-[7px] flex justify-center items-center border border-solid border-[#00000040]`}
  >
    <IoChevronBackOutline className="text-[#282828] text-[10px]" />
    Previous
  </button>
  <p className="text-[14px]">Page {currentPage} of {totalPages}</p>
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className={`${
      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
    } w-[72px] h-[25px] text-[10px] rounded-[7px] flex justify-center items-center border border-solid border-[#00000040]`}
  >
    Next
    <IoChevronForwardOutline className="text-[#282828] text-[10px]" />
  </button>
</div>


)}
        
        {notificationOpen && (
          <Notification
            isOpen={notificationOpen}
            status="error"
            
            message={error}
            toggleNotification={toggleNotification}
          />
        )}
      </div>
    </div>
  );
};

export default LoanTransactions;
