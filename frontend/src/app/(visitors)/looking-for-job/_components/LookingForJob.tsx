"use client";
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import TopIllustration from "@/icons/illustrations/illustration_looking_for_a_job.svg";
import BackgroundIllustration from "@/icons/illustrations/illustration_background_students_1_1.svg";
import BackgroundIllustration2 from "@/icons/illustrations/illustration_background_students_2_1.svg";
import LeftIllustration from "@/icons/illustrations/illustration_slider_1.svg";
import RightIllustration from "@/icons/illustrations/illustration_slider_2.svg";
import { ImageInfoBox } from "@/features/landing/ImageInfoBox";
import EfficientImage from "@/icons/illustrations/illustration_efficient.svg";
import CompaniesImage from "@/icons/illustrations/illustration_companies.svg";
import SupportingImage from "@/icons/illustrations/illustration_supporting_program.svg";
import { HowDoesCampusWork } from "./HowDoesCampusWork";
import { Agenda } from "./Agenda";
import { Page } from "@/features/landing/Page";
import { SignInLink, RegisterLink } from "@/features/landing/Links";
import useResize from "@/utils/dynamicResizeComponentByAnother";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import Head from "next/head";

interface CompanyLogo {
  imageUrl: string;
}

interface LookingForJobProps {
  logos: CompanyLogo[];
  jobListings: any;
}

