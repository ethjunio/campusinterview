import Head from 'next/head'
import React from 'react'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

const page = () => {

    const t = useTranslations('companies');

  return (
    <main className="relative mx-auto justify-center flex-grow bg-light-soft px-8 lg:px-24 mr-8 lg:mr-96 lg:pb-24 pt-4">
    <Head>
      <title>{t('bookings.completed-head')}</title>
    </Head>
    <div className="mt-8 lg:mt-24 max-w-xl">
      <h1>{t('bookings.completed-heading')}</h1>
      <p className="lead-text mt-10">{t('bookings.completed-lead-1')}</p>
      <p className="lead-text mt-4">{t('bookings.completed-lead-2')}</p>
    </div>

    <Link href="/company/profile">
      <Button tw="mt-16">{t('bookings.completed-button')}</Button>
    </Link>
  </main>
  )
}

export default page