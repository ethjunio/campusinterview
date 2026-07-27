"use client"
import React, { FC } from 'react';
// import gql from 'graphql-tag';

import { OverviewCard } from '@/components/molecules/OverviewCard';
import { useTranslations } from 'next-intl';
// import { useQuery } from '@apollo/react-hooks';
// import {
//   MiscsCardData,
//   MiscsCardDataVariables,
// } from './__generated__/MiscsCardData';
// import useMobileDetect from 'utils/useMobileDetect';
import ProfileGrid from './ProfileGrid';
import { useGetThingsAboutMeQuery } from '@/hooks/student/profilemgmt/useGetThingsAboutMeQuery';

// const MiscsCardQuery = gql`
//   query MiscsCardData($input: GetCandidateMiscInput!) {
//     miscs: getCandidateMiscs(input: $input) {
//       id
//       topic
//       description
//     }
//   }
// `;

export const MiscsCard: FC<{
  readonly?: boolean;
  candidateId?: string;
}> = ({ readonly, candidateId }) => {
  const t = useTranslations("candidate");
  //   const input = candidateId ? { candidateId } : {};
  //   const { data } = useQuery<MiscsCardData, MiscsCardDataVariables>(
  //     MiscsCardQuery,
  //     { variables: { input } },
  //   );
  //   const { currentDevice } = useMobileDetect();
  const isMobile = false;

  const { data, isLoading } = useGetThingsAboutMeQuery()

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
              data?.data?.map(({ topic }, i) => ({
                title: 'Topic',
                text: topic,
                titleStyle: { fontWeight: 700 },
                textStyle: {
                  whiteSpace: 'pre-wrap',
                  marginBottom: i < data.data.length - 1 ? 24 : 0,
                },
                outerStyle: {
                  marginBottom: i < data.data.length - 1 ? 24 : 0,
                },
              })) ?? []
            }
            right={
              data?.data?.map(({ description }, i) => ({
                title: 'Description',
                text: description,
                titleStyle: { fontWeight: 700 },
                textStyle: {
                  whiteSpace: 'pre-wrap',
                  marginBottom: i < data.data.length - 1 ? 24 : 0,
                },
                outerStyle: {
                  marginBottom: i < data.data.length - 1 ? 24 : 0,
                },
              })) ?? []
            }
          />
        </div>
      </OverviewCard.Body>
    </OverviewCard>
  );
};
