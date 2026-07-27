import React from 'react'
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { LookingForForm } from '@/app/candidate/onboarding/lookingfor/_components/LookingForForm';

const page = () => {
    return (
        <main className="w-full">
            <Head>
                <title>Looking for</title>
            </Head>
            <LookingForForm button ='save'/>
        </main>
    )
}

export default page





