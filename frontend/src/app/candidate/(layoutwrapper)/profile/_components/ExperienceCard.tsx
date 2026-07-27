"use client"
import React, { FC } from 'react';
import orderBy from 'lodash/fp/orderBy';
import styles from './Card.module.scss';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import ProfileGrid from './ProfileGrid';
import { useGetCandidateExperienceQuery } from '@/hooks/student/profilemgmt/useGetCandidateExperienceQuery';
import { fromISOtoDate, fromISOtoDateStatic } from '@/utils/date';



export const ExperienceCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ candidateId, readonly = false }) => {
  const t = useTranslations("candidate");

//   const experiences = orderBy('startDate', 'desc', data?.experiences || []);

const {data} = useGetCandidateExperienceQuery();

  return (
    <OverviewCard href="/candidate/profile/experiences">
      <OverviewCard.Title>{t('experience.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('experience.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <ol className={styles['connected-list']}>
          {data?.data?.map(
            (
              { employer, title, startDate, endDate, jobType, description, linkedSkills },
              i,
            ) => (
              <li key={`experience-${i}`}>
                <div className="h3 ml-8">{employer}</div>
                <div className="flex mt-3">
                  <ProfileGrid
                    name="experiences"
                    gridStyleLeft={{ paddingLeft: '28px' }}
                    gridStyleRight={{ maxWidth: '50%' }}
                    left={[
                      {
                        title: t('experience.form-jobTitle-label'),
                        text: title,
                        textStyle: { fontWeight: 800 },
                        name: 'jobTitle',
                      },
                      {
                        title: t('experience.form-period-label'),
                        text: `${fromISOtoDateStatic(startDate)} — ${
                          endDate ? fromISOtoDateStatic(endDate) : "present"
                        }`,
                        textStyle: { fontWeight: 800 },
                        name: 'startDate',
                      },
                      {
                        title: t('experience.form-jobType-label'),
                        text: jobType.name,
                        textStyle: { fontWeight: 800 },
                        name: 'position',
                      },
                    ]}
                    right={[
                      {
                        title: t('experience.form-description-label'),
                        text: description,
                        name: 'description',
                      },
                    ]}
                  />
                </div>
                {(linkedSkills || []).length > 0 && (
                  <div className="ml-8 mt-3 flex flex-wrap gap-2">
                    {(linkedSkills || []).map((skill: any) => (
                      <span
                        key={skill.id}
                        className="rounded-full bg-light px-3 py-1 text-sm text-dark-softer"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ),
          )}
        </ol>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
