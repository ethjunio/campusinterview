import CandidateListItem from "../../chatroom/_components/CandidateListItem";
import { FC, useCallback, useEffect, useState } from "react";
import take from "lodash/fp/take";
import sort from "lodash/fp/sortBy";
import {
  useGetCompanyInterviewScheduleQuery,
  // useGetCompanyInterviewScheduleRoomQuery,
} from "@/hooks/company/interviews/useGetCompanyInterviewScheduleQuery";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginator } from "@/components/molecules/Paginator";
import { useTranslations } from "next-intl";
import { ModalBasic } from "@/components/organisms/modal/ModalBasic";
import SlotEditSection from "./SlotEditSection";
import { useGetCompanyInterviewRoomsQuery } from "@/hooks/company/interviews/useGetCompanyInterviewRoomsQuery";

export interface PublishedInterviewSlotsProps {
  showEducation?: boolean;
  showOnlyOneRoom?: boolean;
}
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    zIndex: 20,
  }),
};

const PublishedInterviewSlots: React.FC<PublishedInterviewSlotsProps> = ({
  showEducation,
  showOnlyOneRoom,
}) => {
  const [page, setPage] = useState(1);
  // Initialize state from localStorage or defaults
  const [pageSize, setPageSize] = useState(() => 2);
  const searchParams = useSearchParams();
  const t = useTranslations();
  const router = useRouter();

  const [openSlotModal, setOpenSlotModal] = useState<boolean | number>(false);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [searchData, setSearchData] = useState<any>([]);
  const onSearchChange = (selectedOption: any) => {
    setSearchTerm(selectedOption);
    // setPage(1)
  };
  const debouncedInput = useDebounce(searchTerm, 300);

  const [interviewSchedule, setInterviewSchedule] = useState<
    { interviewRoom: any; interviewList: { morning: any[]; evening: any[] } }[]
  >([]);
  const { data: getCompanyInterviewSchedule, isLoading } =
    useGetCompanyInterviewScheduleQuery({}, page, debouncedInput?.value);
  // const { data: getCompanyInterviewScheduleRoom } =
  //   useGetCompanyInterviewScheduleRoomQuery();
  const { data: getCompanyInterviewRooms } = useGetCompanyInterviewRoomsQuery();

  const morningTimeRanges = [
    "08:00 - 08:45",
    "09:00 - 09:45",
    "10:00 - 10:45",
    "11:00 - 11:45",
    "12:00 - 12:45",
  ];

  useEffect(() => {
    const newInterviewSchedule: {
      interviewRoom: any;
      interviewList: { morning: any[]; evening: any[] };
    }[] = [];
    // const interviewScheduleDB = getCompanyInterviewScheduleRoom?.data;
    const interviewScheduleDB = getCompanyInterviewRooms?.data;

    const searchData = interviewScheduleDB?.map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      };
    });
    setSearchData(searchData);
    // interviewScheduleDB?.map((interviewDay: any, index: number) => {
    //   newInterviewSchedule.push({
    //     interviewRoom: interviewDay.interviewRoom,
    //     interviewList: { morning: [], evening: [] },
    //   });

    //   {
    //     interviewDay.interviewList?.map((interview: any) => {
    //       if (morningTimeRanges.includes(interview?.timeSlot?.timeRange)) {
    //         newInterviewSchedule[index].interviewList.morning.push(interview);
    //       } else {
    //         newInterviewSchedule[index].interviewList.evening.push(interview);
    //       }
    //     });
    //   }
    // });

    // for (const interviewRoomSchedule of newInterviewSchedule) {
    //   interviewRoomSchedule.interviewList.evening =
    //     interviewRoomSchedule?.interviewList?.evening?.sort((a, b) => {
    //       if (a.timeSlot.id > b.timeSlot.id) return 1;
    //       else return -1;
    //     });
    //   interviewRoomSchedule.interviewList.morning =
    //     interviewRoomSchedule.interviewList.morning?.sort((a, b) => {
    //       if (a.timeSlot.id > b.timeSlot.id) return 1;
    //       else return -1;
    //     });
    // }

    // setInterviewSchedule(newInterviewSchedule);
  }, [getCompanyInterviewRooms]);

  function renderCandidateListItem(
    candidate: any,
    timeSlot: any,
    timeBlock: any,
    id: number,
    isAdminCreated: number,
    isAdminEdited: number,
    matchId: number
  ) {
    return (
      <CandidateListItem
        candidate={candidate}
        isAdminCreated={isAdminCreated}
        isAdminEdited={isAdminEdited}
        matchId={matchId}
        key={id}
        id={id}
        text={
          <div
            className={
              showEducation ? "flex justify-between" : "flex justify-end"
            }
          >
            {showEducation ? (
              <div>
                {take(2, sort("startDate", candidate.education)).map(
                  ({ id, university, educationLevel, major }) => (
                    <div
                      key={id}
                      className="truncate w-20 xxl:w-50  xxl:overflow-normal xxl:break-normal general-text"
                      title={`${university?.name} - ${educationLevel?.name} in ${major?.name}`}
                    >
                      {university?.name} - {educationLevel?.name} in{" "}
                      {major?.name}
                    </div>
                  )
                )}
              </div>
            ) : null}
            {/* {timeBlock != null ? ( */}
            <div className="flex items-center m-2">{timeBlock?.name}</div>
            {/* ) : ( */}
            <div className="flex items-center">{timeSlot?.timeRange}</div>
            {/* )} */}
          </div>
        }
        loading={isLoading}
        showMail={false}
        containerStyle={{
          gridTemplateColumns: "60px 200px auto 40px",
        }}
        linkToProfileInActions
        showStatus={false}
        showSlotEditBtn
        onEditSlots={() => {
          console.log(id);
          setOpenSlotModal(id);
        }}
      />
    );
  }

  // useEffect(() => {
  //   // Fire the search callback when the debounced value changes
  //   onSearch(debouncedInput);
  // }, [debouncedInput]);

  useEffect(() => {
    // 1. Grab the raw data (sliced if showOnlyOneRoom)
    const interviewScheduleDB = showOnlyOneRoom
      ? getCompanyInterviewSchedule?.data?.slice(0, 1)
      : getCompanyInterviewSchedule?.data;

    if (!interviewScheduleDB) return; // nothing to do yet

    console.log(interviewScheduleDB, "interviewScheduleDB");

    // 2. If there’s a debouncedInput.value, filter by room-id; otherwise use everything
    const dataToUse = debouncedInput?.value
      ? interviewScheduleDB.filter(
          (item: any) => item.interviewRoom?.id === debouncedInput.value
        )
      : interviewScheduleDB;

    // 3. Build your new structure
    const newInterviewSchedule = dataToUse.map((interviewDay: any) => {
      const room = interviewDay.interviewRoom;
      const list = { morning: [] as any[], evening: [] as any[] };

      (interviewDay.interviewList ?? []).forEach((interview: any) => {
        if (morningTimeRanges.includes(interview?.timeSlot?.timeRange)) {
          list.morning.push(interview);
        } else {
          list.evening.push(interview);
        }
      });

      // sort each half-day
      list.morning.sort((a, b) => a?.timeSlot?.id - b?.timeSlot?.id);
      list.evening.sort((a, b) => a?.timeSlot?.id - b?.timeSlot?.id);

      return { interviewRoom: room, interviewList: list };
    });

    // 4. Finally, update state with either filtered or full schedule
    setInterviewSchedule(newInterviewSchedule);
  }, [debouncedInput?.value, showOnlyOneRoom, getCompanyInterviewSchedule]);
  const totalCount: number = getCompanyInterviewSchedule?.totalCount || 0;
  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      const params = new URLSearchParams(searchParams.toString());
      if (newPage) {
        params.set("page", newPage.toString());
      } else {
        params.delete("page");
      }
      router.push(`/company/interviews`);
      setSearchTerm("");
    },
    [page, pageSize]
  );

  return (
    <>
      <Select
        className="mt-8 max-w-sm mb-4 cursor-pointer"
        isSearchable
        isClearable
        classNamePrefix="react-select"
        options={searchData}
        // placeholder={t("admin.bookings.search-for-company")}
        placeholder={"All"}
        onChange={onSearchChange}
        value={searchTerm}
        styles={customStyles}
      />
      {interviewSchedule?.length ? (
        interviewSchedule?.map((interview) => (
          <div
            key={`interview-schedule-${interview?.interviewRoom?.name}`}
            className="mt-6"
          >
            <div className="flex items-center space-x-2">
              {/* <span className="font-medium">Room </span> */}
              {!showOnlyOneRoom && (
                <h2 className="text-lg font-semibold">
                  {interview?.interviewRoom?.name}
                </h2>
              )}
            </div>
            <ul className="space-y-3 h-full mt-4 p-1">
              {interview?.interviewList?.morning?.map(
                ({
                  candidate,
                  id,
                  timeSlot,
                  timeBlock,
                  isAdminCreated,
                  isAdminEdited,

                  matchId,
                }) =>
                  renderCandidateListItem(
                    candidate,
                    timeSlot,
                    timeBlock,
                    id,
                    isAdminCreated,
                    isAdminEdited,
                    matchId
                  )
              )}
            </ul>
            <ul className="space-y-3 h-full mt-8 p-1">
              {interview?.interviewList?.evening.map(
                ({
                  candidate,
                  id,
                  timeSlot,
                  timeBlock,
                  isAdminCreated,
                  isAdminEdited,
                  matchId,
                }) =>
                  renderCandidateListItem(
                    candidate,
                    timeSlot,
                    timeBlock,
                    id,
                    isAdminCreated,
                    isAdminEdited,
                    matchId
                  )
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="space-y-3 h-full mt-4 p-1">No interview selected</p>
      )}
      {getCompanyInterviewSchedule?.totalCount > 0 && (
        <>
          <div className="flex justify-center mx-auto overflow-hidden">
            <Paginator
              disabled={false}
              {...{
                page: debouncedInput ? 1 : page,
                totalCount,
                perPageCount: pageSize,
                onPageChange,
              }}
            />
          </div>
        </>
      )}

      <ModalBasic
        modalStatus={!!openSlotModal}
        toggleModal={() => setOpenSlotModal((prevState) => !prevState)}
        closeIconColor="white"
        disableOverflow
      >
        <SlotEditSection
          slotId={openSlotModal as number}
          page={page}
          onClose={() => setOpenSlotModal((prevState) => !prevState)}
        />
      </ModalBasic>
    </>
  );
};

export default PublishedInterviewSlots;
