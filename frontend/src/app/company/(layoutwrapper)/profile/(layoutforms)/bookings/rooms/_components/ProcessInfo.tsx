"use client"
import React, { FC } from 'react';
import { ArrowButton } from '@/components/atoms/Button';
import { useTranslations } from 'next-intl';
import { roomIdToTitle } from '../../_components/constants';
import { serviceIdToTitle } from '../../_components/constants';
import { useBookingsSummaryQ } from './hooks';

export const ProcessInfo: FC<{ onNext: () => void; disabled?: boolean }> = ({
  onNext,
  disabled = false,
}) => {
  const {
    data: { room, servicesData, totalCost },
  } = useBookingsSummaryQ();

  const t = useTranslations();
  return (
    <div className="text-white items-center justify-between lead-text flex flex-col lg:flex-row px-12 py-3 bg-primary-dark lg:fixed lg:ml-10 bottom-0 left-0 right-0">
      <div className="hstack hstack-4 text-white">
        {room ? (
          <span className="text-white">
            {room.count} {roomIdToTitle[room.id as keyof typeof roomIdToTitle]}
            {/* {t(roomIdToTitle[room.id], { count: room.count })} */}
          </span>
        ) : (
          <span className="text-white">{t('companies.bookings.no-rooms-selected')}</span>
        )}
        {servicesData.map((s) => {
          return (
            <div
              key={s.id}
              className="flex items-center border-l border-solid border-white pl-4">
              <span className="text-white">{t(serviceIdToTitle[s.id])}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
        <div className="hstack hstack-4 justify-center items-center lg:mr-24 mt-4 lg:mt-0">
          {t(`companies.bookings.summary-total-cost`)}
          <div className="self-end ml-4 font-extrabold text-xl text-white">
          {t('common.price', { price: totalCost })}
          </div>
        </div>
        <div className="mt-2 lg:mt-0">
          <ArrowButton disabled={disabled} onClick={onNext} variant="outline">
            {t('common.button-next-step')}
          </ArrowButton>
        </div>
      </div>
    </div>
  );
};
