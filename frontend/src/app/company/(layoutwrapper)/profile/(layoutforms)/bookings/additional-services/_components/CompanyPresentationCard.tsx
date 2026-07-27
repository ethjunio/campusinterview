import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { BookingCard } from '@/components/molecules/BookingCard';
import IconMiniBooth from '@/icons/ic-pre-event_1.svg';
import { ToggleButton } from '@/components/atoms/Button';

export const CompanyPresentationCard: FC<{
  service: any;
  onToggle: (toggled: boolean) => void;
  disabled: boolean;
}> = ({ service, onToggle, disabled }) => {
  const t = useTranslations();
  return (
    <BookingCard disabled={disabled}>
      <BookingCard.Header Icon={IconMiniBooth}>
        {t('companies.bookings.company-presentation')}
        {/* {t('companies.bookings.left-count', { count: service?.remaining })} */}
      </BookingCard.Header>
      <BookingCard.Body>
        <BookingCard.Body.Lead>
          {t('companies.bookings.add-services-companyPresentation-description')}
        </BookingCard.Body.Lead>
        <BookingCard.Body.List
          items={[
            t('companies.bookings.add-services-companyPresentation-list-1'),
            t('companies.bookings.add-services-companyPresentation-list-2'),
            t('companies.bookings.add-services-companyPresentation-list-3'),
            t('companies.bookings.add-services-companyPresentation-list-4'),
            t('companies.bookings.add-services-companyPresentation-list-5'),
          ]}
        />
      </BookingCard.Body>
      <BookingCard.Footer title={t('common.price', { price: service?.price })}>
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
