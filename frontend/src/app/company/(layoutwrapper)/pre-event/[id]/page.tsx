"use client"
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { PreeventCompanyDetailFeature } from '../_components/PreeventCompanyDetailFeature'
import { BackButton, BackLink } from '@/components/atoms/BackLink'
import { useTranslations } from 'next-intl'
import Head from 'next/head'

const page = () => {
  const params = useParams()
  const router = useRouter()
  const t = useTranslations();
  const { id } = params as { id: string }

  return (
    <main className="relative flex flex-col flex-grow bg-white">
      <Head>
        <title>{t('companies.pre-event.head')}</title>
      </Head>
  
      <PreeventCompanyDetailFeature id={id} />
    </main>
  )
}

export default page