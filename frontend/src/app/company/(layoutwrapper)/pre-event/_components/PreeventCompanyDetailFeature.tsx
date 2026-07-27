"use client";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fromISOtoDate, fromISOtoDateStatic } from "@/utils/date";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/organisms/modal/Modal";
import styles from "@/app/candidate/(layoutwrapper)/pre-events/_components/PreEventDetail.module.scss";
import c from "classnames";
import { BackLink } from "@/components/atoms/BackLink";
import useScroll from "@/utils/scrollHook";
import { useGetPreeventDetailDataQuery } from "@/hooks/company/preevents/useGetPreeventDetailDataQuery";
export const PreeventCompanyDetailFeature: FC<{ id: string }> = ({ id }) => {
  const t = useTranslations();

  const { data } = useGetPreeventDetailDataQuery(id);
  const router = useRouter();

  const [showText, setShowText] = useState(true);
  const { scrollDirection } = useScroll();

  function handleResize() {
    const preEventDescriptionEl = document.getElementById(
      "preEventDescription"
    );

    if (preEventDescriptionEl) {
      const height = preEventDescriptionEl.offsetHeight;

      document.getElementById("preEventBackground").style.height =
        height + "px";
    }
  }

  useEffect(() => {
    if (scrollDirection === "up") {
      setShowText(false);
    } else if (scrollDirection === "down") {
      setShowText(true);
      setTimeout(() => {
        handleResize();
      }, 10);
    }
  }, [scrollDirection]);

  useEffect(() => {
    // we have to wait for the preEventDescription to render and then get its height
    // so that's why here is a hacky set timeout for 100 miliseconds
    setTimeout(() => {
      handleResize();
    }, 100);
  }, [data?.data.imageUrl]);

  //   window?.addEventListener('resize', handleResize);

  return (
    <>
      <BackLink
        className="relative sm:absolute top-0 left-0 mt-4 mb-4 sm:mb-0 ml-4 sm:ml-8 z-10"
        href="/company/pre-event"
      >
        {/* {t('common.back')} */}
        back to events
      </BackLink>
      {data?.data ? (
        <div className="relative flex flex-col sm:flex-row bg-whit h-100">
          <div
            className={c(
              styles.imageCover,
              "md:w-1/2 sm:w-full justify-center items-center mt-20"
            )}
            // style={{ backgroundImage: `url(${data?.preevent.imageUrl})` }}
          >
            {data?.data?.imageUrl ? (
              <img
                className={`${styles.preEventImage} px-4 sm:px-8`}
                src={`${data?.data.imageUrl}`}
              ></img>
            ) : (
              <img
                className={`${styles.preEventImage} px-4 sm:px-8`}
                src="/img/FallBack.jpg"
              ></img>
            )}
          </div>

          <div
            id="preEventDescription"
            className="md:w-1/2 sm:w-full px-4 sm:py-10 py-5 space-y-4"
          >
            <div className="p-4 sm:p-8 space-y-4">
              <div>
                <div className="flex sm:items-center items-start justify-between flex-grow flex-col-reverse sm:flex-row ">
                  <div>
                    <span>{data?.data.company.name}</span>
                    <h1 className="mb-2 lg:mb-4">{data?.data.title}</h1>
                  </div>
                  <Link className="pb-2 sm:pb-0" href={`/company/pre-event/participant-list?id=${id}`}>
                    <Button variant="primary-light">
                      {t("companies.pre-event.button-list")}
                    </Button>
                  </Link>
                </div>
                <p className="lead-text flex-auto whitespace-pre-line text-justify">
                  {data?.data.description}
                </p>
              </div>
              

              
              <div className="flex space-x-4 h-full bg-light-soft flex-shrink flex-grow-0 p-4 lg:p-8 rounded-md w-full">
                <div className="text-dark w-full">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td>{t("companies.pre-event.info-box.type")}</td>
                        <td className="capitalize font-extrabold pl-8 text-right">
                          {data?.data.type}
                        </td>
                      </tr>

                      <tr>
                        <td className="pt-4">
                          {t("companies.pre-event.info-box.date-and-time")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {fromISOtoDateStatic(data?.data?.eventDate)},{" "}
                          {data?.data?.eventTime}
                        </td>
                      </tr>

                      <tr>
                        <td className="pt-4">
                          {t("companies.pre-event.info-box.deadline")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {fromISOtoDateStatic(
                            data?.data?.registrationDeadline
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="pt-4">
                          {t("companies.pre-event.info-box.location")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {data?.data.address}
                        </td>
                      </tr>

                      <tr>
                        <td className="pt-4">
                          {t("companies.pre-event.info-box.website")}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {data?.data.website}
                        </td>
                      </tr>

                      <tr>
                        <td className="pt-4">
                          {t(
                            "companies.pre-event.info-box.number-of-participants"
                          )}
                        </td>
                        <td className="font-extrabold pl-8 pt-4 text-right">
                          {data?.data.participants?.length}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
