"use client";
import React, { FC } from "react";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import { useTranslations } from "next-intl";
import ProfileGrid from "@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid";
import useMobileDetect from "@/utils/useMobileDetect";
import DOMPurify from "dompurify";

export const FactsCard: FC<{ data: any }> = ({ data }) => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  return (
    <OverviewCard href="/company/profile/facts">
      <OverviewCard.Title>{t("companies.facts.title")}</OverviewCard.Title>
      {false && (
        <OverviewCard.Action>{t("companies.facts.edit")}</OverviewCard.Action>
      )}
      <OverviewCard.Body readonly={true} className="flex mt-2 lg:mt-10">
        <ProfileGrid
          name="facts"
          gridStyleLeft={{ gridTemplateColumns: "210px 180px" }}
          gridStyleRight={{
            gridTemplateColumns: "140px auto",
            maxWidth: "50%",
          }}
          left={[
            {
              title: t("companies.facts.form-locationSwiss-label"),
              text: data?.data?.swissOfficeLocation || "N/A",
              titleStyle: { minWidth: isMobile ? "65%" : undefined },
              textStyle: { fontWeight: 800 },
              name: "swissOfficeLocation",
            },
            {
              title: t("companies.facts.form-locationHeadquarters-label"),
              text: data?.data?.headquarterLocation || "N/A",
              titleStyle: { minWidth: isMobile ? "65%" : undefined },
              textStyle: { fontWeight: 800 },
              name: "headquarterLocation",
            },
            {
              title: t("companies.facts.form-employeesSwiss-label"),
              text: data?.data?.swissEmployeeCount || "N/A",
              titleStyle: { minWidth: isMobile ? "65%" : undefined },
              textStyle: { fontWeight: 800 },
              name: "swissEmployeeCount",
            },
            {
              title: t("companies.facts.form-employeesWorldwide-label"),
              text: data?.data?.worldEmployeeCount || "N/A",
              titleStyle: { minWidth: isMobile ? "65%" : undefined },
              textStyle: { fontWeight: 800 },
              name: "worldEmployeeCount",
            },
            {
              title: t("companies.facts.form-gradShare-label"),
              text: data?.data?.shareOfGraduates || "N/A",
              titleStyle: { minWidth: isMobile ? "65%" : undefined },
              textStyle: { fontWeight: 800 },
              name: "shareOfGraduates",
            },
          ]}
          right={[
            {
              title: t("companies.facts.form-activity-label"),
              text: (
                <div
                  className="content max-w-screen-sm xl:pr-40 wysiwyg font-bold text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.data?.corporateActivity || "N/A"),
                  }}
                />
              ),
              name: "corporateActivity",
              titleStyle: {
                marginBottom: !isMobile ? 40 : 0,
                marginTop: !isMobile ? 0 : 30,
              },
            },
            {
              title: t("companies.facts.form-philosophy-label"),
              text: (
                <div
                  className="content max-w-screen-sm xl:pr-40 font-extrabold wysiwyg text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.data?.philosophy || "N/A"),
                  }}
                />
              ),
              name: "philosophy",
              titleStyle: { marginTop: !isMobile ? 0 : 30 },
            },
          ]}
        />
      </OverviewCard.Body>
    </OverviewCard>
  );
};
