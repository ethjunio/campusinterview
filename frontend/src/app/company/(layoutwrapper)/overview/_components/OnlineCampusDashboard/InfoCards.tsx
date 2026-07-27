"use client";

import useAuthStore from "@/app/store/authStore";
import { useGetCompanyReceivedRequestQuery } from "@/hooks/company/matching/useGetCompanyReceivedRequestQuery";
import { MessageCircle, Calendar, ArrowRight } from "lucide-react";

const InfoCards = () => {
  const { data, isLoading } = useGetCompanyReceivedRequestQuery();
  const totalUnreadCount = useAuthStore((state) => state.totalUnreadCount);
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="flex items-center gap-3 rounded-xl bg-white px-[16px] py-[16px]">
        <MessageCircle
          size={20}
          className="shrink-0 text-primaryPurple bg-[#F3F2FB] w-[48px] h-[48px] px-3 py-3 rounded-2xl"
        />
        <div className="flex-1 space-y-2">
          <p className="text-lg font-semibold text-foreground !text-[16px] leading-[24px] text-[#101828] font-thin">
            Messages
          </p>
          <p className="text-base text-gray-500 !text-[16px] leading-[24px] text-[#4A5565] font-thin">
            {totalUnreadCount} new messages
          </p>
        </div>
        <a
          href="/company/chatroom"
          className="flex items-center gap-1 text-sm font-semibold text-primaryPurple hover:underline whitespace-nowrap mt-6 !text-[14px] leading-[20px] text-[#5140F0] font-thin"
        >
          Open chatroom <ArrowRight size={14} />
        </a>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-white px-[16px] py-[16px]">
        <Calendar
          size={20}
          className="shrink-0 text-primaryPurple bg-[#F3F2FB] w-[48px] h-[48px] px-3 py-3 rounded-2xl"
        />
        <div className="flex-1 space-y-2">
          <p className="text-lg font-semibold text-foreground !text-[16px] leading-[24px] text-[#101828] font-thin">
            Requests
          </p>
          <p className="text-base text-gray-500 !text-[16px] leading-[24px] text-[#4A5565] font-thin">
            {data?.data?.length} requests
          </p>
        </div>
        <a
          href="/company/matching"
          className="flex items-center gap-1 text-sm font-semibold text-primaryPurple hover:underline whitespace-nowrap mt-6 !text-[14px] leading-[20px] text-[#5140F0] font-thin"
        >
          View requests <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default InfoCards;
