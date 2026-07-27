'use client';

import React, { FC } from 'react';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import ProfileGrid from './ProfileGrid';
import { useGetCandidateLanguageQuery } from '@/hooks/student/profilemgmt/useGetCandidateLanguageQuery';
import useMobileDetect from '@/utils/useMobileDetect';

export const LanguagesCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ readonly }) => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const { data } = useGetCandidateLanguageQuery();
  const languages = data?.data || [];

  return (
    <OverviewCard href="/candidate/profile/languages">
      <OverviewCard.Title>{t('candidate.languages.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('candidate.languages.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8 space-y-6">
        {languages.length > 0 ? (
          languages.map((lang, i) => {
            const languageName = lang?.language?.name || 'N/A';
            const level = lang?.languageLevel?.name || 'N/A';
            const qualification = lang?.qualification?.trim() || '';

            const left = [
              {
                title: 'Language',
                text: languageName,
                titleStyle: { fontWeight: 800 },
              },
              {
                title: 'Level',
                text: level,
                titleStyle: { fontWeight: 800 },
              },
            ];

            const right = [
              {
                title: 'Qualification',
                text: qualification,
                titleStyle: { fontWeight: 800 },
                name: 'qualification',
              },
            ];

            return (
              <div key={i} className="p-4">
                <ProfileGrid
                  name="languages"
                  gridStyleLeft={{ gridTemplateColumns: '178px 200px' }}
                  gridStyleRight={{ maxWidth: '50%' }}
                  left={left}
                  right={!isMobile ? right : []}
                 
                />
                {isMobile && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700">Qualification</p>
                    <p className="text-sm text-gray-900">{qualification}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No languages added yet</p>
        )}
      </OverviewCard.Body>
    </OverviewCard>
  );
};
