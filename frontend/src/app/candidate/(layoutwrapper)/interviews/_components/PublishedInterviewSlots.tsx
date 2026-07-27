"use client"
import { useEffect, useState } from 'react';
import CompanyListItem from '../../matching/_components/CompanyListItem';
import { useTranslations } from 'next-intl';
import { useGetCandidateInterviewListQuery } from '@/hooks/student/interviewmgmt/useGetInterviewListQuery';

export interface PublishedInterviewSlotsProps {
  showRoomName?: boolean;
  showOnlyOneRoom?: boolean;
}

const PublishedInterviewSlots: React.FC<PublishedInterviewSlotsProps> = ({
  showRoomName,
  showOnlyOneRoom,
}) => {
  const t = useTranslations();
  interface InterviewDay {
    company: any;
    id: number;
    timeSlot: {
      id: number;
      timeRange: string;
    };
    interviewRoom: {
      name: string;
    };
    interviewLocation: string;
  }
  
  const [morningSchedule, setMorningSchedule] = useState<InterviewDay[]>([]);
  const [afternoonSchedule, setAfternoonSchedule] = useState<InterviewDay[]>([]);

  const {data:getCandidateInterviewSchedule} = useGetCandidateInterviewListQuery();

  const morningTimeRanges = [
    '08:00 - 08:45',
    '09:00 - 09:45',
    '10:00 - 10:45',
    '11:00 - 11:45',
    '12:00 - 12:45',
  ];

  useEffect(() => {
    const morningSchedule: any[] = [];
    const afternoonSchedule: any[] = [];
    const interviewScheduleDB = showOnlyOneRoom
      ? getCandidateInterviewSchedule?.data?.slice(0, 1)
      : getCandidateInterviewSchedule?.data;

    interviewScheduleDB?.map((interviewDay:any) => {
      if (morningTimeRanges.includes(interviewDay?.timeSlot?.timeRange)) {
        morningSchedule.push(interviewDay);
      } else {
        afternoonSchedule.push(interviewDay);
      }
    });

    // sort
    morningSchedule.sort((a, b) => {
      if (a.timeSlot?.id > b.timeSlot?.id) return 1;
      else return -1;
    });

    afternoonSchedule.sort((a, b) => {
      if (a.timeSlot?.id > b.timeSlot?.id) return 1;
      else return -1;
    });

    setMorningSchedule(morningSchedule);
    setAfternoonSchedule(afternoonSchedule);
  }, [getCandidateInterviewSchedule, getCandidateInterviewSchedule?.data]);

  function renderCompanyListItem(company: any, timeSlot: { id: number; timeRange: string }, id: number, interviewRoom: { name: string }, interviewLocation: string) {
    return (
      <CompanyListItem
        company={company}
        key={id}
        id={id}
        text={
          <div
            className={
              showRoomName ? 'flex justify-between' : 'flex justify-end'
            }>
            {showRoomName ? (
              <div
                key={id}
                className="truncate w-56 xxl:w-100  xxl:overflow-normal xxl:break-normal general-text"
              >
                <div>{t('candidate.interviews.location-title')}:</div>
                {interviewRoom?.name?.includes('http') ? (
                  <a
                    href={interviewRoom?.name}
                    rel="noopener noreferrer"
                    target="_blank">
                    {interviewRoom?.name}
                  </a>
                ) : (
                  <h3>{interviewLocation ?? 'N/A'}</h3>
                )}
              </div>
            ) : null}
            <div className="flex items-center">{timeSlot?.timeRange}</div>
          </div>
        }
        loading={false}
        showMail={false}
        containerStyle={{
          gridTemplateColumns: '60px 150px auto auto',
        }}
        linkToProfileInActions
        showStatus={false}
      />
    );
  }

  return (
    <div>
      <ul className="space-y-3 h-full p-1">
        {morningSchedule.map(({ company, id, timeSlot, interviewRoom, interviewLocation }) =>
          renderCompanyListItem(company, timeSlot, id, interviewRoom, interviewLocation),
        )}
      </ul>
      <ul className="space-y-3 h-full p-1">
        {afternoonSchedule.map(({ company, id, timeSlot, interviewRoom, interviewLocation }) =>
          renderCompanyListItem(company, timeSlot, id, interviewRoom, interviewLocation),
        )}
      </ul>
    </div>
  );
};

export default PublishedInterviewSlots;
