"use client";
import React, { FC, Fragment } from "react";
import { TagList } from "@/components/molecules/Taglist";
import { ArrowButton } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import { useGetCompanyBookingsQuery } from "@/hooks/company/bookings/useGetCompanyBookingsQuery";
import { useEventPhase } from "@/utils/customHooks";
import { useGetIndustriesDropdownQuery } from "@/hooks/student/companymgmt/useGetIndustriesDropdownQuery";
import useMobileDetect from "@/utils/useMobileDetect";
import { useBookingsSummaryQ } from "../(layoutforms)/bookings/rooms/_components/hooks";

function getLeadState(
  t: any,
  bookings: any,
  totalroombooking: number,
): [string, string, string, string] {
  if (bookings.length === 0)
    return [
      "/company/profile/bookings/rooms",
      t("profile-cta-title-notRequested"),
      t("profile-cta-lead-notRequested"),
      t("profile-cta-button-notRequested"),
    ];
  const roomCount = totalroombooking;
  const requested = bookings.find(
    (b: any) => b.bookingProcessState === "requested",
  );
  if (requested) {
    return [
      "/company/profile/bookings",
      t(`profile-cta-title-requested`, {
        count: totalroombooking,
      }),
      t("profile-cta-lead-requested", { count: requested.roomBookCount }),
      t("profile-cta-button-requested"),
    ];
  }

  return [
    "/company/profile/bookings/rooms",
    t(`profile-cta-title-approved`, {
      count: roomCount,
    }),
    t("profile-cta-lead-approved"),
    t("profile-cta-button-approved"),
  ];
}

export const GeneralCard: FC<{
  companyId?: string;
  readonly?: boolean;
  children?: React.ReactNode;
}> = ({ children, companyId, readonly = true }) => {
  const t = useTranslations("companies");
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const { data: IndustryTags } = useGetIndustriesDropdownQuery();

  const { data } = useGetCompanyGeneralDataQuery() as any;
  const {
    data: { totalroombooking },
  } = useBookingsSummaryQ();

  const { data: BookingList, isLoading } = useGetCompanyBookingsQuery();

  const { eventPhase } = useEventPhase();

  const [href, leadTitle, leadText, leadButton] = !isLoading
    ? getLeadState(t, BookingList?.data, totalroombooking)
    : ["", "", "", ""];

  const tags = IndustryTags?.data || [];

  const initialIndustries = data?.CompanyIndustries
    ? tags.filter((tag: any) =>
      data.CompanyIndustries.some((ci: any) => ci.industryId === tag.id),
    )
    : [];

  function calculateTotalRoomCount(bookings: any[]): string {
    if (!Array.isArray(bookings)) return "0 Rooms";

    const count = bookings.reduce((total, booking) => {
      if (!Array.isArray(booking.rooms)) return total;

      const roomCount = booking.rooms.reduce((roomTotal: number, room: any) => {
        if (room.name === "Workshop") return roomTotal;

        const companyBooking = room.CompanyBookingRoom;
        if (!companyBooking || typeof companyBooking !== "object") return roomTotal;

        const num = Number(companyBooking.roomBookCount) || 0;
        return roomTotal + num;
      }, 0);

      return total + roomCount;
    }, 0);

    return `${count} ${count === 1 ? "Room" : "Rooms"}`;
  }

  return (
    <Fragment>
      <div className="relative bg-white flex w-full items-start justify-between mt-32 lg:mt-48 pb-8 px-4 lg:px-10 flex-col lg:flex-row">
        <div className="relative flex w-full justify-between align-stretch">
          <div
            className="w-full lg:w-6/12 xl:w-8/12"
            style={{ minHeight: "268px" }}
          >
            <div className="lg:flex flex-grow lg:flex-col h-20 lg:h-auto mb-14">
              {data?.imageUrl ? (
                <img
                  className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full"
                  src={data?.imageUrl}
                />
              ) : (
                <PlaceholderImage className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full" />
              )}

              <div className="flex flex-col ml-36 lg:ml-48 pt-4">
                <h1 className="text-2xl lg:text-5xl lg:leading-12 font-bold">
                  {data?.name}
                </h1>
              </div>
            </div>
            <div>
              <div className="mt-6 lg:mt-6 ml-0 lg:ml-48">
                <TagList tags={initialIndustries} />
              </div>
            </div>

            <p className="lead-text lg:ml-10 mt-6 mb-6 whitespace-pre-line break-words">
              {data?.description}
            </p>

            <div>
              <a
                className="ml-0 lg:ml-10 text-lg lg:text-xl"
                href={
                  data?.website?.startsWith("http")
                    ? data?.website
                    : `https://${data?.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.website}
              </a>
            </div>
          </div>

          {eventPhase?.companyBooking && (
            <div className="hidden sm:flex w-full sm:w-84 xl:absolute right-0 mr-auto ml-4 lg:mr-10 lg:ml-0 mt-6 lg:-mt-8 flex-grow-0 flex-col items-end justify-between rounded-md p-10  bg-gradient-135-cta">
              <div>
                {/* <h3 className="text-white">{leadTitle}</h3> */}

                <h3 className="text-white">{BookingList?.data?.length ? calculateTotalRoomCount(BookingList?.data) : "0 Rooms"}</h3>
                <div className="general-text mt-6 font-semibold text-white">
                  {leadText}
                </div>
              </div>
              <Link href={href}>
                <ArrowButton tw="mt-12" variant="outline">
                  {leadButton}
                </ArrowButton>
              </Link>
            </div>
          )}

          {!isMobile && readonly && (
            <div className="flex flex-col flex-grow items-end justify-between mt-6">
              {children}
            </div>
          )}
        </div>
        {isMobile && readonly && (
          <div className="w-full flex flex-col flex-grow items-center mt-8">
            {children}
          </div>
        )}
      </div>
      {eventPhase?.companyBooking && (
        <div className="sm:hidden px-4">
          <div className="w-full sm:w-84 lg:absolute right-0 mr-auto ml-auto lg:ml-0 mt-6 lg:-mt-8 flex flex-grow-0 flex-col items-end justify-between rounded-md px-5 py-4 sm:px-10 sm:py-10  bg-gradient-135-cta">
            <div>
              <h3 className="text-white">{leadTitle}</h3>
              <div className="general-text mt-6 font-semibold text-white">
                {leadText}
              </div>
            </div>
            <Link href={href}>
              <ArrowButton tw="mt-4" variant="outline">
                {leadButton}
              </ArrowButton>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};
