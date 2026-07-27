"use client";
import React, { FC } from "react";
import { InfoTable } from "./InfoTable";
import AgendaIllustration from "@/icons/illustrations/illustration_agenda.svg";
import { useTranslations } from "next-intl";
import c from "classnames";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { fromISOtoDateStatic } from "@/utils/date";

export const Agenda: FC<{
  containerStyle?: any;
  divStyle?: any;
  noIllustration?: boolean;
}> = ({ containerStyle, divStyle, noIllustration = false }) => {
  const t = useTranslations();
   const { data } = useGetLandingPageDataQuery() as any;
  
  const values = {
    agendaInterviewsRange: data?.data?.agendaInterviewsRange,
    agendaLunchRange: data?.data?.agendaLunchRange,
    agendaSnacksRange: data?.data?.agendaSnacksRange,
    registrationDeadline: fromISOtoDateStatic(data?.data?.companyRegistrationCloseDate),
    matchingCloseDate: fromISOtoDateStatic(data?.data?.matchingCloseDate),
    interviewDay: fromISOtoDateStatic(data?.data?.eventDate),
    locationLine1: data?.data?.locationLine1,
    locationLine2: data?.data?.locationLine2,
    locationLine3: data?.data?.locationLine3,
  };

  return (
    <section
      style={containerStyle}
      className={c("relative -mt-40 px-8 lg:mt-0 lg:px-40")}
    >
      <div style={divStyle} className="pt-56 lg:pt-20 space-y-20">

      <div className="space-y-8">
          <h1 className="text-primary-light text-3xl font-bold leading-relaxed">
            {t("important-dates.title")}
          </h1>
          <InfoTable
            rows={[
              {
                title: t("important-dates.item-1"),
                value: t("date", { date: values.registrationDeadline }),
              },
              {
                title: t("important-dates.item-2"),
                value: t("date", { date: values.matchingCloseDate }),
              },
              {
                title: t('important-dates.item-3'),
                value: t('date', { date: values.interviewDay }),
              },
            ]}
          />
        </div>
        <div className="space-y-8">
          <h1 className="text-primary-light text-3xl font-bold leading-relaxed">
            {t("agenda.title")}
          </h1>
          <InfoTable
            rows={[
              {
                title: t("agenda.item-1"),
                value: values.agendaInterviewsRange,
              },
              { title: t("agenda.item-2"), value: values.agendaLunchRange },
              { title: t("agenda.item-3"), value: values.agendaSnacksRange },
            ]}
          />
        </div>

     
        <div>
          <h1 className="text-primary-light text-3xl font-bold leading-relaxed">
            {t("location.title")}
          </h1>
          <div className="pt-4 text-primary-dark text-sm leading-tight lg:text-xl lg:leading-relaxed">
            <div>{values.locationLine1}</div>
            <div>{values.locationLine2}</div>
            <div>{values.locationLine3}</div>
          </div>
        </div>
      </div>
      {noIllustration ? null : (
        <AgendaIllustration
          style={{ zIndex: -1 }}
          className="absolute -mt-24 mb-0 top-0 lg:mt-0 right-0 h-88 lg:h-132 xl:h-216"
        />
      )}
    </section>
  );
};
