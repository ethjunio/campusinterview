"use client"
import { Fragment } from 'react';
import ArrowRightIcon from '@/icons/ic-arrow-right.svg';
import c from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStateBadge } from '@/utils/interview';
import PlaceholderImage from '@/icons/ic-placeholder-profil.svg';

export interface ChatCompanyListProps {
  data: any;
}

const ChatCompanyList: React.FC<ChatCompanyListProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');

  return (
    <ul className="space-y-3 overflow-auto">
      {data?.map(({ company, count, state, latestMessage }: { company: { id: string, name: string, description: string, imageUrlSmall: string }, count: number, state: string, latestMessage: string }) => {
        const { name, description, imageUrlSmall } = company;

        const stateBadge = getStateBadge(state);

        const cn = c(
          'flex align-center justify-between hover:bg-light-softer w-full cursor-pointer py-3 px-4',
          {
            'bg-light-soft': companyId !== company.id && count === 0,
            'bg-primary-soft text-white':
              companyId !== company.id && count > 0,
            'bg-light-soft hover:bg-light-softer': companyId === company.id,
          },
        );

        return (
          <Fragment key={`chat-item-${company.id}`}>
            <div
              key={company.id}
              className={cn}
              onClick={() => {
                router.push('/candidate/chatroom?companyId=' + company.id);
              }}
              >
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
                      {name}
                    </h3>
                  </div>
                  <div className="w-40 truncate">
                    {latestMessage ? latestMessage : description}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <ArrowRightIcon className="w-6 h-6 fill-current text-primary-light stroke-current stroke-3" />
              </div>
            </div>
            <hr className="m-4" />
          </Fragment>
        );
      })}
    </ul>
  );
};

export default ChatCompanyList;
