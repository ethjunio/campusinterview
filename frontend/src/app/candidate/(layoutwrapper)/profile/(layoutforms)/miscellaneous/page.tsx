import Head from 'next/head'
import React from 'react'
import MiscellaneousFeature from './_components/MiscellaneousFeature'

const page = () => {
  return (
    <main className="w-full">
    <Head>
      <title>Things about me</title>
    </Head>
    <MiscellaneousFeature />
  </main>
  )
}

export default page