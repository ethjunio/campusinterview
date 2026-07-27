"use client";
import Head from 'next/head';
import React from 'react'
import { useTranslations } from 'next-intl';
import { useGetAllVisitsQuery } from '@/hooks/student/overviewMgmt/useGetAllVisitsQuery';
import { showDate } from '@/utils/date';
import CompanyListItem from '../../matching/_components/CompanyListItem';

const VisitorsFeature = () => {
    const t = useTranslations('candidate');
    const { data: allVisitsData, isLoading: allVisitsDataLoading } = useGetAllVisitsQuery();
  return (
    <main className="flex flex-grow h-screen">
    <Head>
      <title>{t('visits.head-title')}</title>
    </Head>
    <div
      style={{ maxHeight: 'calc(100vh - 3.5rem)' }}
      className="bg-light-soft flex-1">
      <div className="p-4 lg:p-8 w-3/4 h-full">
        <div className="mb-4 h-full">
          <h1 className="mb-5">{t('visits.title')}</h1>
          <div className="bg-white p-6">
            <h3>
              {t('visits.new-visits', {
                visitsNumber: allVisitsData?.data?.totalCount,
              })}
            </h3>
            {allVisitsData?.data ? (
              <ul className="space-y-3 mt-4 overflow-y-scroll">
                {allVisitsData?.data?.visitorData?.map(({ company, id, createdAt } : any) => {
                  const date = showDate(createdAt);
                  return (
                    <CompanyListItem
                      key={`company-list-item-${id}`}
                      company={company}
                      id={id}
                      loading={allVisitsDataLoading}
                      showMail={false}
                      textBelowName={
                        date
                          ? t('visits.viewed-ago', { date })
                          : t('visits.now')
                      }
                      text={
                        <div>
                          {company?.industries?.length > 0 &&
                          company?.industries[0]
                            ? company?.industries[0].name
                            : ''}{' '}
                          {company?.industries?.length > 1 &&
                          company?.industries[1]
                            ? '& ' + company?.industries[1].name
                            : ''}
                        </div>
                      }
                      linkToProfileInActions
                    />
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default VisitorsFeature