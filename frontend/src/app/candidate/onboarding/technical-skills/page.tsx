import Head from 'next/head'
import React from 'react'
import ItSkillsFeature from './_components/ItSkillsFeature'

const page = () => {
  return (
    <main className="w-full">
    <Head>
      <title>Technical Skills</title>
    </Head>
    <ItSkillsFeature  routePath={"/candidate/onboarding/languages"}/>
    </main>
  )
}

export default page