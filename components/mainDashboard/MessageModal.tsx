"use client";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Image from "next/image";
import Notification from "../Notification";
import { formatDate, formatTime } from "@/utils/bankFunctions";
import apiClient from "@/utils/apiClient"; 
import { BsThreeDots } from "react-icons/bs";

type Message = {
  [key: string]: any;
};

type MessageModalProps = {
  isOpen: boolean;
  toggleMessageModal: () => void;
  messages: Message[];
setRefetch?: (value: boolean) => void | undefined; // Optional prop to trigger refetch
};

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, toggleMessageModal, messages,setRefetch }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleNotification = () => setNotificationOpen(!notificationOpen);

  const handleReadMore = async (notificationId: string) => {
    try {
      // Mark as read
      await apiClient.patch("/notification/read", {
        notification_id: notificationId,
      });
      setRefetch && setRefetch(true);     
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to mark notification as read"
      );
      setNotificationOpen(true);
    }
  };

  return (
    <div
      onClick={toggleMessageModal}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black w-full h-full -translate-y-1/2 z-50 flex justify-center items-center bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[420px] bg-white lg:ml-32 overflow-x-hidden md:ml-32 mx-2 min-h-[557px] h-auto font-outfit rounded-[22px] px-4 pt-8 shadow-md max-h-[80vh] overflow-y-auto transition-transform duration-300 transform ${
          isOpen ? "scale-100" : "scale-75"
        }`}
      >
        <div className="flex align-middle items-center gap-4 justify-start">
          <button
            onClick={toggleMessageModal}
            className="rounded-full w-[36px] h-[36px] text-2xl bg-[#F6F6F6] font-bold flex items-center justify-center"
          >
            <MdOutlineArrowBackIosNew className="text-navfont text-2xl" />
          </button>
          <p className="text-[#1C1C1E] text-[18px] font-bold">Notification</p>
        </div>
        <hr className="w-[380px] mx-auto my-5 text-[#00000033]" />

        {messages?.length < 1 ? (
          <div className="w-full h-auto mt-20">
            <div>
              <Image
                src="/images/nomessage.png"
                alt="transaction"
                width={33.8}
                height={44.2}
                className="object-cover m-auto mb-3"
              />
              <p className="text-[#5A5A5A] text-[16px] text-center">Nothing to see here yet</p>
            </div>
          </div>
        ) : (
          messages?.map((msg: any, index: number) => {
            const isExpanded = expandedId === msg?.notification_id;

            return (
              <div
                key={index}
                className="grid grid-cols-12 mb-4 mx-2 border-b pb-4 cursor-pointer hover:bg-[#F6F6F6] transition-colors duration-200"
              >
                <div className="col-span-2">
                  <Image src={`/images/icon.png`} alt="Icon" width={38} height={38} />
                </div>

                <div className="text-[16px] text-[#282828] col-span-9 flex flex-col">
                  <span className="text-[14px] text-[#5A5A5A] font-medium">
                    {msg?.data?.title}
                  </span>

                  <span className="text-[14px] text-[#353945] font-normal">
                    {
                      msg?.data?.body
                    }
                  </span>

                  <div className="flex gap-2 justify-between items-center mt-2">
                    <div>
                        <span className="text-[12px] text-[#777E90] font-normal">
                      {formatDate(msg?.created_at?.split(" ")[0])}
                    </span>
                    {' '}
                    <span className="text-[12px] text-[#777E90] font-normal">
                      {formatTime(msg?.created_at?.split(" ")[1])}
                    </span>

                    </div>
                     {msg?.read_at === null && (
                    <span
                          onClick={() => handleReadMore(msg?.id)}
                          className="text-[#F24C5D] text-[10px] ml-1 underline cursor-pointer"
                        >
                          mark as read
                        </span>
                    )}
                    
                  </div>
                </div>
                    {msg?.read_at === null && (
                        <div className="col-span-1 bg-[#F24C5D] flex items-center justify-center h-[13px] font-medium rounded-[7px] text-white text-[10px] font-outfit">
                  New
                </div>
                    )}
                
              </div>
            );
          })
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

export default MessageModal;
