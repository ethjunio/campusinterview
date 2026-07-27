"use client";
import keyBy from "lodash/fp/keyBy";
import mapKeys from "lodash/fp/mapKeys";
import pipe from "lodash/fp/pipe";
import {
  GetRoomTypes_getRoomTypes,
  GetRoomTypes,
  GetCompanyBookingState,
  GetAdditionalServiceTypes,
  RoomType,
  GetSummary,
  GetSummary_rooms,
} from "../../_components/types";
import { useGetCompanyBookingsQuery } from "@/hooks/company/bookings/useGetCompanyBookingsQuery";
import { useGetAdditionalServicesQuery } from "@/hooks/company/bookings/useGetAdditionalServicesQuery";
import { useBookingStore } from "@/app/store/bookingStore";
import { useServicesStore } from "@/app/store/servicesStore";
import { getServicePriceAmount } from "../../_components/servicePrice";

const idToRoomType: { [id: number]: RoomType } = {
  1: "economy",
  2: "premium",
  3: "workshop",
};

function toRoomTypes(data = []): {
  economy: GetRoomTypes_getRoomTypes;
  premium: GetRoomTypes_getRoomTypes;
  workshop: GetRoomTypes_getRoomTypes;
} {
  return pipe(
    keyBy("id"),
    mapKeys((id) => idToRoomType[id])
  )(data);
}
// export function useRoomTypesQ() {
//   const { data } = useQuery<GetRoomTypes>(RoomTypesQ);

//   return toRoomTypes(data?.getRoomTypes);
// }

// export function useAdditionalServicesQ() {
//   return useQuery<GetAdditionalServiceTypes>(AdditionalServiceTypesQ);
// }

// export const GetWaitinListIdsQ = gql`
//   query GetWaitingListIds {
//     waitingListIds @client
//   }
// `;
interface RoomInfo {
  id: number;
  name: string;
  CompanyBookingRoom?: { roomBookCount: number | null };
}
interface BookingEntry {
  rooms: RoomInfo[];
  // …other props
}

export function useBookingsSummaryQ() {
  const {
    setRoomTypes,
    calculatePrices,
    roomTypes: storedRoomTypes,
  } = useBookingStore();

  const { data, isLoading } = useGetAdditionalServicesQuery();

  const { services, setServices, toggleService } = useServicesStore();

  const { data: bookings } = useGetCompanyBookingsQuery();

  function summarizeRoomCounts(bookings: BookingEntry[]) {
    const allRooms = bookings?.flatMap((b) => b.rooms ?? []);
    const counts = allRooms?.reduce<Record<number, number>>((acc, room) => {
      const booked = room?.CompanyBookingRoom?.roomBookCount ?? 0;
      acc[room?.id] = (acc[room?.id] ?? 0) + booked;
      return acc;
    }, {});
    return {
      economyRoom: counts ? counts[1] ?? 0 : 0,
      businessRoom: counts ? counts[2] ?? 0 : 0,
      workshopRoom: counts ? counts[3] ?? 0 : 0,
    };
  }
  function calculateRoomCost(
    currentPrice: number,
    count: number,
    totalBookings: number
  ): number {
    if (count < 1) return 0;

    const fullPrice = currentPrice;
    const extraPrice = currentPrice / 2 - 5;
    const extras = count - 1;

    if (totalBookings === 0) {
      return fullPrice + Math.max(0, extras) * extraPrice;
    } else {
      return count * extraPrice;
    }
  }

  const { economy, premium, workshop } = toRoomTypes(storedRoomTypes);
  let room: any = [];
  let roomprices: any = {
    premium: 0,
    economy: 0,
    workshop: 0,
  };

  if (economy?.count) room?.push(economy);
  if (premium?.count) room?.push(premium);
  if (workshop?.count) room?.push(workshop);

  const servicesData = (services || []).filter((s) => s.selected);

  let totalCost = 0;

  const totalBookings = bookings?.data
    ?.filter((b: any) => room?.some((r: any) => r?.name === b?.roomType?.name))
    .reduce((sum: any, b: any) => sum + Number(b.roomBookCount), 0);
  const { economyRoom, businessRoom, workshopRoom } = summarizeRoomCounts(
    bookings?.data
  );

  let totalRoomCost = 0;
  for (const rooms of room) {
    const totalBookedForType = bookings?.data
      ?.filter((b) => b?.rooms?.some((r: any) => r?.name === rooms?.name))
      .reduce((sum, b) => sum + Number(b?.roomBookCount), 0);

    let roomCost: number;
    if (rooms.name !== "Workshop") {
      roomCost = calculateRoomCost(
        Number(rooms.currentPrice),
        Number(rooms.count),
        totalBookedForType
      );
    } else {
      if (totalBookedForType === 0 && rooms?.count >= 1) {
        roomCost =
          Number(rooms?.currentPrice) +
          (Number(rooms?.count) - 1) * Number(rooms?.currentPrice);
      } else {
        roomCost = Number(rooms?.count) * Number(rooms?.currentPrice);
      }
    }
    roomprices[rooms?.name] = roomCost;
    totalRoomCost += roomCost;
  }

  const servicesCost = servicesData?.reduce(
    (acc, el) => acc + getServicePriceAmount(el),
    0
  );

  totalCost = Number(totalRoomCost) + Number(servicesCost);

  const totalroombooking = economyRoom + businessRoom + workshopRoom;

  return {
    data: {
      room,
      servicesData,
      totalCost,
      //   billingAddress: data?.billingAddress,
      totalBookings,
      roomCost: totalRoomCost,
      roomprices,
      //   waitingListIds: waitingListIds,
      totalroombooking,
    },
    isLoading,
  };
}

// export function useRoomsLeft() {
//   const { data } = useQuery<GetRoomTypes>(RoomTypesQ);

//   return (
//     data?.getRoomTypes?.reduce(
//       (acc, el) => ({
//         ...acc,
//         premium: el.id == 1 ? el.availableCount : acc.premium,
//         economy: el.id == 2 ? el.availableCount : acc.economy,
//       }),
//       { premium: 0, economy: 0 },
//     ) || { premium: undefined, economy: undefined }
//   );
// }
