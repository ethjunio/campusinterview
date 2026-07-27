import Head from 'next/head'
import React from 'react'
import InterviewsSlots from './_components/InterviewsSlots'

const page = () => {
  return (
    <main className="flex flex-grow">
    <Head>
      <title>Interviews</title>
    </Head>
    <div className="bg-light-soft flex-1">
      <div className="w-full h-full">
        <InterviewsSlots />
      </div>
    </div>
  </main>
  )
}

export default page