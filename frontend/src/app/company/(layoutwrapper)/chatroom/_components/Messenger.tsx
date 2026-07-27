"use client";
import { useState, Fragment, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CandidateListItem from "./CandidateListItem";
import { useTranslations } from "next-intl";
import { useWebSocket } from "@/hooks/socket/useWebsocket";
import NewMessages from "./NewMessages";
import Messages from "./Messages";
import useAuthStore from "@/app/store/authStore";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { useGetChatHistoryQuery } from "@/hooks/chathistory/useGetChatHistoryQuery";

const Messenger: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("companies");

  interface Candidate {
    candidate: {
      id: string;
    };
    state: string;
  }

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const { user } = useAuthStore();
  const { data: companyData } = useGetCompanyGeneralDataQuery();
  const [pending, setPending] = useState(false);

  const userId = user?.companyId;
  const { data, isFetching, refetch } = useGetChatHistoryQuery({
    senderId: userId || "",
    receiverId: candidateId || "",
    page: 1,
  });
  const types = "company";

  const {
    getcandidatestochatData: candidatesToChat,
    newMessage,
    sendMessage,
  } = useWebSocket(userId, candidateId, types);
  console.log(data, pending, candidatesToChat, "DATTTTTTT");

  // ✅ One clean effect to sync URL and selectedCandidate
  useEffect(() => {
    if (!candidatesToChat?.length) return;

    const chosenCandidate = candidatesToChat.find(
      (item: any) => item.candidate.id === candidateId,
    );

    if (candidateId && chosenCandidate) {
      setSelectedCandidate(chosenCandidate);
    } else if (!candidateId) {
      // redirect to first candidate if none in URL
      const first = candidatesToChat[0];
      router.push(`/company/chatroom?candidateId=${first.candidate.id}`);
      setSelectedCandidate(first);
    } else {
      // candidateId not found in list
      setSelectedCandidate(null);
    }
  }, [candidateId, candidatesToChat, router]);

  // ✅ Mark messages as read whenever candidate changes
  useEffect(() => {
    if (candidateId && userId) {
      const messagePayload = {
        type: "read_message",
        senderId: candidateId,
        sentBy: "candidate",
      };
      sendMessage(messagePayload);
    }
  }, [candidateId, newMessage, userId, sendMessage]);

  function getCanChat() {
    let canChat = true;
    // if (selectedCandidate?.state === "rejected") {
    //   canChat = false;
    // }
    return canChat;
  }

  return (
    <div
      style={{ height: "calc(100vh - 56px)" }}
      className="flex flex-col justify-between bg-light-soft flex-1"
    >
      {selectedCandidate ? (
        <Fragment>
          <div>
            <CandidateListItem
              style={{ borderRadius: 0 }}
              candidate={selectedCandidate.candidate}
              linkToProfile
              textUnder
              responsive={true}
              showStatus={false}
            />
          </div>
          <div className="pl-3 pr-3 lg:pl-5 lg:pr-5 flex-1 flex flex-col overflow-auto">
            <Messages
              newMessage={newMessage}
              selectedCandidate={selectedCandidate}
              pending={pending}
            />
          </div>
          {!isFetching && (
            <div className="pl-3 pr-3 lg:pl-5 lg:pr-5 ">
              <NewMessages
                photo={companyData?.imageUrlLarge}
                selectedId={selectedCandidate.candidate.id}
                canChat={getCanChat()}
                pending={pending}
                setPending={setPending}
              />
            </div>
          )}
        </Fragment>
      ) : (
        <div className="p-4">{t("chatroom.no-chats")}</div>
      )}
    </div>
  );
};

export default Messenger;
