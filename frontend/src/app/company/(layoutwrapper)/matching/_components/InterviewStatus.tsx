import React, { useState } from 'react';
import AcceptIcon from '@/icons/ic-accept.svg';
import { WithdrawButton } from '@/components/atoms/Button';
import WaitingListIcon from '@/icons/ic-waitinglist.svg';
import DeclineIcon from '@/icons/ic-decline.svg';
import { useTranslations } from 'next-intl';
import {
  AcceptButton,
  DeclineButton,
  WaitingListButton,
} from '@/components/atoms/Button';
import { Modal } from '@/components/organisms/modal/Modal';
import c from 'classnames';
import { useWebSocket } from '@/hooks/socket/useWebsocket';
import { useCreateConfirmCompanyInterviewRequestMutation } from '@/hooks/company/matching/useCreateConfirmCompanyInterviewRequestMutation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateCompanyDeclineInterviewMutation } from '@/hooks/company/matching/useCreateCompanyDeclineInterviewMutation';
import useAuthStore from '@/app/store/authStore';
import { useEventPhase } from '@/utils/customHooks';
import { useDeleteWithdrawCompanyInterviewRequestMutation } from '@/hooks/company/matching/useDeleteCompanyInterviewRequestMutation';
import { useCreateWaitingCompanyInterviewMutation } from '@/hooks/company/matching/useCreateWaitingCompanyInterviewMutation';
import { useGetInterviewStatusQuery } from '@/hooks/visitors/useGetInterviewStatusQuery';
import { useGetCompanyReceivedRequestQuery } from '@/hooks/company/matching/useGetCompanyReceivedRequestQuery';

import { useGetCompanyDeclinedRequestquery } from '@/hooks/company/matching/useGetCompanyDeclinedRequestquery';
import { useGetCompanyWaitingListQuery } from '@/hooks/company/matching/useGetCompanyWaitingListQuery';
import { useGetCompanyArrangedInterviewQuery } from '@/hooks/company/matching/useGetCompanyArrangedInterviewQuery';
import { useGetCompanySentRequestQuery } from '@/hooks/company/matching/useGetCompanySentRequestQuery';

export interface InterviewStatusProps {
  candidateId?: string;
  textBeforeStatus?: boolean;
  textBeforeActions?: boolean;
  oneLine?: boolean;
}

