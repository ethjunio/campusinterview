"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ChatroomMenu from "./_components/ChatroomMenu";
import Messenger from "./_components/Messenger";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { Modal } from "@/components/organisms/modal/Modal";
import { formatDate } from "@/utils/date";

const page = () => {
  const router = useRouter();
  const t = useTranslations();

  const [modalStatus, setModalStatus] = useState(false);
  const [eventPhase, setEventPhase] = useState({
    matching: false,
    postMatching: false,
  });

  const { data } = useGetLandingPageDataQuery();

  useEffect(() => {
    if (data?.data?.matchingOpenDate && data?.data?.matchingCloseDate) {
      const today = new Date();
      const matchingOpenDate = new Date(data.data.matchingOpenDate);
      const matchingCloseDate = new Date(data.data.matchingCloseDate);
      const matchingCloseDatePlusOne = new Date(
        matchingCloseDate.getTime() + 86400000
      );

      if (matchingCloseDatePlusOne <= today) {
        eventPhase.postMatching = true;
      }

      if (matchingOpenDate <= today && matchingCloseDatePlusOne >= today) {
        eventPhase.matching = true;
      }

      setEventPhase({ ...eventPhase });
    }
  }, [data]);

  useEffect(() => {
    if (eventPhase?.matching !== undefined && data?.data !== undefined) {
      setModalStatus(!eventPhase?.matching);
    }
  }, [eventPhase]);

  const matchingOpenDate = () => {
    return formatDate(
      data?.data?.matchingOpenDate
        ? new Date(data?.data?.matchingOpenDate)
        : new Date(),
      "dd. MMMM yyyy"
    );
  };

  return (
    <main className="flex flex-grow">
      <Head>
        <title>Chatroom</title>
      </Head>
      <div className="hidden lg:block">
        <ChatroomMenu type="company" />
      </div>
      <Messenger />

      {!eventPhase.postMatching && (
        <Modal
          modalStatus={modalStatus}
          backgroundColor="bg-gradient-135-modal"
          title={t("candidate.matching.access-dialog-title")}
          description={t("candidate.matching.access-dialog-lead", {
            startMatchingDate: matchingOpenDate() || "N/A",
          })}
          textFirstBtn={t(
            "candidate.matching.access-dialog-back-to-dashboard-button"
          )}
          onClickFirstBtn={() => router.push("/company/overview")}
          close={false}
        />
      )}
    </main>
  );
};

export default page;
