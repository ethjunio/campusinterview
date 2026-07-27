"use client"
import React, { FC } from 'react';
import orderBy from 'lodash/fp/orderBy';
import c from 'classnames';

import { useTranslations } from 'next-intl';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import styles from './Card.module.scss';
import ProfileGrid from './ProfileGrid';
import { useGetEducationListQuery } from '@/hooks/student/profilemgmt/useGetEducationListQuery';
import { fromISOtoDate, fromISOtoDateStatic } from '@/utils/date';

export const EducationsCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ candidateId, readonly = false }) => {
  const t = useTranslations("candidate");

  const { data } = useGetEducationListQuery();
//   // const education = orderBy('startDate', 'desc', data?.education || []);

  return (
    <OverviewCard href="/candidate/profile/educations">
      <OverviewCard.Title>{t('education.title')}</OverviewCard.Title>
      <OverviewCard.Action>{t('education.edit')}</OverviewCard.Action>
      {!readonly && (
        <OverviewCard.Action>{t('education.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <ol className={styles['connected-list']}>
          {data?.data?.map(
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
              }: {
                university: { name: string } | null;
                otherUniversity: string;
                educationLevel: { name: string } | null;
                major: { name: string } | null;
                otherMajor: string;
                specialization: { name: string } | null;
                otherSpecialization: string;
                startDate: string;
                endDate: string | null;
                averageGrade: number | null;
                theses: { title: string; grade?: number; description: string; startDate: string }[];
              },
              i: number,
            ) => {
              const orderedTheses = orderBy('startDate', 'desc', theses);
              const leftSide = [
                {
                  title: t('education.form-educationLevel-label'),
                  text: educationLevel?.name,
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
                      : specialization?.name,
                  textStyle: { fontWeight: 800 },
                  name: 'specialization',
                },

                {
                  title: t('education.form-period-label'),
                  text: `${fromISOtoDateStatic(startDate)} – 
                  ${endDate ? fromISOtoDateStatic(endDate) : "present"}`,
                  textStyle: { fontWeight: 800 },
                  name: 'startDate',
                },
              ];
              if (averageGrade) {
                leftSide.push({
                  title: t('education.form-averageGrade-label'),
                  text: averageGrade.toString(),
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
                      },
                    ]
                  : Object.values(
                      orderedTheses.map((thesis, i) => {
                        const thesisObj: [ThesisType] = [
                          {
                            title: t('education.thesis.title'),
                            text: thesis.title,
                            name: 'thesis',
                            textStyle: { fontWeight: 800 },
                          },
                        ];
                        if (thesis.grade) {
                          thesisObj.push({
                            title: t('education.thesis.form-grade-label'),
                            text: thesis.grade.toString(),
                            name: 'grade',
                            textStyle: null,
                          });
                        }
                        thesisObj.push({
                          title: t('education.thesis.form-description-label'),
                          text: thesis.description,
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
                      : university?.name}
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
