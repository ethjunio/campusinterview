import React, { Suspense } from 'react'
import { useTranslations } from 'next-intl';
import { BackLink } from '@/components/atoms/BackLink';
import { PreeventCreate as PreeventCreateFeature } from './_components/PreeventsFormPage';

const page = () => {

    const t = useTranslations()

    return (
        <div className="p-8 max-w-screen-lg">
            <BackLink className="mb-12" href="/admin/dashboard/preevents">
                {t('admin.back-to-preevents')}
            </BackLink>
           
            <PreeventCreateFeature />
           
        </div>
    )
}

export default page