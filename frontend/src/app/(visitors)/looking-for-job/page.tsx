"use server";
import React from "react";
import LookingForJob from "./_components/LookingForJob";
import { fetchData } from "@/actions/GET";
import OnlineCampusInterviewStudentLanding from "../_components/onlineCampusInterview/studentLandingPage/campusInterviewLanding";
import CampusInterviewStudentLanding from "../_components/campusInterview/studentLandingPage/campusInterviewLanding";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";


const page = async () => {
  // const logosData = await fetchData({ url: "visitor/getCompanyLogos" });
  // const faqsData = await fetchData({ url: "/common/getAllFAQ?type=candidate" });
  // const jobListingsData = await fetchData({
  //   url: "visitor/getlandingPageData",
  // });
  const [logosData, faqsData, jobListingsData] = await Promise.all([
    fetchData({ url: "visitor/getCompanyLogos" }),
    fetchData({ url: "admin/faqMgmt/getAllFAQ?type=candidate" }),
    fetchData({ url: "visitor/getlandingPageData" }),
  ]);
  return (
    // <LookingForJob
    //   logos={logosData?.data?.data}
    //   jobListings={jobListingsData?.data?.data}
    // />

    <>
      {isOnlineCampusInterview(jobListingsData?.data?.data?.siteUiFlag) ? (
        <OnlineCampusInterviewStudentLanding
          logos={logosData?.data?.data}
          jobListings={jobListingsData?.data?.data}
          faqsData={faqsData?.data?.data}
        />
      ) : (
        <CampusInterviewStudentLanding
          logos={logosData?.data?.data}
          jobListings={jobListingsData?.data?.data}
          faqsData={faqsData?.data?.data}
        />
       )} 
    </>
  );
};

export default page;
