"use client";

import React from 'react'
import { Rooms } from './_components/Rooms'
import { useGetLandingPageDataQuery } from '@/hooks/visitors/useGetLandingPageDataQuery';
import { OnlineRooms } from './_components/OnlineCamousInterview/Rooms';
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const page = () => {
  const { data: CampusInterviewService } = useGetLandingPageDataQuery();
  return (
    <>
    {isOnlineCampusInterview(CampusInterviewService?.data?.siteUiFlag) ? (
      <OnlineRooms bookings={[]} skipServices={false} />
    ) : (
      <Rooms bookings={[]} skipServices={false} />
      )}
      </>
  )
}

export default page