const LookingForJob: React.FC<LookingForJobProps> = ({
  logos,
  jobListings,
}) => {
  const { initResize } = useResize();

  const t = useTranslations();

  const slides = [
    {
      name: t("looking-for-job.testimonies.name-1"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/students/01.jpeg",
      testimony: t("looking-for-job.testimonies.message-1"),
    },
    {
      name: t("looking-for-job.testimonies.name-2"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/students/02.jpeg",
      testimony: t("looking-for-job.testimonies.message-2"),
    },
    {
      name: t("looking-for-job.testimonies.name-3"),
      imageUrl: "https://cdn.campusinterview.ch/testimonies/students/03.jpeg",
      testimony: t("looking-for-job.testimonies.message-3"),
    },
  ];

  useEffect(() => {
    initResize(
      120,
      145,
      180,
      180,
      "backgroundIllustationContainer",
      "backgroundIllustation"
    );
  }, []);

  const formatDate = (
    date: string | Date | undefined | null,
    withYear = false
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
        <title>Looking for job</title>
      </Head>
      <Page>
        {/* illustrations */}
        <TopIllustration className="-z-10 lg:-mt-12 -mr-24 lg:-ml-8 h-140 lg:h-looking-for-job-top absolute top-0 left-0" />
        {/* illustrations */}

        <Page.Welcome
          title={t("welcome.title-looking-for-job")}
          subtitle={t("welcome.subtitle-looking-for-job")}
          registrationDeadline={jobListings.candidateRegistrationCloseDate}
          interviewDay={jobListings.eventDate}
        >
          <Page.Welcome.CTA cta={t("welcome.cta-looking-for-job")}>
            <div className="flex w-full space-x-4 justify-between lg:justify-start">
              <RegisterLink className="w-auto" />
              <SignInLink className="w-auto" />
            </div>
          </Page.Welcome.CTA>
        </Page.Welcome>
        <Page.TopInfo>
          <ImageInfoBox
            Image={EfficientImage}
            imageSize="small"
            title={t("looking-for-job.info-1.title")}
            message={t("looking-for-job.info-1.message")}
          />
          <div className="pt-8">
            <ImageInfoBox
              Image={CompaniesImage}
              imageSize="small"
              title={t("looking-for-job.info-2.title")}
              message={t("looking-for-job.info-2.message")}
            />
          </div>
          <div className="pt-8">
            <ImageInfoBox
              Image={SupportingImage}
              imageSize="small"
              title={t("looking-for-job.info-3.title")}
              message={t("looking-for-job.info-3.message")}
            />
          </div>
        </Page.TopInfo>
        <Page.ScrollIndicator className="hidden lg:block" />
        <Page.Footer cta={t("footer.cta-looking-for-job")}>
          <div className="flex w-full space-x-4 justify-between lg:justify-start">
            <RegisterLink className="w-auto" />
            <SignInLink className="w-auto" />
          </div>
        </Page.Footer>

        <section
          id="backgroundIllustationContainer"
          className="relative mt-20 -z-30"
        >
          <BackgroundIllustration
            id="backgroundIllustation"
            className="w-screen text-light-softer fill-current -z-1 bg-transparent absolute top-0 left-0"
          />
        </section>
        <section className="relative -mt-20">
          <div className="px-8 lg:px-40 bg-light-softer">
            <h1 className="text-primary-light text-center lg:text-left">
              {t("looking-for-job.participating-companies")}
            </h1>
            <div className="relative mt-20">
              {/* <CompanySlider companyLogos={logos} /> */}
              <button className="swiper-button-prev-custom swiper-button-prev-custom-part absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full md:left-[-30px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-8 w-8 lg:h-10 lg:w-10 fill-current text-primary-dark"
                >
                  <path d="M20.817 29.104a1.275 1.275 0 001.784-.01 1.254 1.254 0 00-.001-1.768l-1.812-1.815h9.96a1.253 1.253 0 000-2.504h-9.96L22.6 21.19a1.255 1.255 0 00-.01-1.779 1.244 1.244 0 00-.887-.368c-.335 0-.65.131-.886.368l-3.948 3.955a1.252 1.252 0 00-.37.891c0 .336.131.653.368.89l3.95 3.956z"></path>
                  <path d="M24.25 45.991c11.986 0 21.737-9.751 21.737-21.737 0-11.986-9.751-21.738-21.737-21.738-11.986 0-21.738 9.752-21.738 21.738 0 11.986 9.752 21.737 21.738 21.737zm0-40.294c10.232 0 18.556 8.325 18.556 18.557S34.482 42.81 24.25 42.81c-10.232 0-18.556-8.324-18.556-18.556 0-10.232 8.324-18.557 18.556-18.557z"></path>
                </svg>
              </button>
              <button className="swiper-button-next-custom swiper-button-next-custom-part absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full  md:right-[-30px]">
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
                slidesPerView={4}
                navigation={{
                  prevEl: ".swiper-button-prev-custom-part",
                  nextEl: ".swiper-button-next-custom-part",
                }}
                loop={logos.length > 1}
                className="px-12"
              >
                {logos
                  .reduce(
                    (
                      result: CompanyLogo[][],
                      _,
                      index,
                      array: CompanyLogo[]
                    ) => {
                      if (index % 2 === 0) {
                        result.push(array.slice(index, index + 2));
                      }
                      return result;
                    },
                    []
                  )
                  .map((pair, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col items-center justify-center text-center h-full p-5">
                        {pair.map((slide, i) => (
                          <img
                            key={i}
                            src={slide.imageUrl}
                            alt={"logo"}
                            className="w-20 h-auto lg:w-40 lg:h-auto"
                          />
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          <div className="bg-light-softer">
            <LeftIllustration
              height={471}
              className="absolute hidden lg:block left-0"
            />
            <RightIllustration
              height={471}
              className="absolute hidden lg:block right-0"
            />

            <div className="px-8 lg:px-60 pt-12 h-100">
              <div className="relative">
                <button className="swiper-button-prev-custom swiper-button-prev-custom-can absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full md:left-[-30px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-8 w-8 lg:h-10 lg:w-10 fill-current text-primary-dark"
                  >
                    <path d="M20.817 29.104a1.275 1.275 0 001.784-.01 1.254 1.254 0 00-.001-1.768l-1.812-1.815h9.96a1.253 1.253 0 000-2.504h-9.96L22.6 21.19a1.255 1.255 0 00-.01-1.779 1.244 1.244 0 00-.887-.368c-.335 0-.65.131-.886.368l-3.948 3.955a1.252 1.252 0 00-.37.891c0 .336.131.653.368.89l3.95 3.956z"></path>
                    <path d="M24.25 45.991c11.986 0 21.737-9.751 21.737-21.737 0-11.986-9.751-21.738-21.737-21.738-11.986 0-21.738 9.752-21.738 21.738 0 11.986 9.752 21.737 21.738 21.737zm0-40.294c10.232 0 18.556 8.325 18.556 18.557S34.482 42.81 24.25 42.81c-10.232 0-18.556-8.324-18.556-18.556 0-10.232 8.324-18.557 18.556-18.557z"></path>
                  </svg>
                </button>
                <button className="swiper-button-next-custom swiper-button-next-custom-can absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full  md:right-[-30px]">
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
                  navigation={{
                    prevEl: ".swiper-button-prev-custom-can",
                    nextEl: ".swiper-button-next-custom-can",
                  }}
                  loop={logos.length > 1}
                  className="px-12"
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col items-center justify-center text-center h-full p-5">
                        <div
                          className="h-32 bg-no-repeat bg-center rounded-full bg-cover w-32 mb-6"
                          style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        ></div>
                        <div>
                          <h3 className="text-xl  mb-2 text-primary-dark font-[900]">
                            {slide.name}
                          </h3>
                          <p className="text-lg text-primary-dark w-[300px]">
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
        <section className="relative -mt-4" style={{ height: 120 }}>
          <BackgroundIllustration2 className="w-screen text-light-softer fill-current -z-30 bg-white absolute top-0 left-0" />
        </section>

        <section className="px-8 mt-10 lg:mt-56 mb-72 lg:mb-32 lg:pl-40 lg:pr-24 space-y-12">
          <h1 className="text-primary-light text-3xl font-bold leading-relaxed">
            {t("looking-for-job.how-does-it-work")}
          </h1>
          <HowDoesCampusWork
            steps={[
              {
                step: 1,
                title: t("looking-for-job.how-does-it-work-step-1"),
                message: jobListings.candidatePageRegistrationBox,
                date: t("date-range", {
                  from: formatDate(new Date(jobListings.registrationOpenDate), true),
                  to: formatDate(new Date(jobListings.candidateRegistrationCloseDate), true),
                }),
              },
              {
                step: 2,
                title: t("looking-for-job.how-does-it-work-step-2"),
                message: jobListings.candidatePageMakeCVBox,
              },
              {
                step: 3,
                title: t("looking-for-job.how-does-it-work-step-3"),
                message: jobListings.candidatePageRequestInterviewsBox,
                date: t("date-range", {
                  from: formatDate(new Date(jobListings.matchingOpenDate), true),
                  to: formatDate(new Date(jobListings.matchingCloseDate), true),
                }),
              },
              {
                step: 4,
                title: `${t("looking-for-job.how-does-it-work-step-4")}`,
                message: jobListings.candidatePageInterviewDayBox,
                date: t("date", {
                  date: formatDate(new Date(jobListings.eventDate), true),
                }),
              },
            ]}
          />
        </section>

        <Agenda />
      </Page>
    </>
  );
};

export default LookingForJob;
