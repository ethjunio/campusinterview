import React, { useState } from "react";
import AcceptIcon from "@/icons/ic-accept.svg";
import { WithdrawButton } from "@/components/atoms/Button";
import WaitingListIcon from "@/icons/ic-waitinglist.svg";
import DeclineIcon from "@/icons/ic-decline.svg";
import { useTranslations } from "next-intl";
import {
  AcceptButton,
  DeclineButton,
  WaitingListButton,
} from "@/components/atoms/Button";
import { Modal } from "@/components/organisms/modal/Modal";
import c from "classnames";
import { useDeleteWithdrawInterviewRequestMutation } from "@/hooks/student/matching/useDeleteWithdrawInterviewRequestMutation";
import { useCreateConfirmInterviewRequestMutation } from "@/hooks/student/matching/useCreateConfirmInterviewRequestMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateConfirmInterviewWaitingRequestMutation } from "@/hooks/student/matching/useCreateConfirmInterviewWaitingRequestMutation";
import { useCreateDeclineInterviewRequestMutation } from "@/hooks/student/matching/useCreateDeclineInterviewRequestMutation";
import useAuthStore from "@/app/store/authStore";
import { useEventPhase } from "@/utils/customHooks";
import { useGetInterviewStatusQuery } from "@/hooks/visitors/useGetInterviewStatusQuery";
import { useGetArrangedInterviewsQuery } from "@/hooks/student/matching/useGetArrangedInterviewsQuery";
import { useGetSentRequestQuery } from "@/hooks/student/matching/useGetSentRequestQuery";
import { useGetReceivedRequestQuery } from "@/hooks/student/matching/useGetReceivedRequestQuery";
import { useGetDeclinedRequestsQuery } from "@/hooks/student/matching/useGetDeclinedRequestsQuery";
import { useGetWaitingListQuery } from "@/hooks/student/matching/useGetWaitingListQuery";

export interface InterviewStatusProps {
  companyId?: string;
  textBeforeStatus?: boolean;
  textBeforeActions?: boolean;
  oneLine?: boolean;
}

