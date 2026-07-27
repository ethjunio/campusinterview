import { fetchData } from '@/actions/GET';
import React from 'react'
import OverviewPage from './_components/OverviewPage';

const page = async() => {

  const jobListingsData = await fetchData({
    url: "visitor/getlandingPageData",
  });

  return (
    <OverviewPage data={jobListingsData} />
  )
}

export default page