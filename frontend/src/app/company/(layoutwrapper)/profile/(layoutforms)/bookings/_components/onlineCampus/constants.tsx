import React from 'react';
import IconEconomyRoom from '@/icons/ic-booking_blue.svg';
import IconPremiumRoom from '@/icons/ic-booking_green.svg';
import IconMiniBooth from '@/icons/ic-pre-event_1.svg';
import IconWorkshop from '@/icons/ic-pre-event_2.svg';
import IconPresentation from '@/icons/ic-pre-event_3.svg';

export const roomIdToIcon = {
  1: <IconEconomyRoom />,
  2: <IconPremiumRoom />,
  3: <IconWorkshop />,
};

export const roomIdToTitle = {
  1: 'Virtual Room',
  2: 'Business Room',
  3: 'Workshop Room',
};

export const serviceIdToIcon = {
  1: <IconMiniBooth />,
  2: <IconWorkshop />,
  3: <IconPresentation />,
  4: <IconPresentation />,
};

export const serviceIdToTitle = {
  1: 'companies.bookings.mini-booth',
  2: 'companies.bookings.pre-event-workshop',
  3: 'companies.bookings.pre-event-presentation',
  4: 'companies.bookings.company-presentation',
};
