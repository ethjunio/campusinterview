"use client";
import React from "react";
import Head from "next/head";
// import { getSiteLayout } from 'components/templates/SiteLayout';
import TopIllustration from "@/icons/illustrations/illustration_interview_top_talents.svg";
import BackgroundIllustration from "@/icons/illustrations/illustration_background_company_1_1.svg";
import BackgroundIllustration2 from "@/icons/illustrations/illustration_background_company_2_1.svg";
import LeftIllustration from "@/icons/illustrations/illustration_slider_1.svg";
import RightIllustration from "@/icons/illustrations/illustration_talent_pool_composition.svg";
import WhyIllustration from "@/icons/illustrations/illustration_why.svg";
import StartupIllustration from "@/icons/illustrations/illustration_startup.svg";
import PhoneIcon from "@/icons/ic-phone.svg";
import MailIcon from "@/icons/ic-mail.svg";
import { ImageInfoBox } from "@/features/landing/ImageInfoBox";
import TalentPoolImage from "@/icons/illustrations/illustration_talent_pool.svg";
import InterviewsImage from "@/icons/illustrations/illustration_interviews.svg";
import SuccessImage from "@/icons/illustrations/illustration_success.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { HowDoesCampusWork } from "@/app/(visitors)/looking-for-job/_components/HowDoesCampusWork";
import { Agenda } from "@/app/(visitors)/looking-for-job/_components/Agenda";
import { InfoForCompanies } from "@/features/landing/InfoForCompanies";
import { Page } from "@/features/landing/Page";
import { NextPage } from "next";
// import { TFunctions } from 'next-intl';
import { RegisterLink, SignInLink } from "@/features/landing/Links";
import { compose } from "lodash/fp";
// import { withTrans } from 'lib/withTrans';
import { useTranslations } from "next-intl";
import {
  DegreeDistribution,
  StudyFieldsDistribution,
} from "@/features/landing/DegreeDistribution";
import EventImpressions from "@/features/landing/EventImpressions";

