"use client"

import React from 'react'
import { useGetLandingPageDataQuery } from '@/hooks/visitors/useGetLandingPageDataQuery';
import OnlineDashboardCampusInterview from './_components/OnlineCampusDashboard/DashboardOverview';
import DashboardCampusInterview from './_components/DashboardCampusInterview/DashboardOverview';
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const page = () => {
  const { data: CampusInterviewService } = useGetLandingPageDataQuery();
  return (
    <>
    {isOnlineCampusInterview(CampusInterviewService?.data?.siteUiFlag) ? (
      <OnlineDashboardCampusInterview />
    ) : (
      <DashboardCampusInterview />
    )}
  </>
  )
}

export default page