import { BackLink } from '@/components/atoms/BackLink'
import React from 'react'
import { useTranslations } from 'next-intl'
import { PreeventCreate } from '@/app/admin/dashboard/preevents/preevents-form/_components/PreeventsFormPage'

const page = () => {
    const t = useTranslations()
  return (
       <div className="p-8 max-w-screen-lg">
                <BackLink className="mb-12" href="/company/pre-event">
                    {t('admin.back-to-preevents')}
                </BackLink>
               
                <PreeventCreate type='company' />
               
            </div>
  )
}

export default page