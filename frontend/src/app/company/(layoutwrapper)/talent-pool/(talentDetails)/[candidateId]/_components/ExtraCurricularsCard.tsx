import React, { FC } from 'react';
import orderBy from 'lodash/fp/orderBy';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import styles from '@/app/candidate/(layoutwrapper)/profile/_components/Card.module.scss'
import { fromISOtoDate, fromISOtoDateStatic } from '@/utils/date';
import ProfileGrid from '@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid';


export const ExtracurricularsCard: FC<{
  data: any,
  readonly?: boolean;
  candidateId?: string;
}> = ({ data, candidateId, readonly = false }) => {
  const t = useTranslations('candidate');
  const input = candidateId ? { candidateId } : {};

  const extras = orderBy('startDate', 'desc', data?.data?.extracurriculars || []);

  return (
    <OverviewCard href="/candidate/profile/extracurriculars">
      <OverviewCard.Title>{t('extracurriculars.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('extracurriculars.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <ol className={styles['connected-list']}>
          {extras.map(
            ({ id, title, startDate, endDate, activity, description }) => (
              <li key={id}>
                <div className="h3 ml-8">{title}</div>
                <div className="flex mt-3">
                  <ProfileGrid
                    gridStyleLeft={{ paddingLeft: '28px' }}
                    gridStyleRight={{ maxWidth: '50%' }}
                    left={[
                      {
                        title: t('extracurriculars.form-activity-label'),
                        text: activity || "N/A",
                        // textStyle: { fontWeight: 800 },

                        titleStyle: { fontWeight: 800 },
                      },
                      {
                        title: t('extracurriculars.form-period-label'),
                        text: `${fromISOtoDateStatic(startDate)} — ${endDate ? fromISOtoDateStatic(endDate) : t('today')
                          }`,
                        // textStyle: { fontWeight: 800 },

                        titleStyle: { fontWeight: 800 },
                      },
                    ]}
                    right={[
                      {
                        title: t('extracurriculars.form-description-label'),
                        text: description || "N/A",

                        titleStyle: { fontWeight: 800 },
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
