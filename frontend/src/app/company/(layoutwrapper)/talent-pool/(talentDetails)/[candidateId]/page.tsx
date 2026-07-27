"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { PersonalCard } from "./_components/PersonalCard";
import { EducationsCard } from "./_components/EducationsCard";
import { ExperienceCard } from "./_components/ExperienceCard";
import { LookingForCard } from "./_components/LookingForCard";
import { LanguagesCard } from "./_components/LanguagesCard";
import { ItSkillsCard } from "./_components/ItSkillsCard";
import { ExtracurricularsCard } from "./_components/ExtraCurricularsCard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/atoms/BackLink";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/organisms/modal/Modal";
import { candidateCategoryOptions } from "../../../matching/_components/constants";
import MailIcon from "@/icons/ic-mail.svg";
import InterviewStatus from "../../../matching/_components/InterviewStatus";
import Select from "react-select";
import Head from "next/head";
import { useGetTalentDetailByIdQuery } from "@/hooks/company/talent-pool/useGetTalentDetailByIdQuery";
import { useGetPrevNextCandidateByIdQuery } from "@/hooks/company/talent-pool/useGetPrevNextCandidateByIdQuery";
import { useCreateCandidateSaveMutation } from "@/hooks/company/talent-pool/useCreateCandidateSaveMutation";
import { toast } from "sonner";
import { useCreateCandidateCategorizeMutation } from "@/hooks/company/talent-pool/useCreateCandidateCategorizeMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { useGetCompanyCanSendRequestQuery } from "@/hooks/company/talent-pool/useGetCompanyCanSendRequestQuery";
import { useCreateSendInterviewRequestMutation } from "@/hooks/company/talent-pool/useCreateSendInterviewRequestMutation";
import { useCreateSendWaitingRequestMutation } from "@/hooks/company/talent-pool/useCreateSendWaitingRequestMutation";
import { MiscsCard } from "./_components/MiscCard";
import { axiosInstance } from "@/utils/axios";
import { useWebSocket } from "@/hooks/socket/useWebsocket";
import useAuthStore from "@/app/store/authStore";
import IconInfo from "@/icons/ic-info.svg";
import * as Tooltip from "@radix-ui/react-tooltip";

