import React from 'react';
import CandidateList from './CandidateList';
import { useTranslations } from 'next-intl';
import { useGetCompanyArrangedInterviewQuery } from '@/hooks/company/matching/useGetCompanyArrangedInterviewQuery';

const ArrangedInterviews: React.FC = () => {
  const t = useTranslations('candidate');
  
  const {data, isLoading} = useGetCompanyArrangedInterviewQuery();
  
  return (
    <div className="w-full h-full pb-12">
      <h1 className="mb-5">{t('matching.arranged-title')}</h1>
      {data?.data ? <CandidateList data={data.data} loading={isLoading} /> : null}
    </div>
  );
};

export default ArrangedInterviews;
