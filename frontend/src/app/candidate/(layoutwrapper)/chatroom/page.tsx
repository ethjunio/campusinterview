import Head from 'next/head'
import React from 'react'
import ChatroomMenu from './_components/ChatroomMenu'
import Messenger from './_components/Messenger'

const page = () => {
  return (
    <main className="flex flex-grow">
      <Head>
        <title>Chatroom</title> 
      </Head>
      <div className="hidden lg:block">
        <ChatroomMenu type="company" />
      </div>
      <Messenger />
    </main>
  )
}

export default page