const Profile: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [initValues, setInitValues] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const searchParams = useSearchParams();
  const fromTalentPool = searchParams.get("origin") === "t-pool";

  const originTitle = searchParams.get("origin");
  let backbutton = "Back";
  if (originTitle === "t-pool") {
    backbutton = "Back to Talent Pool";
  }

  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);

  const params = useParams();
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const { candidateId } = params;
  const { data, isLoading } = useGetTalentDetailByIdQuery(candidateId);
  const {
    data: prevNextData,
    refetch: refetchPrevNextData,
    isFetching: isFetchingPrevNextData,
  } = useGetPrevNextCandidateByIdQuery(candidateId);
  const { data: CompanyData } = useGetCompanyGeneralDataQuery() as any;
  const { data: canSendRequestQuery } =
    useGetCompanyCanSendRequestQuery(candidateId);

  const { unreadCountCandidate, sendMessage, newMessage } = useWebSocket(
    companyId,
    candidateId,
  );

  useEffect(() => {
    if (candidateId && user && user.companyId) {
      const getCandidateUnreadMessageCountPayload = {
        type: "get_unread_count_company",
      };
      sendMessage(getCandidateUnreadMessageCountPayload);
    }
  }, [newMessage, candidateId]);

  useEffect(() => {
    if (unreadCountCandidate?.length > 0 && candidateId) {
      const matchedItem = unreadCountCandidate.find(
        (item: any) => item.candidate.id === candidateId,
      );
      if (matchedItem) {
        setUnreadMessagesCount(matchedItem.unreadMessageCount);
      } else {
        setUnreadMessagesCount(0);
      }
    }
  }, [unreadCountCandidate, candidateId, newMessage]);

  const createCategoryUpdateMutation = useCreateCandidateCategorizeMutation({
    onSuccess: () => {
      toast.success("Data saved successfully");
      queryClient.invalidateQueries({
        queryKey: ["getTalentPoolDetailById", candidateId],
      });
    },
  });

  const createCandidateVisitMutation = useCreateCandidateSaveMutation({
    onSuccess: () => {
      toast.success("Data saved successfully");
    },
  });

  const sendInterviewRequestMutation = useCreateSendInterviewRequestMutation({
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Data saved successfully");
    },
    onerror: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const sendWaitingListRequestMutation = useCreateSendWaitingRequestMutation({
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Data saved successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (candidateId) {
      createCandidateVisitMutation.mutate({
        candidateId: candidateId,
      });
    }
  }, [candidateId]);

  const pageTitle = data?.data
    ? `${data.data?.firstName} ${data?.data?.lastName}`
    : "Candidate Detail";

  const waitingListBool = CompanyData?.interviewSlots <= 0;

  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };

  const sendInterviewButton = canSendRequestQuery?.data ? (
    <Button
      variant="accent"
      tw="mr-4"
      onClick={() => toggleModal()}
      disabled={false}
    >
      {waitingListBool
        ? t("companies.talent-pool.send-waitinglist-request")
        : t("companies.talent-pool.send-interview-request")}
    </Button>
  ) : null;

  async function getCandidateCV(candidateId: any) {
    try {
      const url = `/company/talentPoolMgmt/getCandidateCV/${candidateId}`;

      const response = await axiosInstance.get(url, {
        responseType: "blob",
      });

      const file = window.URL.createObjectURL(response.data);
      window.open(file, "_blank");

      return response;
    } catch (error) {
      throw error;
    }
  }

  const downloadCandidateCVButton = (
    <Button
      variant="accent"
      tw="mr-4"
      onClick={async () => await getCandidateCV(candidateId)}
    >
      {t("companies.talent-pool.download-candidate-cv")}
    </Button>
  );

  const chatroomButton = (
    <div
      style={{ height: "38px", width: "38px" }}
      className="border rounded-full border-primary-light flex items-center justify-center mr-4 cursor-pointer relative"
      onClick={() => {
        router.push("/company/chatroom?candidateId=" + candidateId);
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
      <MailIcon
        className="w-5 h-5 text-primary-light fill-current"
        style={{ marginRight: "1px" }}
      />
    </div>
  );

  const confirmSendInterviewRequest = () => {
    if (waitingListBool) {
      sendWaitingListRequestMutation.mutate({ candidateId });
    } else {
      sendInterviewRequestMutation.mutate({ candidateId });
    }
    toggleModal();
  };

  const category = candidateCategoryOptions.find(
    (option) => option.value === data?.data?.categorizedByCompany,
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      // color: state.isSelected ? 'red' : 'blue',
      background:
        "transparent linear-gradient(94deg, #1454CE 0%, #0621B7 100%) 0% 0% no-repeat padding-box",
      color: "#fff",
      borderRadius: "9999px",
      paddingRight: "0.75rem",
      paddingLeft: "0.75rem",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#fff",
    }),
  };

  function handleNextOrPrev() {
    setInitValues(false);
    refetchPrevNextData();
  }

  return (
    <main className="bg-light-soft flex-grow relative">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div
        className="absolute z-0 bg-cover h-48 bg-center top-0 left-0 right-0 "
        style={{ backgroundImage: "url(/img/head_image_1.png)" }}
      >
        <BackButton
          className="text-white absolute top-0 px-4 lg:px-10 mt-4"
          onClick={() => {
            if (fromTalentPool) {
              router.push("/company/talent-pool");
            } else {
              router.back();
            }
          }}
        >
          {backbutton}
        </BackButton>
      </div>
      {!isLoading && data && (
        <>
          <PersonalCard
            data={data}
            readonly
            candidateId={candidateId}
            previousCandidateId={prevNextData?.data?.prevCandi?.id}
            nextCandidateId={prevNextData?.data?.nextCandi?.id}
            handleNextOrPrev={handleNextOrPrev}
          >
            <React.Fragment>
              <div className="flex flex-col md:flex-row gap-3 md:gap-0 mb-4 lg:mb-0">
                {sendInterviewButton}
                {downloadCandidateCVButton}
                <div className="flex md:flex-row md:gap-0 lg:mb-0">
                  <div>{chatroomButton}</div>
                  <div>
                    <Select
                      styles={customStyles}
                      className="w-36"
                      classNamePrefix="react-select"
                      isSearchable={false}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      options={candidateCategoryOptions}
                      placeholder={t(
                        "admin.interviews.matches.search-company-placeholder",
                      )}
                      onChange={(selectedValue: any) => {
                        console.log("selectedValue: ", selectedValue);
                        createCategoryUpdateMutation.mutate({
                          id: candidateId,
                          data: { type: selectedValue.value },
                        });
                      }}
                      value={category ? category : candidateCategoryOptions[0]}
                    />
                  </div>

                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div
                          style={{ height: "38px", width: "38px" }}
                          className="border rounded-full border-primary-light flex items-center justify-center mx-4 cursor-pointer relative"
                        >
                          <IconInfo
                            className="w-5 h-5 text-primary-light fill-current"
                            style={{ marginRight: "1px" }}
                          />
                        </div>
                      </Tooltip.Trigger>

                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="top" // top, right, bottom, left
                          sideOffset={6} // gap from trigger
                          className="px-2 py-1 bg-gray-100 text-gray-900 text-sm rounded"
                        >
                          Rate candidates from 1 (low fit) to 5 (excellent fit)
                          to prioritize your selection.
                          <Tooltip.Arrow className="fill-gray-900" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
              </div>

              <InterviewStatus
                candidateId={candidateId}
                textBeforeStatus
                textBeforeActions
                oneLine
              ></InterviewStatus>
            </React.Fragment>
          </PersonalCard>
          <EducationsCard data={data} readonly />
          <ExperienceCard data={data} readonly />
          <LookingForCard data={data} readonly />
          <ExtracurricularsCard data={data} readonly />
          <LanguagesCard data={data} readonly />
          <ItSkillsCard data={data} readonly />
          <MiscsCard data={data} readonly />
        </>
      )}

      <Modal
        modalStatus={modalStatus}
        title={
          waitingListBool
            ? t("companies.talent-pool.send-waitinglist-request-dialog-title")
            : t("companies.talent-pool.send-interview-request-dialog-title")
        }
        description={
          waitingListBool
            ? t(
                "companies.talent-pool.send-waitinglist-request-dialog-description",
              )
            : t(
                "companies.talent-pool.send-interview-request-dialog-description",
              )
        }
        onClickFirstBtn={confirmSendInterviewRequest}
        onClickSecondBtn={toggleModal}
        textFirstBtn={
          waitingListBool
            ? t("companies.talent-pool.send-waitinglist-request-dialog-confirm")
            : t("companies.talent-pool.send-interview-request-dialog-confirm")
        }
        textSecondBtn={
          waitingListBool
            ? t("companies.talent-pool.send-waitinglist-request-dialog-cancel")
            : t("companies.talent-pool.send-interview-request-dialog-cancel")
        }
        toggleModal={toggleModal}
      />
    </main>
  );
};

export default Profile;
