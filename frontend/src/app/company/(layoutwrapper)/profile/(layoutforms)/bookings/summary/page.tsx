"use client"

import { BackLink } from '@/components/atoms/BackLink'
import Head from 'next/head'
import React from 'react'
import { useTranslations } from 'next-intl'
import { BookingSummary } from './_components/BookingSummary'
import { useGetLandingPageDataQuery } from '@/hooks/visitors/useGetLandingPageDataQuery'
import { OnlineBookingSummary } from './_components/onlineCampus/BookingSummary'
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const page = (skipServices=false) => {
    const t = useTranslations();
    const backHref = skipServices
    ? '/company/profile/bookings/additional-services'
    : '/company/profile/bookings/additional-services';

    const { data: CampusInterviewService } = useGetLandingPageDataQuery();

    // '/company/profile/bookings/rooms'
  return (
    <main className="relative flex-grow bg-light-soft px-8 lg:px-12 lg:pb-24 pt-4">
    <Head>
      <title>{t('companies.bookings.summary-head')}</title>
    </Head>
    <BackLink href={backHref} className="mt-4">
      {t('common.back')}
    </BackLink>

    <div className="mt-4 max-w-xl">
      <h1>{t('companies.bookings.summary-heading')}</h1>
      <p className="lead-text mt-2">{t('companies.bookings.summary-lead')}</p>
    </div>
    {isOnlineCampusInterview(CampusInterviewService?.data?.siteUiFlag) ? (
    <OnlineBookingSummary />
    ) : (
    <BookingSummary />
    )}
  </main>
  )
}

export default page