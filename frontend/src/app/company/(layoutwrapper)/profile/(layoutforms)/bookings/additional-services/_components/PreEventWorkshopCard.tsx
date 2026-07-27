import React, { FC } from 'react';
import { BookingCard } from '@/components/molecules/BookingCard';
import { useTranslations } from 'next-intl';
import IconPreEventWorkshop from '@/icons/ic-pre-event_3.svg';
import { ToggleButton } from '@/components/atoms/Button';
import { getServicePriceDisplay } from '../../_components/servicePrice';

type Props = {
  service: any;
  onToggle: (toggled: boolean) => void;
  disabled: boolean;
};

export const WorkshopCard: FC<Props> = ({ service, onToggle, disabled }) => {
  const t = useTranslations();
  const priceDisplay = getServicePriceDisplay(service);
  const priceTitle =
    priceDisplay.kind === "on-request"
      ? t("common.price-on-request")
      : t("common.price", { price: priceDisplay.price });

  return (
    <BookingCard disabled={disabled}>
      <BookingCard.Header Icon={IconPreEventWorkshop}>
        {t('companies.bookings.pre-event-workshop')}
        {/* {t('companies.bookings.left-count', { count: service?.remaining })} */}
      </BookingCard.Header>
      <BookingCard.Body>
        <BookingCard.Body.Lead>
          {t('companies.bookings.add-services-workshop-description')}
        </BookingCard.Body.Lead>
        <BookingCard.Body.List
          items={[
            t('companies.bookings.add-services-preEvent-list-1'),
            t('companies.bookings.add-services-preEvent-list-2'),
            t('companies.bookings.add-services-preEvent-list-3'),
            t('companies.bookings.add-services-preEvent-list-4'),
          ]}
        />
      </BookingCard.Body>
      <BookingCard.Footer title={priceTitle}>
        <ToggleButton
          toggled={service?.selected}
          onToggle={onToggle}
          toggledLabel={t('companies.bookings.service-selected')}
          label={t('companies.bookings.service-book-now')}
        />
      </BookingCard.Footer>
    </BookingCard>
  );
};
