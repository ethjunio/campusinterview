"use client";
import { useState, Fragment, useEffect } from "react";
import { useTranslations } from "next-intl";
import IconAlarm from "@/icons/ic-alarm.svg";
import CompanyListItem from "../../matching/_components/CompanyListItem";
import { useWebSocket } from "@/hooks/socket/useWebsocket";
import { useGetPersonalDataQuery } from "@/hooks/student/onboardingmgmt/useGetPersonalDataQuery";
import NewMessages from "./NewMessages";
import Messages from "./Messages";
import { useSearchParams, useRouter } from "next/navigation";
import NotificationHeader from "./NotificationHeader";
import useAuthStore from "@/app/store/authStore";
import { useGetChatHistoryQuery } from "@/hooks/chathistory/useGetChatHistoryQuery";

const Messenger: React.FC = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const companyId = searchParams.get("companyId");
  const [pending, setPending] = useState(false);
  const { data: personalData } = useGetPersonalDataQuery();

  const { user } = useAuthStore();

  const userId = user?.candidateId;
  const {
    getConvoData,
    sockData: companiesToChat,
    newMessage,
    sendMessage,
  } = useWebSocket(userId, companyId,"candidate");
  const { isFetching } = useGetChatHistoryQuery({
    senderId: userId || "",
    receiverId: companyId || "",
    page: 1,
  });
  
  interface Company {
    company: {
      id: string;
      name: string;
      description: string;
      imageUrlSmall: string;
    };
    state: string;
  }

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showNotificationHeader, setShowNotificationHeader] = useState(false);

  useEffect(() => {
    // if (companiesToChat.loading) return;
    const chosenCompany = companiesToChat?.find(
      (item: Company) => item.company.id === companyId?.toString(),
    );
    console.log(chosenCompany, "chosenCompany");
    if (companyId && !chosenCompany && companiesToChat?.length > 0)
      // {
      //   router &&
      //     router.push(
      //       '/candidate/chatroom?companyId=' +
      //       companiesToChat[0].company.id,
      //     );
      // }

      setSelectedCompany(chosenCompany);
  }, [companiesToChat, companyId]);

  useEffect(() => {
    const chosenCompany = companiesToChat?.find(
      (item: Company) => item.company.id === companyId?.toString(),
    );
    if (!companyId && companiesToChat?.length > 0) {
      router &&
        router.push(
          "/candidate/chatroom?companyId=" + companiesToChat[0].company.id,
        );
    }
    setSelectedCompany(chosenCompany);
  }, [companyId, companiesToChat]);

  useEffect(() => {
    setShowNotificationHeader(
      getConvoData?.length <= 0 && selectedCompany?.state !== "rejected"
        ? true
        : false,
    );
  }, [getConvoData]);

  useEffect(() => {
    if (companyId && user && user.candidateId) {
      const messagePayload = {
        type: "read_message",
        senderId: companyId,
        sentBy: "company",
      };
      sendMessage(messagePayload);
    }
  }, [companyId, newMessage]);

  function getCanChat() {
    let canChat = true;
    // if (true) {
    //   if (selectedCompany?.state === 'rejected') {
    //     canChat = false;
    //   }
    // }
    return canChat;
  }

  return (
    <Fragment>
      <div
        style={{ height: "calc(100vh - 56px)" }}
        className="flex flex-col justify-between bg-light-soft flex-1"
      >
        {selectedCompany ? (
          <Fragment>
            <div>
              <CompanyListItem
                style={{ borderRadius: 0 }}
                company={selectedCompany?.company}
                linkToProfile
                textUnder
                responsive
                showStatus={false}
              />
              {showNotificationHeader ? (
                <NotificationHeader
                  description={t(
                    "candidate.chatroom.notification-header.description",
                  )}
                  Icon={IconAlarm}
                  close
                />
              ) : null}
            </div>

            <div className="pl-3 pr-3 lg:pl-5 lg:pr-5 flex-1 flex flex-col overflow-auto">
              <Messages
                newMessage={newMessage}
                selectedCompany={selectedCompany}
                pending={pending}
              />
            </div>

            {!isFetching && (
              <div className="pl-3 pr-3 lg:pl-5 lg:pr-5 ">
                <NewMessages
                  photo={personalData?.data?.imageUrl}
                  selectedId={selectedCompany?.company?.id}
                  canChat={getCanChat()}
                  pending={pending}
                  setPending={setPending}
                />
              </div>
            )}
          </Fragment>
        ) : (
          <div className="p-4">{t("candidate.chatroom.no-chats")}</div>
        )}
      </div>
    </Fragment>
  );
};

export default Messenger;
