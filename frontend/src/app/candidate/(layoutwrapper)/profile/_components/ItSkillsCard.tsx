'use client';

import React, { FC } from 'react';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import ProfileGrid from './ProfileGrid';
import { useGetCandidateSkillsQuery } from '@/hooks/student/profilemgmt/useGetCandidateSkillsQuery';
import useMobileDetect from '@/utils/useMobileDetect';

export const ItSkillsCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ readonly, candidateId }) => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const { data, isLoading } = useGetCandidateSkillsQuery();

  const skills = data?.data || [];

  return (
    <OverviewCard href="/candidate/profile/it-skills">
      <OverviewCard.Title>{t('candidate.itSkills.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('candidate.itSkills.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8 space-y-6">
        {skills.length > 0 ? (
          skills.map((skill, i) => {
            const skillName =
              skill?.itSkill?.name === 'Other'
                ? skill?.otherItSkill
                : skill?.itSkill?.name || 'N/A';
            const skillLevel = skill?.skillLevel?.name || 'N/A';
            const description = skill?.description?.trim() ;

            const left = [
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

            const right = [
              {
                title: t('candidate.itSkills.form-description-label'),
                text: description,
                titleStyle: { fontWeight: 800 },
                name: 'description',
              },
            ];

            return (
              <div key={i} className="p-4">
                <ProfileGrid
                  gridStyleLeft={{ gridTemplateColumns: '178px 200px' }}
                  gridStyleRight={{ maxWidth: '50%' }}
                  left={left}
                  right={!isMobile ? right : []}
                  name="it-skills"
                />
                {isMobile && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700">
                      {t('candidate.itSkills.form-description-label')}
                    </p>
                    <p className="text-sm text-gray-900">{description}</p>
                  </div>
                )}
                {(skill?.linkedExperiences || []).length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700">
                      {t('candidate.itSkills.form-experiences-label')}
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
          <p className="text-sm text-gray-500">No IT skills added yet</p>
        )}
      </OverviewCard.Body>
    </OverviewCard>
  );
};
