"use client";
import React, { FC, useMemo } from "react";
import { CardList, CardItem } from "@/components/molecules/CardList";
import { useTranslations } from "next-intl";
import {
  roomIdToIcon,
  roomIdToTitle,
  serviceIdToIcon,
  serviceIdToTitle,
} from "../../../_components/onlineCampus/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { useBookingsSummaryQ } from "../../../rooms/_components/OnlineCamousInterview/hooks";
import { BillingForm } from "./BillingForm";
import { useCreateServiceBookingMutation } from "@/hooks/company/bookings/useCreateServiceBookingMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useServicesStore } from "@/app/store/servicesStore";
import { useBookingStore } from "@/app/store/bookingStore";
import { useBookingSummaryDetailsQuery } from "@/hooks/company/bookings/usebookingServiceDetails";
import { ServicePriceText } from "../../../_components/ServicePriceText";

export interface BookingData {
  id: number;
  roomBookCount: number;
  price: string;
  billingName: string;
  billingEmail: string;
  salutation:  {
    label: string,
    value: string,
  };
  firstName: string;
  lastName: string;
  streetAddress: string;
  additionalAddress: string;
  postBox: string;
  postCode: string;
  city: string;
  country: string;
  invoiceNumber: string;
  bookingProcessState: string;
  companyId: string;
  roomTypeId: number;
  additionalServices: AdditionalService[];
  roomType: RoomType;
  company: Company;
}

interface AdditionalService {
  id: number;
  name: string;
  availableCount: number;
  price: string;
}

interface RoomType {
  id: number;
  name: string;
  availableCount: number;
  maxCountPerCompany: number;
  price: string;
}

interface Company {
  id: string;
  userId: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  imageUrlSmall: string;
  name: string;
  website: string;
  onboardingState: string;
  corporateActivity: string;
  description: string;
  philosophy: string;
  swissOfficeLocation: string;
  headquarterLocation: string;
  swissEmployeeCount: number;
  worldEmployeeCount: number;
  shareOfGraduates: string | null;
  lookingFor: string;
  culture: string;
  weOffer: string;
  startingSalary: string;
  approved: boolean;
  registrationDate: string;
  mainLanguageId: string;
  interviewSlots: number;
  areDailyNotificationsEnabled: boolean;
  keepProfile: boolean;
  user_id: string;
}

interface Room {
  id: number;
  name: string;
  availableCount: number;
  maxCountPerCompany: number;
  price: string;
  count: number;
  remaining: number;
  currentPrice: string;
}

type FormValues = typeof defaultInitialValues;
const defaultInitialValues = {
  billingName: "",
  billingEmail: "",
  salutation:  {
    label: "",
    value: "",
  },
  firstName: "",
  lastName: "",
  streetAddress: "",
  additionalAddress: "",
  postBox: "",
  postCode: "",
  city: "",
  country: "",
  invoiceNumber: "",
  accept: false,
};
export const OnlineBookingSummary: FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: {
      room,
      servicesData,
      totalCost,
      //   billingAddress,
      totalBookings,
      //   waitingListIds,
      roomCost,
      roomprices
    },
    isLoading,
  } = useBookingsSummaryQ();
  const { data: bookingSummaryDetails } = useBookingSummaryDetailsQuery();

  const { resetServices } = useServicesStore(); // Import the reset function
  const { resetBookings } = useBookingStore();
  const createCompanyBookingMutation = useCreateServiceBookingMutation({
    onSuccess: (success: any) => {
      // ✅ Clear stored services after successful booking
      resetServices();
      resetBookings();
      toast.success(success?.message);
      router.push("/company/profile/bookings/completed");
      queryClient.invalidateQueries({
        queryKey: ["getCompanyReceivedRequest"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  interface Option {
    label: string;
    value: string;
  }
  
  const originalValues = useMemo<FormValues>(() => {
    const d = bookingSummaryDetails?.data;
  let salOption: Option = { label: "", value: "" };

  if (d?.salutation) {
    // if the API gave you a plain string
    if (typeof d.salutation === "string") {
      salOption = { label: d.salutation, value: d.salutation };
    }
    // or if it already gave you an Option
    else if (
      typeof d.salutation === "object" &&
      "value" in d.salutation &&
      typeof d.salutation.value === "string"
    ) {
      salOption = { label: d.salutation.value, value: d.salutation.value };
    }
  }
    return {
      billingName: d?.billingName ?? "",
      billingEmail: d?.billingEmail ?? "",
      salutation:  salOption,
      firstName: d?.firstName ?? "",
      lastName: d?.lastName ?? "",
      streetAddress: d?.streetAddress ?? "",
      additionalAddress: d?.additionalAddress ?? "",
      postBox: d?.postBox ?? "",
      postCode: d?.postCode ?? "",
      city: d?.city ?? "",
      country: d?.country ?? "",
      invoiceNumber: d?.invoiceNumber ?? "",
      accept: false,
    };
  }, [bookingSummaryDetails?.data]);

  
  return (
    <>
      <CardList className="max-w-xl">
        {room?.length > 0 &&
          (room?.map((rom: any) => {
            return (
              <CardItem key={rom.id} loading={isLoading}>
                <CardItem.Icon>{roomIdToIcon[rom.id]}</CardItem.Icon>
                <CardItem.Title>
                  {rom.count} {roomIdToTitle[rom.id]}
                  {/* {t(roomIdToTitle[room.id], { count: room.count })} */}
                </CardItem.Title>
                <CardItem.Info>
                  {t("common.price", {
                    price: roomprices[rom?.name],
                    // totalBookings === 0
                    //   ? Number(room?.currentPrice) +
                    //     ((Number(room?.count) - 1) * Number(room?.currentPrice)) /
                    //       2
                    //   : Number(room?.count) * Number(room?.currentPrice),
                  })}
                </CardItem.Info>
              </CardItem>
            );
          }))}

        {servicesData.map((service) => (
          <CardItem key={service.id} loading={isLoading}>
            <CardItem.Icon>{serviceIdToIcon[service.id]}</CardItem.Icon>
            <CardItem.Title>{t(serviceIdToTitle[service.id])}</CardItem.Title>
            <CardItem.Info>
              <ServicePriceText service={service} />
            </CardItem.Info>
          </CardItem>
        ))}

        <CardList.Summary totalCost={totalCost}>
          {t(`companies.bookings.summary-total-cost`)}
          {t(`companies.bookings.summary-vat-info`)}
        </CardList.Summary>
      </CardList>

      {/* <span className="danger-text">{error}</span> */}
      <BillingForm
        initialValues={
          bookingSummaryDetails?.data ? originalValues : defaultInitialValues
        }
        onSubmit={async (values) => {
          console.log(values,"totalCost111111")
          createCompanyBookingMutation.mutate({
            ...values,
            roomBookCount: room ? room?.reduce((sum: number, room: Room) => sum + room.count, 0) : 0,
            // roomTypeId: room ? room.id : null,
            // roomArray: room?.length>0 ?  room?.map((rooms:any) => ({
            //   roomTypeId: rooms.id,
            //   roomBookCount: rooms.count
            // })):[],
            roomArray: room.map((rom:any) => ({
              roomTypeId: rom.id,
              roomBookCount: rom.count
            })),
            additionalServiceTypes: servicesData.map(({ id, name }) => ({
              id,
              name,
            })),
            price: totalCost,
            salutation:values?.salutation?.value
            // waitingListIds: waitingListIds,
          });
        }}
      >
        <Button type="submit">
          {t("companies.bookings.button-complete-booking")}
        </Button>
      </BillingForm>
    </>
  );
};
