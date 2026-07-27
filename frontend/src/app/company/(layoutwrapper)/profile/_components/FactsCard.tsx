"use client";
import React, { FC } from "react";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import { useTranslations } from "next-intl";
import ProfileGrid from "./ProfileGrid";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import useMobileDetect from "@/utils/useMobileDetect";
import { marked } from "marked";
import DOMPurify from "dompurify";

export const FactsCard: FC<{ companyId?: string; readonly?: boolean }> = ({
  companyId,
  readonly = false,
}) => {
  const t = useTranslations("companies");
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const { data } = useGetCompanyGeneralDataQuery() as any;

  return (
    <OverviewCard href="/company/profile/facts">
      <OverviewCard.Title>{t("facts.title")}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t("facts.edit")}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="flex mt-2 lg:mt-10">
        <ProfileGrid
          name="facts"
          gridStyleLeft={{ gridTemplateColumns: "210px 180px" }}
          gridStyleRight={{
            gridTemplateColumns: "140px auto",
            maxWidth: "50%",
          }}
          left={[
            {
              title: t("facts.form-locationSwiss-label"),
              text: data?.swissOfficeLocation,
              titleStyle: { minWidth: isMobile ? "65%" : "" },
              textStyle: { fontWeight: 800 },
              name: "swissOfficeLocation",
            },
            {
              title: t("facts.form-locationHeadquarters-label"),
              text: data?.headquarterLocation,
              titleStyle: { minWidth: isMobile ? "65%" : "" },

              name: "headquarterLocation",
            },
            {
              title: t("facts.form-employeesSwiss-label"),
              text: data?.swissEmployeeCount,
              titleStyle: { minWidth: isMobile ? "65%" : "" },

              name: "swissEmployeeCount",
            },

            {
              title: t("facts.form-employeesWorldwide-label"),
              text: data?.worldEmployeeCount,
              titleStyle: { minWidth: isMobile ? "65%" : "" },

              name: "worldEmployeeCount",
            },

            {
              title: t("facts.form-gradShare-label"),
              text: data?.shareOfGraduates,
              titleStyle: { minWidth: isMobile ? "65%" : "" },

              name: "shareOfGraduates",
            },
          ]}
          right={[
            {
              title: t("facts.form-activity-label"),
              text: data?.corporateActivity ? (
                <div
                  className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-black"
                  dangerouslySetInnerHTML={{
                    __html:DOMPurify.sanitize( data?.corporateActivity
                      ? marked.parse(data.corporateActivity)
                      : ""),
                  }}
                />
              ) : (
                ""
              ),
              name: "corporateActivity",
              titleStyle: {
                marginBottom: !isMobile ? 40 : 0,
                marginTop: !isMobile ? 0 : 30,
              },
            },
            {
              title: t("facts.form-philosophy-label"),
              text: data?.philosophy ? (
                <div
                  className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.philosophy
                      ? marked.parse(data.philosophy)
                      : ""),
                  }}
                />
              ) : (
                ""
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
