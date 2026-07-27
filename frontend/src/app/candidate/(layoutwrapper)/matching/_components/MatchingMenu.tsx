"use client";
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EditLink } from '@/components/molecules/EditLink';
import { candidateMatchingLinks } from './CandidateMatchingLinks';
import { useGetReceivedRequestQuery } from '@/hooks/student/matching/useGetReceivedRequestQuery';
import { useGetArrangedInterviewsQuery } from '@/hooks/student/matching/useGetArrangedInterviewsQuery';
import { useGetDeclinedRequestsQuery } from '@/hooks/student/matching/useGetDeclinedRequestsQuery';
import { useGetSentRequestQuery } from '@/hooks/student/matching/useGetSentRequestQuery';
import { useGetWaitingListQuery } from '@/hooks/student/matching/useGetWaitingListQuery';

export interface MatchingMenuProps {
  type: string;
  active: string;
}

interface MenuItem {
  label: string;
  info?: string;
  href: string;
}

const MatchingMenu: React.FC<MatchingMenuProps> = ({ type, active }) => {
  const t = useTranslations("companies");
  const [menu, setMenu] = useState<MenuItem[]>(candidateMatchingLinks);

  const { data:receivedQuery} = useGetReceivedRequestQuery();
  const { data:matchesQuery} = useGetArrangedInterviewsQuery();
  const { data:declinedQuery } = useGetDeclinedRequestsQuery();
  const { data:sentQuery } = useGetSentRequestQuery();
  const { data:waitingListQuery } = useGetWaitingListQuery();

  const staticData = [
    { name: 'arrangedInterviews', count: matchesQuery?.data?.length },
    { name: 'waitingList', count: waitingListQuery?.data?.length },
    { name: 'receivedRequests', count: receivedQuery?.data?.length  },
    { name: 'sentRequests', count: sentQuery?.data?.length },
    { name: 'declinedRequests', count: declinedQuery?.data?.length },
  ];

  function generateMenu() {
    const newMenu = menu.map((item) => {
      const foundData = staticData.find((el) => el.name === item.href);
      return { ...item, info: foundData?.count || 0 };
    });
    setMenu(newMenu);
  }

  useEffect(() => {
    generateMenu();
  }, [matchesQuery,receivedQuery,declinedQuery,sentQuery,waitingListQuery]);

  const cn =
    'pt-5 w-full lg:w-72 2lg:w-84 h-auto vstack vstack-7 border border-light-soft';

  return (
    <Fragment>
      <nav className={cn}>
        <h3 className="px-8">{t('matching.title')}</h3>
        <ul className="space-y-0">
          {menu?.map(({ label, info, href }) => (
            <EditLink
              key={label}
              active={href === active}
              label={t(label)}
              info={info?.toString()}
              href={'/candidate/matching?type=' + href}
            />
          ))}
        </ul>
      </nav>
    </Fragment>
  );
};

export default MatchingMenu;
