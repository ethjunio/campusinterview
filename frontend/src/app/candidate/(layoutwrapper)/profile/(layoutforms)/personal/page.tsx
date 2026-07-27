import React from 'react'
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { Button } from '@/components/atoms/Button';
import { PersonalForm } from '@/app/candidate/onboarding/personal/_components/personalForm';

const page = () => {
    return (
        <main className="w-full">
            <Head>
                <title>Looking for</title>
            </Head>
            {/* <h1>Looking for Title</h1> */}
            <PersonalForm button='save'/>
        </main>
    )
}

export default page





