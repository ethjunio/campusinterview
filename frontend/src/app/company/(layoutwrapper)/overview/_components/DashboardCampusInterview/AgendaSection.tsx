"use client"

import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { Users, UtensilsCrossed, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";




const AgendaCard = () => {
  const { data } = useGetLandingPageDataQuery() as any;
  
 

  const agendaItems = [
    { icon: "/img/campusInterview25.png", label: "Interviews", time: data?.data?.agendaInterviewsRange },
    { icon: "/img/campusInterview26.png", label: "Free lunch buffet", time: data?.data?.agendaLunchRange },
    { icon: "/img/campusInterview24.png", label: "Free snacks and refreshments", time: data?.data?.agendaSnacksRange },
  ];

  return (
    <div className="rounded-xl bg-white p-4 md:p-5">
      <h3 className="mb-4 text-xl font-bold text-foreground">Agenda</h3>
      <div className="space-y-4">
        {agendaItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <span className="!text-PrimaryBlue mt-2 ">
                  <img src={item?.icon} />
                </span>
            </div>
            <div className="space-y-2">
              <p className="text-base text-gray-400">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link
                href="/company/interviews"
                
              >
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-PrimaryBlue px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Manage your interviews <ArrowRight size={16} />
      </button>
      </Link>


    </div>
  );
};

export default AgendaCard;
