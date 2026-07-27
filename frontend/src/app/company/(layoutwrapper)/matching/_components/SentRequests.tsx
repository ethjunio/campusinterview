import React from 'react';
import CandidateList from './CandidateList';
import { useTranslations } from 'next-intl';
import { useGetCompanySentRequestQuery } from '@/hooks/company/matching/useGetCompanySentRequestQuery';
const SentRequests: React.FC = () => {
  const t = useTranslations('candidate');

  const { data, isLoading } = useGetCompanySentRequestQuery();

  return (
    <div className="w-full h-full pb-12">
      <h1 className="mb-5">{t('matching.sent-title')}</h1>
      {data?.data ? <CandidateList data={data.data} loading={isLoading} /> : null}
    </div>
  );
};

export default SentRequests;
