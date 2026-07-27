"use client";
import Head from "next/head";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ListViewFeature } from "./_components/ListViewFeature";
import { useRouter } from "next/navigation";
import { currentYear } from "@/utils";
import { Modal } from "@/components/organisms/modal/Modal";
import { formatDate } from "@/utils/date";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { useGetBookingQuery } from "@/hooks/company/profile/useGetBookingQuery";
import { useEventPhase } from "@/utils/customHooks";

enum BookingProcessStateType {
  approved = "approved",
  requested = "requested",
}

const Page = () => {
  const t = useTranslations("companies");
  const router = useRouter();
  const [modalStatus, setModalStatus] = useState(false);
  const [canAccessTalentPool, setCanAccessTalentPool] = useState(false);

  const { eventPhase } = useEventPhase();
  const { data: eventData } = useGetLandingPageDataQuery();
  const { data: bookingData } = useGetBookingQuery() as any;

  const toggleModal = useCallback(() => {
    setModalStatus((prev) => !prev);
  }, []);

  useEffect(() => {
    if (bookingData?.data) {
      const hasBooking = bookingData.data.some(
        ({ bookingProcessState }: { bookingProcessState: string }) =>
          bookingProcessState === BookingProcessStateType.approved ||
          bookingProcessState === BookingProcessStateType.requested,
      );
      setCanAccessTalentPool(hasBooking);
    }
  }, [bookingData]);

  useEffect(() => {
    if (bookingData?.data !== undefined) {
      setModalStatus(!canAccessTalentPool);
    }
  }, [canAccessTalentPool, bookingData?.data]);

  useEffect(() => {
    if (canAccessTalentPool && eventPhase?.matching !== undefined) {
      setModalStatus(!eventPhase.matching);
    }
  }, [eventPhase?.matching, canAccessTalentPool]);

  const matchingOpenDate = () => {
    return formatDate(
      eventData?.data?.matchingOpenDate
        ? new Date(eventData.data.matchingOpenDate)
        : new Date(),
      "dd. MMMM yyyy",
    );
  };

  const getModalProps = () => {
    if (!canAccessTalentPool) {
      return {
        title: t("talent-pool.access-dialog-title", { currentYear }),
        description: t("talent-pool.access-dialog-lead"),
        textFirstBtn: t("talent-pool.access-dialog-cta"),
        onClickFirstBtn: () => router.push("/company/profile/bookings"),
        toggleModal,
        close: true,
      };
    }

    return {
      title: eventPhase?.postMatching
        ? t("matching.post-matching-dialog-title")
        : t("matching.access-dialog-title"),
      description: eventPhase?.postMatching
        ? t("matching.post-matching-dialog-lead")
        : t("matching.access-dialog-lead", {
            startMatchingDate: matchingOpenDate() || "N/A",
          }),
      textFirstBtn: eventPhase?.postMatching
        ? t("matching.post-matching-dialog-okay-button")
        : t("matching.access-dialog-back-to-dashboard-button"),
      onClickFirstBtn: eventPhase?.postMatching
        ? toggleModal
        : () => router.push("/company/overview"),
      toggleModal: eventPhase?.postMatching ? toggleModal : undefined,
      close: eventPhase?.postMatching ? true : false,
    };
  };

  const modalProps = getModalProps();

  return (
    <main className="flex flex-grow">
      <Head>
        <title>{t("talent-pool.title")}</title>
      </Head>
      <ListViewFeature />
      <Modal
        modalStatus={modalStatus}
        backgroundColor="bg-gradient-135-modal"
        title={modalProps.title}
        description={modalProps.description}
        textFirstBtn={modalProps.textFirstBtn}
        onClickFirstBtn={modalProps.onClickFirstBtn}
        toggleModal={modalProps.toggleModal}
        close={modalProps.close}
      />
    </main>
  );
};

export default Page;