const InterviewStatus: React.FC<InterviewStatusProps> = ({
  companyId,
  textBeforeStatus,
  textBeforeActions,
  oneLine,
}) => {
  const t = useTranslations();

  const { eventPhase } = useEventPhase();

  const [modalStatus, setModalStatus] = useState(false);
  const [modalType, setModalType] = useState();
  const [requestId, setRequestId] = useState();
  const { refetch: refetchMatches } = useGetArrangedInterviewsQuery();
  const { refetch: refetchSent } = useGetSentRequestQuery();
  const { refetch: refetchReceived } = useGetReceivedRequestQuery();
  const { refetch: refetchDeclined } = useGetDeclinedRequestsQuery();
  const { refetch: refetchWaiting } = useGetWaitingListQuery();
  const queryClient = useQueryClient();

  const { user } = useAuthStore();
  const candidateId = user?.candidateId || "";

  const { data } = useGetInterviewStatusQuery(
    candidateId ?? "",
    companyId ?? "",
  );

  const selectedCompany = data?.data;

  // modal functions
  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };

  function prepareModal(id: any, modalType: any) {
    setRequestId(id);
    setModalType(modalType);
    toggleModal();
  }

  function renderConditional(
    condition: any,
    renderTrue: any,
    renderFalse = null,
  ) {
    return condition ? renderTrue : renderFalse;
  }

  const withdrawInterviewRequestMutation =
    useDeleteWithdrawInterviewRequestMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getCanSendInterviewRequest", companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getInterviewStatus", candidateId, companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getSentRequestsMatching"],
        });
        toast.success("Interview request withdraw successfully");
        refetchMatches();
        refetchSent();
        refetchReceived();
        refetchDeclined();
        refetchWaiting();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  const CreateConfirmInterviewMutation =
    useCreateConfirmInterviewRequestMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getCanSendInterviewRequest", companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getInterviewStatus", candidateId, companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getArrangedInterviews"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getReceivedRequestMatching"],
        });
        toast.success("Interview request confirmed successfully");
        refetchMatches();
        refetchSent();
        refetchReceived();
        refetchDeclined();
        refetchWaiting();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  const CreateConfirmWaitingInterviewMutation =
    useCreateConfirmInterviewWaitingRequestMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getCanSendInterviewRequest", companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getInterviewStatus", candidateId, companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getArrangedInterviews"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getReceivedRequestMatching"],
        });
        toast.success("Interview waiting request confirmed successfully");
        refetchMatches();
        refetchSent();
        refetchReceived();
        refetchDeclined();
        refetchWaiting();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });

  const CreateDeclineInterviewRequestMutation =
    useCreateDeclineInterviewRequestMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getCanSendInterviewRequest", companyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["getInterviewStatus", candidateId, companyId],
        });
        ["getReceivedRequestMatching", "getDeclinedRequestsMatching"].forEach(
          (queryKey) => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        );
        toast.success("Interview declined successfully");
        refetchMatches();
        refetchSent();
        refetchReceived();
        refetchDeclined();
        refetchWaiting();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  // modal confirm functions based on the modalType
  function confirm() {
    if (modalType === "confirmInterview") {
      CreateConfirmInterviewMutation.mutate({ interviewRequestId: requestId });
    } else if (modalType === "confirmWaitinglist") {
      CreateConfirmWaitingInterviewMutation.mutate({
        interviewRequestId: requestId,
      });
    } else {
      CreateDeclineInterviewRequestMutation.mutate({
        interviewRequestId: requestId,
      });
    }

    toggleModal();
  }

  // withdraw request function, is called without modal confirmation(that's why it's not in confirm function)
  function withdraw(requestId: any) {
    withdrawInterviewRequestMutation.mutate(requestId);
  }

  function renderInterviewState() {
    if (!selectedCompany) return null;
    let buttonAndText;

    // if state is arranged then show accept icon and arranged text
    // else if state is rejected then show decline icon and dclined text
    // else if state is waitingList then show waitingList icon and waiting list text

    if (selectedCompany?.state === "arranged") {
      buttonAndText = (
        <React.Fragment>
          <AcceptIcon className="w-6 h-6 m-2 fill-current" />
          <div>{t("candidate.matching.arranged")}</div>
        </React.Fragment>
      );
    } else if (selectedCompany?.state === "rejected") {
      buttonAndText = (
        <React.Fragment>
          <DeclineIcon className="w-6 h-6 m-2 fill-current" />
          <div>{t("candidate.matching.declined")}</div>
        </React.Fragment>
      );
    } else if (selectedCompany?.state === "waitingList") {
      if (!selectedCompany?.interviewRequestId) {
        buttonAndText = (
          <React.Fragment>
            <WaitingListIcon className="w-6 h-6 m-2 fill-current" />
            <div>{t("candidate.matching.waiting-list")}</div>
          </React.Fragment>
        );
      }
    }

    return buttonAndText ? (
      <div className="flex items-center">
        {renderConditional(
          textBeforeActions,
          <div className="mr-10">Request state</div>,
        )}
        {buttonAndText}
      </div>
    ) : null;
  }

  // render interview actions based on state and requestedBy properties of a company
  function renderInterviewActions() {
    const interview = selectedCompany?.state === "requested";

    // if the state of the request is either 'rejected' or 'arranged' then return null,
    // there are no actions to be rendered anymore
    if (
      selectedCompany?.state === "rejected" ||
      selectedCompany?.state === "arranged"
    ) {
      return null;
    }
    // if the interview/waiting list is requested by candidate then return withdraw button
    // else if the interview/waiting list is requested by company then return accept/waitinglist button and decline button
    if (selectedCompany?.requestedBy === "candidate") {
      return (
        <div className="flex justify-between md:justify-end items-center gap-3 w-full">
          {renderConditional(
            textBeforeStatus,
            <div className="md:mr-10 whitespace-nowrap">
              {selectedCompany?.state === "requested"
                ? "Interview request sent"
                : "Request sent — Waiting list"}
            </div>,
          )}
          <WithdrawButton
            disabled={!eventPhase?.matching}
            onClick={() => withdraw(selectedCompany?.interviewRequestId)}
          >
            {t("candidate.matching.withdraw")}
          </WithdrawButton>
        </div>
      );
    } else if (selectedCompany?.requestedBy === "company") {
      let actionButton;
      if (interview) {
        actionButton = (
          <AcceptButton
            disabled={!eventPhase?.matching}
            onClick={() =>
              prepareModal(
                selectedCompany.interviewRequestId,
                "confirmInterview",
              )
            }
          >
            {t("candidate.matching.accept")}
          </AcceptButton>
        );
      } else {
        actionButton = (
          <WaitingListButton
            disabled={!eventPhase?.matching}
            onClick={() =>
              prepareModal(
                selectedCompany.interviewRequestId,
                "confirmWaitinglist",
              )
            }
          >
            {t("candidate.matching.waitinglist-accept")}
          </WaitingListButton>
        );
      }

      const containerClass = oneLine
        ? "flex items-center"
        : "flex flex-row items-center lg:flex-col";

      return (
        <div className={containerClass}>
          {renderConditional(
            textBeforeActions,
            <div className="mr-10">Request received</div>,
          )}
          <div
            className={c(
              "w-full",
              textBeforeActions ? null : "mb-0 lg:mb-2 mr-2 lg:mr-0",
            )}
          >
            {actionButton}
          </div>
          <div className={c("w-full", textBeforeActions ? "ml-5" : null)}>
            <DeclineButton
              disabled={!eventPhase?.matching}
              onClick={() =>
                prepareModal(
                  selectedCompany.interviewRequestId,
                  "declineInterview",
                )
              }
            >
              {t("candidate.matching.decline")}
            </DeclineButton>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <React.Fragment>
      {renderInterviewState()}
      {renderInterviewActions()}
      {modalType && (
        <>
          <Modal
            modalStatus={modalStatus}
            title={t("candidate.matching." + modalType + "-modal-title")}
            description={t(
              "candidate.matching." + modalType + "-modal-description",
            )}
            onClickFirstBtn={confirm}
            onClickSecondBtn={toggleModal}
            textFirstBtn={t("candidate.matching.confirm")}
            textSecondBtn={t("candidate.matching.cancel")}
            toggleModal={toggleModal}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default InterviewStatus;
