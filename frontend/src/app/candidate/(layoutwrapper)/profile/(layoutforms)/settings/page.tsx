import Head from 'next/head'
import React from 'react'
import { SettingsFeature } from './_components/SettingsFeature'

const page = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Settings</title>
      </Head>
      <SettingsFeature />
    </main>
  )
}

export default page