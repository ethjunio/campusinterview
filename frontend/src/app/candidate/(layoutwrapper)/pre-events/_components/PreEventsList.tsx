"use client";
import React from "react";
import { NextPage } from "next";
import { BackLink } from "@/components/atoms/BackLink";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { PreEventCards } from "./PreEventCards";
import { useGetPreeventsListQuery } from "@/hooks/student/eventmgmt/useGetPreeventsListQuery";

const PreEventsList: NextPage = () => {
  const t = useTranslations();

  const { data, isLoading } = useGetPreeventsListQuery();

  return (
    <main className="bg-light-softer flex-grow space-y-4 pl-4 lg:pl-10 pr-4 lg:pr-16 pb-12 pt-8">
      <Head>
        <title>Events</title>
      </Head>
      <BackLink href="/candidate/overview">{t("common.back")}</BackLink>

      <h1 className="pb-4">{t("candidate.overview.pre-events.title-2")}</h1>

      {!isLoading && (
        <div className="space-y-16 xl:space-y-24">
          <div>
            <h3 className="pb-4">
              {t("candidate.overview.pre-events.applied")}
            </h3>
            {!(data?.data?.appliedArray?.length > 0) ? (
              <div>No events applied yet.</div>
            ) : (
              <PreEventCards events={data?.data?.appliedArray} />
            )}
          </div>

          <div>
            <h3 className="pb-4">
              {t("candidate.overview.pre-events.not-applied")}
            </h3>

            {!(data?.data?.preEventArray?.length > 0) ? (
              <div className="space-y-2">
                <span className="pb-4">
                  {t("candidate.overview.pre-events.not-applied-description")}
                </span>
                <p>No available events at the moment. Check back soon!</p>
              </div>
            ) : (
              <>
                <span className="pb-4">
                  {t("candidate.overview.pre-events.not-applied-description")}
                </span>
                <PreEventCards events={data?.data?.preEventArray} />
              </>
            )}
          </div>
          <div>
            <h3 className="pb-4">
              {t("candidate.overview.pre-events.workshops")}
            </h3>

            {!(data?.data?.workshopArray?.length > 0) ? (
              <div className="space-y-2">
                <span className="pb-4">
                  {t("candidate.overview.pre-events.workshops-description")}
                </span>
                <p>No workshops available yet. Stay tuned for updates!</p>
              </div>
            ) : (
              <>
                <span className="pb-4">
                  {t("candidate.overview.pre-events.workshops-description")}
                </span>
                <PreEventCards events={data?.data?.workshopArray} />
              </>
            )}
          </div>
          <div>
            <h3 className="pb-4">
              {t("candidate.overview.pre-events.accepted")}
            </h3>

            {!(data?.data?.acceptedArray?.length > 0) ? (
              <div className="space-y-2">
                {/* <span className="pb-4">
                  {t("candidate.overview.pre-events.not-applied-description")}
                </span> */}
                <p>No accepted events at the moment</p>
              </div>
            ) : (
              <>
                <span className="pb-4">
                  {t("candidate.overview.pre-events.not-applied-description")}
                </span>
                <PreEventCards events={data?.data?.acceptedArray} />
              </>
            )}
          </div>
          <div>
            <h3 className="pb-4">
              {t("candidate.overview.pre-events.rejected")}
            </h3>

            {!(data?.data?.rejectedArray?.length > 0) ? (
              <div className="space-y-2">
                {/* <span className="pb-4">
                  {t("candidate.overview.pre-events.not-applied-description")}
                </span> */}
                <p>No rejected events at the moment</p>
              </div>
            ) : (
              <>
                <span className="pb-4">
                  {t("candidate.overview.pre-events.not-applied-description")}
                </span>
                <PreEventCards events={data?.data?.rejectedArray} />
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default PreEventsList;
