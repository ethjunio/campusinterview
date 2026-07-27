import Head from 'next/head'
import React from 'react'
import { useTranslations } from 'next-intl'
import { ListViewFeature } from './_components/ListViewFeature'

const page = () => {

    const t = useTranslations()

  return (
    <main className="flex flex-grow">
    <Head>
      <title>{t('candidate.companies.head')}</title>
    </Head>
    <ListViewFeature />
  </main>
  )
}

export default page