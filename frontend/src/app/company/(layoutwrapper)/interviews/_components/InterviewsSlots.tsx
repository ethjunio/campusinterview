"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import InterviewsSlotsList from "./InterviewsSlotsList";
import InfoIcon from "@/icons/ic-info_blue.svg";
import HelperText from "./HelperText";
import { formatDate } from "@/utils/date";
import styles from "./InterviewSlots.module.scss";
import { useGetCompanyInterviewRoomsQuery } from "@/hooks/company/interviews/useGetCompanyInterviewRoomsQuery";
import { useGetTimeBlockPreferenceTypesQuery } from "@/hooks/company/interviews/useGetTimeBlockPreferenceTypesQuery";
import { useCreateSaveMatchInterviewSlotMutation } from "@/hooks/company/interviews/useCreateSaveMatchInterviewSlotMutation";
import { useGetCompanyArrangedInterviewQuery } from "@/hooks/company/matching/useGetCompanyArrangedInterviewQuery";
import { useCreateCompanyInterviewRoomsMutation } from "@/hooks/company/interviews/useCreateCompanyInterviewRoomsMutation";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import PublishedInterviewSlots from "./PublishedInterviewSlots";
import { useEventPhase } from "@/utils/customHooks";

const InterviewsSlots = () => {
  const t = useTranslations("companies");
  const queryClient = useQueryClient();
  const { data: getTimeBlockPreferenceTypes } =
    useGetTimeBlockPreferenceTypesQuery();
  const { data: getCompanyInterviewRooms } = useGetCompanyInterviewRoomsQuery();

  const { eventPhase } = useEventPhase();

  const [errorFE, setErrorFE] = useState<boolean | null>(null);

  const saveMatchInterviewSlot = useCreateSaveMatchInterviewSlotMutation({
    onSuccess: (success: any) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyArrangedInterview"],
      });
      toast.success(success?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const createCompanyInterviewRooms = useCreateCompanyInterviewRoomsMutation();
  const { data: matchesQuery, isLoading } =
    useGetCompanyArrangedInterviewQuery();
  const { data: getEventPhase } = useGetLandingPageDataQuery();

  const [candidateRoomsList, setCandidateRoomsList] = useState<
    {
      id: number;
      photo: string;
      name: string;
      interviewRoom: number;
      timeBlockPreference: number;
    }[]
  >([]);

  const [roomsOptions, setRoomsOptions] = useState([]);
  const [timeBlockPreferenceOptions, setTimeBlockPreferenceOptions] = useState(
    [],
  );

  const eventDate = formatDate(
    getEventPhase?.data?.eventDate
      ? new Date(getEventPhase?.data?.eventDate)
      : new Date(),
    "dd. MMMM yyyy",
  );

  const matchingCloseDate = formatDate(
    getEventPhase?.data?.matchingCloseDate
      ? new Date(getEventPhase?.data?.matchingCloseDate)
      : new Date(),
    "dd. MMMM yyyy",
  );

  function calculateRoomsOptions() {
    const options = getCompanyInterviewRooms?.data.map(
      (room: { id: number; name: string }) => ({
        value: room.id,
        label: room.name,
      }),
    );
    options?.unshift({ value: -1, label: "No preference" });

    setRoomsOptions(options);
  }

  function calculateTimeBlockPreferenceOptions() {
    const options = getTimeBlockPreferenceTypes?.data?.map(
      (timeBlock: { id: number; name: string }) => ({
        value: timeBlock.id,
        label: timeBlock.name,
      }),
    );
    setTimeBlockPreferenceOptions(options);
  }

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [errorFE]); //Check dependency in live site

  useEffect(() => {
    calculateTimeBlockPreferenceOptions();
  }, [getTimeBlockPreferenceTypes]);

  useEffect(() => {
    if (getCompanyInterviewRooms?.data?.length < 1) {
      createCompanyInterviewRooms.mutate({});
    }
    calculateRoomsOptions();
  }, [getCompanyInterviewRooms]);

  useEffect(() => {
    const newCandidateRoomsList = matchesQuery?.data?.map((match: any) => ({
      id: match.id,
      photo: match.candidate.imageUrlSmall,
      name: `${match.candidate.firstName} ${match.candidate.lastName}`,
      interviewRoom: match.interviewRoom?.id ? match.interviewRoom?.id : -1,
      timeBlockPreference: match.timeBlockPreference?.id
        ? match.timeBlockPreference?.id
        : -1,
    }));

    newCandidateRoomsList?.sort((a: { id: number }, b: { id: number }) => {
      if (a.id > b.id) return 1;
      else return -1;
    });

    setCandidateRoomsList(newCandidateRoomsList);
  }, [matchesQuery]);

  function validateRoomsAtTimeBlock(
    timeBlockId: number,
    foundTimeSlotsLength: number,
    roomSelected: boolean | number,
  ) {
    // timeblockId 3 is Afternoon
    // timeblockId 2 is Morning
    if (timeBlockId == 2) {
      const maxRoomCount = roomSelected ? 5 : 5 * (roomsOptions.length - 1);
      if (foundTimeSlotsLength >= maxRoomCount) {
        setErrorFE(true);
        return false;
      }
    } else if (timeBlockId == 3) {
      const maxRoomCount = roomSelected ? 4 : 4 * (roomsOptions.length - 1);
      if (foundTimeSlotsLength >= maxRoomCount) {
        setErrorFE(true);
        return false;
      }
    }
    errorFE && setErrorFE(false);

    return true;
  }

  function validateTimeBlock(timeBlockPreference: any, matchItem: any) {
    if (!timeBlockPreference) return true;

    const foundTimeSlots = candidateRoomsList.filter((timeSlot) => {
      if (timeSlot.timeBlockPreference === timeBlockPreference.id) {
        if (matchItem.interviewRoom) {
          if (timeSlot.interviewRoom === matchItem.interviewRoom.id) {
            return true;
          }
        } else return true;
      }
      return false;
    });

    return validateRoomsAtTimeBlock(
      timeBlockPreference.id,
      foundTimeSlots.length,
      matchItem.interviewRoom ? matchItem.interviewRoom.id : false,
    );
  }

  function validateRoom(room: any, matchItem: any) {
    if (!room || !matchItem.timeBlockPreference) return true;

    const foundTimeSlots = candidateRoomsList.filter((timeSlot) => {
      if (timeSlot.interviewRoom === room.id) {
        if (matchItem.timeBlockPreference) {
          if (
            timeSlot.timeBlockPreference === matchItem.timeBlockPreference.id
          ) {
            return true;
          }
        } else return false;
      }
      return false;
    });

    return validateRoomsAtTimeBlock(
      matchItem.timeBlockPreference.id,
      foundTimeSlots.length,
      matchItem.timeBlockPreference ? matchItem.timeBlockPreference.id : false,
    );
  }

  function handleOnChangeTimePreference(
    selectedItemId: number,
    matchId: number,
  ) {
    console.log("match id here", matchId);
    if (selectedItemId === -1) return;

    const timeBlockPreference = getTimeBlockPreferenceTypes?.data?.find(
      (item: { id: number }) => item.id == selectedItemId,
    );
    console.log("matchesquery", matchesQuery);
    const matchItem = matchesQuery?.data?.find(
      (item: any) => item.id == matchId,
    );

    if (validateTimeBlock(timeBlockPreference, matchItem)) {
      console.log("match item here", matchItem);
      saveMatchInterviewSlot.mutate({
        interviewRequestId: matchId,
        timeBlockPreferenceId: timeBlockPreference?.id,
        ...(matchItem.interviewRoomId !== null &&
        matchItem.interviewRoomId !== undefined
          ? { interviewRoomId: matchItem.interviewRoomId }
          : {}),
      });
      setErrorFE(null);
    }
  }

  function handleOnChangeRoom(selectedItemId: number, matchId: number) {
    if (selectedItemId === -1) return;

    const room = getCompanyInterviewRooms?.data?.find(
      (item: { id: number }) => item.id == selectedItemId,
    );
    const matchItem = matchesQuery?.data?.find(
      (item: any) => item.id == matchId,
    );
    if (validateRoom(room, matchItem)) {
      saveMatchInterviewSlot.mutate({
        interviewRequestId: matchId,
        timeBlockPreferenceId: matchItem.timeBlockPreference
          ? matchItem.timeBlockPreference?.id
          : 1,
        interviewRoomId: room?.id,
      });
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-full justify-between">
      <div className="w-full lg:w-3/4 p-4 lg:p-8">
        <h1 className="mb-5">{t("interviews.title")}</h1>
        <div className="mb-16 text-xl">
          {!eventPhase?.publishedSchedule
            ? t("interviews.description", {
                date: eventDate,
              })
            : t("interviews.publishedSchedule.description")}
        </div>
        <div className="mb-5 text-xl">
          <b>
            {!eventPhase?.publishedSchedule
              ? t("interviews.tip", {
                  date: matchingCloseDate,
                })
              : null}
          </b>
        </div>

        {/* {error ? (
          <div className="text-white mb-5 bg-red p-5 rounded-md">
            {t('interviews.error')}
          </div>
        ) : null} */}
        {errorFE ? (
          <div className="text-white mb-5 bg-red p-5 rounded-md">
            {t("interviews.error")}
          </div>
        ) : null}

        {!eventPhase?.publishedSchedule ? (
          <InterviewsSlotsList
            candidateRoomsList={candidateRoomsList}
            roomsOptions={roomsOptions}
            timeBlockPreferenceOptions={timeBlockPreferenceOptions}
            onChangeTimePreference={handleOnChangeTimePreference}
            onChangeRoom={handleOnChangeRoom}
          />
        ) : (
          <PublishedInterviewSlots showEducation />
        )}
      </div>
      <HelperText
        title={t("interviews.tip-title")}
        description={
          !eventPhase?.publishedSchedule ? (
            <>{t("interviews.tip-description")}</>
          ) : (
            <div className={styles.informationDescription}>
              {t.rich("interviews.publishedSchedule.tip-description", {
                emailLink: (chunks) => (
                  <a href="mailto:campusinterview@ethjuniors.ch">{chunks}</a>
                ),
              })}
            </div>
          )
        }
        icon={<InfoIcon className="w-10 h-10" />}
      />
    </div>
  );
};

export default InterviewsSlots;
