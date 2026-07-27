"use client";

import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { fromISOtoDateNameStatic, fromISOtoDateStatic } from "@/utils/date";
import { CalendarX2, Users, AlertCircle } from "lucide-react";

const ImportantDatesCard = () => {
  const { data } = useGetLandingPageDataQuery() as any;

  const dates = [
    {
      icon: "/img/onlinecampus/Importantdate3.png",
      label: "Registration deadline",
      date: fromISOtoDateNameStatic(data?.data?.companyRegistrationCloseDate),
    },
    {
      icon: "/img/onlinecampus/Importantdate2.png",
      label: "Matching deadline",
      date: fromISOtoDateNameStatic(data?.data?.matchingCloseDate),
    },
    {
      icon: "/img/onlinecampus/Importantdate1.png",
      label: "Interview day",
      date: fromISOtoDateNameStatic(data?.data?.eventDate),
    },
  ];
  return (
    <div className="rounded-xl bg-white px-[20px] py-[20px] md:p-5 ">
      <h3 className="mb-4 text-xl font-bold text-foreground !text-[18px] leading-[28px] text-[#101828] font-thin mb-[24px]">
        Important Dates
      </h3>
      <div className="space-y-4">
        {dates.map((d) => (
          <div key={d.label} className="flex items-start gap-3 mb-[16px]">
            <div className="flex w-[40px] h-[40px] shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <span className="!text-primaryPurple mt-2  ">
                <img src={d?.icon} />
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-base text-gray-400 !text-[14px] leading-[20px] !text-[#6A7282]">
                {d.label}
              </p>
              <p className="text-lg font-semibold text-foreground !text-[16px] leading-[20px] !text-[#101828]">
                {d.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantDatesCard;
