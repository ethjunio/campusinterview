import { BookingCard } from '@/components/molecules/BookingCard';
import { useTranslations } from 'next-intl';
import IconBusinessBooking from '@/icons/ic-booking_green.svg';
import { Counter } from '@/components/molecules/Counter';
import { FC, useCallback } from 'react';
import { GetRoomTypes_getRoomTypes } from '../../_components/types';
import { useBookingStore } from '@/app/store/bookingStore';
import { useBookingsSummaryQ } from './hooks';

type Props = {
  room: any;
  disabled?: boolean;
  previouslyBookedCount: number;
};

export const WorkshopRoom: FC<Props> = ({
  previouslyBookedCount,
  room,
  disabled = false,
}) => {
  const t = useTranslations('companies');
  const { updateRoomCount } = useBookingStore();
  
   const {
        data: {
          totalBookings
        },
        isLoading,
      } = useBookingsSummaryQ();
      
  const basePrice =room?.price
  const roomPrice = basePrice;

const onCountChange = useCallback(
  (count:any) => {
      updateRoomCount(room.id, count);
  },
  [room],
);


  return (
    <BookingCard disabled={disabled}>
      <BookingCard.Header Icon={IconBusinessBooking}>
        Workshop Room
        {/* {t('bookings.workshop-room')} */}
        {/* {t('bookings.left-count', { count: room?.remaining })} */}
      </BookingCard.Header>
      <BookingCard.Body>
        <BookingCard.Body.Lead>
          {t('bookings.add-workshop-room-description')}
        </BookingCard.Body.Lead>
        <BookingCard.Body.List
          items={[
            t('bookings.add-workshop-room-list-1'),
            t('bookings.add-workshop-room-list-2'),
            t('bookings.add-workshop-room-list-3'),
            t('bookings.add-workshop-room-list-4'),
            t('bookings.add-workshop-room-list-5'),
            t('bookings.add-workshop-room-list-6'),
          ]}
        />
        <BookingCard.Body.Info 
        // price={roomPrice} 
        price={totalBookings > 0 ? basePrice  : room?.count >= 1 ? basePrice  : basePrice }
        additionalPrice={
          totalBookings > 0 ? basePrice : basePrice 
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
