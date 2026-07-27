"use client";
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { compose } from 'lodash/fp';
// import { withCompanyBooking } from 'lib/pages';
import { useTranslations } from 'next-intl';
import { BackButton, BackLink } from '@/components/atoms/BackLink';
import { ProcessInfo } from '../../rooms/_components/ProcessInfo';
import Head from 'next/head';
import { useBookingsSummaryQ } from '../../rooms/_components/hooks';
import { useGetCompanyWaitingListQuery } from '@/hooks/company/matching/useGetCompanyWaitingListQuery';
import WaitingList from './WaitingList';

const FillSlots = ({ bookings, skipServices } : any) => {
  const t = useTranslations('companies');
  const router = useRouter();
  const {data} = useGetCompanyWaitingListQuery();
  const [waitingList, setWaitingList] = useState([]);
  const [canContinue, setCanContinue] = useState(false);

   const {
      data: { room },
    } = useBookingsSummaryQ();
    const backHref = '/company/profile/bookings/rooms';
  const onNext = useCallback(() => {
    if (!skipServices) {
      router.push('/company/profile/bookings/additional-services');
    } else {
      router.push('/company/profile/bookings/summary');
    }
  }, [skipServices]);

  const minimumSelectedCandidates =
    room?.id === 2 ? room?.count * 9 : room?.count * 8;

  function calculateCanContinue(newWaitingList:any) {
    let canContinueResult = false;

    if (data?.data.length > minimumSelectedCandidates) {
      canContinueResult = newWaitingList?.length === minimumSelectedCandidates;
    } else {
      canContinueResult = true;
    }

    setCanContinue(canContinueResult);
  }

  const additionalBooking = bookings?.length > 0;

  const needToSelectCandidates =
    data?.data?.length > (room?.id === 2 ? room?.count * 9 : room?.count * 8);

  return (
    <main
      style={{ height: 'calc(100vh - 56px)' }}
      className="flex flex-col flex-grow bg-light-soft px-10 pt-4">
      <Head>
        <title>{t('bookings.waitinglist-head')}</title>
      </Head>
      {additionalBooking ? (
        <BackButton
          className="mt-4 text-primary-light"
          onClick={() => router.back()}>
          {t('back')}
        </BackButton>
      ):
      <BackLink href={backHref} className="mt-4">
      {t('back')}
    </BackLink>
      }

      <div className="flex flex-col overflow-hidden mb-16">
        <div className="mt-4 max-w-xxl">
          <h1>
            {!needToSelectCandidates
              ? t('bookings.waitinglist-heading', {
                  count: data?.data.length,
                })
              : t('bookings.waitinglist-heading-need-to-select', {
                  count: data?.data.length,
                })}
          </h1>
          <h1>
            {!needToSelectCandidates
              ? t('bookings.waitinglist-sub-heading')
              : t('bookings.waitinglist-sub-heading-need-to-select', {
                  count: minimumSelectedCandidates,
                })}
          </h1>
        </div>

        <WaitingList
          waitingList={waitingList}
          setWaitingList={(newWaitingList:any) => {
            setWaitingList(newWaitingList);
            calculateCanContinue(newWaitingList);
          }}
        />
      </div>

      <ProcessInfo disabled={!canContinue} onNext={onNext} />
    </main>
  );
};
export default FillSlots;
