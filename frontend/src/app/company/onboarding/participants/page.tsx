import Head from "next/head";
import React from "react";
import ParticipantFeatures from "../../(layoutwrapper)/profile/(layoutforms)/participants/_components/ParticipantFeatures";
import OnlineParticipantFeatures from "../../(layoutwrapper)/profile/(layoutforms)/participants/_components/onlineCampus/ParticipantFeatures";
import { fetchData } from "@/actions/GET";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const page = async () => {
  const data = await fetchData({ url: "visitor/getlandingPageData" });
  return (
    <main className="w-full">
      <Head>
        <title>Things about me</title>
      </Head>
      {isOnlineCampusInterview(data?.data?.data?.siteUiFlag) ? (
        <OnlineParticipantFeatures />
      ) : (
        <ParticipantFeatures />
      )}
    </main>
  );
};

export default page;
