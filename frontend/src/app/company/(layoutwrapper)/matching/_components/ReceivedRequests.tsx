import React from 'react';
import CandidateList from './CandidateList';
import { useTranslations } from 'next-intl';
import { useGetCompanyReceivedRequestQuery } from '@/hooks/company/matching/useGetCompanyReceivedRequestQuery';

const ReceivedRequests: React.FC = () => {
  const t = useTranslations('companies');

 const {data, isLoading} = useGetCompanyReceivedRequestQuery();

  return (
    <div className="w-full h-full pb-12">
      <h1>{t('matching.received-title')}</h1>
      {data?.data ? <CandidateList key={data.data[0]?.id} data={data.data} loading={isLoading} /> : null}
    </div>
  );
};

export default ReceivedRequests;
