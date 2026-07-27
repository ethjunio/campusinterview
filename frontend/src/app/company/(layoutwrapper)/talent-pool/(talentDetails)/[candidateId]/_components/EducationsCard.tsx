"use client"
import React, { FC } from 'react';
import orderBy from 'lodash/fp/orderBy';
import c from 'classnames';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import styles from '@/app/candidate/(layoutwrapper)/profile/_components/Card.module.scss';
import { useTranslations } from 'next-intl';
import { fromISOtoDate, fromISOtoDateStatic } from '@/utils/date';
import ProfileGrid from '@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid';


export const EducationsCard: FC<{
    data: any;
  readonly?: boolean;
  candidateId?: string;
}> = ({ data, candidateId, readonly = false }) => {
  const t = useTranslations('candidate');
 
  const education = orderBy('startDate', 'desc', data?.data?.education || []);

  return (
    <OverviewCard href="/candidate/profile/educations">
      <OverviewCard.Title>{t('education.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('education.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <ol className={styles['connected-list']}>
          {education.map(
            (
              {
                university,
                otherUniversity,
                educationLevel,
                major,
                otherMajor,
                specialization,
                otherSpecialization,
                startDate,
                endDate,
                averageGrade,
                theses,
              },
              i,
            ) => {
              const orderedTheses = orderBy('startDate', 'desc', theses);
              const leftSide = [
                {
                  title: t('education.form-educationLevel-label'),
                  text: educationLevel?.name || "N/A",
                  textStyle: { fontWeight: 800 },
                  name: 'educationLevel',
                },
                {
                  title: t('education.form-major-label'),
                  text: major?.name === 'Other' ? otherMajor : major?.name,
                  textStyle: { fontWeight: 800 },
                  name: 'major',
                },
                {
                  title: t('education.form-specialization-label'),
                  text:
                    specialization?.name === 'Other'
                      ? otherSpecialization
                      : specialization?.name || "N/A",
                  textStyle: { fontWeight: 800 },
                  name: 'specialization',
                },

                {
                  title: t('education.form-period-label'),
                  text: `${fromISOtoDateStatic(startDate)} – 
                  ${endDate ? fromISOtoDateStatic(endDate) : t('today')}`,
                  textStyle: { fontWeight: 800 },
                  name: 'startDate',
                },
              ];
              if (averageGrade) {
                leftSide.push({
                  title: t('education.form-averageGrade-label'),
                  text: averageGrade.toString() || "N/A",
                  textStyle: { fontWeight: 800 },
                  name: 'averageGrade',
                });
              }
              type ThesisType = {
                title: string;
                text: string;
                name: string;
                textStyle: any;
              };
              const rightSide =
                theses?.length === 0
                  ? [
                      {
                        title: t('education.thesis.title'),
                        name: 'thesis',
                        text:"N/A",
                      },
                    ]
                  : Object.values(
                      orderedTheses.map((thesis, i) => {
                        const thesisObj: [ThesisType] = [
                          {
                            title: t('education.thesis.title'),
                            text: thesis.title || "N/A",
                            name: 'thesis',
                            textStyle: { fontWeight: 800 },
                          },
                        ];
                        if (thesis.grade) {
                          thesisObj.push({
                            title: t('education.thesis.form-grade-label'),
                            text: thesis.grade.toString() || "N/A",
                            name: 'grade',
                            textStyle: null,
                          });
                        }
                        thesisObj.push({
                          title: t('education.thesis.form-description-label'),
                          text: thesis.description || "N/A",
                          name: 'description',
                          textStyle: {
                            marginBottom: i < orderedTheses.length - 1 ? 40 : 0,
                          },
                        });
                        return thesisObj;
                      }),
                    ).flat();
              return (
                <li key={`study-${i}`}>
                  <div className="h3 ml-8">
                    {university?.name === 'Other'
                      ? otherUniversity
                      : university?.name || "N/A"}
                  </div>
                  <div className={c('flex mt-3')}>
                    <ProfileGrid
                      name="educations"
                      gridStyleLeft={{ paddingLeft: '28px' }}
                      gridStyleRight={{ maxWidth: '50%' }}
                      left={leftSide}
                      right={rightSide}
                    />
                  </div>
                </li>
              );
            },
          )}
        </ol>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
