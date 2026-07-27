"use client";

import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { Users, UtensilsCrossed, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";

const AgendaCard = () => {
  const { data } = useGetLandingPageDataQuery() as any;

  const agendaItems = [
    {
      icon: "/img/onlinecampus/Importantdate5.png",
      label: "Interviews",
      time: data?.data?.agendaInterviewsRange,
    },
    {
      icon: "/img/onlinecampus/Importantdate4.png",
      label: "Break",
      time: data?.data?.agendaLunchRange,
    },
  ];

  return (
    <div className="rounded-xl bg-white p-4 md:p-5">
      <h3 className="mb-4 text-xl font-bold text-foreground !text-[18px] leading-[28px] text-[#101828] font-thin mb-[24px]">
        Agenda
      </h3>
      <div className="space-y-4 mb-[24px]">
        {agendaItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3 mb-[16px]">
            <div className="flex w-[40px] h-[40px] shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <span className="!text-primaryPurple mt-2 ">
                <img src={item?.icon} />
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-base text-gray-400 !text-[14px] leading-[20px] !text-[#6A7282]">
                {item.label}
              </p>
              <p className="text-lg font-semibold text-foreground !text-[16px] leading-[20px] !text-[#101828]">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/company/interviews">
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primaryPurple px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity text[#8072FF] !text-[16px] leading-[24px]">
          Manage your interviews <ArrowRight size={16} />
        </button>
      </Link>
    </div>
  );
};

export default AgendaCard;
