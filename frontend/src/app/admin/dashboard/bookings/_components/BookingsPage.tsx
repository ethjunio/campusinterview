import React from 'react';
import { BackLink } from '@/components/atoms/BackLink';
import { useTranslations } from 'next-intl';
import BookingsList from './BookingsList';

const BookingsPage = () => {
  const t = useTranslations();

  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div className="max-w-screen-md">
        <BackLink className="mb-12" href="/admin/dashboard">
          {t('admin.back-to-dashboard')}
        </BackLink>
        <BookingsList />
      </div>
    </main>
  );
};


export default BookingsPage;
