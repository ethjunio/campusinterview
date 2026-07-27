"use client"

import React from 'react'
import AdditionalServices from './_components/AdditionalServices'
import { useGetLandingPageDataQuery } from '@/hooks/visitors/useGetLandingPageDataQuery';
import OnlineAdditionalServices from './_components/onlineCampus/AdditionalServices';
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const page = () => {
  const { data: CampusInterviewService } = useGetLandingPageDataQuery();
  return (
    <>
    {isOnlineCampusInterview(CampusInterviewService?.data?.siteUiFlag) ? (
    <OnlineAdditionalServices bookings={[]} />
    ) : (
    <AdditionalServices bookings={[]} />
    )}
    </>
  )
}

export default page