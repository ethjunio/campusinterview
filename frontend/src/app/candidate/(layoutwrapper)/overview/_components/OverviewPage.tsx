"use client";
import { Agenda } from "@/app/(visitors)/looking-for-job/_components/Agenda";
import { HowDoesCampusWork } from "@/app/(visitors)/looking-for-job/_components/HowDoesCampusWork";
import { ArrowButton, Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import RequestsIcon from "@/icons/ic-open-requests.svg";
import MatchesIcon from "@/icons/ic-matches_green.svg";
import { Remarkable } from "remarkable";
import c from "classnames";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { SmallCard } from "./SmallCard";
import { InformationBoard } from "./InformationBoard";
import { useGetReceivedRequestQuery } from "@/hooks/student/matching/useGetReceivedRequestQuery";
import { useGetArrangedInterviewsQuery } from "@/hooks/student/matching/useGetArrangedInterviewsQuery";
import Head from "next/head";
import { ModalBasic } from "@/components/organisms/modal/ModalBasic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEventPhase } from "@/utils/customHooks";
import { useGetInfoBoxQuery } from "@/hooks/admin/useGetInfoBoxQuery";
import CompanyListItem from "../../matching/_components/CompanyListItem";
import { useGetAllVisitsQuery } from "@/hooks/student/overviewMgmt/useGetAllVisitsQuery";
import { showDate } from "@/utils/date";
import PublishedInterviewSlots from "../../interviews/_components/PublishedInterviewSlots";
import { useGetWaitingListQuery } from "@/hooks/student/matching/useGetWaitingListQuery";
import { useGetPreeventsListQuery } from "@/hooks/admin/eventpreevents/useGetPreeventsListQuery";
import { PreEventCards } from "../../pre-events/_components/PreEventCards";
import { formatDate } from "@/utils/helper";
import DOMPurify from "dompurify";
import DownloadsSection from "./DownloadsSection";

const md = new Remarkable("full", { html: true });
interface OverviewPageProps {
  data: any;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ data }) => {
  const t = useTranslations();

  const [preEventsData, setPreEventsData] = useState([]);

  const { eventPhase } = useEventPhase();
  const { data: infoData } = useGetInfoBoxQuery();

  const previewClassName =
    "lg:h-108 bg-white rounded-md pl-9 pt-6 pb-8 xl:pb-12";

  const router = useRouter();
  const searchParams = useSearchParams();
  const showModal = searchParams.get("showModal") === "true";
  const closeModal = useCallback(() => {
    router.push("/candidate/overview?showModal=false"),
      {
        shallow: true,
      };
  }, [router]);

  const landingData = data?.data?.data;

  const { data: receivedQuery } = useGetReceivedRequestQuery();
  const { data: matchesQuery } = useGetArrangedInterviewsQuery();
  const {
    data: getCandidateWaitingList,
    isLoading: getCandidateWaitingListLoading,
  } = useGetWaitingListQuery();
  const { data: preevents } = useGetPreeventsListQuery();
  const { data: allVisitsInLastDayData, isLoading: allVisitsInLastDayLoading } =
    useGetAllVisitsQuery();

  // hardcode specific preEvents to show with the id 28 and 29, because they have low participants count
  // if they are not found then just show the preEvents as usual with no filtering
  useEffect(() => {
    if (preevents) {
      const newPreEvents = preevents?.data?.filter(
        (preEvent: any) => preEvent.id === 28 || preEvent.id === 29
      );
      if (newPreEvents?.length > 0) {
        setPreEventsData(newPreEvents);
      } else {
        setPreEventsData(preevents.data);
      }
    }
  }, [preevents]);

  function postMatchingRender() {
    const schedulingInterviewsText =
      eventPhase?.postMatching && !eventPhase?.publishedSchedule ? (
        <p className="mt-3">
          {t("candidate.overview.scheduling-interviews-text")}
        </p>
      ) : null;
    return (
      <Fragment>
        <div className="space-y-4 flex flex-col flex-grow lg:w-1/2">
          <div className="bg-white flex-grow p-6 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <h3>{t("candidate.overview.interview-plan.title")}</h3>
              <Link href="/candidate/interviews">
                <Button variant="link" tw="w-auto px-0 md:px-[27px]">
                  {t("candidate.overview.show-all")}
                </Button>
              </Link>
            </div>

            {eventPhase?.publishedSchedule ? <PublishedInterviewSlots /> : null}

            {schedulingInterviewsText}
          </div>

          <div className="shadow-sm rounded bg-white">
            <div className="flex flex-col rounded px-8 py-8">
              <Agenda
                containerStyle={{ padding: 0, margin: 0 }}
                divStyle={{ padding: 0 }}
                noIllustration
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 space-y-4 flex flex-col flex-grow">
          <InformationBoard />

          <DownloadsSection />

          <div className="px-4 sm:px-9 pt-5 pb-8 bg-white rounded shadow-sm">
            <div className="mb-3 flex items-center justify-between flex-grow">
              <h3>{t("candidate.overview.waiting-list.title")}</h3>
              <Link href="/candidate/matching?type=waitingList">
                <Button variant="link" tw="w-auto px-0 md:px-[27px]">
                  {t("candidate.overview.show-all")}
                </Button>
              </Link>
            </div>
            <div className="pb-4 overflow-auto">
              <ul className="space-y-3 h-full mt-4 overflow-y-auto p-1">
                {getCandidateWaitingList?.data
                  ?.slice(0, 3)
                  .map(({ company, id }: any) => (
                    <CompanyListItem
                      key={`company-list-item-${id}`}
                      company={company}
                      id={id}
                      // text={
                      //   <div>
                      //     {company?.industries[0]
                      //       ? company?.industries[0].name
                      //       : ''}{' '}
                      //     {company?.industries[1]
                      //       ? '&' + company?.industries[1].name
                      //       : ''}
                      //   </div>
                      // }
                      loading={getCandidateWaitingListLoading}
                      showMail={false}
                      showStatus={false}
                      containerStyle={{
                        gridTemplateColumns: "60px 200px auto 20px",
                      }}
                      linkToProfileInActions
                    />
                  ))}
              </ul>
            </div>
          </div>

          <section className="mt-10 lg:mt-56 mb-72 lg:mb-32 space-y-12 shadow-sm bg-white p-6 sm:px-8 sm:py-12">
            <h1 className="text-primary-light text-3xl font-bold leading-relaxed">
              {t("looking-for-job.how-does-it-work")}
            </h1>
            <HowDoesCampusWork
              containerStyle={{ padding: 0 }}
              steps={[
                {
                  step: 1,
                  title: t("looking-for-job.how-does-it-work-step-1"),
                  message: landingData?.candidatePageRegistrationBox,
                  date: t("date-range", {
                    from: formatDate(new Date(landingData?.registrationOpenDate), true),
                    to: formatDate(new Date(landingData?.candidateRegistrationCloseDate), true),
                  }),
                },
                {
                  step: 2,
                  title: t("looking-for-job.how-does-it-work-step-2"),
                  message: landingData?.candidatePageMakeCVBox,
                },
                {
                  step: 3,
                  title: t("looking-for-job.how-does-it-work-step-3"),
                  message: landingData?.candidatePageRequestInterviewsBox,
                  date: t("date-range", {
                    from: formatDate(new Date(landingData?.matchingOpenDate), true),
                    to: formatDate(new Date(landingData?.matchingCloseDate), true),
                  }),
                },
                {
                  step: 4,
                  title: t("looking-for-job.how-does-it-work-step-4"),
                  message: landingData?.candidatePageInterviewDayBox,
                  date: t("date", {
                    date: formatDate(new Date(landingData?.eventDate), true),
                  }),
                },
              ]}
            />
          </section>

          <section className="mt-10 lg:mt-56 mb-72 lg:mb-32 space-y-12 shadow-sm bg-white p-6 sm:px-8 sm:py-12">
            <h1 className="text-primary-light">
              {t("looking-for-talent.impressions.title")}
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

  function regularRender() {
    return (
      <Fragment>
        <div className="flex flex-grow flex-col lg:flex-row space-x-0 space-y-4 lg:space-x-4 lg:space-y-0">
          <div className="space-y-4 flex flex-col flex-grow lg:w-1/2">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 row-span-1">
              <SmallCard
                title={`${receivedQuery?.data?.length || 0} open request`}
                href="/candidate/matching?type=receivedRequests"
                Icon={RequestsIcon}
              />
              <SmallCard
                title={`${matchesQuery?.data?.length || 0} matches`}
                href="/candidate/matching?type=arrangedInterviews"
                Icon={MatchesIcon}
              />
            </div>

            <div className="bg-white p-6 sm:px-8 sm:py-8">
              <div className="flex justify-between items-center">
                <h3>
                  {t("candidate.visits.new-visits", {
                    visitsNumber: allVisitsInLastDayData?.data?.totalCount,
                  })}
                </h3>
                <Link href="/candidate/visits">
                  <Button variant="link" tw="w-auto px-0 md:px-[27px]">
                    {t("candidate.overview.show-all")}
                  </Button>
                </Link>
              </div>
              {allVisitsInLastDayData?.data ? (
                <ul className="space-y-3 mt-4 overflow-y-scroll max-h-19">
                  {allVisitsInLastDayData?.data?.visitorData?.map(
                    ({ company, id, createdAt }: any) => {
                      const date = showDate(createdAt);

                      return (
                        <CompanyListItem
                          key={`company-list-item-${id}`}
                          company={company}
                          id={id}
                          loading={allVisitsInLastDayLoading}
                          showMail={false}
                          textBelowName={
                            date
                              ? t("candidate.visits.viewed-ago", { date })
                              : t("candidate.visits.now")
                          }
                          text={
                            <div>
                              {company?.industries?.length > 0 &&
                              company?.industries[0]
                                ? company?.industries[0].name
                                : ""}{" "}
                              {company?.industries?.length > 1 &&
                              company?.industries[1]
                                ? "& " + company?.industries[1].name
                                : ""}
                            </div>
                          }
                          linkToProfileInActions
                        />
                      );
                    }
                  )}
                </ul>
              ) : null}
            </div>

            <section className="flex flex-col space-y-8">
              <div className="shadow-sm flex flex-col justify-between rounded px-5 sm:px-8 py-5 sm:py-12 bg-gradient-135-primary-light">
                <div className="space-y-8">
                  <h1 className="text-white">
                    {t("candidate.overview.complete-profile.title")}
                  </h1>
                  <p className="text-white text-lg leading-relaxed">
                    {t("candidate.overview.complete-profile.text")}
                  </p>
                </div>
                <Link href="/candidate/profile/personal">
                  <ArrowButton
                    variant="outline"
                    tw="self-end bg-white text-primary-light w-auto mt-8"
                  >
                    {t("candidate.overview.complete-profile.button")}
                  </ArrowButton>
                </Link>
              </div>
            </section>
            <section className="mt-10 lg:mt-56 mb-72 lg:mb-32 space-y-12 shadow-sm bg-white p-6 sm:px-8 sm:py-12">
              <h1 className="text-primary-light text-3xl font-bold leading-relaxed">
                {t("looking-for-job.how-does-it-work")}
              </h1>
              <HowDoesCampusWork
                containerStyle={{ padding: 0 }}
                steps={[
                  {
                    step: 1,
                    title: t("looking-for-job.how-does-it-work-step-1"),
                    message: landingData?.candidatePageRegistrationBox,
                    date: t("date-range", {
                      from: formatDate(new Date(landingData?.registrationOpenDate), true),
                      to: formatDate(new Date(landingData?.candidateRegistrationCloseDate), true),
                    }),
                  },
                  {
                    step: 2,
                    title: t("looking-for-job.how-does-it-work-step-2"),
                    message: landingData?.candidatePageMakeCVBox,
                  },
                  {
                    step: 3,
                    title: t("looking-for-job.how-does-it-work-step-3"),
                    message: landingData?.candidatePageRequestInterviewsBox,
                    date: t("date-range", {
                      from: formatDate(new Date(landingData?.matchingOpenDate), true),
                      to: formatDate(new Date(landingData?.matchingCloseDate), true),
                    }),
                  },
                  {
                    step: 4,
                    title: t("looking-for-job.how-does-it-work-step-4"),
                    message: landingData?.candidatePageInterviewDayBox,
                    date: t("date", {
                      date: formatDate(new Date(landingData?.eventDate), true),
                    }),
                  },
                ]}
              />
            </section>
            <div className="shadow-sm rounded bg-white">
              <div className="flex flex-col rounded px-8 py-8">
                <Agenda
                  containerStyle={{ padding: 0, margin: 0 }}
                  divStyle={{ padding: 0 }}
                  noIllustration
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-4 flex flex-col flex-grow">
            <InformationBoard />

            <div className="px-4 sm:px-9 pt-5 pb-8 bg-white rounded shadow-sm">
              <div className="mb-3 flex items-center justify-between flex-grow">
                <h3>{t("candidate.overview.pre-events.title")}</h3>
                <Link href="/candidate/pre-events">
                  <Button variant="link" tw="w-auto px-0 md:px-[27px]">
                    {t("candidate.overview.show-all")}
                  </Button>
                </Link>
              </div>
              <div className="pb-4">
                <PreEventCards
                  events={preEventsData || []}
                  showCount={2}
                  bg="light"
                />
              </div>
            </div>

            <section className="mt-10 lg:mt-56 mb-72 lg:mb-32 space-y-12 shadow-sm bg-white p-6 sm:px-8 sm:py-12">
              <h1 className="text-primary-light">
                {t("looking-for-talent.impressions.title")}
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

            <div className="bg-white flex-grow ">
              {infoData?.data?.candidateTopPicks && (
                <section className={c("markdown", previewClassName)}>
                  <div
                    className="content max-w-screen-sm mt-4 pr-9 xl:pr-40"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize((md.render(infoData?.data?.candidateTopPicks))),
                                                      }}
                  />
                </section>
              )}
            </div>

            <DownloadsSection />
          </div>
        </div>
      </Fragment>
    );
  }

  function renderBody() {
    if (eventPhase?.postMatching) {
      return postMatchingRender();
    }
    return regularRender();
  }

  return (
    <main className="flex flex-grow flex-col px-4 sm:px-12 py-4 sm:py-10 space-y-4 bg-light-soft">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-grow flex-col lg:flex-row space-x-0 space-y-4 lg:space-x-4 lg:space-y-0">
        {renderBody()}
      </div>

      <ModalBasic
        modalStatus={showModal}
        toggleModal={closeModal}
        closeIconColor="white"
        backgroundColor="bg-gradient-0-120-modal"
      >
        <div className="sm:pr-32">
          <h1 className="text-white mb-2">
            {t("candidate.overview.modal.title")}
          </h1>
          <p className="text-white mb-14">
            {t("candidate.overview.modal.lead")}
          </p>

          <ol className="number-list">
            <li>
              <div className="ml-10">
                <h4 className="text-white font-etrabold mb-2">
                  {t("candidate.overview.modal.info-1-title")}
                </h4>
                <p className="text-lead text-lg text-white leading-relaxed">
                  {t("candidate.overview.modal.info-1-description")}
                </p>
              </div>
            </li>

            <li>
              <div className="ml-10">
                <h4 className="text-white mb-2">
                  {t("candidate.overview.modal.info-2-title")}
                </h4>
                <p className="text-lead text-lg text-white leading-relaxed">
                  {t("candidate.overview.modal.info-2-description")}
                </p>
              </div>
            </li>
            <li>
              <div className="ml-10">
                <h4 className="text-white text-lg mb-2">
                  {t("candidate.overview.modal.info-3-title")}
                </h4>
                <p className="text-lead text-lg text-white leading-relaxed">
                  {t("candidate.overview.modal.info-3-description")}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </ModalBasic>
    </main>
  );
};

export default OverviewPage;
