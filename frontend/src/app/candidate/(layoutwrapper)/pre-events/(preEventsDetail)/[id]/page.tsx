"use client";
import { BackLink } from "@/components/atoms/BackLink";
import { useGetPreeventsDetailsByIdQuery } from "@/hooks/student/eventmgmt/useGetPreeventsDetailsByIdQuery";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import c from "classnames";
import styles from "./PreEventDetail.module.scss";
import useScroll from "@/utils/scrollHook";
import { Button } from "@/components/atoms/Button";
import TickIcon from "@/icons/ic-accept.svg";
import QuestionMarkIcon from "@/icons/ic-waitinglist.svg";
import { useCreateParticipateInEventMutation } from "@/hooks/student/eventmgmt/useCreateParticipateInEventMutation";
import { useDeleteWithdrawfromEventMutation } from "@/hooks/student/eventmgmt/useDeleteWithdrawfromEventMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fromISOtoDate } from "@/utils/date";

const Page = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const t = useTranslations();
  const params = useParams();
  const { id } = params;

  const { scrollDirection } = useScroll();
  const [showText, setShowText] = useState(true);
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetPreeventsDetailsByIdQuery(Number(id));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("auth-storage");
      if (authData) {
        try {
          const parsedData = JSON.parse(authData);
          const id = parsedData?.state?.user?.candidateId || null;
          setUserId(id);
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const desc = document.getElementById("preEventDescription");
      const bg = document.getElementById("preEventBackground");
      if (desc && bg) {
        bg.style.height = `50vh`;
        desc.style.height = `50vh`;
        desc.style.overflowY = "scroll";
      }
    };

    setTimeout(() => handleResize(), 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data?.data?.imageUrl]);

  useEffect(() => {
    if (scrollDirection === "up") setShowText(false);
    else if (scrollDirection === "down") {
      setShowText(true);
      setTimeout(() => {
        const desc = document.getElementById("preEventDescription");
        const bg = document.getElementById("preEventBackground");
        if (desc && bg) bg.style.height = `${desc.offsetHeight}px`;
      }, 10);
    }
  }, [scrollDirection]);

  const isDeadlineOver =
    new Date() > new Date(data?.data?.registrationDeadline);

  let participant = [];
  participant = data?.data?.participants?.filter(
    (p: any) => p.candidate.id === userId,
  );

  let participantState = "";
  if (participant?.length > 0) {
    participantState = participant[0].state;
  }

  const createParticipateInEventMutation = useCreateParticipateInEventMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPreeventsDetailsApi", Number(id)],
      });
      toast.success("Applied successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const deleteWithdrawFromEvent = useDeleteWithdrawfromEventMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPreeventsDetailsApi", Number(id)],
      });
      toast.success("Withdraw successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return (
    <main className="relative flex flex-col flex-grow bg-white">
      <Head>
        <title>{t("candidate.overview.pre-events.head")}</title>
      </Head>
      <BackLink
        className="relative sm:absolute top-0 left-0 mt-4 mb-4 sm:mb-0 ml-4 sm:ml-8 z-10"
        href="/candidate/pre-events"
      >
        {t("common.back")}
      </BackLink>

      {data?.data && (
        // <div className="relative flex flex-col sm:flex-row bg-white">
        <>
          {/* Image Section */}
          <div
            className={c(
              // styles.imageCover,
              "relative h-[210px] md:h-[calc(100vh-56px)] xl:h-[calc(100vh-49px)] flex justify-center items-center",
            )}
          >
            <img
              // className={`${styles.preEventImage} px-4 sm:px-8`}
              className="w-full h-full object-cover object-[15%_15%]"
              src={data.data.imageUrl || "/img/FallBack.jpg"}
              alt="Pre Event"
            />
          </div>
          <div>
            <div
              id="preEventBackground"
              className={`${styles.preEventBackground}`}
              // style={{ height: "573px" }}
            />
            {/* Description Section */}
            <div
              id="preEventDescription"
              className="absolute bottom-0 w-full sm:px-16 px-4 sm:py-10 py-5 space-y-4"
            >
              {/* <div className="p-4 sm:p-8 space-y-4"> */}
              <div className="flex sm:items-center items-start justify-between flex-grow flex-col sm:flex-row">
                <div>
                  <span>{data.data.company.name}</span>
                  <h1 className="mt-2 mb-4 sm:mb-8">{data.data.title}</h1>
                </div>

                {data?.data?.participants
                  .map(({ candidate }: any) => candidate.id)
                  .includes(userId) ? (
                  <>
                    {!isDeadlineOver ? (
                      <Button
                        onClick={() =>
                          deleteWithdrawFromEvent.mutate({
                            preeventId: Number(id),
                          })
                        }
                        disabled={isLoading || !data}
                      >
                        {t("candidate.overview.pre-events.button-withdraw")}
                      </Button>
                    ) : (
                      <>
                        {participantState === "applied" ? (
                          <div className="flex flex-row items-center">
                            <QuestionMarkIcon className="p-1 mr-2 w-8 h-8 fill-current text-info" />
                            <h5>
                              {t(
                                "candidate.overview.pre-events.info-box.applied-state",
                              )}
                            </h5>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center">
                            <TickIcon className="p-1 mr-2 w-8 h-8 fill-current text-info" />
                            <h5>
                              {t(
                                "candidate.overview.pre-events.info-box.invited-state",
                              )}
                            </h5>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {!isDeadlineOver ? (
                      <Button
                        onClick={() =>
                          createParticipateInEventMutation.mutate({
                            preeventId: Number(id),
                          })
                        }
                        disabled={isLoading || !data}
                      >
                        {t("candidate.overview.pre-events.button-apply")}
                      </Button>
                    ) : (
                      <>
                        {participantState !== "" ? (
                          <>
                            {participantState === "applied" ? (
                              <div className="flex flex-row items-center">
                                <QuestionMarkIcon className="p-1 mr-2 w-8 h-8 fill-current text-info" />
                                <h5>
                                  {t(
                                    "candidate.overview.pre-events.info-box.applied-state",
                                  )}
                                </h5>
                              </div>
                            ) : (
                              <div className="flex flex-row items-center">
                                <TickIcon className="p-1 mr-2 w-8 h-8 fill-current text-info" />
                                <h5>
                                  {t(
                                    "candidate.overview.pre-events.info-box.invited-state",
                                  )}
                                </h5>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <h5>
                              {t(
                                "candidate.overview.pre-events.info-box.registration-closed",
                              )}
                            </h5>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Description + Table */}
              <div className="pt-3 flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
                <p className="md:minw-1/2 md:w-1/2 lead-text flex-auto whitespace-pre-line">
                  {data.data.description}
                </p>

                <div className="flex space-x-4 h-full bg-light-soft flex-shrink flex-grow-0 p-5 sm:p-8 rounded-md md:w-1/2 max-w-lg">
                  <table className="text-dark">
                    <tbody>
                      <tr>
                        <td>
                          {t("candidate.overview.pre-events.info-box.type")}
                        </td>
                        <td className="font-extrabold pl-8 text-right">
                          {data.data.type}
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-4">
                          {t(
                            "candidate.overview.pre-events.info-box.date-and-time",
                          )}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {fromISOtoDate(data.data.eventDate)},{" "}
                          {data.data.eventTime}
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-4">
                          {t("candidate.overview.pre-events.info-box.deadline")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {fromISOtoDate(data.data.registrationDeadline)}
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-4">
                          {t("candidate.overview.pre-events.info-box.location")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {data.data.address}
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-4">
                          {t("candidate.overview.pre-events.info-box.website")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {data.data.website}
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-4">
                          {t(
                            "candidate.overview.pre-events.info-box.number-of-participants",
                          )}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {data.data.maxParticipants}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
