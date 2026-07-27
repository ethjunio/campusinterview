"use client";
import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import ProfileGrid from "./ProfileGrid";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { fromISOtoDateStatic } from "@/utils/date";
import useMobileDetect from "@/utils/useMobileDetect";
import DOMPurify from "dompurify";

export const PositionsCard: FC<{ companyId?: string; readonly?: boolean }> = ({
  companyId,
  readonly = false,
}) => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const { data } = useGetCompanyGeneralDataQuery() as any;

  return (
    <OverviewCard href="/company/profile/open-positions">
      <OverviewCard.Title>
        {t("companies.open-positions.title")}
      </OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>
          {t("companies.open-positions.edit-button")}
        </OverviewCard.Action>
      )}
      <OverviewCard.Body className="mt-5 lg:mt-10">
        {data
          ? data?.companyOpen?.map((item: any, i: number) => (
              <ProfileGrid
                key={i}
                gridStyleLeft={{ gridTemplateColumns: "auto" }}
                gridStyleRight={{
                  gridTemplateColumns: "125px auto",
                  maxWidth: "50%",
                }}
                left={[
                  {
                    title: item.title,
                    titleStyle: {
                      minWidth: "100%",
                      fontSize: 20,
                      fontWeight: 700,
                    },
                  },
                  {
                    title: (
                      <ProfileGrid
                        gridStyleLeft={{
                          gridTemplateColumns: "140px auto",
                          width: "100%",
                        }}
                        gridStyleRight={{
                          gridTemplateColumns: "0px",
                          width: 0,
                        }}
                        left={[
                          {
                            title: t("companies.position-type-label"),
                            text: item?.offeredPositionType?.name,
                            textStyle: { fontWeight: 800 },
                          },
                          {
                            title: t("common.startDate-label"),
                            text: item?.startDateFlexible
                              ? t("companies.open-positions.flexible")
                              : fromISOtoDateStatic(item?.startDate),
                            //  t('common.date', {
                            //     date: new Date(item.startDate),
                            //   }),
                            textStyle: {
                              fontWeight: 800,
                              marginBottom: !isMobile ? 90 : 0,
                            },
                          },
                        ]}
                      />
                    ),
                    titleStyle: {
                      minWidth: "100%",
                      marginTop: !isMobile ? 20 : 0,
                    },
                    outerStyle: {
                      marginTop: isMobile ? 0 : 10,
                    },
                  },
                ]}
                right={[
                  {
                    title: t("companies.position-description-label"),
                    text: (
                      <div
                        className="content max-w-screen-sm xl:pr-40 font-extrabold wysiwyg text-black"
                        dangerouslySetInnerHTML={{
                          __html:DOMPurify.sanitize( item?.description),
                        }}
                      />
                    ),
                    under: isMobile,
                    textStyle: {
                      marginBottom: !isMobile
                        ? 90
                        : i < data?.positions?.length - 1
                        ? 50
                        : 0,
                    },
                  },
                ]}
              ></ProfileGrid>
            ))
          : null}
      </OverviewCard.Body>
    </OverviewCard>
  );
};
