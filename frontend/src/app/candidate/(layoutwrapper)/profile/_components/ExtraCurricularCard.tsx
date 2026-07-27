"use client"
import React, { FC } from 'react';
import orderBy from 'lodash/fp/orderBy';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import styles from './Card.module.scss';
import ProfileGrid from './ProfileGrid';
import { useGetCandidateExtracurricularsQuery } from '@/hooks/student/profilemgmt/useGetCandidateExtracurricularsQuery';
import { fromISOtoDate, fromISOtoDateStatic } from '@/utils/date';

export const ExtracurricularsCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ candidateId, readonly = false }) => {
  const t = useTranslations('candidate');

  //   const extras = orderBy('startDate', 'desc', data?.extras || []);

  const { data, isLoading } = useGetCandidateExtracurricularsQuery();

  return (
    <OverviewCard href="/candidate/profile/extracurriculars">
      <OverviewCard.Title>{t('extracurriculars.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('extracurriculars.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <ol className={styles['connected-list']}>
          {data?.data?.map(
            ({ id, title, startDate, endDate, activity, description }) => (
              <li key={id}>
                <div className="h3 ml-8">{title}</div>
                <div className="flex mt-3">
                  <ProfileGrid
                    name='extracurriculars'
                    gridStyleLeft={{ paddingLeft: '28px' }}
                    gridStyleRight={{ maxWidth: '50%' }}
                    left={[
                      {
                        title: t('extracurriculars.form-activity-label'),
                        text: activity,
                        textStyle: { fontWeight: 800 },
                      },
                      {
                        title: t('extracurriculars.form-period-label'),
                        text: `${fromISOtoDateStatic(startDate)} — ${
                          endDate ? fromISOtoDateStatic(endDate) : "present"
                        }`,
                        textStyle: { fontWeight: 800 },
                      },
                    ]}
                    right={[
                      {
                        title: t('extracurriculars.form-description-label'),
                        text: description?.trim() ? description : '',
                        name: 'description',
                      },
                    ]}
                  />
                </div>
              </li>
            ),
          )}
        </ol>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
