import React from 'react';
import CandidateList from './CandidateList';
import { useTranslations } from 'next-intl';
import { useGetCompanyDeclinedRequestquery } from '@/hooks/company/matching/useGetCompanyDeclinedRequestquery';

const DeclinedRequests: React.FC = () => {
  const t = useTranslations('candidate');
  
const {data, isLoading} = useGetCompanyDeclinedRequestquery();

  return (
    <div className="w-full h-full pb-12">
      <h1 className="mb-5">{t('matching.declined-title')}</h1>
      {data?.data ? <CandidateList data={data.data} loading={isLoading} /> : null}
    </div>
  );
};

export default DeclinedRequests;
