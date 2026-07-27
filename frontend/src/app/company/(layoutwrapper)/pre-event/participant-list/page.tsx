import { BackLink } from '@/components/atoms/BackLink'
import { useTranslations } from 'next-intl'
import Head from 'next/head'
import React from 'react'
import { ParticipantListFeature } from '../_components/ParticipantListFeature'

const page = () => {
    const t = useTranslations()
  return (
    <main className="relative flex flex-col flex-grow bg-white">
    <Head>
      <title>{t('companies.pre-event.participant-list.head')}</title>
    </Head>
    <BackLink
      className="absolute top-0 left-0 mt-4 ml-4 lg:ml-8"
      href="/company/pre-event">
      {t('companies.pre-event.participant-list.back-to-preevent-button-text')}
    </BackLink>
    <ParticipantListFeature />
  </main>
  )
}

export default page