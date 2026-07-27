"use server";
import React from "react";
import TopIllustration from "@/icons/illustrations/illustration_start.svg";
import BottomIllustration from "@/icons/illustrations/illustration_who.svg";
import WhoIllustration from "@/icons/illustrations/illustration_who_2.svg";
import WhatIllustration from "@/icons/illustrations/illustration_what.svg";
import CompaniesIcon from "@/icons/illustrations/illustration_companies_woman.svg";
import StudentsIcon from "@/icons/illustrations/illustration_students.svg";
import { ImageInfoBox } from "@/features/landing/ImageInfoBox";
import { Page } from "@/features/landing/Page";
import {
  CompaniesLink,
  RegisterLink,
  SignInLink,
  StudentsLink,
} from "@/features/landing/Links";
import { InfoForCompanies } from "@/features/landing/InfoForCompanies";
import { getTranslations } from "next-intl/server";
import { currentYear } from "@/utils";
import { fetchData } from "@/actions/GET";
import OnlineHomePageCampusInterview from "./_components/onlineCampusInterview/homepage/homePage";
import HomePageCampusInterview from "./_components/campusInterview/homepage/homePage";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";
import { getSiteUiFlagFromFetch } from "@/utils/landingPageData";

const IndexPage = async () => {
  const data = await fetchData({ url: "visitor/getlandingPageData" });

  const t = await getTranslations();

  return (
    <>
    {isOnlineCampusInterview(getSiteUiFlagFromFetch(data)) ? (
      <OnlineHomePageCampusInterview data={data} />
    ) : (
      <HomePageCampusInterview data={data} />
    )}
    </>
  );
};

export default IndexPage;
