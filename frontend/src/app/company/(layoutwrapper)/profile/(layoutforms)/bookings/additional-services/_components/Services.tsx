import React, { FC, useCallback } from "react";
import { MiniBoothCard } from "./MiniBoothCard";
import { WorkshopCard } from "./PreEventWorkshopCard";
import { PresentationCard } from "./PreEventPresentationCard";
import { CompanyPresentationCard } from "./CompanyPresentationCard";
import { useServicesStore } from "@/app/store/servicesStore";
import { toast } from "sonner";

type Props = {
  services: any;
  hideMiniBooth: boolean;
  hidePreEvents1: boolean;
  hidePreEvents2: boolean;
  usedServiceIds:any
};
export const Services: FC<Props> = ({
  services,
  hideMiniBooth,
  hidePreEvents1,
  hidePreEvents2,

  usedServiceIds
}) => {
  const { toggleService } = useServicesStore();
  
  // ((services?.filter((item:any) => item?.selected === true)?.length +usedServiceIds?.length) >= 2 && !(services?.find((s: { id: number }) => s.id === 3)?.selected)
  // ((services?.filter((item:any) => item?.selected === true)?.length +usedServiceIds?.length) >= 2 && !(services?.find((s: { id: number }) => s.id === 1)?.selected) )
  // ((services?.filter((item:any) => item?.selected === true)?.length +usedServiceIds?.length) >= 2 && !(services?.find((s: { id: number }) => s.id === 2)?.selected) )
  // ((services?.filter((item:any) => item?.selected === true)?.length +usedServiceIds?.length) >= 2 && !(services?.find((s: { id: number }) => s.id === 4)?.selected) )
  
  const onToggle = useCallback(
    (id: any) => toggleService(id),

    []
  );

  const slides = [];
  // !hideMiniBooth &&
    slides.push(
      <div className="flex justify-center h-full">
        <MiniBoothCard
          service={services?.find((s: { id: number }) => s.id === 1)}
          disabled={
            services?.find(
              (s: { id: number; availableCount: number }) => s.id === 1
            )?.availableCount <= 0 
          }
          onToggle={() => onToggle(1)}
        />
      </div>
    );
  // !hidePreEvents1 &&
    slides.push(
      <div className="flex justify-center h-full">
        <WorkshopCard
          service={services?.find((s: { id: number }) => s.id === 2)}
          disabled={
            // services?.find((s: { id: number, selected?: boolean }) => s.id === 3)?.selected ||
            services?.find(
              (s: { id: number; availableCount: number }) => s.id === 2
            )?.availableCount <= 0 
          }
          onToggle={() => onToggle(2)}
        />
      </div>);
      // !hidePreEvents2 &&
      slides.push(
      <div className="flex justify-center h-full">
        <PresentationCard
          service={services?.find((s: { id: number }) => s.id === 3)}
          disabled={
            // services?.find((s: { id: number, selected?: boolean }) => s.id === 2)?.selected ||
            services?.find(
              (s: { id: number; availableCount: number }) => s.id === 3
            )?.availableCount <= 0  
          }
          onToggle={() => onToggle(3)}
        />
      </div>
    );

  slides.push(
    <div className="flex justify-center h-full">
      <CompanyPresentationCard
        service={services?.find((s: { id: number }) => s.id === 4)}
        disabled={
          services?.find(
            (s: { id: number; availableCount: number }) => s.id === 4
          )?.availableCount <= 0 
        }
        onToggle={() => onToggle(4)}
      />
    </div>
  );

  return (
    <div className="mt-14 lg:hstack lg:hstack-6 flex-col lg:flex-row overflow-x-auto pb-4 lg:px-10 flex-wrap gap-4">
      {slides.map((slide, index) => (
        <div key={index} className="mb-6 mx-4 lg:mb-0">
          {slide}
        </div>
      ))}
    </div>
  );
};
