"use server"
import React from "react";
import LookingForTalent from "./_components/LookingForTalent";
import { fetchData } from "@/actions/GET";
import OnlineCampusInterviewCompany from "../_components/onlineCampusInterview/compnanyLandingPage/campusInterviewComapny";
import CampusInterviewCompany from "../_components/campusInterview/compnanyLandingPage/campusInterviewComapny";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";


const page = async () => {
  // const impressions = await fetchData({
  //   url: "visitor/getEventImpressionImages",
  // });
  // const faqsData = await fetchData({ url: "/common/getAllFAQ?type=company" });
  // const talentListData = await fetchData({
  //   url: "visitor/getlandingPageData",
  // });
  const [impressions, faqsData, talentListData] = await Promise.all([
    fetchData({ url: "visitor/getEventImpressionImages" }),
    fetchData({ url: "admin/faqMgmt/getAllFAQ?type=company" }),
    fetchData({ url: "visitor/getlandingPageData" })
  ]);


  return (
    // <LookingForTalent
    //   impressions={impressions?.data?.data}
    //   talentData={talentListData?.data?.data}
    // />
    
    <>
      {isOnlineCampusInterview(talentListData?.data?.data?.siteUiFlag) ? (
        <OnlineCampusInterviewCompany
          impressions={impressions?.data?.data}
          talentData={talentListData?.data?.data}
          faqsData={faqsData?.data?.data}
        />
      ) : (
        <CampusInterviewCompany
          impressions={impressions?.data?.data}
          talentData={talentListData?.data?.data}
          faqsData={faqsData?.data?.data}
        />
      )}
    </>

  );
};

export default page;
