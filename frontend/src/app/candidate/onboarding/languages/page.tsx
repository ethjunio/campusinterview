import React from 'react'
import LanguagesFeature from './LanguagesFeature'
import Head from 'next/head'

const page = () => {
  return (
    <main className="w-full">
    <Head>
      <title>Languages</title>
    </Head>
    <LanguagesFeature routePath={"/candidate/onboarding/lookingfor"} />
    </main>
  )
}

export default page