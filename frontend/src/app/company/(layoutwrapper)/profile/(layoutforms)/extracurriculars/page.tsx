import Head from 'next/head'
import React from 'react'
import ExtracurricularsFeature from './_components/ExtracurricularsFeature'

const page = () => {
  return (
    <main className="w-full">
    <Head>
      <title>Extracurriculars</title>
    </Head>
    <ExtracurricularsFeature />
  </main>
  )
}

export default page