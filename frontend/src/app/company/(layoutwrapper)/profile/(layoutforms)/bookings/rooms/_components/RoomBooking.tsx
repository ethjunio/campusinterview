import React, { FC } from 'react';
import { EconomyRoom } from './EconomyRoomCard';
import { BusinessRoom } from './BusinessRoomCard';
import { WorkshopRoom } from './WorkshopRoomCard';

interface GetRoomTypes_getRoomTypes {
    __typename: 'RoomType';
    id: number;
    name: string;
    availableCount: number;
    price: number;
    maxCountPerCompany: number;
    remaining: number;
    count: number;
    currentPrice: number;
  }
  
type Props = {
  rooms: {
    economy?: GetRoomTypes_getRoomTypes;
    premium?: GetRoomTypes_getRoomTypes;
    workshop?: GetRoomTypes_getRoomTypes;
  };
  bookings: any;
  previousbookingdetail:any
};
interface RoomInfo {
  id: number;
  name: string;
  CompanyBookingRoom?: { roomBookCount: number | null };
}
interface BookingEntry {
  rooms: RoomInfo[];
  // …other props
}

function summarizeRoomCounts(bookings: BookingEntry[]) {
  // 1) flatten all the rooms out of every booking
  
  const allRooms = bookings?.flatMap(b => b.rooms ?? []);
 

  // 2) tally them into a Map<roomId, totalBookedCount>
  const counts = allRooms?.reduce<Record<number, number>>((acc, room) => {
    const booked = room?.CompanyBookingRoom?.roomBookCount ?? 0;
    acc[room.id] = (acc[room?.id] ?? 0) + booked;
    return acc;
  }, {});

  // 3) pull out each type, defaulting to 0 if never booked
  return {
    economyRoom: counts? counts[1] ?? 0:0,   // id 1 → Economy
    businessRoom:counts? counts[2] ?? 0:0,   // id 2 → Business
    workshopRoom: counts?counts[3] ?? 0:0,   // id 3 → Workshop
  };
}
export const RoomBooking: FC<Props> = ({ rooms, bookings ,previousbookingdetail}) => {
  
  const slides = [
    rooms.economy && (
      <div className="flex justify-center h-full">
        <EconomyRoom
          room={rooms.economy}
          previouslyBookedCount={
            summarizeRoomCounts(previousbookingdetail)?.economyRoom
          }
          // disabled={(rooms?.premium?.count ?? 0) > 0 || (rooms?.workshop?.count ?? 0) > 0}
        />
      </div>
    ),

    rooms.premium && (
      <div className="flex justify-center h-full">
        <BusinessRoom
          room={rooms.premium}
          previouslyBookedCount={summarizeRoomCounts(previousbookingdetail)?.businessRoom}
          // disabled={(rooms?.economy?.count ?? 0) > 0 || (rooms?.workshop?.count ?? 0) > 0}
        />
      </div>
    ),

    rooms.workshop && (
      <div className="flex justify-center h-full">
        <WorkshopRoom
          room={rooms.workshop}
          previouslyBookedCount={summarizeRoomCounts(previousbookingdetail)?.workshopRoom}
          // disabled={(rooms?.economy?.count ?? 0) > 0 || (rooms?.premium?.count ?? 0) > 0}
        />
      </div>
    ),
  ];

  return (
    <div className="mt-14 max-w-screen-lg lg:hstack flex-col lg:flex-row lg:hstack-6 overflow-x-auto pb-4 lg:px-10">
      {slides.map((slide, index) => (
        <div key={index} className="mb-6 mx-4 lg:mb-0">
          {slide}
        </div>
      ))}
    </div>
  );
};
