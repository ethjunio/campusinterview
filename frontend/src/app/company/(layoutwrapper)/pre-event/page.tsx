import { BackLink } from '@/components/atoms/BackLink'
import { useTranslations } from 'next-intl';
import Head from 'next/head'
import React from 'react'
import { PreeventCompanyDetailFeature } from './_components/PreeventCompanyDetailFeature';
import { PreeventCompanyList } from './_components/PreeventCompanyList';

const page = () => {
    const t = useTranslations();
  return (
    <main className="relative flex flex-col flex-grow bg-white">
    <Head>
      <title>{t('companies.pre-event.head')}</title>
    </Head>
    <BackLink
      className="absolute top-0 left-0 mt-4 ml-4 lg:ml-8"
      href="/company/overview">
      {t('companies.pre-event.back-to-dashboard-button-text')}
    </BackLink>
    <PreeventCompanyList />
  </main>
  )
}

export default page