"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import InterviewsSlotsList from "./InterviewsSlotsList";
import InfoIcon from "@/icons/ic-info_blue.svg";
import HelperText from "./HelperText";
import { useGetTimeSlotPreferenceTypesQuery } from "@/hooks/student/interviewmgmt/useGetTimeSlotPreferenceTypesQuery";
import { useGetCandidateTimeSlotsQuery } from "@/hooks/student/interviewmgmt/useGetCandidateTimeSlotsQuery";
import { useGetLandingPageInfoQuery } from "@/hooks/admin/useGetLandingPageInfoQuery";
import PublishedInterviewSlots from "./PublishedInterviewSlots";
import { useUpdateTimePreferenceMutation } from "@/hooks/student/interviewmgmt/useUpdateTimePreferenceMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetTimeSlotsQuery } from "@/hooks/student/interviewmgmt/useGetTimeSlotsQuery";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { formatDate } from "@/utils/date";

const InterviewsSlots: React.FC = () => {
  const t = useTranslations("candidate");
  const { data: getTimeSlotsQuery } = useGetTimeSlotsQuery();
  const { data: getTimeSlotPreferenceTypesQuery } =
    useGetTimeSlotPreferenceTypesQuery();
  const { data, isLoading } = useGetCandidateTimeSlotsQuery();
  const { data: landingPageData } = useGetLandingPageInfoQuery();
  const { data: LandingPageVisitorData } = useGetLandingPageDataQuery();

  const queryClient = useQueryClient();

  const eventPhase = {
    publishedSchedule: false,
  };
  if (LandingPageVisitorData?.data?.areInterviewsPublished) {
    eventPhase.publishedSchedule =
      LandingPageVisitorData?.data?.areInterviewsPublished;
  }

  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [preferanceOptions, setPreferanceOptions] = useState<
    { value: number; label: string }[][]
  >([]);

  function calculateOptions(timeSlots: any[]) {
    let subOptCount = 0;
    let nonOptCount = 0;

    timeSlots?.map((timeSlot) => {
      if (timeSlot.timeSlotPreferenceType.id === 2) {
        subOptCount = subOptCount + 1;
      } else if (timeSlot.timeSlotPreferenceType.id === 3) {
        nonOptCount = nonOptCount + 1;
      }
    });

    const newOptions = timeSlots?.map((slot) => {
      let possibleOptions = getTimeSlotPreferenceTypesQuery?.data;

      if (slot.timeSlotPreferenceType.id !== 2 && subOptCount > 1) {
        possibleOptions = possibleOptions?.filter(
          (option: any) => option.id !== 2
        );
      }

      if (slot.timeSlotPreferenceType.id !== 3 && nonOptCount > 0) {
        possibleOptions = possibleOptions?.filter(
          (option: any) => option.id !== 3
        );
      }

      return possibleOptions?.map((item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name,
      }));
    });

    setPreferanceOptions(newOptions);
  }

  useEffect(() => {
    if (data?.data.length < 1) {
      /* const optimalSlot = getTimeSlotPreferenceTypesQuery.data?.result[0];
      const timeSlots = getTimeSlotsQuery.data?.data?.map((slot: any) => {
        return { timeSlot: slot, timeSlotPreferenceType: optimalSlot };
      }); */

      const optimalSlot =
        getTimeSlotPreferenceTypesQuery?.data?.result?.[0] ?? null;
      const slotsArray = getTimeSlotsQuery?.data?.data ?? [];
      if (!optimalSlot || slotsArray.length === 0) {
        setTimeSlots([]);
        return;
      }

      // createCandidateTimeSlots({
      //   variables: {
      //     input: timeSlots,
      //   },
      // });
    } else {
      const newTimeSlots = data ? [...data?.data] : null;

      if (!newTimeSlots) {
        return;
      }

      let subOptCount = 0;
      let nonOptCount = 0;

      newTimeSlots?.map((timeSlot) => {
        if (timeSlot.timeSlotPreferenceType.id === 2) {
          subOptCount = subOptCount + 1;
        } else if (timeSlot.timeSlotPreferenceType.id === 3) {
          nonOptCount = nonOptCount + 1;
        }
      });

      newTimeSlots?.sort((a, b) => {
        if (a.timeSlot.id > b.timeSlot.id) return 1;
        else return -1;
      });

      calculateOptions(newTimeSlots);

      setTimeSlots(newTimeSlots);
    }
  }, [data, isLoading]);

  const updateTimePreference = useUpdateTimePreferenceMutation({
    onSuccess: (success: any) => {
      queryClient.invalidateQueries({ queryKey: ["getCandidateTimeSlots"] });
      toast.success(success?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  function handleOnChange(
    slot: any,
    selectedItem: { value: number; label: string }
  ) {
    updateTimePreference.mutate({
      slotId: slot.id,
      timeSlotPreferenceTypeId: selectedItem.value,
    });

    calculateOptions(timeSlots);
  }

  const eventDate = formatDate(
    LandingPageVisitorData?.data?.eventDate
      ? new Date(LandingPageVisitorData?.data?.eventDate)
      : new Date(),
    "dd. MMMM yyyy"
  );

  const matchingCloseDate = formatDate(
    LandingPageVisitorData?.data?.matchingCloseDate
      ? new Date(LandingPageVisitorData?.data?.matchingCloseDate)
      : new Date(),
    "dd. MMMM yyyy"
  );

  return (
    <div className="flex flex-col lg:flex-row h-full justify-between">
      <div className="w-full lg:w-3/4 px-4 lg:p-8">
        <h1 className="mb-5">{t("interviews.title")}</h1>
        <div className="mb-16 text-xl">
          {!eventPhase?.publishedSchedule
            ? t("interviews.description", {
                date: eventDate,
              })
            : t("interviews.publishedSchedule.description")}
        </div>
        {/* <div className="mb-5 text-xl">
          <b>
            {!eventPhase?.publishedSchedule
              ? t("interviews.tip", {
                  date: matchingCloseDate,
                })
              : null}
          </b>
        </div> */}
        {/* {error ? (
          <div className="text-white mb-5 bg-red p-5 rounded-md">
            {t('interviews.error')}
          </div>
        ) : null} */}
        {!eventPhase?.publishedSchedule ? null : (
          // <InterviewsSlotsList
          //   timeSlots={timeSlots}
          //   selectOptions={preferanceOptions}
          //   onChange={handleOnChange}
          // />
          <>
            <h3 className="mb-4">{landingPageData?.data?.locationLine1}</h3>
            <PublishedInterviewSlots showRoomName />
          </>
        )}
      </div>
      <HelperText
        title={t("interviews.tip-title")}
        description={
          !eventPhase?.publishedSchedule
            ? t("interviews.tip-description")
            : t.rich("interviews.publishedSchedule.tip-description", {
                emailLink: (chunks) => (
                  <a href="mailto:campusinterview@ethjuniors.ch">{chunks}</a>
                ),
              })
        }
        icon={<InfoIcon className="w-10 h-10" />}
      />
    </div>
  );
};

export default InterviewsSlots;
