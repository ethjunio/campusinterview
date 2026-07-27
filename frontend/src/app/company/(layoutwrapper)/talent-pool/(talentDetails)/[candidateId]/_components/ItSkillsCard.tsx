import React, { FC } from 'react';

import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import ProfileGrid from '@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid';
import useMobileDetect from '@/utils/useMobileDetect';

export const ItSkillsCard: FC<{
  data: any;
  readonly?: boolean;
  candidateId?: string;
}> = ({ data, readonly, candidateId }) => {
  const t = useTranslations('candidate');
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const itSkills = data?.data?.itSkills || [];

  return (
    <OverviewCard href="/candidate/profile/it-skills">
      <OverviewCard.Title>{t('itSkills.title')}</OverviewCard.Title>
      {!readonly && <OverviewCard.Action>{t('itSkills.edit')}</OverviewCard.Action>}

      <OverviewCard.Body readonly={readonly} className="mt-8 space-y-6">
        {itSkills.length > 0 ? (
          itSkills.map((skill: any, i: number) => {
            const skillName =
              skill?.itSkill?.name === 'Other' ? skill?.otherItSkill : skill?.itSkill?.name || 'N/A';
            const skillLevel = skill?.skillLevel?.name || 'N/A';
            const description = skill?.description?.trim() || 'N/A';

            const leftData = [
              {
                title: 'Skill',
                text: skillName,
                titleStyle: { fontWeight: 800 },
              },
              {
                title: 'Level',
                text: skillLevel,
                titleStyle: { fontWeight: 800 },
              },
            ];

            const rightData = [
              {
                title: t('itSkills.form-description-label'),
                text: description,
                titleStyle: { fontWeight: 800 },
              },
            ];

            return (
              <div key={i} className="p-4 bg-white ">
                <ProfileGrid
                  gridStyleLeft={{ gridTemplateColumns: '178px 200px' }}
                  gridStyleRight={{ maxWidth: '50%' }}
                  left={leftData}
                  right={!isMobile ? rightData : []}
                />
                {isMobile && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700">
                      {t('itSkills.form-description-label')}
                    </p>
                    <p className="text-sm text-gray-900">{description}</p>
                  </div>
                )}
                {(skill?.linkedExperiences || []).length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700">
                      {t('itSkills.form-experiences-label')}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {skill.linkedExperiences.map((exp: any) => (
                        <span
                          key={exp.id}
                          className="rounded-full bg-light px-3 py-1 text-sm text-dark-softer"
                        >
                          {exp.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No skills available</p>
        )}
      </OverviewCard.Body>
    </OverviewCard>
  );
};
