import { ListItem } from "@/components/molecules/ListItem";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import MailIcon from "@/icons/ic-mail.svg";
import take from "lodash/fp/take";
import sort from "lodash/fp/sortBy";
import { useRouter } from "next/navigation";
import ArrowRightIcon from "@/icons/ic-arrow-right.svg";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";
import InterviewStatus from "../../matching/_components/InterviewStatus";
import useMobileDetect from "@/utils/useMobileDetect";
import { Button } from "@/components/atoms/Button";
import { useGetCompanyCanSendRequestQuery } from "@/hooks/company/talent-pool/useGetCompanyCanSendRequestQuery";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { Modal } from "@/components/organisms/modal/Modal";
import { useCreateSendInterviewRequestMutation } from "@/hooks/company/talent-pool/useCreateSendInterviewRequestMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateSendWaitingRequestMutation } from "@/hooks/company/talent-pool/useCreateSendWaitingRequestMutation";
import useAuthStore from "@/app/store/authStore";

import { useGetCompanySentRequestQuery } from "@/hooks/company/matching/useGetCompanySentRequestQuery";
import { useGetCompanyWaitingListQuery } from "@/hooks/company/matching/useGetCompanyWaitingListQuery";
import { useGetCompanyArrangedInterviewQuery } from "@/hooks/company/matching/useGetCompanyArrangedInterviewQuery";
import { useGetCompanyReceivedRequestQuery } from "@/hooks/company/matching/useGetCompanyReceivedRequestQuery";
import { useGetCompanyDeclinedRequestquery } from "@/hooks/company/matching/useGetCompanyDeclinedRequestquery";

export interface CandidateListItemProps {
  candidate?: any;
  id?: number;
  loading?: boolean;
  style?: object;
  showMail?: boolean;
  text?: ReactElement;
  linkToProfile?: boolean;
  textUnder?: boolean;
  checkbox?: boolean;
  checkboxOnClick?: Function;
  selected?: Array<any>;
  responsive?: boolean;
  containerStyle?: object;
  linkToProfileInActions?: boolean;
  showStatus?: boolean;
  isAdminCreated: number;

  isAdminEdited: number;

  matchId: number;
  showSlotEditBtn?: boolean;
  onEditSlots?: () => void;
}

