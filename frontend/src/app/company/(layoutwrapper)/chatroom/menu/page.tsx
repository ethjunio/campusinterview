import Head from 'next/head'
import React from 'react'
import ChatroomMenu from '../_components/ChatroomMenu'

const page = () => {
  return (
    <main className="flex flex-grow">
    <Head>
      <title>Chatroom Menu</title>
    </Head>
    <ChatroomMenu type="company" className="w-full" />
  </main>
  )
}

export default page