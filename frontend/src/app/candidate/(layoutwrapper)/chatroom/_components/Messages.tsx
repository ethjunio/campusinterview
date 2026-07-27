"use client";
import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useGetPersonalDataQuery } from "@/hooks/student/onboardingmgmt/useGetPersonalDataQuery";
import useAuthStore from "@/app/store/authStore";
import { useSearchParams } from "next/navigation";
import { useGetChatHistoryQuery } from "@/hooks/chathistory/useGetChatHistoryQuery";

export interface MessagesProps {
  newMessage?: any;
  selectedCompany?: any;
  pending:boolean
}
function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const Messages: React.FC<MessagesProps> = ({ newMessage, selectedCompany ,  pending}) => {
  const [messages, setMessages] = useState<
    {
      id: string;
      createdAt: string;
      sentBy: string;
      content: string;
      files: any;
    }[]
  >([]);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const messagesEnd = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const prevCompanyId = usePrevious(companyId);
  const { data: personalData } = useGetPersonalDataQuery();
  const { user } = useAuthStore();
  const userId = user?.candidateId;

  const limit = 20;
  const { data: getConvoData, isFetching } = useGetChatHistoryQuery({
    senderId: userId || "",
    receiverId: companyId || "",
    page,
  });
  function scrollToBottom() {
    isProgrammaticScroll.current = true;
    setTimeout(() => {
      messagesEnd.current?.scrollIntoView({ behavior: "auto" });
      isProgrammaticScroll.current = false;
    }, 300);
  }
  useEffect(() => {
    if (prevCompanyId != null && prevCompanyId !== companyId) {
      setPage(1);
    }
  }, [companyId, prevCompanyId]);
  useEffect(() => {
    if (getConvoData?.data?.length) {
      setMessages((prev) =>
        page === 1 ? getConvoData.data : [...getConvoData.data, ...prev]
      );
      if (getConvoData?.data?.length < limit) {

        setHasMore(false);
      }else{
        setHasMore(true);
      }

      if (page === 1) {
        scrollToBottom();
      } else {
        setTimeout(() => {
          isProgrammaticScroll.current = true;
          firstMessageRef.current?.scrollIntoView({ behavior: "auto" });
          setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 100);
        }, 100);
      }
    } else if (getConvoData?.data?.length === 0) {

      setHasMore(false);
      if (getConvoData?.pagination?.totalCount === 0) {
        setMessages([]);
      }
    }
  }, [getConvoData?.data]);

  useEffect(() => {
    if (
      newMessage?.company.id === selectedCompany?.company?.id &&
      newMessage?.candidate.id === userId
    ) {
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      scrollToBottom();
    }
  }, [newMessage]);
  // useEffect(() => {
  //   setPreviousCompanyId(companyId);
  // }, [companyId]);
  useEffect(() => {
    const el = containerRef.current;

    const handleScroll = () => {
      if (!el || isProgrammaticScroll.current) return;

      const isAtTop = el.scrollTop <= 10;
      if (isAtTop && hasMore && !isFetching) {
        setPage((prev) => prev + 1);
      }
    };

    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => {
        el.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hasMore, isFetching]);

  return (
    <div className="flex-1 overflow-y-auto h-full" ref={containerRef}>
      <div className="flex flex-col justify-end pl-5 pr-5 min-h-full mt-2">
        {/* Loader at top during pagination */}
        {isFetching && page > 1 && (
          <div className="flex justify-center py-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {messages?.map((message, index) => {
          const isFirstMessage = page > 1 && index === 0;
          return (
            <div
              key={message.id + index}
              ref={isFirstMessage ? firstMessageRef : null}
            >
              <Message
                date={message.createdAt}
                from={message.sentBy}
                photo={
                  message.sentBy === "candidate"
                    ? personalData?.data?.imageUrlSmall
                    : selectedCompany?.company?.imageUrlSmall
                }
                attachment={message?.files}
                pending={pending}
              >
                {message.content}
              </Message>
            </div>
          );
        })}

        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </div>
    </div>
  );
};

export default Messages;
