"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import ArrangedInterviews from './ArrangedInterviews';
import WaitingList from './WaitingList';
import ReceivedRequests from './ReceivedRequests';
import SentRequests from './SentRequests';
import DeclinedRequests from './DeclinedRequests';
import MatchingMenu from './MatchingMenu';
import { useTranslations } from 'next-intl';
import { BackLink } from '@/components/atoms/BackLink';
import { Modal } from '@/components/organisms/modal/Modal';
import { useGetLandingPageDataQuery } from '@/hooks/visitors/useGetLandingPageDataQuery';
import { formatDate } from '@/utils/date';

export const MatchingFeatures = () => {
  const router = useRouter();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [modalStatus, setModalStatus] = useState(false);
  const [eventPhase, setEventPhase] = useState({ matching: false, postMatching: false });

  const {data} = useGetLandingPageDataQuery();

  const toggleModal = () => {
    setModalStatus((prevState) => !prevState);
  };

  useEffect(() => {
    if (data?.data?.matchingOpenDate && data?.data?.matchingCloseDate) {
      const today = new Date();
      const matchingOpenDate = new Date(data.data.matchingOpenDate);
      const matchingCloseDate = new Date(data.data.matchingCloseDate);
      const matchingCloseDatePlusOne = new Date(matchingCloseDate.getTime() + 86400000);
    
      if (matchingCloseDatePlusOne <= today) {
        eventPhase.postMatching = true;
      }

      if (matchingOpenDate <= today && matchingCloseDatePlusOne >= today) {
        eventPhase.matching = true;
      }

      setEventPhase({...eventPhase});
    }
  }, [data]);

  useEffect(() => {
    if (eventPhase?.matching !== undefined && data?.data !== undefined) {
      setModalStatus(!eventPhase?.matching);
    }
  }, [eventPhase]);

  function getComponent() {
    if (!(eventPhase.matching || (!eventPhase.matching && eventPhase.postMatching))) {
      return null;
    }

    let component = <ReceivedRequests />;
    switch (type) {
      case 'arrangedInterviews':
        component = <ArrangedInterviews />;
        break;
      case 'waitingList':
        component = <WaitingList />;
        break;
      case 'receivedRequests':
        component = <ReceivedRequests />;
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

  const matchingOpenDate = formatDate(
    data?.data?.matchingOpenDate
      ? new Date(data?.data?.matchingOpenDate)
      : new Date(),
    'dd. MMMM yyyy',
  );


  return (
    <main className="flex flex-grow">
      <Head>
        <title>{t('candidate.matching.head-title')}</title>
      </Head>
      <div className="hidden lg:block">
        <MatchingMenu
          type="company"
          active={type ? type.toString() : 'receivedRequests'}
        />
      </div>

      <div className="bg-light-soft flex-1">
        <div className="p-4 lg:p-8 w-full">
          <div className="block lg:hidden mb-4">
            <BackLink href={`/candidate/matching/menu`}>
              {t('candidate.matching.menu-back')}
            </BackLink>
          </div>
          {getComponent()}
        </div>
      </div>

      <Modal
        modalStatus={modalStatus}
        backgroundColor="bg-gradient-135-modal"
        title={
          eventPhase.postMatching
            ? t('candidate.chatroom.post-matching-dialog-title')
            : t('candidate.matching.access-dialog-title')
        }
        description={
          eventPhase.postMatching
            ? t('candidate.chatroom.post-matching-dialog-lead')
            : t('candidate.matching.access-dialog-lead', {
              startMatchingDate: matchingOpenDate || 'N/A',
              })
        }
        textFirstBtn={
          eventPhase.postMatching
            ? t('candidate.chatroom.post-matching-dialog-okay-button')
            : t('candidate.matching.access-dialog-back-to-dashboard-button')
        }
        onClickFirstBtn={() => {
          eventPhase.postMatching
            ? toggleModal()
            : router.push('/candidate/overview');
        }}
        toggleModal={eventPhase.postMatching ? toggleModal : undefined}
        close={eventPhase.postMatching ? true : false}
      />
    </main>
  );
};
