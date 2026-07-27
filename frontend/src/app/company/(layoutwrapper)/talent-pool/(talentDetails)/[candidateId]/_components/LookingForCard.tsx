import React, { FC } from "react";
import { OverviewCard } from "@/components/molecules/OverviewCard";
import { useTranslations } from "next-intl";
import { TagList } from "@/components/molecules/Taglist";
import { fromISOtoDate, fromISOtoDateStatic } from "@/utils/date";
import ProfileGrid from "@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid";
import useMobileDetect from "@/utils/useMobileDetect";

export const LookingForCard: FC<{
  data: any;
  readonly?: boolean;
  candidateId?: string;
}> = ({ data, readonly, candidateId }) => {
  const t = useTranslations("candidate");
  const input = candidateId ? { candidateId } : {};

  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const lookingFor = data?.data?.jobRequirement;
  return (
    <OverviewCard href="/candidate/profile/lookingfor">
      <OverviewCard.Title>{t("lookingfor.title")}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t("lookingfor.edit")}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <div className="">
          <ProfileGrid
            name="lookingfor"
            gridStyleLeft={{ gridTemplateColumns: "210px 200px" }}
            gridStyleRight={{
              gridTemplateColumns: "120px auto",
              maxWidth: "50%",
            }}
            left={[
              {
                title: t("lookingfor.form-desiredJobType-label"),
                text: lookingFor?.desiredJobType?.name || "N/A",
                textStyle: { fontWeight: 800 },
                name: "jobType",
              },
              {
                title: t("lookingfor.form-startDate-label"),
                text: fromISOtoDateStatic(lookingFor?.startDate) || "N/A",
                textStyle: { fontWeight: 800 },
                name: "startDate",
              },
              {
                title: t("lookingfor.form-desiredTravelActivity-label"),
                text: lookingFor?.desiredTravelActivity?.name || "N/A",
                textStyle: { fontWeight: 800 },
                name: "desiredTravelActivity",
              },
              {
                title: t("lookingfor.form-desiredWorkArea-label"),
                text: lookingFor?.desiredWorkArea?.name || "N/A",
                textStyle: { fontWeight: 800 },
                name: "desiredWorkArea",
              },
            ]}
            right={[
              {
                title: t("lookingfor.form-careerGoal-label"),
                text: lookingFor?.careerGoal || " N/A",
                name: "careerGoal",
              },
              {
                title: t("lookingfor.form-positionRequirements-label"),
                text: lookingFor?.positionRequirements || " N/A",
                name: "positionRequirements",
              },
            ]}
          />
          <ProfileGrid
            name="lookingfor"
            gridStyleLeft={{
              gridTemplateColumns: "210px auto",
              minWidth: "100%",
            }}
            left={[
              {
                title: t("lookingfor.form-areasOfInterest-label"),
                text:
                  lookingFor?.interests?.length > 0 ? (
                    <TagList tags={lookingFor?.interests} />
                  ) : (
                    "N/A"
                  ),
                under: isMobile,
                name: "interests",
              },
            ]}
          />
        </div>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
