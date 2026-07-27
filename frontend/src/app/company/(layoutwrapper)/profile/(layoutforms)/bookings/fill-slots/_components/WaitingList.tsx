import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CandidateList from '@/app/company/(layoutwrapper)/matching/_components/CandidateList';
import { useGetCompanyWaitingListQuery } from '@/hooks/company/matching/useGetCompanyWaitingListQuery';
import { useBookingsSummaryQ } from '../../rooms/_components/hooks';
import { useWaitingListStore } from '@/app/store/waitingListStore';

export interface WaitingListProps {
  waitingList: any;
  setWaitingList: Function;
}

const WaitingList = ({
  waitingList,
  setWaitingList,
} : any) => {
  const t = useTranslations('companies');
  const { data, isLoading:loading } = useGetCompanyWaitingListQuery();
  // const [updateWaitingListIds] = useMutation(gql`
  //   mutation UpdateWaitingListIds($waitingListIds: [Int]) {
  //     updateWaitingListIds(waitingListIds: $waitingListIds) @client
  //   }
  // `);
  const { waitingListIds, updateWaitingListIds } = useWaitingListStore();

  const {
    data: { room },
  } = useBookingsSummaryQ();

  const sliceValue =
    (room?.id === 2 ? room?.count * 9 : room?.count * 8) < data?.data.length
      ? room?.id === 2
        ? room?.count * 9
        : room?.count * 8
      : data?.data.length;

  useEffect(() => {
    const waitingListIds = data?.data
      ?.slice(0, sliceValue)
      .map((listItem:any, index:any) => {
        if (index <= sliceValue) return listItem.id;
      });
    // updateWaitingListIds({
    //   variables: {
    //     waitingListIds: waitingListIds,
    //   },
    // });
    updateWaitingListIds(waitingListIds);

    setWaitingList(waitingListIds);
  }, []);

  function handleCheckboxOnClick(value:any, id:any) {
    const newWaitingList = [...waitingList];

    if (value) {
      newWaitingList.push(id);
    } else {
      const itemIndex = newWaitingList.findIndex((item) => item === id);
      newWaitingList.splice(itemIndex, 1);
    }

    // updateWaitingListIds({
    //   variables: {
    //     waitingListIds: newWaitingList,
    //   },
    // });

    updateWaitingListIds(waitingListIds);

    setWaitingList(newWaitingList);
  }

  const checkboxes =
    data?.data?.length > (room?.id === 2 ? room?.count * 9 : room?.count * 8);

  return (
    <div className="w-full mb-5 flex flex-col overflow-hidden">
      <p className="lead-text mt-5 mb-5 max-w-xl">
        {t('bookings.waitinglist-description')}
      </p>
      {data?.data ? (
        <CandidateList
          checkboxOnClick={handleCheckboxOnClick}
          data={data.data}
          loading={loading}
          checkbox={checkboxes}
          selected={checkboxes ? waitingList : null}
        />
      ) : null}
    </div>
  );
};

export default WaitingList;
