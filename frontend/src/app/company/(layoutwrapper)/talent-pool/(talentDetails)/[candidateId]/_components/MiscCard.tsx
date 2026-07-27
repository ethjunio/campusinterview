import React, { FC } from 'react';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
import useMobileDetect from '@/utils/useMobileDetect';
import ProfileGrid from '@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid';

export const MiscsCard: FC<{
  data: any;
  readonly?: boolean;
  candidateId?: string;
}> = ({ data, readonly, candidateId }) => {
  const t = useTranslations('candidate');
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const miscs = data?.data?.miscs ?? [];

  return (
    <OverviewCard href="/candidate/profile/miscellaneous">
      <OverviewCard.Title>{t('miscs.title')}</OverviewCard.Title>
      {!readonly && (
        <OverviewCard.Action>{t('miscs.edit')}</OverviewCard.Action>
      )}

      <OverviewCard.Body readonly={readonly} className="mt-8">
        <div>
          <ProfileGrid
            gridStyleLeft={{
              minWidth: isMobile ? '100%' : '293px',
              maxWidth: isMobile ? '100%' : '70%',
              gridTemplateColumns: '1fr',
            }}
            gridStyleRight={{
              minWidth: isMobile ? '100%' : '293px',
              maxWidth: isMobile ? '100%' : '70%',
              gridTemplateColumns: '1fr',
            }}
            left={
              miscs.map(({ topic }: any, i: number) => ({
                title: 'Topic',
                text: topic,
                titleStyle: { fontWeight: 700 },
                textStyle: {
                  whiteSpace: 'pre-wrap',
                  marginBottom: i < miscs.length - 1 ? 24 : 0,
                },
                outerStyle: {
                  marginBottom: i < miscs.length - 1 ? 24 : 0,
                },
              }))
            }
            right={
              miscs.map(({ description }: any, i: number) => ({
                title: 'Description',
                text: description,
                titleStyle: { fontWeight: 700 },
                textStyle: {
                  whiteSpace: 'pre-wrap',
                  marginBottom: i < miscs.length - 1 ? 24 : 0,
                },
                outerStyle: {
                  marginBottom: i < miscs.length - 1 ? 24 : 0,
                },
              }))
            }
          />
        </div>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
