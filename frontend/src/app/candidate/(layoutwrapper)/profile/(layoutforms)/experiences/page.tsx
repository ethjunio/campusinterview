import Head from 'next/head'
import React from 'react'
import { ExperiencesFeature } from './_components/ExperiencesFeature'

const page = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Experiences</title>
      </Head>
      <ExperiencesFeature />
    </main>
  )
}

export default page