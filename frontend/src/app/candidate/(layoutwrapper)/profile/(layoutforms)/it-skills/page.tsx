import Head from 'next/head'
import React from 'react'
import ItSkillsFeature from './_components/ItSkillsFeature'

const page = () => {
  return (
    <main className="w-full">
    <Head>
      <title>Languages</title>
    </Head>
    <ItSkillsFeature />
    </main>
  )
}

export default page