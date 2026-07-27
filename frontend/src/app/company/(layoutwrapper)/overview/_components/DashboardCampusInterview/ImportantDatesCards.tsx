"use client"

import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { fromISOtoDateNameStatic, fromISOtoDateStatic } from "@/utils/date";
import { CalendarX2, Users, AlertCircle } from "lucide-react";



const ImportantDatesCard = () => {
  const { data } = useGetLandingPageDataQuery() as any;
  
  
  const dates = [
    { icon: "/img/campusInterview16.png", label: "Registration deadline", date: fromISOtoDateNameStatic(data?.data?.companyRegistrationCloseDate) },
    { icon: "/img/campusinterview15.png", label: "Matching deadline", date: fromISOtoDateNameStatic(data?.data?.matchingCloseDate) },
    { icon: "/img/campusInterview17.png", label: "Interview day", date: fromISOtoDateNameStatic(data?.data?.eventDate) },
  ];
  return (
    <div className="rounded-xl bg-white p-4 md:p-5">
      <h3 className="mb-4 text-xl font-bold text-foreground">Important Dates</h3>
      <div className="space-y-4">
        {dates.map((d) => (
          <div key={d.label} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <span className="!text-PrimaryBlue mt-2 ">
                  <img src={d?.icon} />
                </span>
            </div>
            <div className="space-y-2">
              <p className="text-base text-gray-400">{d.label}</p>
              <p className="text-lg font-semibold text-foreground">{d.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantDatesCard;
