"use client";
import React, { FC } from "react";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import { TagList } from "@/components/molecules/Taglist";
import styles from "./JoinUsCard.module.scss";
import { useTranslations } from "next-intl";
import ProfileGrid from "./ProfileGrid";
import c from "classnames";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import useMobileDetect from "@/utils/useMobileDetect";
import { marked } from "marked";
import DOMPurify from "dompurify";

export const JoinUsCard: FC<{ companyId?: string; readonly?: boolean }> = ({
  companyId,
  readonly = false,
}) => {
  const t = useTranslations("companies");

  const { data } = useGetCompanyGeneralDataQuery() as any;

  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  return (
    <OverviewCard href="/company/profile/joinus">
      <OverviewCard.Title>{t("joinus.title")}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t("joinus.edit")}</OverviewCard.Action>
      )}
      <OverviewCard.Body
        readonly={readonly}
        className={c(styles.body, "mt-5 lg:mt-10")}
      >
        <ProfileGrid 
          name="joinus"
          gridStyleLeft={{
            gridTemplateColumns: "40% auto",
            minWidth: isMobile ? "100%" : "80%",
            maxWidth: isMobile ? "100%" : "80%",
          }}
          gridStyleRight={{ gridTemplateColumns: "0", width: 0 }}
          left={[
            {
              title: t("joinus.form-majors-label"),
              text:
                data?.fieldsOfStudy?.length > 0 ? (
                  <TagList tags={data?.fieldsOfStudy} />
                ) : (
                  ""
                ),
              under: isMobile,
              name: "fieldsOfStudy",
              // titleStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
              // textStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
            },
            {
              title: t("joinus.form-lookingFor-label"),
              text: data?.lookingFor ? (
                <div
                  className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize( data?.lookingFor
                      ? marked.parse(data.lookingFor)
                      : ""),
                  }}
                />
              ) : (
                ""
              ),
              under: isMobile,
              name: "lookingFor",
              // titleStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
              // textStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
            },
            {
              title: t("joinus.form-companyCulture-label"),
              text: data?.culture ? (
                <div
                  className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.culture ? marked.parse(data.culture) : ""),
                  }}
                />
              ) : (
                ""
              ),

              under: isMobile,
              name: "culture",
              // titleStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
              // textStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
            },
            {
              title: t("joinus.form-weOffer-label"),
              text: data?.weOffer ? (
                <div
                  className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.weOffer ? marked.parse(data.weOffer) : "",
                              )                }}
                />
              ) : (
                ""
              ),

              under: isMobile,
              name: "weOffer",
              // titleStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
              // textStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
            },
            {
              title: t("joinus.form-positions-label"),
              text:
                data?.offeredPositionTypes?.length > 0 ? (
                  <TagList tags={data?.offeredPositionTypes} />
                ) : (
                  ""
                ),
              under: isMobile,
              name: "offeredPositionTypes",
              titleStyle: {
                marginBottom: !isMobile ? 40 : 16,
              },
              textStyle: {
                marginBottom: !isMobile ? 40 : 16,
              },
            },
            {
              title: t("joinus.form-salary-label"),
              text: data?.startingSalary,
              under: isMobile,
              name: "startingSalary",
              // titleStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
              // textStyle: {
              //   marginBottom: !isMobile ? 40 : 16,
              // },
            },
          ]}
        ></ProfileGrid>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
