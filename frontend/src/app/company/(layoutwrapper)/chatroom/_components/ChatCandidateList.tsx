import ArrowRightIcon from '@/icons/ic-arrow-right.svg';
import c from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import take from 'lodash/fp/take';
import sort from 'lodash/fp/sortBy';
import { getStateBadge } from '@/utils/interview';
import PlaceholderImage from '@/icons/ic-placeholder-profil.svg';

export interface ChatCandidateListProps {
  data: any;
}

const ChatCandidateList: React.FC<ChatCandidateListProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidateId = searchParams.get('candidateId');

  return (
    <ul className="space-y-3">
      {data?.map(({ candidate, count, state, latestMessage } :any ) => {
        const { firstName, lastName, education, imageUrlSmall } = candidate;

        const stateBadge = getStateBadge(state);

        const cn = c(
          'flex align-center justify-between hover:bg-light-softer w-full cursor-pointer py-3 px-4',
          {
            'bg-light-soft': candidateId !== candidate.id && count === 0,
            'bg-primary-soft text-white':
              candidateId !== candidate.id && count > 0,
            'bg-light-soft hover:bg-light-softer': candidateId === candidate.id,
          },
        );
        return (
          <div
            key={candidate.id}
            className={cn}
            onClick={() => {
              router.push('/company/chatroom?candidateId=' + candidate.id);
            }}>
            <div className="flex">
              <div className="relative">
                {imageUrlSmall ? (
                  <img
                    src={imageUrlSmall}
                    alt="Profile"
                    className="flex-shrink-0 rounded-full w-16 h-16 mr-2"
                  />
                ) : (
                  <PlaceholderImage className="flex-shrink-0 rounded-full w-16 h-16 mr-2" />
                )}
                {count ? (
                  <div
                    style={{
                      top: '5px',
                      fontSize: '10px',
                      width: '10px',
                      height: '10px',
                    }}
                    className="bg-primary-light text-white p-2 rounded-full absolute top-100 flex justify-center items-center">
                    {count}
                  </div>
                ) : null}
                <div
                  style={{
                    bottom: '15px',
                    right: '25px',
                    fontSize: '10px',
                    width: '10px',
                    height: '10px',
                  }}
                  className="absolute">
                  {stateBadge}
                </div>
              </div>
              <div className="flex flex-col justify-center ml-4">
                <div className="flex justify-between">
                  <h3 className="flex-shrink-1 max-w-md w-40 truncate">
                    {firstName} {lastName}
                  </h3>
                </div>
                <div className="w-40 truncate">
                  {latestMessage
                    ? latestMessage
                    : take(2, sort('startDate', education)).map(
                      ({ id, university, educationLevel, major }) => (
                        <div
                          key={id}
                          className="truncate xxl:overflow-normal xxl:break-normal general-text">
                          {university?.name} - {educationLevel?.name} in{' '}
                          {major?.name}
                        </div>
                      ),
                    )}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <ArrowRightIcon className="w-6 h-6 fill-current text-primary-light stroke-current stroke-3" />
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default ChatCandidateList;
