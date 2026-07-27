import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useSearchParams } from "next/navigation";
import useAuthStore from "@/app/store/authStore";
import { useWebSocket } from "@/hooks/socket/useWebsocket";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { useGetChatHistoryQuery } from "@/hooks/chathistory/useGetChatHistoryQuery";

export interface MessagesProps {
  newMessage?: any;
  selectedCandidate?: any;
  pending:boolean
}
function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const Messages: React.FC<MessagesProps> = ({
  newMessage,
  selectedCandidate,
  pending
}) => {
  const { data: companyData } = useGetCompanyGeneralDataQuery();
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false); // ✅ NEW

  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const prevCompanyId = usePrevious(candidateId);
  const { user } = useAuthStore();

  const userId = user?.companyId;
  const types = "company";

  const { getConvoData } = useWebSocket(userId, candidateId, types);
  const limit = 20;

  const { data, isFetching ,refetch} = useGetChatHistoryQuery({
    senderId: userId || "",
    receiverId: candidateId || "",
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
    if (prevCompanyId != null && prevCompanyId !== candidateId) {
      setPage(1);
    }
  }, [candidateId, prevCompanyId]);
  useEffect(() => {
    if (data?.data?.length) {
      setMessages((prev) => (page === 1 ? data.data : [...data.data, ...prev]));

      if (data.data.length < limit) {
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
    } else if (data?.data?.length === 0) {
      setHasMore(false);
      if (data?.pagination?.totalCount === 0) {
        setMessages([]);
      }
    }
  }, [data?.data]);

  useEffect(() => {
    if (
      newMessage?.candidate.id === selectedCandidate?.candidate?.id &&
      newMessage?.company.id === userId
    ) {
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      scrollToBottom();
    }
  }, [newMessage]);

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
    <div
    
    className="flex-1 overflow-y-auto h-full" ref={containerRef}>
      <div className="flex flex-col justify-end pl-5 pr-5 min-h-full mt-2">
        {/* Loader at the top when paginating */}
        {isFetching && page > 1 && (
          <div className="flex justify-center py-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {messages?.map((message, index) => {
          
          const isFirstMessage = page > 1 && index === 0;
          return (
            <div key={message.id} ref={isFirstMessage ? firstMessageRef : null}>
              <Message
                date={message.createdAt}
                from={message.sentBy}
                photo={
                  message.sentBy === "company"
                    ? companyData?.imageUrlLarge
                    : selectedCandidate?.candidate?.imageUrlSmall
                }
                attachment = {message?.files}
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
