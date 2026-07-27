"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import Head from "next/head";
import { BookingOverview } from "./_components/BookingOverview";
import { useEventPhase } from "@/utils/customHooks";
import { useGetCompanyBookingsQuery } from "@/hooks/company/bookings/useGetCompanyBookingsQuery";
import { useRouter } from "next/navigation";

const Page = () => {
  const t = useTranslations("companies");
  const router = useRouter();

  const { data: BookingList, isLoading } = useGetCompanyBookingsQuery();

  const activeRequest =
  BookingList?.data?.filter(
    (el) => el.bookingProcessState === "requested",
  ).length > 0;

  const { eventPhase }  = useEventPhase() as any;


  

  return (
    <main className="bg-white flex-grow w-full lg:max-w-screen-md">
      <Head>
        <title>{t('bookings.completed-head')}</title>
      </Head>
      <h1>{t('bookings.title')}</h1>
      <div className="mt-4 lead-text">
        {eventPhase?.companyBooking
          ? t('bookings.subtitle')
          : t('bookings.closed-phase')}
      </div>
      <div className="mt-6 vstack vstack-10">
        <BookingOverview />
        {/* <Link href="/company/profile/bookings/rooms"> */}
          {eventPhase?.companyBooking ? (
            <Button  onClick={() => {
              if (!activeRequest) {
                router.push('/company/profile/bookings/rooms');
              }
            }} disabled={activeRequest} tw="self-end">
              {true
                ? t('bookings.button-add-rooms')
                : t('bookings.button-add-bookings')}
            </Button>
          ) : (
            <></>
          )}
        {/* </Link> */}
      </div>
    </main>
  );
};

export default Page;