const InterviewStatus: React.FC<InterviewStatusProps> = ({
  candidateId,
  textBeforeStatus,
  textBeforeActions,
  oneLine,
}) => {
  const t = useTranslations();
  const { refetch:refetchReceived} = useGetCompanyReceivedRequestQuery();
  const { refetch:refetchDeclined } = useGetCompanyDeclinedRequestquery();
  const {   refetch:refetchWaiting } = useGetCompanyWaitingListQuery();

  const {  refetch:refetchMatches} = useGetCompanyArrangedInterviewQuery();
  

  const { refetch:refetchSent } = useGetCompanySentRequestQuery();
 
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const companyId = user?.companyId;

  const withdrawCompanyInterviewRequestMutation = useDeleteWithdrawCompanyInterviewRequestMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCompanySentRequests"],
      });
      toast.success("Interview request withdraw successfully");
      refetchSent()
      refetchReceived()
      refetchDeclined()
      refetchWaiting()
      refetchMatches()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  }

  );

  const CreateConfirmInterviewMutation = useCreateConfirmCompanyInterviewRequestMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCompanyReceivedRequest"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCompanyArrangedInterview"],
      });
      toast.success("Interview request confirmed successfully");
      refetchSent()
      refetchReceived()
      refetchDeclined()
      refetchWaiting()
      refetchMatches()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  })

  const CreateDeclineInterviewRequestMutation = useCreateCompanyDeclineInterviewMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      ["getCompanyReceivedRequest", "getCompanyDeclinedRequest"].forEach(queryKey =>
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      );
      toast.success("Interview declined successfully");
      refetchSent()
      refetchReceived()
      refetchDeclined()
      refetchWaiting()
      refetchMatches()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const CreateConfirmWaitingInterviewMutation = useCreateWaitingCompanyInterviewMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      ["getCompanyReceivedRequest", "getCompanyWaitingList"].forEach(queryKey =>
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      );
      toast.success("Interview waiting request confirmed successfully");
      refetchSent()
      refetchReceived()
      refetchDeclined()
      refetchWaiting()
      refetchMatches()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  })

  const [modalStatus, setModalStatus] = useState(false);
  const [modalType, setModalType] = useState();
  const [requestId, setRequestId] = useState();

  const { data } = useGetInterviewStatusQuery(candidateId ?? '', companyId ?? '');

  // const { getcandidatestochatData: candidatesToChat } = useWebSocket(companyId);

  const selectedCandidate = data?.data


  const { eventPhase } = useEventPhase();

  // modal functions
  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };

  function renderConditional(condition: any, renderTrue: any, renderFalse = null) {
    return condition ? renderTrue : renderFalse;
  }

  function prepareModal(id: any, modalType: any) {
    setRequestId(id);
    setModalType(modalType);
    toggleModal();
  }

  // modal confirm functions based on the modalType
  function confirm() {
    if (modalType === 'confirmInterview') {
      CreateConfirmInterviewMutation.mutate({ interviewRequestId: requestId })
    } else if (modalType === 'confirmWaitinglist') {
      CreateConfirmWaitingInterviewMutation.mutate({ interviewRequestId: requestId })
    } else {
      CreateDeclineInterviewRequestMutation.mutate({ interviewRequestId: requestId })
    }

    toggleModal();
  }

  // withdraw request function, is called without modal confirmation(that's why it's not in confirm function)
  function withdraw(requestId: any) {
    withdrawCompanyInterviewRequestMutation.mutate(requestId);
  }

  function renderInterviewState() {
    if (!selectedCandidate) return null;
    let buttonAndText;
    // if state is arranged then show accept icon and arranged text
    // else if state is rejected then show decline icon and dclined text
    // else if state is waitingList then show waitingList icon and waiting list text

    if (selectedCandidate?.state === 'arranged') {
      buttonAndText = (
        <React.Fragment>
          <AcceptIcon className="w-6 h-6 m-2 fill-current" />
          {t('companies.matching.arranged')}
        </React.Fragment>
      );
    } else if (selectedCandidate?.state === 'rejected') {
      buttonAndText = (
        <React.Fragment>
          <DeclineIcon className="w-6 h-6 m-2 fill-current" />
          {t('companies.matching.declined')}
        </React.Fragment>
      );
    } else if (selectedCandidate?.state === 'waitingList') {
      if (!selectedCandidate?.interviewRequestId) {
        buttonAndText = (
          <React.Fragment>
            <div className="w-32 flex items-center">
              <WaitingListIcon className="w-6 h-6 m-2 fill-current" />
              {t('companies.matching.waiting-list')}
            </div>
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
    const interview = selectedCandidate?.state === 'requested';

    // if the state of the request is either 'rejected' or 'arranged' then return null,
    // there are no actions to be rendered anymore
    if (
      selectedCandidate?.state === 'rejected' ||
      selectedCandidate?.state === 'arranged'
    ) {
      return null;
    }

    // if the interview/waiting list is requested by company then return withdraw button
    // else if the interview/waiting list is requested by candidate then return accept/waitinglist button and decline button

    if (selectedCandidate?.requestedBy === 'company') {
      return (
        <div className="flex items-center">
          {renderConditional(
            textBeforeStatus,
            <div className="mr-10">
              Request sent —
              {selectedCandidate?.state === 'requested'
                ? ' Interview'
                : ' Waiting list'}
            </div>,
          )}
          <WithdrawButton
            disabled={!eventPhase?.matching}
            onClick={() => withdraw(selectedCandidate?.interviewRequestId)}>
            {t('companies.matching.withdraw')}
          </WithdrawButton>
        </div>
      );
    } else if (selectedCandidate?.requestedBy === 'candidate') {
      let actionButton;
      if (interview) {
        actionButton = (
          <AcceptButton
            disabled={!eventPhase?.matching}
            onClick={() =>
              prepareModal(
                selectedCandidate.interviewRequestId,
                'confirmInterview',
              )
            }>
            {t('companies.matching.accept')}
          </AcceptButton>
        );
      } else {
        actionButton = (
          <WaitingListButton
            disabled={!eventPhase?.matching}
            onClick={() =>
              prepareModal(
                selectedCandidate.interviewRequestId,
                'confirmWaitinglist',
              )
            }>
            {t('companies.matching.waitinglist-accept')}
          </WaitingListButton>
        );
      }

      const containerClass = oneLine
        ? 'flex items-center'
        : 'flex flex-col items-center lg:flex-col';

      return (
        <div className={containerClass}>
          {renderConditional(
            textBeforeActions,
            <div className="mr-10">Request received</div>,
          )}
          <div className={c('w-full', textBeforeActions ? null : 'mb-2')}>
            {actionButton}
          </div>
          <div className={c('w-full', textBeforeActions ? 'ml-5' : null)}>
            <DeclineButton
              disabled={!eventPhase?.matching}
              onClick={() =>
                prepareModal(
                  selectedCandidate.interviewRequestId,
                  'declineInterview',
                )
              }>
              {t('companies.matching.decline')}
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
      {modalType && <>
        <Modal
          modalStatus={modalStatus}
          title={t('companies.matching.' + modalType + '-modal-title')}
          description={t('companies.matching.' + modalType + '-modal-description')}
          onClickFirstBtn={confirm}
          onClickSecondBtn={toggleModal}
          textFirstBtn={t('companies.matching.confirm')}
          textSecondBtn={t('companies.matching.cancel')}
          toggleModal={toggleModal}
        />
      </>}

    </React.Fragment>
  );
};

export default InterviewStatus;
