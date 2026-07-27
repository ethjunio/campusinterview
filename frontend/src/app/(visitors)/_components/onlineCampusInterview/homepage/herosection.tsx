"use client";
import { ArrowRight } from "lucide-react";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import {
  applyInterviewBrandToText,
  getInterviewBrandName,
} from "@/utils/interviewBrand";
import {
  extractSiteUiFlagFromVisitorPayload,
  getLandingPageData,
} from "@/utils/landingPageData";

const HeroSection = ({ data: fetchResult }: { data: any }) => {
  const router = useRouter();
  const landingData = getLandingPageData(fetchResult);
  const siteUiFlag =
    extractSiteUiFlagFromVisitorPayload(fetchResult?.data) ??
    landingData?.siteUiFlag;
  const brandName = getInterviewBrandName(siteUiFlag);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const dataFromStorage = localStorage.getItem("auth-storage");
    if (!dataFromStorage) return;

    const authData = JSON.parse(dataFromStorage);

    if (token && authData?.state?.user?.type === "candidate") {
      router.push("/candidate");
    } else if (token && authData?.state?.user?.type === "admin") {
      router.push("/admin/dashboard");
    } else if (token && authData?.state.user?.type === "company") {
      router.push("/company");
    }
  }, [router]);

  function formatDate(timestamp: string | undefined): string {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="mx-auto">
        <div className="lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="order-2 mb-3 md:order-1 lg:order-1 relative rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:min-h-[600px]">
            <img
              src={"/img/dashboardCampusInterview1.png"}
              alt="Students networking"
              className="absolute inset-0 w-full h-[100vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-primary-foreground">
              <h3 className="font-bold mb-3 text-white text-[22px] leading-[26px]">
                Students
              </h3>
              <p className="text-[16px] leading-[20px] mb-5 leading-relaxed text-white">
                {applyInterviewBrandToText(
                  landingData?.mainPageStudentsBox,
                  siteUiFlag
                )}
              </p>
              <Link
                href="/looking-for-job"
                className="flex items-center gap-2 w-full justify-center !bg-primaryPurple backdrop-blur-sm text-white rounded-xl px-5 py-2.5 text-base font-medium hover:bg-primary/30 transition-colors bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)] text-[16px] leading-[20px]"
              >
                Find out more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="order-1 md:col-span-2 lg:col-span-1 lg:order-2 flex flex-col items-center text-center gap-4 hero-mid h-full ">
            <div className="bg-card bg-white rounded-2xl p-6 sm:p-8 w-full flex flex-col items-center logo-block">
              <div className="w-20 h-20 sm:w-[125px] sm:h-[125px] bg-accent rounded-full flex items-center justify-center mb-1">
                <img
                  src={"/img/onlinecampus/OnlinecampusSimplelogo.png"}
                  alt={`${brandName} Logo`}
                  className="w-14 h-14 mb-5 sm:w-[125px] sm:h-[125px] object-contain"
                />
              </div>
              <h1 className="font-bold !text-[#7C77FB] text-[26px] leading-[30px] mb-2">
                {brandName}
              </h1>
              <p className="!text-[#7C77FB] text-[17px] leading-[22px]">
                organized by ETH juniors
              </p>
            </div>

            <div className=" text-white rounded-2xl !px-[30px] !py-[25px] sm:py-5 w-full bg-primaryPurple">
              <p className="text-[22px] leading-[26px] font-medium text-white ">
                The largest job interview day in Switzerland
              </p>
            </div>

            <div className="mt-auto pb-4 space-y-4 mb-3">
              <div>
                <p className="font-bold mb-3 text-[#020418] text-[22px] leading-[26px]">
                  Registration deadline
                </p>
                <p className="flex items-center justify-center gap-2 font-semibold !text-primaryPurple text-[#020418] text-[22px] leading-[26px]">
                  <ArrowRight className="w-4 h-4" />
                  {formatDate(landingData?.companyRegistrationCloseDate)}
                </p>
              </div>
              <div>
                <p className="font-bold mb-3 mt-5 text-[#020418] text-[22px] leading-[26px]">
                  Interview day
                </p>
                <p className="flex items-center justify-center gap-2  font-semibold !text-primaryPurple text-[#020418] text-[22px] leading-[26px]">
                  <ArrowRight className="w-4 h-4" />
                  {formatDate(landingData?.eventDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="order-3 relative rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:min-h-[600px]">
            <img
              src={"/img/DashboardCampusInterviewRight.png"}
              alt="Companies networking"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-primary-foreground">
              <h3 className="font-bold mb-3 text-white text-[#fff] text-[22px] leading-[26px]">
                Companies
              </h3>
              <p className="text-base mb-5 leading-relaxed text-white fontFamily text-[16px] leading-[21px]">
                {applyInterviewBrandToText(
                  landingData?.mainPageCompaniesBox,
                  siteUiFlag
                )}
              </p>
              <Link
                href="/looking-for-talent"
                className="flex items-center gap-2 w-full justify-center !bg-primaryPurple backdrop-blur-sm  text-primary-foreground rounded-xl px-5 py-2.5 font-medium hover:bg-primary/30 transition-colors text-white bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)] text-[16px] leading-[20px]"
              >
                Find out more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
