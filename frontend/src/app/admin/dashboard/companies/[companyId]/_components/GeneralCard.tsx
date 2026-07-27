import React, { FC, Fragment } from 'react';
import { TagList } from '@/components/molecules/Taglist';
import { useTranslations } from 'next-intl';
import PlaceholderImage from '@/icons/ic-placeholder-profil.svg';
import useMobileDetect from '@/utils/useMobileDetect';


export const GeneralCard: FC<{ data: any; children?: React.ReactNode }> = ({
  children,
  data
}) => {

  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const readonly = true;

  return (
    <Fragment>
      <div className="relative bg-white flex w-full items-start justify-between mt-32 lg:mt-48 pb-8 px-4 lg:px-10 flex-col lg:flex-row">
        <div className="relative flex w-full justify-between align-stretch">
          <div className="w-full lg:w-8/12" style={{ minHeight: '268px' }}>
            <div className="lg:flex flex-grow lg:flex-col h-20 lg:h-auto">
              {data?.data?.imageUrlMedium ? (
                <img
                  className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full"
                  src={data?.data?.imageUrlMedium}
                />
              ) : (
                <PlaceholderImage className="absolute -mt-12 lg:-mt-8 w-32 lg:w-40 h-32 lg:h-40 rounded-full" />
              )}

              <div className="flex flex-col ml-36 lg:ml-48 pt-4">
                <h1 className="text-2xl lg:text-5xl lg:leading-12 font-bold">
                  {data?.data?.name}
                </h1>
              </div>
            </div>
            <div>
              <div className="mt-6 lg:mt-6 ml-0 lg:ml-48">
                <TagList tags={data?.data?.industries || []} />
              </div>
            </div>

            <p className="lead-text lg:ml-10 mt-6 mb-6 whitespace-pre-line">
              {data?.data?.description}
            </p>

            <div>
              <a
                className="ml-0 lg:ml-10 text-lg lg:text-xl"
                target='_blank'
                href={`https://${data?.data?.website}`}>
                {data?.data?.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
