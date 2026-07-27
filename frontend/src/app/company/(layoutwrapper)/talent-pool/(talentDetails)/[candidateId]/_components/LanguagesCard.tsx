import React, { FC } from 'react';

import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import useMobileDetect from '@/utils/useMobileDetect';
import ProfileGrid from '@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid';

export const LanguagesCard: FC<{
  data: any;
  readonly?: boolean;
  candidateId?: string;
}> = ({ data, readonly, candidateId }) => {
  const t = useTranslations('candidate');
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const languages = data?.data?.languages || [];

  return (
    <OverviewCard href="/candidate/profile/languages">
      <OverviewCard.Title>{t('languages.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('languages.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8 space-y-6">
        {languages.length > 0 ? (
          languages.map((lang: any, i: number) => {
            const languageName = lang?.language?.name || 'N/A';
            const languageLevel = lang?.languageLevel?.name || 'N/A';
            const qualification = lang?.qualification?.trim() || 'N/A';

            const leftData = [
              {
                title: 'Language',
                text: languageName,
                titleStyle: { fontWeight: 800 },
              },
              {
                title: 'Level',
                text: languageLevel,
                titleStyle: { fontWeight: 800 },
              },
            ];

            const rightData = [
              {
                title: 'Qualification',
                text: qualification,
                titleStyle: { fontWeight: 800 },
              },
            ];

            return (
              <div key={i} className="p-4">
                <ProfileGrid
                  gridStyleLeft={{ gridTemplateColumns: '178px 200px' }}
                  gridStyleRight={{ maxWidth: '50%' }}
                  left={leftData}
                  right={!isMobile ? rightData : []}
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
          <p className="text-sm text-gray-500">No languages available</p>
        )}
      </OverviewCard.Body>
    </OverviewCard>
  );
};
