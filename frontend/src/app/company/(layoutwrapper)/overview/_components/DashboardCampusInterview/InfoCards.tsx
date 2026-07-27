"use client"

import useAuthStore from "@/app/store/authStore";
import { useGetCompanyReceivedRequestQuery } from "@/hooks/company/matching/useGetCompanyReceivedRequestQuery";
import { MessageCircle, Calendar, ArrowRight } from "lucide-react";

const InfoCards = () => {

  const { data, isLoading } = useGetCompanyReceivedRequestQuery();
  const totalUnreadCount = useAuthStore((state) => state.totalUnreadCount);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-center gap-3 rounded-xl bg-white p-4">
        <MessageCircle size={20} className="shrink-0 text-PrimaryBlue" />
        <div className="flex-1 space-y-2">
          <p className="text-lg font-semibold text-foreground">Messages</p>
          <p className="text-base text-gray-500">{totalUnreadCount} new messages</p>
        </div>
        <a href="/company/chatroom" className="flex items-center gap-1 text-sm font-semibold text-PrimaryBlue hover:underline whitespace-nowrap mt-6">
          Open chatroom <ArrowRight size={14} />
        </a>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-white p-4">
        <Calendar size={20} className="shrink-0 text-PrimaryBlue" />
        <div className="flex-1 space-y-2">
          <p className="text-lg font-semibold text-foreground">Requests</p>
          <p className="text-base text-gray-500">{data?.data?.length} requests</p>
        </div>
        <a href="/company/matching" className="flex items-center gap-1 text-sm font-semibold text-PrimaryBlue hover:underline whitespace-nowrap mt-6">
          View requests <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default InfoCards;
