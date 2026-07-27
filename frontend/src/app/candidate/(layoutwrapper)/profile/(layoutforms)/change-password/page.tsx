import Head from 'next/head'
import React from 'react'
import { ChangePasswordFeature } from './_components/ChangePasswordFeature'

const page = () => {
  return (
    <main className="w-full">
    <Head>
      <title>Change password</title>
    </Head>
    <ChangePasswordFeature />
  </main>
  )
}

export default page