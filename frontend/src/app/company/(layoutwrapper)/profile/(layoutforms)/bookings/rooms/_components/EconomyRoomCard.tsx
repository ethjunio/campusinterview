import { BookingCard } from '@/components/molecules/BookingCard';
import { useTranslations } from 'next-intl';
import IconEconomyBooking from '@/icons/ic-booking_blue.svg';
import { Counter } from '@/components/molecules/Counter';
import { FC, useCallback } from 'react';
import { GetRoomTypes_getRoomTypes } from '../../_components/types';
import { useBookingStore } from '@/app/store/bookingStore';
import { useBookingsSummaryQ } from './hooks';
import { useGetCompanyBookingsQuery } from '@/hooks/company/bookings/useGetCompanyBookingsQuery';

type Props = {
  room: any;
  disabled?: boolean;
  previouslyBookedCount: number;
};

export const EconomyRoom: FC<Props> = ({
  previouslyBookedCount,
  room,
  disabled = false,
}) => {
  const t = useTranslations('companies');
     const {
        data: {
          totalBookings
        },
        isLoading,
      } = useBookingsSummaryQ();
     
   const { updateRoomCount } = useBookingStore();
  
  const basePrice =
    previouslyBookedCount > 0 ? (room?.price || 0)  : room?.price || 0;
  const roomPrice =
    previouslyBookedCount > 0
      ? basePrice
      : room?.count >= 1
      ? basePrice / 2
      : basePrice;

  const onCountChange = useCallback(
    (count:any) => {
        updateRoomCount(room.id, count);
    },
    [room],
  );


  return (
    <BookingCard disabled={disabled}>
      <BookingCard.Header Icon={IconEconomyBooking}>
        {/* {t('bookings.economy-room')} */}
        Economy Room
        {/* {t('bookings.left-count', { count: room?.remaining })} */}
      </BookingCard.Header>
      <BookingCard.Body>
        <BookingCard.Body.Lead>
          {t('bookings.add-economy-room-description')}
        </BookingCard.Body.Lead>
        <BookingCard.Body.List
          items={[
            t('bookings.add-economy-room-list-1'),
            t('bookings.add-economy-room-list-2'),
            t('bookings.add-economy-room-list-3'),
            t('bookings.add-economy-room-list-4'),
          ]}
        />
        <BookingCard.Body.Info
          // price={roomPrice}
          // additionalPrice={
          //   previouslyBookedCount > 0 ? basePrice : basePrice / 2
          // }
          price={previouslyBookedCount > 0 ? basePrice/ 2 + (-5)   : room?.count >= 1 ? basePrice / 2 + (-5) : basePrice }
          additionalPrice={
            basePrice / 2 + (-5)
            // totalBookings > 0 ? basePrice / 2 + (-5) : basePrice / 2 + (-5)
          }
        />
      </BookingCard.Body>

      <BookingCard.Footer title={t('bookings.number-of-rooms')}>
        <Counter
          initial={room?.count}
          onCountChange={onCountChange}
          max={
            room?.maxCountPerCompany - previouslyBookedCount >
            room?.availableCount
              ? room?.availableCount
              : room?.maxCountPerCompany - previouslyBookedCount
          }
        />
      </BookingCard.Footer>
    </BookingCard>
  );
};
