import { FC } from 'react';
import { BookingCard } from '@/components/molecules/BookingCard';
import { useTranslations } from 'next-intl';
import IconPreEventPresentation from '@/icons/ic-pre-event_2.svg';
import { ToggleButton } from '@/components/atoms/Button';

type Props = {
  service: any;
  onToggle: (toggled: boolean) => void;
  disabled: boolean;
};

export const PresentationCard: FC<Props> = ({
  disabled,
  onToggle,
  service,
}) => {
  const t = useTranslations();
  return (
    <BookingCard disabled={disabled}>
      <BookingCard.Header Icon={IconPreEventPresentation}>
        {t('companies.bookings.pre-event-presentation')}
        {/* {t('companies.bookings.left-count', { count: service?.remaining })} */}
      </BookingCard.Header>
      <BookingCard.Body>
        <BookingCard.Body.Lead>
          {t('companies.bookings.add-services-presentation-description')}
        </BookingCard.Body.Lead>
        <BookingCard.Body.List
          items={[
            t('companies.bookings.add-services-preEvent-presentation-list-1'),
            t('companies.bookings.add-services-preEvent-presentation-list-2'),
            t('companies.bookings.add-services-preEvent-presentation-list-3'),
            t('companies.bookings.add-services-preEvent-presentation-list-4'),
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
