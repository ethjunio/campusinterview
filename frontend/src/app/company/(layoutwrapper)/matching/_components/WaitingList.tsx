import React from 'react';
import DraggableCandidateList from './DraggableCandidateList';
import { useTranslations } from 'next-intl';
// import { useReorderWaitingList } from 'features/company/matching/mutations';
import Link from 'next/link';
// import useMobileDetect from 'utils/useMobileDetect';
import WaitingListPlaceIcon from '@/icons/ic-waitinglist_yellow.svg';
import { useGetCompanyWaitingListQuery } from '@/hooks/company/matching/useGetCompanyWaitingListQuery';

const WaitingList: React.FC = () => {
  const t = useTranslations('companies');
  const {data, isLoading} = useGetCompanyWaitingListQuery();
  // const [onCompleted, onError] = useNotificationSystem();
  // const [reorderWaitingList] = useReorderWaitingList({ onCompleted, onError });
  // const { currentDevice } = useMobileDetect();

  const isMobile = false;

  console.log("waitingList Data", data)

  function renderLastRow() {
    return (
      <div className="flex items-center w-32">
        <WaitingListPlaceIcon className="w-6 h-6 m-2 fill-current" />
        {t('matching.waiting-list')}
      </div>
    );
  }

  function handleChangeOrder(list) {
    const newOrder = list.map((item, index) => {
      return { id: item.id, queuePosition: index + 1 };
    });
    // reorderWaitingList({
    //   variables: { input: { newOrder } },
    // });
  }

  return (
    <div className="w-full overflow-y-auto h-full pb-8">
      <h1 className="mb-5">{t('matching.waitinglist-title')}</h1>
      <div>{t('matching.waitinglist-description')}</div>
      <div className="mb-6 mt-2">
        {t('matching.waitinglist-tip')}{' '}
        <div className="inline text-primary-light ml-2">
          <Link href="/company/profile/bookings">
            {t('matching.waitinglist-tip2')}
          </Link>
        </div>
        {t('matching.waitinglist-tip3')}
      </div>
      {data?.data ? (
        <DraggableCandidateList
          data={data.data}
          loading={isLoading}
          lastRow={isMobile ? null : () => renderLastRow()}
          changeOrder={handleChangeOrder}
          disabled={false}
        />
      ) : null}
    </div>
  );
};

export default WaitingList;
