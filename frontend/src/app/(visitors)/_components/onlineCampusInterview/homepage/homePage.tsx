"use server";
import React from "react";

import { getTranslations } from "next-intl/server";
import Navbar from "./navbar";
import HeroSection from "./herosection";
import WaveDecoration from "./waveDecoration";
import Footer from "../studentLandingPage/footer";

const OnlineHomePageCampusInterview = async ({ data }: { data: any }) => {
  const t = await getTranslations();
  return (
    <>
      <div className="min-h-screen bg-background custom-body-bg">
        {/* <Navbar /> */}
        <HeroSection data={data} />
        {/* <WaveDecoration /> */}
        <Footer />
      </div>
    </>
  );
};

export default OnlineHomePageCampusInterview;