const LookingForTalent = ({
  impressions,
  talentData,
}: {
  impressions: any[];
  talentData: any;
}) => {
  const t = useTranslations();
  const slides = [
    {
      name: t("looking-for-talent.testimonies.company-1"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/03.png",
      testimony: t("looking-for-talent.testimonies.message-1"),
    },
    {
      name: t("looking-for-talent.testimonies.company-2"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/01.jpg",
      testimony: t("looking-for-talent.testimonies.message-2"),
    },
    {
      name: t("looking-for-talent.testimonies.company-3"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/02.png",
      testimony: t("looking-for-talent.testimonies.message-3"),
    },
    {
      name: t("looking-for-talent.testimonies.company-4"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/04.png",
      testimony: t("looking-for-talent.testimonies.message-4"),
    },
  ];
  const formatDate = (
    date: string | Date | undefined | null,
    withYear = false,
  ) => {
    if (!date) return date;
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    return withYear ? `${day}.${month}.${year}` : `${day}.${month}`;
  };

  return (
    <>
      <Head>
        <title>Looking for talent</title>
      </Head>
      <Page>
        {/* illustrations */}
        <TopIllustration
          style={{ zIndex: -1 }}
          className="lg:-mt-4 absolute top-0 left-0 lg:-ml-8 h-92 lg:h-232"
        />

        <Page.Welcome
          title={t("welcome.title-looking-for-talent")}
          subtitle={t("welcome.subtitle-looking-for-talent")}
          registrationDeadline={talentData?.candidateRegistrationCloseDate}
          interviewDay={talentData?.eventDate}
        >
          <Page.Welcome.CTA cta={t("welcome.cta-looking-for-talent")}>
            <div className="flex w-full space-x-4 justify-between lg:justify-start">
              <RegisterLink to="/register?_for=company" className="w-auto" />
              <SignInLink className="w-auto" />
            </div>
          </Page.Welcome.CTA>
        </Page.Welcome>
        <Page.TopInfo>
          <ImageInfoBox
            Image={TalentPoolImage}
            imageSize="small"
            title={t("looking-for-talent.info-1.title")}
            message={t("looking-for-talent.info-1.message")}
          />
          <div className="pt-8">
            <ImageInfoBox
              Image={InterviewsImage}
              imageSize="small"
              title={t("looking-for-talent.info-2.title")}
              message={t("looking-for-talent.info-2.message")}
            />
          </div>
          <div className="pt-8">
            <ImageInfoBox
              Image={SuccessImage}
              imageSize="small"
              title={t("looking-for-talent.info-3.title")}
              message={t("looking-for-talent.info-3.message")}
            />
          </div>
        </Page.TopInfo>
        <Page.ScrollIndicator className="hidden lg:block" />
        <Page.Footer cta={t("footer.cta-looking-for-talent")}>
          <RegisterLink to="/register?_for=company" className="w-auto" />
          <SignInLink className="w-auto" />
        </Page.Footer>

        <section className="relative px-8 pb-108 lg:pb-24 lg:px-40 mt-24 lg:mt-12 lg:pt-20">
          <BackgroundIllustration className="w-screen -z-10 text-light-softer bg-white fill-current absolute -mb-4 bottom-0 left-0" />
          <WhyIllustration
            style={{ zIndex: -1 }}
            className="block absolute mb-0 mt-88 lg:mt-0 top-0 right-0 h-116 lg:h-188"
          />
          <InfoForCompanies
            title={t("looking-for-talent.why.title")}
            message={talentData?.companyPageWhyBox}
          >
            <RegisterLink
              to="/register?_for=company"
              className="w-fit"
              variant="primary-light"
            />
          </InfoForCompanies>
        </section>

        <section className="px-8 lg:pl-40 lg:pr-24 bg-light-softer space-y-14 lg:space-y-10">
          <h1 className="max-w-2xs lg:max-w-full text-primary-light text-3xl font-bold leading-relaxed">
            {t("looking-for-talent.how-does-it-work")}
          </h1>
          <HowDoesCampusWork
            steps={[
              {
                step: 1,
                title: t("looking-for-talent.how-does-it-work-step-1"),
                message: talentData?.companyPageRegistrationBox,
                date: t("date-range", {
                  from: formatDate(new Date(talentData?.registrationOpenDate), true),
                  to: formatDate(new Date(talentData?.companyRegistrationCloseDate), true),
                }),
              },
              {
                step: 2,
                title: t("looking-for-talent.how-does-it-work-step-2"),
                message: talentData?.companyPageBookingBox,
                date: t("date-range", {
                  from: formatDate(new Date(talentData?.registrationOpenDate), true),
                  to: formatDate(new Date(talentData?.companyBookingCloseDate), true),
                }),
              },
              {
                step: 3,
                title: t("looking-for-talent.how-does-it-work-step-3"),
                message: talentData?.companyPageRequestInterviewsBox,
                date: t("date-range", {
                  from: formatDate(new Date(talentData?.matchingOpenDate), true),
                  to: formatDate(new Date(talentData?.matchingCloseDate), true),
                }),
              },
              {
                step: 4,
                title: t("looking-for-talent.how-does-it-work-step-4"),
                message: talentData?.companyPageInterviewDayBox,
                date: t("date", {
                  date: formatDate(new Date(talentData?.eventDate), true),
                }),
              },
            ]}
          />
        </section>

        <section className="relative bg-light-softer pt-8 lg:pt-32 lg:pb-0 px-8 lg:px-0">
          <StartupIllustration className="absolute mb-0 mt-24 top-0 left-0 h-100 lg:h-188 -z-9" />
          <div className=" lg:px-24 pt-100 lg:pt-24 lg:pb-24 xl:px-40 flex lg:space-x-4 items-center">
            <div className="hidden lg:block w-1/2"></div>
            <InfoForCompanies
              title={t("looking-for-talent.startup.title")}
              message={talentData?.companyPageBenefitBox}
            >
              <a
                style={{ fontSize: "11px" }}
                className="flex items-center btn btn-primary-light w-fit"
                href={`mailto:campusinterview@ethjuniors.ch?subject="subject"`}
              >
                <MailIcon className="w-5 h-5 mr-2 text-white fill-current" />
                campusinterview@ethjuniors.ch
              </a>
              <a
                style={{ fontSize: "11px" }}
                className="flex items-center btn btn-primary-light w-fit"
                href="tel:+41446326638"
              >
                <PhoneIcon className="w-5 h-5 mr-2 text-white fill-current" />
                +41 44 620 01 36
              </a>
            </InfoForCompanies>
          </div>
        </section>
        <section className="relative -z-10" style={{ height: 120 }}>
          <BackgroundIllustration2 className="w-screen -mt-4 text-light-softer fill-current bg-transparent absolute top-0 left-0" />
        </section>

        <section className="relative  lg:mt-16">
          <RightIllustration className="absolute top-0 mt-188 lg:mt-0 right-0 h-84 lg:h-256 -z-10" />

          <div className="px-8 lg:px-40">
            <div className="space-y-6">
              <h1 className="text-primary-light ml-0">
                {t("looking-for-talent.talent-pool-composition.title")}
              </h1>

              <DegreeDistribution />
              <StudyFieldsDistribution />
            </div>
          </div>
          <div className="lg:pt-20 items-center">
            <LeftIllustration
              style={{ zIndex: 10 }}
              height={471}
              className="absolute left-0 lg:block hidden"
            />

            <div className="px-8 lg:mb-0 lg:px-44 xl:px-88 pt-12">
              <div className="relative">
                {/* Custom Navigation Buttons */}
                <button className="swiper-button-prev-custom swiper-button-prev-custom-slide absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full md:left-[-30px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-8 w-8 lg:h-10 lg:w-10 fill-current text-primary-dark"
                  >
                    <path d="M20.817 29.104a1.275 1.275 0 001.784-.01 1.254 1.254 0 00-.001-1.768l-1.812-1.815h9.96a1.253 1.253 0 000-2.504h-9.96L22.6 21.19a1.255 1.255 0 00-.01-1.779 1.244 1.244 0 00-.887-.368c-.335 0-.65.131-.886.368l-3.948 3.955a1.252 1.252 0 00-.37.891c0 .336.131.653.368.89l3.95 3.956z"></path>
                    <path d="M24.25 45.991c11.986 0 21.737-9.751 21.737-21.737 0-11.986-9.751-21.738-21.737-21.738-11.986 0-21.738 9.752-21.738 21.738 0 11.986 9.752 21.737 21.738 21.737zm0-40.294c10.232 0 18.556 8.325 18.556 18.557S34.482 42.81 24.25 42.81c-10.232 0-18.556-8.324-18.556-18.556 0-10.232 8.324-18.557 18.556-18.557z"></path>
                  </svg>
                </button>
                <button className="swiper-button-next-custom swiper-button-next-custom-slide absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full  md:right-[-30px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-8 w-8 lg:h-10 lg:w-10 fill-current text-primary-dark"
                  >
                    <path d="M27.683 19.403a1.275 1.275 0 00-1.784.01 1.254 1.254 0 00.001 1.769l1.812 1.815h-9.96a1.253 1.253 0 000 2.504h9.96L25.9 27.316a1.255 1.255 0 00.01 1.779c.237.237.552.368.887.368.334 0 .65-.13.886-.368l3.948-3.955c.238-.238.369-.554.369-.891 0-.336-.13-.652-.367-.89l-3.95-3.956z"></path>
                    <path d="M24.25 2.516c-11.986 0-21.738 9.752-21.738 21.738 0 11.986 9.752 21.737 21.738 21.737 11.986 0 21.737-9.751 21.737-21.737 0-11.986-9.751-21.738-21.737-21.738zm0 40.294c-10.232 0-18.556-8.325-18.556-18.556 0-10.232 8.324-18.557 18.556-18.557 10.232 0 18.556 8.325 18.556 18.557 0 10.231-8.324 18.556-18.556 18.556z"></path>
                  </svg>
                </button>

                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={slides.length > 1}
                  className="px-12"
                  navigation={{
                    prevEl: ".swiper-button-prev-custom-slide",
                    nextEl: ".swiper-button-next-custom-slide",
                  }}
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col items-center justify-center text-center h-full p-5">
                        <img
                          src={slide.imageUrl}
                          alt={slide.name}
                          className="h-18 bg-no-repeat bg-center w-52 bg-contain mb-4"
                        />
                        <div>
                          <h3 className="text-xl  mb-2 text-primary-dark font-[900]">
                            {slide.name}
                          </h3>
                          <p className="text-lg text-primary-dark max-w-2xs lg:max-w-lg px-0 lg:px-6  text-center  leading-tight lg:text-2xl lg:leading-loose">
                            {slide.testimony}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        <EventImpressions impressions={impressions} fullPage={true} />
        <div className="lg:hidden h-80" />
        <Agenda />
      </Page>
    </>
  );
};

export default LookingForTalent;
