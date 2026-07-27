"use client";
import Head from "next/head";
import React, { Fragment } from "react";
import { SmallCard } from "@/app/candidate/(layoutwrapper)/overview/_components/SmallCard";
import RequestsIcon from "@/icons/ic-open-requests.svg";
import MatchesIcon from "@/icons/ic-matches_green.svg";
import PhoneIcon from "@/icons/ic-phone.svg";
import MailIcon from "@/icons/ic-mail.svg";
import SheetIcon from "@/icons/ic-sheet.svg";
import DownloadIcon from "@/icons/ic-download.svg";
import { ArrowButton } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Agenda } from "@/app/(visitors)/looking-for-job/_components/Agenda";
import { InformationBoard } from "./InformationBoard";
import { useGetCompanyReceivedRequestQuery } from "@/hooks/company/matching/useGetCompanyReceivedRequestQuery";
import { useGetCompanyArrangedInterviewQuery } from "@/hooks/company/matching/useGetCompanyArrangedInterviewQuery";

const OverViewFeature = () => {
  const t = useTranslations("companies");
  const { data, isLoading } = useGetCompanyReceivedRequestQuery();
  const { data: arrangedData } = useGetCompanyArrangedInterviewQuery();

  function regularRender() {
    return (
      <Fragment>
        {true ? (
          <section className="flex flex-col space-y-8 xl:w-1/2">
            <div className="shadow-sm flex flex-col justify-between rounded px-5 sm:px-8 py-5 sm:py-12 bg-gradient-135-primary-light">
              <div className="space-y-8">
                <h1 className="text-white">
                  {t("overview.booking-box.title")}
                </h1>
                <p className="text-white text-lg leading-relaxed">
                  {t("overview.booking-box.text")}
                </p>
              </div>
              <Link
                href="/company/profile/bookings"
                className="flex justify-end"
              >
                <ArrowButton
                  variant="outline"
                  tw="self-end bg-white text-primary-light w-auto mt-8"
                >
                  {t("overview.booking-box.button")}
                </ArrowButton>
              </Link>
            </div>
            <div className="shadow-sm rounded bg-white">
              <div className="flex flex-col rounded px-8 py-8">
                <Agenda
                  containerStyle={{ padding: 0, margin: 0 }}
                  divStyle={{ padding: 0 }}
                />
              </div>
            </div>
          </section>
        ) : null}

        <div className="flex flex-col mt-8 space-y-8 xl:w-1/2">
          <InformationBoard />

          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 row-span-1">
            <SmallCard
              title={`${data?.data?.length} open request`}
              href="/company/matching?type=receivedRequests"
              Icon={RequestsIcon}
            />
            <SmallCard
              title={`${arrangedData?.data?.length} matches`}
              href="/company/matching?type=arrangedInterviews"
              Icon={MatchesIcon}
            />
          </div>

          <section className="flex flex-col space-y-6 xl:space-y-0 xl:flex-row xl:space-x-6">
            <div className="lg:h-80 bg-white xl:w-1/2 shadow-sm rounded flex flex-col p-8">
              <h3 className="mb-6">{t("overview.downloads-box.title")}</h3>
              <ul className="space-y-4">
                <li>
                  <div className="flex justify-between">
                    <div className="space-x-3 flex items-center">
                      <SheetIcon className="w-4 h-4 flex-shrink-0 fill-current text-primary-light" />
                      <span className="">
                        {t("overview.downloads-box.terms-and-conditions-title")}
                      </span>
                    </div>

                    <div className="space-x-3 flex items-center min-w-1/2 justify-end">
                      <span className="text-dark-soft text-right">
                        {t("overview.downloads-box.terms-and-conditions-size")}
                      </span>
                      <a
                        href={t(
                          "overview.downloads-box.terms-and-conditions-link",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadIcon className="w-4 h-4 flex-shrink-0 fill-current text-primary-light" />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div className="space-x-3 flex items-center">
                      <SheetIcon className="w-4 h-4 flex-shrink-0 fill-current text-primary-light" />
                      <span className="">
                        {t("overview.downloads-box.privacy-policy-title")}
                      </span>
                    </div>

                    <div className="space-x-3 flex items-center min-w-1/2 justify-end">
                      <span className="text-dark-soft text-right">
                        {t("overview.downloads-box.privacy-policy-size")}
                      </span>
                      <a
                        href={t("overview.downloads-box.privacy-policy-link")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadIcon className="w-4 h-4 flex-shrink-0 fill-current text-primary-light" />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div className="space-x-3 flex items-center">
                      <SheetIcon className="w-4 h-4 flex-shrink-0 fill-current text-primary-light" />
                      <span className="">
                        {t("overview.downloads-box.coc-title")}
                      </span>
                    </div>

                    <div className="space-x-3 flex items-center min-w-1/2 justify-end">
                      <span className="text-dark-soft text-right ">
                        {t("overview.downloads-box.coc-size")}
                      </span>
                      <a
                        href={t("overview.downloads-box.coc-link")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadIcon className="w-4 h-4 flex-shrink-0 fill-current text-primary-light" />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="h-80 bg-white xl:w-1/2 shadow-sm rounded flex flex-col p-8 ">
              <h3 className="mb-6">{t("overview.contact-box.title")}</h3>
              <p>{t("overview.contact-box.text")}</p>
              <div className="mt-16 space-y-6">
                <a
                  className="flex items-center text-sm sm:text-base"
                  href={`mailto:campusinterview@ethjuniors.ch?subject="subject"`}
                >
                  <MailIcon className="w-5 h-5 mr-2 flex-shrink-0 fill-current" />
                  {t("overview.contact-box.email")}
                </a>
                <a className="flex items-center" href="tel:+41446326638">
                  <PhoneIcon className="w-5 h-5 mr-2 flex-shrink-0 fill-current" />
                  {t("overview.contact-box.phone")}
                </a>
              </div>
            </div>
          </section>
          <section className="mt-10 lg:mt-56 mb-72 lg:mb-32 space-y-12 shadow-sm bg-white p-6 sm:px-8 sm:py-12">
            <h1 className="text-primary-light">
              {/* {t('landing.looking-for-talent.impressions.title')} */}
              Impressions of Past Events
            </h1>
            <video
              controls
              poster="https://cdn.campusinterview.ch/promo/CI-promo-preview.png"
            >
              <source
                src="https://cdn.campusinterview.ch/promo/CI-promo.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </section>
        </div>
      </Fragment>
    );
  }

  function renderBody() {
    //ToDo Apply the condition here
    if (false) {
      return;
    }
    return regularRender();
  }

  return (
    <main className="bg-light-soft flex-grow">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div
        className="flex flex-col p-16 xl:space-y-0 xl:flex-row xl:space-x-6 px-4 sm:px-12 py-4 sm:py-10 space-y-4 bg-light-soft
    "
      >
        {renderBody()}
      </div>
    </main>
  );
};

export default OverViewFeature;
