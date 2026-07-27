"use client"
import React, { FC } from 'react';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import ProfileGrid from './ProfileGrid';
import { useGetJobRequirementsDataQuery } from '@/hooks/student/onboardingmgmt/useGetJobRequirementsDataQuery';
import { TagList } from '@/components/molecules/Taglist';
import { fromISOtoDateStatic } from '@/utils/date';
import useMobileDetect from '@/utils/useMobileDetect';

export const LookingForCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ readonly }) => {
  const t = useTranslations("candidate");

  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

   const { data: jobRequirementsData } = useGetJobRequirementsDataQuery();

  const lookingFor = jobRequirementsData?.data;

  return (
    <OverviewCard href="/candidate/profile/lookingfor">
      <OverviewCard.Title>{t('lookingfor.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('lookingfor.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <div className="">
          <ProfileGrid
            name="lookingfor"
            gridStyleLeft={{ gridTemplateColumns: '210px 200px' }}
            gridStyleRight={{
              gridTemplateColumns: '120px auto',
              maxWidth: '50%',
            }}
            left={[
              {
                title: t('lookingfor.form-desiredJobType-label'),
                text: lookingFor?.desiredJobType?.name,
                textStyle: { fontWeight: 800 },
                name: 'jobType',
              },
              {
                title: t('lookingfor.form-startDate-label'),
                text: fromISOtoDateStatic(lookingFor?.startDate),
                textStyle: { fontWeight: 800 },
                name: 'startDate',
              },
              {
                title: t('lookingfor.form-desiredTravelActivity-label'),
                text: lookingFor?.desiredTravelActivity?.name,
                textStyle: { fontWeight: 800 },
                name: 'desiredTravelActivity',
              },
              {
                title: t('lookingfor.form-desiredWorkArea-label'),
                text: lookingFor?.desiredWorkArea?.name,
                textStyle: { fontWeight: 800 },
                name: 'desiredWorkArea',
              },
            ]}
            right={[
              {
                title: t('lookingfor.form-careerGoal-label'),
                text: lookingFor?.careerGoal,
                name: 'careerGoal',
              },
              {
                title: t('lookingfor.form-positionRequirements-label'),
                text: lookingFor?.positionRequirements,
                name: 'positionRequirements',
              },
            ]}
          />
          <ProfileGrid
            name="lookingfor"
            gridStyleLeft={{
              gridTemplateColumns: '210px auto',
              minWidth: '100%',
            }}
            left={[
              {
                title: t('lookingfor.form-areasOfInterest-label'),
                text: lookingFor?.interests?.length > 0 && (
                  <TagList tags={lookingFor?.interests} />
                ),
                under: isMobile,
                name: 'interests',
              },
            ]}
          />
        </div>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
