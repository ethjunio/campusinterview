"use client";
import React, { useCallback, useEffect } from "react";
import { NextPage } from "next";
import { compose } from "lodash/fp";
import { useTranslations } from "next-intl";
import { BackLink } from "@/components/atoms/BackLink";
import { Services } from "./Services";
import { useRouter } from "next/navigation";
import { ProcessInfo } from "../../rooms/_components/ProcessInfo";
import Head from "next/head";
import { useGetAdditionalServicesQuery } from "@/hooks/company/bookings/useGetAdditionalServicesQuery";
import { useGetCompanyWaitingListQuery } from "@/hooks/company/matching/useGetCompanyWaitingListQuery";
import { BookingPageProps } from "../../_components/types";
import { useBookingsSummaryQ } from "../../rooms/_components/hooks";
import { useServicesStore } from "@/app/store/servicesStore";
import { useGetCompanyBookingsQuery } from "@/hooks/company/bookings/useGetCompanyBookingsQuery";

const AdditionalServices: NextPage<BookingPageProps> = ({ bookings }) => {
  const t = useTranslations();
  const router = useRouter();
  const { data: getCompanyWaitingList } = useGetCompanyWaitingListQuery();
  const { data: bookings112233 } = useGetCompanyBookingsQuery();
  const { data, isLoading } = useGetAdditionalServicesQuery();
  const { services, setServices, toggleService } = useServicesStore();
  const hasServicesChanged = (apiData: any[], storeData: any[]) => {
    if (!apiData || !storeData || apiData.length !== storeData.length)
      return true;

    return apiData.some((apiService, index) => {
      const storeService = storeData[index];
      return (
        apiService.id !== storeService.id ||
        apiService.availableCount !== storeService.availableCount ||
        apiService.price !== storeService.price ||
        apiService.isPriceOnRequest !== storeService.isPriceOnRequest
      );
    });
  };
  useEffect(() => {
    if (
      hasServicesChanged(data?.data, services) ||
      !services ||
      services.length === 0
    ) {
      setServices(data?.data);
    }
  }, [data, services, setServices]);

  const onNext = useCallback(() => {
    router.push("/company/profile/bookings/summary");
  }, []);

  const usedServiceIds = bookings112233?.data?.reduce(
    (acc:any, el:any) => acc.concat(el.additionalServices.map(({ id }:any) => id)),
    []
  );

  const workshopId = 2;
  const presentationId = 3;
  const hideMiniBooth = usedServiceIds?.includes(1);
  const hidePreEvents1 = usedServiceIds?.includes(workshopId);
  const hidePreEvents2 = usedServiceIds?.includes(presentationId);

  // const services = data?.data || [];

  const {
    data: { totalCost },
  } = useBookingsSummaryQ();

  const waitingListLength = getCompanyWaitingList?.data?.length;

  const backHref =
    waitingListLength > 0
      ? "/company/profile/bookings/fill-slots"
      : "/company/profile/bookings/rooms";

  return (
    <main className="relative flex-grow bg-light-soft pt-4">
      <Head>
        <title>{t("companies.bookings.services-head")}</title>
      </Head>
      <div className="lg:mb-16">
        <BackLink
          className="mt-4 ml-4 lg:ml-10 text-primary-light"
          href={backHref}
        >
          {t("common.back")}
        </BackLink>
        <div>
          <div className="px-4 lg:px-10 mt-4 max-w-xl ">
            <h1>{t("companies.bookings.add-services-heading")}</h1>
            <p className="lead-text mt-2">
              {t("companies.bookings.add-services-lead")}
            </p>
          </div>
          <Services
            {...{
              hideMiniBooth,
              hidePreEvents1,
              hidePreEvents2,
              services,
              usedServiceIds,
            }}
          />
        </div>
      </div>

      <ProcessInfo onNext={onNext} disabled={totalCost === 0} />
    </main>
  );
};

export default AdditionalServices;
