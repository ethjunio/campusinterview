import { ListItem } from "@/components/molecules/ListItem";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import MailIcon from "@/icons/ic-mail.svg";
import ArrowRightIcon from "@/icons/ic-arrow-right.svg";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ReactElement, useEffect, useState } from "react";
import InterviewStatus from "./InterviewStatus";
import useMobileDetect from "@/utils/useMobileDetect";
import { useGetCanSendRequestQuery } from "@/hooks/student/companymgmt/useGetCanSendRequestQuery";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/organisms/modal/Modal";
import { useGetCompanyDetailsById } from "@/hooks/student/companymgmt/useGetCompanyDetailsById";
import { useEventPhase } from "@/utils/customHooks";
import { useCreateSendWaitingListMutation } from "@/hooks/student/companymgmt/useCreateSendWaitingListMutation";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/app/store/authStore";
import { toast } from "sonner";
import { useCreateSendInterviewRequestMutation } from "@/hooks/student/companymgmt/useCreateSendInterviewRequestMutation";

import { useGetArrangedInterviewsQuery } from "@/hooks/student/matching/useGetArrangedInterviewsQuery";
import { useGetSentRequestQuery } from "@/hooks/student/matching/useGetSentRequestQuery";
import { useGetReceivedRequestQuery } from "@/hooks/student/matching/useGetReceivedRequestQuery";
import { useGetDeclinedRequestsQuery } from "@/hooks/student/matching/useGetDeclinedRequestsQuery";
import { useGetWaitingListQuery } from "@/hooks/student/matching/useGetWaitingListQuery";
import { useGetInterviewStatusQuery } from "@/hooks/visitors/useGetInterviewStatusQuery";

interface Company {
  id: string;
  name: string;
  description: string;
  imageUrlSmall: string;
}

export interface CompanyListItemProps {
  company?: Company;
  id?: number;
  loading?: boolean;
  style?: object;
  showMail?: boolean;
  text?: ReactElement;
  linkToProfile?: boolean;
  textUnder?: boolean;
  showStatus?: boolean;
  responsive?: boolean;
  containerStyle?: object;
  linkToProfileInActions?: boolean;
  textBelowName?: string;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  id,
  loading,
  style,
  showMail,
  text,
  textUnder,
  linkToProfile,
  showStatus,
  responsive,
  containerStyle,
  linkToProfileInActions,
  textBelowName,
}) => {
  const router = useRouter();
  const { name, description, imageUrlSmall, id: companyId } = company || {};
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const [modalStatus, setModalStatus] = useState(false);
  const [waitingListBool, setWaitingListBool] = useState(false);
  const { data: canSendRequestQuery } = useGetCanSendRequestQuery(companyId);
  const { eventPhase } = useEventPhase();
  const queryClient = useQueryClient();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const { user } = useAuthStore();

  const { refetch: refetchMatches } = useGetArrangedInterviewsQuery();

  const { refetch: refetchSent } = useGetSentRequestQuery();
  const { refetch: refetchReceived } = useGetReceivedRequestQuery();
  const { refetch: refetchDeclined } = useGetDeclinedRequestsQuery();
  const { refetch: refetchWaiting } = useGetWaitingListQuery();

  const candidateId = user?.candidateId;
  const CreateSendWaitingInterviewMutation = useCreateSendWaitingListMutation({
    onSuccess: (message: any) => {
      queryClient.removeQueries({
        queryKey: ["getCanSendRequest", companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Interview waiting request sent successfully");
      refetchMatches();
      refetchSent();
      refetchReceived();
      refetchDeclined();
      refetchWaiting();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };

  const interviewQuery = useGetInterviewStatusQuery(
    candidateId ?? "",
    companyId ?? "",
  );
  const interviewStatus = interviewQuery?.data?.data.state;

  const CreateSendInterviewMutation = useCreateSendInterviewRequestMutation({
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["getCanSendRequest", companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getInterviewStatus", candidateId, companyId],
      });
      toast.success("Interview request sent successfully");
      refetchMatches();
      refetchSent();
      refetchReceived();
      refetchDeclined();
      refetchWaiting();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const { data, isLoading } = useGetCompanyDetailsById(companyId);

  useEffect(() => {
    if(data?.data?.interviewSlots) {
      setWaitingListBool(data?.data?.interviewSlots <= 0);
    }
  }, [data]);

  const renderSendInterviewButton = () => {
    return canSendRequestQuery?.data ? (
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
          ? t("candidate.companies.send-waitinglist-request")
          : t("candidate.companies.send-interview-request")}
      </Button>
    ) : null;
  }

  const confirmSendInterviewRequest = () => {
    if (waitingListBool) {
      CreateSendWaitingInterviewMutation.mutate({ companyId });
    } else {
      CreateSendInterviewMutation.mutate({ companyId });
    }
    toggleModal();
  };
  return (
<>
    <ListItem
      style={style}
      loading={loading}
      key={id}
      id={companyId ? companyId.toString() : undefined}
      type="company"
      textUnder={textUnder}
      responsive={responsive}
      containerStyle={containerStyle}
    >
      <ListItem.Image
        Placeholder={PlaceholderImage}
        alt={name || "Company image"}
        src={imageUrlSmall || ""}
        responsive={responsive}
      />
      <ListItem.Title responsive={responsive}>
        <div className="flex flex-col">
          <div className="truncate text-base sm:text-xl w-28 sm:w-36 lg:w-full lg:whitespace-pre-wrap">
            {name}
          </div>
          <div className="text-base text-dark-softer">{textBelowName}</div>
          {isMobile && showStatus ? (
            <div className="font-normal text-base">
              <InterviewStatus companyId={companyId}></InterviewStatus>
            </div>
          ) : null}
        </div>
      </ListItem.Title>
      <ListItem.Body>
        <div className="flex w-full xl:items-center flex-col md:flex-row xl:flex-row gap-2 md:gap-0">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex md:flex-none md:mx-4"
          >
            {interviewStatus !== "requested" &&
            interviewStatus !== "arranged" &&
            interviewStatus !== "rejected"
              ? renderSendInterviewButton()
              : null}
            {!isMobile && !showStatus ? (
              <InterviewStatus companyId={companyId}></InterviewStatus>
            ) : null}
          </div>
          <div className="truncate w-36 xl:w-full xl:whitespace-pre-wrap hidden xl:block mr-0 lg:mx-8 xl:mx-16">
            {text ? text : description}
          </div>

          {linkToProfile ? (
            <div
              className="text-primary-light flex cursor-pointer items-center justify-end lg:justify-start !whitespace-pre"
              onClick={(event) => {
                event.stopPropagation();
                router.push("/candidate/companies/" + companyId);
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
                if (company?.id) {
                  router.push("/candidate/chatroom?companyId=" + company.id);
                }
              }}
            />
          ) : null}
          <div onClick={handleClick}>
            {!isMobile && showStatus ? (
              <InterviewStatus companyId={companyId}></InterviewStatus>
            ) : null}
          </div>
          {linkToProfileInActions ? (
            <div
              className="text-primary-light flex cursor-pointer"
              onClick={() => {
                router.push("/candidate/companies/" + companyId);
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
      /></>
  );
};

CompanyListItem.defaultProps = { showStatus: true };

export default CompanyListItem;
