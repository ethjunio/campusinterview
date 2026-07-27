"use client"
import { BackButton } from '@/components/atoms/BackLink'
import { useGetCompanyDetailsById } from '@/hooks/student/companymgmt/useGetCompanyDetailsById'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'next-intl'
import { FactsCard } from '@/app/candidate/(layoutwrapper)/companies/(companyDetails)/[companyId]/_components/FactsCard'
import { JoinUsCard } from '@/app/candidate/(layoutwrapper)/companies/(companyDetails)/[companyId]/_components/JoinUsCard'
import { PositionsCard } from '@/app/candidate/(layoutwrapper)/companies/(companyDetails)/[companyId]/_components/PositionsCard'
import { GeneralCard } from './_components/GeneralCard'

const page = () => {
  const params = useParams()
  const router = useRouter()
  const { companyId } = params

  const t = useTranslations()
  const { data } = useGetCompanyDetailsById(companyId)

  return (
    <main className="bg-light-soft flex-grow relative">
      <div
        className="absolute z-0 bg-cover sm:h-48 h-32 bg-center top-0 left-0 right-0 "
        style={{ backgroundImage: 'url(/img/head_image_1.png)' }}>
        <BackButton
          className="text-white absolute top-0 px-4 lg:px-10 mt-4"
          onClick={() => router.back()}
        >
          {t('common.back')}
        </BackButton>
      </div>
      <div>
        <GeneralCard data={data} />
        <FactsCard data={data} />
        <PositionsCard data={data} />
        <JoinUsCard data={data} />

      </div>

    </main>
  )
}

export default page
