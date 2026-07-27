import React from 'react';
import CompanyList from './CompanyList';
import { useTranslations } from 'next-intl';
import { useGetDeclinedRequestsQuery } from '@/hooks/student/matching/useGetDeclinedRequestsQuery';

const DeclinedRequests: React.FC = ({}) => {
  const t = useTranslations('candidate');

const { data, isLoading: loading } = useGetDeclinedRequestsQuery();


  return (
    <div className="w-full overflow-hidden h-full pb-12">
      <h1 className="mb-5">{t('matching.declined-title')}</h1>
      {data?.data ? <CompanyList data={data.data} loading={loading} /> : null}
    </div>
  );
};

export default DeclinedRequests;
