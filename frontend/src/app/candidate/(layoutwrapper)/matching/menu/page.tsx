"use client"
import Head from 'next/head'
import React from 'react'
import MatchingMenu from '../_components/MatchingMenu'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const t = useTranslations('candidate');
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    return (
        <main className="flex flex-grow">
            <Head>
                <title>{t('matching.title')}</title>
            </Head>
            <MatchingMenu
                type="company"
                active={type ? type.toString() : 'overview'}
            />
        </main>
    )
}

export default page