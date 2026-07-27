"use client";
import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import ProfileGrid from "@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid";
import { fromISOtoDateStatic } from "@/utils/date";
import useMobileDetect from "@/utils/useMobileDetect";
import DOMPurify from "dompurify";

export const PositionsCard: FC<{ data: any }> = ({ data }) => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  return (
    <OverviewCard href="/company/profile/open-positions">
      <OverviewCard.Title>
        {t("companies.open-positions.title")}
      </OverviewCard.Title>
      {false && (
        <OverviewCard.Action>
          {t("companies.open-positions.edit-button")}
        </OverviewCard.Action>
      )}
      <OverviewCard.Body className="mt-5 lg:mt-10">
        {data?.data
          ? data?.data?.companyOpen?.map((item: any, i: any) => (
              <ProfileGrid
                key={i}
                gridStyleLeft={{ gridTemplateColumns: "auto" }}
                gridStyleRight={{
                  gridTemplateColumns: "125px auto",
                  maxWidth: "50%",
                }}
                left={[
                  {
                    title: item.title || "N/A",
                    titleStyle: {
                      maxWidth: "80%",
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
                            text: item.offeredPositionType.name || "N/A",
                            textStyle: { fontWeight: 800 },
                          },
                          {
                            title: t("common.startDate-label"),
                            text: item.startDateFlexible
                              ? t("companies.open-positions.flexible")
                              : fromISOtoDateStatic(item?.startDate) || "N/A",
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
                        className="content max-w-screen-sm xl:pr-40 wysiwyg text-black"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(item?.description || "N/A"),
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
