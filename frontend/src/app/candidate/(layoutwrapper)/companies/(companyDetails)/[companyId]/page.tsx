"use client";
import { BackButton } from "@/components/atoms/BackLink";
import { useGetCompanyDetailsById } from "@/hooks/student/companymgmt/useGetCompanyDetailsById";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, IconButton } from "@/components/atoms/Button";
import FavoriteIcon from "@/icons/ic-favorite.svg";
import FavoriteFullIcon from "@/icons/ic-favorite_full.svg";
import { FactsCard } from "./_components/FactsCard";
import { GeneralCard } from "./_components/GeneralCard";
import { JoinUsCard } from "./_components/JoinUsCard";
import MailIcon from "@/icons/ic-mail.svg";
import { useGetCanSendRequestQuery } from "@/hooks/student/companymgmt/useGetCanSendRequestQuery";
import { Modal } from "@/components/organisms/modal/Modal";
import { useCreateSendInterviewRequestMutation } from "@/hooks/student/companymgmt/useCreateSendInterviewRequestMutation";
import { useCreateSendWaitingListMutation } from "@/hooks/student/companymgmt/useCreateSendWaitingListMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateAddRemoveCompanyFavoutiteMutation } from "@/hooks/student/companymgmt/useCreateAddRemoveCompanyFavoutiteMutation";
import { PositionsCard } from "./_components/PositionsCard";
import InterviewStatus from "../../../matching/_components/InterviewStatus";
import { useEventPhase } from "@/utils/customHooks";
import { useWebSocket } from "@/hooks/socket/useWebsocket";
import useAuthStore from "@/app/store/authStore";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { ifMatchingDateMeet } from "@/utils/checkDateDifference";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const { companyId } = params;
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);

  const queryClient = useQueryClient();
  const { eventPhase } = useEventPhase();

  const t = useTranslations();
  const [modalStatus, setModalStatus] = useState(false);

  const { user } = useAuthStore();

  const candidateId = user?.candidateId;

  const { data, isLoading } = useGetCompanyDetailsById(companyId);
  const { data: canSendRequestQuery } = useGetCanSendRequestQuery(companyId);
  const { data: companydata } = useGetLandingPageDataQuery();
  const { unreadCountCompany, sendMessage, newMessage } = useWebSocket(
    candidateId,
    companyId,
  );

  useEffect(() => {
    if (companyId && user && user.candidateId) {
      const getCompanyUnreadMessageCountPayload = {
        type: "get_unread_count_candidate",
      };
      sendMessage(getCompanyUnreadMessageCountPayload);
    }
  }, [newMessage, companyId]);

  useEffect(() => {
    if (unreadCountCompany?.length > 0 && companyId) {
      const matchedItem = unreadCountCompany.find(
        (item: any) => item.company.id === companyId,
      );
      if (matchedItem) {
        setUnreadMessagesCount(matchedItem.unreadMessageCount);
      } else {
        setUnreadMessagesCount(0);
      }
    }
  }, [unreadCountCompany, companyId, newMessage]);

  const CreateSendInterviewMutation = useCreateSendInterviewRequestMutation({
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["getCanSendRequest", companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Interview request sent successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  const CreateSendWaitingInterviewMutation = useCreateSendWaitingListMutation({
    onSuccess: (message: any) => {
      queryClient.removeQueries({
        queryKey: ["getCanSendRequest", companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Interview waiting request sent successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const waitingListBool = data?.data?.interviewSlots <= 0;

  const CreateAddRemoveCompanyFavMutation =
    useCreateAddRemoveCompanyFavoutiteMutation({
      onSuccess: (msg: any) => {
        queryClient.invalidateQueries({ queryKey: ["CompanyDetailsByIdApi"] });
        toast.success(msg?.message);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };

  const sendInterviewButton = canSendRequestQuery?.data ? (
    <Button
      variant="accent"
      tw=""
      onClick={() => toggleModal()}
      disabled={!eventPhase?.matching}
    >
      {waitingListBool
        ? t("candidate.companies.send-waitinglist-request")
        : t("candidate.companies.send-interview-request")}
    </Button>
  ) : null;

  const chatroomButton = (
    // !canSendRequestQuery?.data?.res &&
    // (getInterviewRequestByParticipants?.data?.res?.state ||
    //   getWaitingListRecordByParticipants?.data?.res?.queuePosition) ? (
    <div
      style={{ height: "38px", width: "38px" }}
      className="border rounded-full border-primary-light flex items-center justify-center cursor-pointer relative"
      onClick={() => {
        router.push("/candidate/chatroom?companyId=" + companyId);
      }}
    >
      {unreadMessagesCount ? (
        <div
          style={{
            top: "7px",
            right: "5px",
            fontSize: "7px",
            width: "10px",
            height: "10px",
            padding: "2px",
          }}
          className="bg-primary-light text-white rounded-full absolute top-100 flex justify-center items-center"
        >
          {unreadMessagesCount}
        </div>
      ) : null}
      <MailIcon className="w-5 h-5 text-primary-light fill-current" />
    </div>
  );
  // ) : null;

  const confirmSendInterviewRequest = () => {
    if (waitingListBool) {
      CreateSendWaitingInterviewMutation.mutate({ companyId });
    } else {
      CreateSendInterviewMutation.mutate({ companyId });
    }
    toggleModal();
  };

  return (
    <main className="bg-light-soft flex-grow relative">
      <Head>
        <title>
          {/* {pageTitle} */}
          page title
        </title>
      </Head>
      <div
        className="absolute z-0 bg-cover sm:h-48 h-32 bg-center top-0 left-0 right-0 "
        style={{ backgroundImage: "url(/img/head_image_1.png)" }}
      >
        <BackButton
          className="text-white absolute top-0 px-4 lg:px-10 mt-4"
          onClick={() => router.back()}
        >
          {t("common.back")}
        </BackButton>
      </div>
      {!isLoading && (
        <>
          <GeneralCard data={data}>
            <React.Fragment>
              <div className="flex flex-col md:flex-row mb-4 lg:mb-0 gap-3 items-center">
                {/* {ifMatchingDateMeet(companydata?.data?.matchingOpenDate) &&
                  sendInterviewButton} */}
                {sendInterviewButton}
                <div className="flex md:flex-row lg:mb-0 gap-3 items-center">
                  {/* {ifMatchingDateMeet(companydata?.data?.matchingOpenDate) &&
                    chatroomButton} */}
                  {chatroomButton}
                  <IconButton
                    tw="w-auto h-fit"
                    onClick={() =>
                      CreateAddRemoveCompanyFavMutation.mutate({
                        companyId: companyId,
                      })
                    }
                    icon={
                      data?.data?.isFavourite ? (
                        <FavoriteFullIcon className="w-4 h-4 fill-current text white" />
                      ) : (
                        <FavoriteIcon className="w-4 h-4 fill-current text white" />
                      )
                    }
                  >
                    {t("candidate.companies.favorite")}
                  </IconButton>
                </div>
              </div>

              <InterviewStatus
                companyId={Array.isArray(companyId) ? companyId[0] : companyId}
                textBeforeStatus
                textBeforeActions
                oneLine
              ></InterviewStatus>
            </React.Fragment>
          </GeneralCard>
          <FactsCard data={data} />
          <PositionsCard data={data} />
          <JoinUsCard data={data} />
        </>
      )}
      <Modal
        modalStatus={modalStatus}
        title={
          waitingListBool
            ? t("candidate.companies.send-waitinglist-request-dialog-title")
            : t("candidate.companies.send-interview-request-dialog-title")
        }
        description={
          waitingListBool
            ? t(
                "candidate.companies.send-waitinglist-request-dialog-description",
              )
            : t("candidate.companies.send-interview-request-dialog-description")
        }
        onClickFirstBtn={confirmSendInterviewRequest}
        onClickSecondBtn={toggleModal}
        textFirstBtn={
          waitingListBool
            ? t("candidate.companies.send-waitinglist-request-dialog-confirm")
            : t("candidate.companies.send-interview-request-dialog-confirm")
        }
        textSecondBtn={
          waitingListBool
            ? t("candidate.companies.send-waitinglist-request-dialog-cancel")
            : t("candidate.companies.send-interview-request-dialog-cancel")
        }
        toggleModal={toggleModal}
      />
    </main>
  );
};

export default page;
