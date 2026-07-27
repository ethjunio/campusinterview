"use client";
import React, { FC } from "react";
import c from "classnames";
import { useTranslations } from "next-intl";
import styles from "./OverviewCard.module.scss";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import { useGetPersonalDataQuery } from "@/hooks/student/onboardingmgmt/useGetPersonalDataQuery";
import { fromISOtoDate, fromISOtoDateStatic } from "@/utils/date";

export const PersonalCard: FC<{
  candidateId?: string;
  readonly?: boolean;
  previousCandidateId?: string;
  nextCandidateId?: string;
  handleNextOrPrev?: Function;
  children?: React.ReactNode;
}> = ({
  children,
  candidateId,
  readonly = false,
  previousCandidateId,
  nextCandidateId,
  handleNextOrPrev,
}) => {
  const t = useTranslations();
  const input = candidateId ? { candidateId } : {};
  const router = useRouter();

  const { data: personalData } = useGetPersonalDataQuery();

  const fullName = `${personalData?.data?.firstName} ${personalData?.data?.lastName}`;

  return (
    <div className="relative bg-white pt-2 pb-8 px-4 lg:px-10 mt-32 lg:mt-48">
      <div className="my-4 flex justify-between ">
        {/* <Button
          tw={`${previousCandidateId ? '' : 'invisible'}`}
          onClick={async () => {
            // router.push(`/company/talent-pool/${previousCandidateId}`);
            // handleNextOrPrev();
          }}>
          {t('candidate.miscs.previous-candidate')}
        </Button> */}
        <Button
          tw={`${nextCandidateId ? "" : "invisible"}`}
          onClick={async () => {
            // router.push(`/company/talent-pool/${nextCandidateId}`);
            // handleNextOrPrev();
          }}
        >
          {t("candidate.miscs.next-candidate")}
        </Button>
      </div>
      <div className="flex w-full items-start justify-between pt-12 mt-8 lg:mt-0 pt-8 pb-8">
        <div className="lg:flex flex-grow">
          <div className="w-full lg:w-8/12">
            {personalData?.data?.imageUrlMedium ? (
              <img
                className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full"
                src={personalData?.data?.imageUrlMedium}
              />
            ) : (
              <PlaceholderImage className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full" />
            )}

            <div className="flex flex-col ml-40 lg:ml-48 pt-4">
              <h1 className="text-2xl lg:text-5xl lg:leading-12 font-bold">
                {fullName}
              </h1>
            </div>

            <div className="flex flex-col ml-0 lg:ml-48 mt-4">
              <OverviewCard.Body
                readonly={readonly}
                href="/candidate/profile/personal"
              >
                <div className={c("mt-10 lg:mt-0 lg:max-w-md", styles.full)}>
                  <div>
                    <OverviewCard.Table>
                      <OverviewCard.Row
                        title={t("candidate.personal.form-nationality-label")}
                        name="nationality"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {personalData?.data?.nationality?.name}
                      </OverviewCard.Row>

                      <OverviewCard.Row
                        title={t("candidate.personal.form-dateOfBirth-label")}
                        name="dateOfBirth"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {fromISOtoDateStatic(personalData?.data?.dateOfBirth)}
                      </OverviewCard.Row>

                      <OverviewCard.Row
                        title={t(
                          "candidate.personal.form-residencePermit-label"
                        )}
                        name="residencePermit"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {personalData?.data?.residencePermit?.name}
                      </OverviewCard.Row>

                      <OverviewCard.Row
                        title={"Experience Years"}
                        name="experienceYears"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {personalData?.data?.experienceYears}
                      </OverviewCard.Row>
                    </OverviewCard.Table>
                  </div>
                </div>
              </OverviewCard.Body>
            </div>
          </div>
          {readonly && (
            <div className="flex flex-col flex-grow items-center lg:items-end justify-between mt-6">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
