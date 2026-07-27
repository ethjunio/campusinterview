"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ArrangedInterviews from './ArrangedInterviews';
import WaitingList from './WaitingList';
import ReceivedRequests from './ReceivedRequests';
import SentRequests from './SentRequests';
import DeclinedRequests from './DeclinedRequests';
import { useRouter, useSearchParams } from 'next/navigation';
import MatchingMenu from './MatchingMenu';
import IconAlarm from '@/icons/ic-alarm.svg';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/organisms/modal/Modal';
import { BackLink } from '@/components/atoms/BackLink';
import { formatDate } from '@/utils/date';
import { useEventPhase } from '@/utils/customHooks';
import NotificationHeader from '@/app/candidate/(layoutwrapper)/chatroom/_components/NotificationHeader';
import { useGetCompanyGeneralDataQuery } from '@/hooks/company/onboarding/useGetCompanyGeneralDataQuery';
import { useGetLandingPageDataQuery } from '@/hooks/visitors/useGetLandingPageDataQuery';
import { useGetBookingQuery } from '@/hooks/company/profile/useGetBookingQuery';

export enum BookingProcessStateType {
  approved = 'approved',
  requested = 'requested',
}

const MatchingFeature = () => {

  const { eventPhase } = useEventPhase();
  const Router = useRouter();

  //static year as per requirements
  let currentYear = 2025

  const { data, refetch } = useGetBookingQuery() as any;
  const [canAccessTalentPool, setCanAccessTalentPool] = useState(false);
  useEffect(() => {
    const handleRouteChange = () => {
      refetch();
    };

    const handleRouteChangeComplete = () => {
      handleRouteChange();
    };

    Router.push = new Proxy(Router.push, {
      apply(target, thisArg, args) {
        handleRouteChangeComplete();
        return Reflect.apply(target, thisArg, args);
      },
    });
  }, []);
  useEffect(() => {
    if (data) {
      const canAccess = data?.data?.some(
        ({ bookingProcessState }: any) =>
          bookingProcessState === BookingProcessStateType.approved,
      );
      setCanAccessTalentPool(canAccess);
    }
  }, [data]);
  const t = useTranslations('companies');
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [modalStatus, setModalStatus] = useState(false);

  const { data: company } = useGetCompanyGeneralDataQuery() as any
  const { data: getEventPhase } = useGetLandingPageDataQuery();

  useEffect(() => {
    if (canAccessTalentPool !== undefined && data?.data !== undefined) {
      setModalStatus(!canAccessTalentPool);
    }
  }, [canAccessTalentPool]);

  const toggleModal = () => {
    setModalStatus((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    if (canAccessTalentPool && eventPhase?.matching !== undefined) {
      setModalStatus(!eventPhase?.matching);
    }
  }, [eventPhase?.matching, canAccessTalentPool]);
    
  function getComponent() {
    if (
      !(
        eventPhase?.matching ||
        (!eventPhase?.matching && eventPhase?.postMatching)
      )
    )
      return null;

    // default component set to Overview
    let component = <ReceivedRequests />;
    switch (type) {
      case 'receivedRequests':
        component = <ReceivedRequests />;
        break;
      case 'arrangedInterviews':
        component = <ArrangedInterviews />;
        break;
      case 'waitingList':
        component = <WaitingList />;
        break;
      case 'sentRequests':
        component = <SentRequests />;
        break;
      case 'declinedRequests':
        component = <DeclinedRequests />;
        break;
    }

    return component;
  }


  function displayHeader() {
    let header = null;
    if (
      (type === 'arrangedInterviews' || type === 'receivedRequests') &&
      company?.interviewSlots < 1 &&
      (eventPhase?.companyBooking || eventPhase?.matching) &&
      canAccessTalentPool
    ) {
      header = (
        <NotificationHeader
          title={t('matching.notification-header.title')}
          description={t('matching.notification-header.description')}
          Icon={IconAlarm}
          btnText={t('matching.notification-header.add-room')}
          onBtnClick={() => {
            Router.push('/company/profile/bookings/rooms');
          }}
        />
      );
    }
    return header;
  }

  function getMatchingOpenDate() {
    return formatDate(
      getEventPhase?.data?.matchingOpenDate
        ? new Date(getEventPhase?.data?.matchingOpenDate)
        : new Date(),
      'dd. MMMM yyyy',
    );
  }

  function getModal() {
    let title;
    let description;
    let textFirstBtn;
    let onClickFirstBtn;
    let toggleModalFun;
    let close;

    if (!canAccessTalentPool) {
      title = t('talent-pool.access-dialog-title', { currentYear });
      description = t('talent-pool.access-dialog-lead');
      textFirstBtn = t('talent-pool.access-dialog-cta');
      onClickFirstBtn = () => {
        Router.push('/company/profile/bookings');
      };
      toggleModalFun = () => toggleModal;
    } else {
      title = eventPhase?.postMatching
        ? t('matching.post-matching-dialog-title')
        : t('matching.access-dialog-title');
      description = eventPhase?.postMatching
        ? t('matching.post-matching-dialog-lead')
        : t('matching.access-dialog-lead', {
          startMatchingDate: getMatchingOpenDate(),
        });
      textFirstBtn = eventPhase?.postMatching
        ? t('matching.post-matching-dialog-okay-button')
        : t('matching.access-dialog-back-to-dashboard-button');
      onClickFirstBtn = eventPhase?.postMatching
        ? () => toggleModal()
        : () => Router.push('/company/overview');
      toggleModalFun = eventPhase?.postMatching ? toggleModal : null;
      close = eventPhase?.postMatching ? true : false;
    }

    return (
      <Modal
        modalStatus={modalStatus}
        backgroundColor="bg-gradient-135-modal"
        title={title}
        description={description}
        textFirstBtn={textFirstBtn}
        onClickFirstBtn={onClickFirstBtn}
        toggleModal={toggleModalFun || undefined}
        close={close}
      />
    );
  }


  return (
    <main className="flex flex-grow">
      <Head>
        <title>{t('matching.title')}</title>
      </Head>
      <div className="hidden lg:block">
        <MatchingMenu
          type="company"
          active={type ? type.toString() : 'receivedRequests'}
        />
      </div>
      <div className="bg-light-soft flex-1 flex flex-col pb-4">
        <div className="p-0 w-full">
          <div className=" px-4 block lg:hidden my-4">
            <BackLink href={`/company/matching/menu`}>
              {t('matching.menu-back')}
            </BackLink>
          </div>
          <div>{displayHeader()}</div>
          <div className="p-4 lg:p-8">{getComponent()}</div>
        </div>
      </div>
      {getModal()}
    </main>
  );
};

export default MatchingFeature;