const CandidateListItem: React.FC<CandidateListItemProps> = ({
  candidate,
  id,
  loading,
  style,
  showMail,
  text,
  linkToProfile,
  textUnder,
  checkbox,
  checkboxOnClick,
  selected,
  responsive,
  containerStyle,
  linkToProfileInActions,
  showStatus = true,
  isAdminCreated,
  isAdminEdited,
  matchId,
  showSlotEditBtn,
  onEditSlots,
}) => {
  const router = useRouter();
  const {
    firstName,
    lastName,
    imageUrlSmall,
    education,
    id: candidateId,
  } = candidate;
  const { user } = useAuthStore();
  const companyId = user?.companyId;
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const [modalStatus, setModalStatus] = useState(false);

  const { refetch: refetchMatches } = useGetCompanyArrangedInterviewQuery();

  const { refetch: refetchSent } = useGetCompanySentRequestQuery();
  const { refetch: refetchReceived } = useGetCompanyReceivedRequestQuery();
  const { refetch: refetchDeclined } = useGetCompanyDeclinedRequestquery();
  const { refetch: refetchWaiting } = useGetCompanyWaitingListQuery();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const queryClient = useQueryClient();
  const { data: canSendRequestQuery } =
    useGetCompanyCanSendRequestQuery(candidateId);
  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };
  const { data: CompanyData } = useGetCompanyGeneralDataQuery() as any;
  const waitingListBool = CompanyData?.interviewSlots <= 0;
  const sendInterviewButton = canSendRequestQuery?.data ? (
    <Button
      variant="accent"
      tw="text-xs md:text-base md:mr-4 !whitespace-pre w-[130px] md:w-fit truncate flex-1"
      onClick={(e) => {
        e.stopPropagation();
        toggleModal();
      }}
      disabled={false}
    >
      {waitingListBool
        ? t("companies.talent-pool.send-waitinglist-request")
        : t("companies.talent-pool.send-interview-request")}
    </Button>
  ) : null;
  const sendInterviewRequestMutation = useCreateSendInterviewRequestMutation({
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["getCanSendInterviewRequest", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Data saved successfully");
      refetchSent();
      refetchReceived();
      refetchDeclined();
      refetchWaiting();
      refetchMatches();
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
      refetchSent();
      refetchReceived();
      refetchDeclined();
      refetchWaiting();
      refetchMatches();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const confirmSendInterviewRequest = () => {
    if (waitingListBool) {
      sendWaitingListRequestMutation.mutate({ candidateId });
    } else {
      sendInterviewRequestMutation.mutate({ candidateId });
    }
    toggleModal();
  };

  return (
    <>
      <ListItem
        style={style}
        loading={loading}
        key={candidateId}
        id={candidateId && candidateId.toString()}
        type="candidate"
        textUnder={textUnder}
        responsive={responsive}
        containerStyle={containerStyle}
      >
        <ListItem.Image
          Placeholder={PlaceholderImage}
          alt={`${firstName} ${lastName}`}
          src={imageUrlSmall}
          responsive={responsive}
        />
        <ListItem.Title responsive={responsive}>
          <div className="flex flex-col">
            <div className="truncate sm:text-xl w-28 sm:w-36 lg:w-full lg:whitespace-pre-wrap">
              {firstName} {lastName}
            </div>
            {isMobile && showStatus ? (
              <div className="font-normal text-base">
                <InterviewStatus candidateId={candidateId}></InterviewStatus>
              </div>
            ) : null}
          </div>
        </ListItem.Title>

        <ListItem.Body>
          <div className="flex w-full xl:items-center flex-col md:flex-row justify-between gap-2 md:gap-0">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex md:flex-none md:mx-4"
            >
              {matchId === null ? "Admin created" : sendInterviewButton}
              {!isMobile && !showStatus ? (
                <InterviewStatus candidateId={candidateId}></InterviewStatus>
              ) : null}
            </div>

            <div className="truncate w-44 md:w-48 xl:w-4/5 lg:max-w-sm xl:max-w-md xl:whitespace-pre-wrap hidden lg:block mr-0">
              {text
                ? text
                : take(2, sort("startDate", education)).map(
                    ({ university, educationLevel, major }, index) => (
                      <div
                        key={`${university?.name}-${index}`}
                        className="truncate xxl:overflow-normal xxl:break-normal general-text"
                      >
                        {university?.name} - {educationLevel?.name} in{" "}
                        {major?.name}
                      </div>
                    ),
                  )}
            </div>
            {showSlotEditBtn ? (
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("clicked");
                  onEditSlots?.();
                }}
              >
                {t("common.button-edit")}
              </Button>
            ) : null}
            {linkToProfile ? (
              <div
                className="text-primary-light flex cursor-pointer items-center justify-end lg:justify-start !whitespace-pre"
                // className="text-primary-light flex cursor-pointer"
                onClick={() => {
                  router.push("/company/talent-pool/" + candidateId);
                }}
              >
                {t("companies.talent-pool.show-profile")}
                <ArrowRightIcon className="w-6 h-6 fill-current text-primary-light ml-1 stroke-current stroke-3" />
              </div>
            ) : null}
          </div>
        </ListItem.Body>
        <ListItem.Actions>
          <div className="flex space-x-2 items-center">
            {showMail ? (
              <MailIcon
                className="w-6 h-6 m-2 fill-current cursor-pointer"
                onClick={(event: any) => {
                  event.stopPropagation();
                  router.push("/company/chatroom?candidateId=" + candidate.id);
                }}
              />
            ) : null}
            <div onClick={handleClick}>
              {!isMobile && showStatus ? (
                <InterviewStatus candidateId={candidateId}></InterviewStatus>
              ) : null}
            </div>
            {checkbox ? (
              <input
                checked={selected?.includes(id)}
                type="checkbox"
                onChange={(value) =>
                  checkboxOnClick && checkboxOnClick(value.target.checked, id)
                }
              />
            ) : null}
            {linkToProfileInActions ? (
              <div
                className="text-primary-light flex cursor-pointer"
                onClick={() => {
                  router.push("/company/talent-pool/" + candidateId);
                }}
              >
                <ArrowRightIcon className="w-6 h-6 fill-current text-primary-light ml-1 stroke-current stroke-3" />
              </div>
            ) : null}
          </div>
        </ListItem.Actions>
      </ListItem>
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
    </>
  );
};

export default CandidateListItem;
