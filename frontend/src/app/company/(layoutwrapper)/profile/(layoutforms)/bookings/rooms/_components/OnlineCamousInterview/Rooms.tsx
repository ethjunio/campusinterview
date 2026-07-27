"use client"
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import pipe from 'lodash/fp/pipe';
import keyBy from 'lodash/fp/keyBy';
import mapKeys from 'lodash/fp/mapKeys';
import { useTranslations } from 'next-intl';
import { BackLink } from '@/components/atoms/BackLink';
import { RoomBooking } from './RoomBooking';
import { NextPage } from 'next';

import Head from 'next/head';
import { useGetCompanyWaitingListQuery } from '@/hooks/company/matching/useGetCompanyWaitingListQuery';
import { useGetRoomTypesQuery } from '@/hooks/company/bookings/useGetRoomTypesQuery';
import { ProcessInfo } from './ProcessInfo';
import { useBookingStore } from '@/app/store/bookingStore';
import { useGetCompanyBookingsQuery } from '@/hooks/company/bookings/useGetCompanyBookingsQuery';
import { BookingPageProps, GetRoomTypes_getRoomTypes } from '../../../_components/types';

type RoomType = 'premium' | 'economy' | 'workshop';

export const OnlineRooms: NextPage<BookingPageProps> = ({ bookings, skipServices }) => {
  const { data: bookings112233 } = useGetCompanyBookingsQuery();
  
  const t = useTranslations();
  const router = useRouter();

  const {data:getCompanyWaitingList}= useGetCompanyWaitingListQuery();
  const { setRoomTypes, roomTypes: storedRoomTypes } = useBookingStore();
  const { data: roomTypes, isFetching } = useGetRoomTypesQuery();


const idToRoomType: { [id: number]: RoomType } = {
    1: 'economy',
    2: 'premium',
    3: 'workshop',
  };
  
// Utility function to compare API data with store data (ignoring added fields)
const hasRoomTypesChanged = (apiData: any, storeData: any) => {
  if (!apiData || !storeData || apiData.length !== storeData.length) return true;
  
  return apiData.some((apiRoom, index) => {
    const storeRoom = storeData[index];
    return (
      apiRoom.id !== storeRoom.id ||
      apiRoom.availableCount !== storeRoom.availableCount ||
      apiRoom.maxCountPerCompany !== storeRoom.maxCountPerCompany ||
      apiRoom.price !== storeRoom.price
      // Compare only the fields that come from API
    );
  });
};  
  function toRoomTypes(data = []): {
    economy: GetRoomTypes_getRoomTypes;
    premium: GetRoomTypes_getRoomTypes;
    workshop: GetRoomTypes_getRoomTypes;
  } {
    return pipe(
      keyBy('id'),
      mapKeys((id) => idToRoomType[id]),
    )(data);
  }

  function useRoomTypesQ() { 
    return toRoomTypes(storedRoomTypes);
  }

   // ✅ Only Set Room Types If Zustand Store Is Empty
useEffect(() => {
  if (!storedRoomTypes ||  hasRoomTypesChanged(roomTypes?.data, storedRoomTypes)) {
    setRoomTypes(roomTypes);
  }
}, [roomTypes, storedRoomTypes, isFetching, setRoomTypes]);

  let rooms: {
    economy?: GetRoomTypes_getRoomTypes;
    premium?: GetRoomTypes_getRoomTypes;
    workshop?: GetRoomTypes_getRoomTypes;
  } = useRoomTypesQ();

  if (bookings.map((b) => b.roomType?.id).includes(rooms.economy?.id)) {
    if (bookings.map((b) => b.roomType?.id).includes(rooms.workshop?.id)) {
      rooms = {
        economy: rooms.economy,
      };
    }
    else {
      rooms = {
        economy: rooms.economy,
        workshop: rooms.workshop
      };
    } 
  } else if (bookings.map((b) => b.roomType?.id).includes(rooms.premium?.id)) {
    if (bookings.map((b) => b.roomType?.id).includes(rooms.workshop?.id)) {
      rooms = {
        premium: rooms.premium,
      };
    }
    else {
      rooms = {
        premium: rooms.premium,
        workshop: rooms.workshop
      };
    } 
 
  } else if (bookings.map((b) => b.roomType?.id).includes(rooms.workshop?.id)) {
    if (bookings.map((b) => b.roomType?.id).includes(rooms.economy?.id)) {
      rooms = {
        economy: rooms.economy,
      };
    } else if (
      bookings.map((b) => b.roomType?.id).includes(rooms.economy?.id)
    ) {
      rooms = {
        premium: rooms.premium,
      };
    } else {
      rooms = {
        economy: rooms.economy,
        premium: rooms.premium,
      };
    }
  }
  const additionalBooking = bookings.length > 0;
  const canSkipRoomBooking = additionalBooking && !skipServices;
  const roomSelected =
    rooms?.economy?.count || rooms?.premium?.count || rooms?.workshop?.count || 0;
  const canContinue = canSkipRoomBooking || roomSelected;

  const onNext = useCallback(() => {
    const waitingListLength = getCompanyWaitingList?.data?.length;
    if (waitingListLength > 0 && roomSelected > 0) {
      router.push('/company/profile/bookings/fill-slots');
    } else if (!skipServices) {
      router.push('/company/profile/bookings/additional-services');
    } else {
      router.push('/company/profile/bookings/summary');
    }
  }, [skipServices, getCompanyWaitingList?.data, roomSelected]);

  

  return (
    <main className="flex-grow bg-light-soft pt-4">
      <Head>
        <title>{t('companies.bookings.rooms-head')}</title>
      </Head>
      {/* {additionalBooking && ( */}
        <BackLink href="/company/profile/bookings" className="mt-4 ml-8">
          {t('common.back')}
        </BackLink>
      {/* )} */}

      <div className="lg:mb-16">
        <div className="mt-4 max-w-xl px-4 lg:px-10">
          <h1>{t('companies.bookings.add-heading')}</h1>
          <p className="lead-text mt-2">{t('companies.bookings.add-lead')}</p>
        </div>

        <RoomBooking  rooms={rooms} bookings={bookings} previousbookingdetail={bookings112233?.data}/>
      </div>
      {/* <ProcessInfo disabled={!canContinue} onNext={onNext} /> */}
      <ProcessInfo onNext={onNext} />
    </main>
  );
};
