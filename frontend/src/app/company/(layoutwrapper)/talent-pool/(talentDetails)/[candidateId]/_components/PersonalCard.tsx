import React, { FC } from "react";
import c from "classnames";
import { useTranslations } from "next-intl";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import styles from "@/app/candidate/(layoutwrapper)/profile/_components/OverviewCard.module.scss";
import { fromISOtoDateStatic } from "@/utils/date";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { Button } from "@/components/atoms/Button";
import { useRouter, useSearchParams } from "next/navigation";

export const PersonalCard: FC<{
  data: any;
  candidateId?: string;
  readonly?: boolean;
  previousCandidateId?: string;
  nextCandidateId?: string;
  handleNextOrPrev?: Function;
  children?: React.ReactNode;
}> = ({
  data,
  children,
  readonly = false,
  previousCandidateId,
  nextCandidateId,
  handleNextOrPrev,
}) => {
  const t = useTranslations("candidate");

  const router = useRouter();
  const searchParams = useSearchParams();
  const fromTalentPool = searchParams.get("origin") === "t-pool";

  const fullName = `${data?.data?.firstName} ${data?.data?.lastName}`;

  return (
    <div className="relative bg-white pt-2 pb-8 px-4 lg:px-10 mt-32 lg:mt-48">
      <div className="my-4 flex justify-end gap-3 ">
        {fromTalentPool && (
          <>
            <Button
              tw={`${
                previousCandidateId ? "" : "invisible"
              } text-sm md:text-base`}
              onClick={async () => {
                router.push(
                  `/company/talent-pool/${previousCandidateId}/?origin=t-pool`
                );
                handleNextOrPrev && handleNextOrPrev();
              }}
            >
              {t("miscs.previous-candidate")}
            </Button>
            <Button
              tw={`${nextCandidateId ? "" : "invisible"} text-sm md:text-base`}
              onClick={async () => {
                router.push(
                  `/company/talent-pool/${nextCandidateId}/?origin=t-pool`
                );
                handleNextOrPrev && handleNextOrPrev();
              }}
            >
              {t("miscs.next-candidate")}
            </Button>
          </>
        )}
      </div>
      <div className="flex w-full items-start justify-between pt-12 mt-8 lg:mt-0 pt-8 pb-8">
        <div className="lg:flex flex-grow">
          <div className="w-full lg:w-8/12">
            {data?.data?.imageUrlMedium ? (
              <img
                className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full"
                src={data?.data?.imageUrlMedium}
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
                        title={t("personal.form-nationality-label")}
                        name="nationality"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {data?.data?.nationality?.name || "N/A"}
                      </OverviewCard.Row>

                      <OverviewCard.Row
                        title={t("personal.form-dateOfBirth-label")}
                        name="dateOfBirth"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {fromISOtoDateStatic(data?.data?.dateOfBirth) || "N/A"}
                      </OverviewCard.Row>

                      <OverviewCard.Row
                        title={t("personal.form-residencePermit-label")}
                        name="residencePermit"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {data?.data?.residencePermit?.name || "N/A"}
                      </OverviewCard.Row>

                      <OverviewCard.Row
                        title={"Experience Years"}
                        name="experienceYears"
                        descriptionClassName="font-bold whitespace-pre-line"
                      >
                        {data?.data?.experienceYears == 0 ? 0 : data?.data?.experienceYears || "N/A"}
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
