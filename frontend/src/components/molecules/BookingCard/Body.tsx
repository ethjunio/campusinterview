import React, { FC } from 'react';
import { useTranslations } from 'next-intl';

const Lead: FC<{ children: React.ReactNode }> = ({ children }) => <p className="px-8">{children}</p>;

const List: FC<{ items: string[] }> = ({ items }) => (
  <ul className="px-8 py-5 flex-grow ml-5 vstack vstack-2 general-text list-disc">
    {items.map((text) => (
      <li key={text}>{text}</li>
    ))}
  </ul>
);

const Info: FC<{ price: number; additionalPrice?: number }> = ({
  price,
  additionalPrice,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-shrink px-8 justify-between items-center flex-col lg:flex-row">
      {additionalPrice ? (
        <div className="lg:w-1/2 mb-4 lg:mb-0">
          {t('companies.bookings.add-additional-room', { price: additionalPrice })}
        </div>
      ) : null}
      <span className="h3">{t('common.price', { price: price })}</span>
    </div>
  );
};

type CFC<T> = FC<T> & {
  Lead: typeof Lead;
  List: typeof List;
  Info: typeof Info;
};

export const Body: CFC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white rounded-b py-5 flex justify-between flex-grow flex-col">
      {children}
    </div>
  );
};

Body.Lead = Lead;
Body.List = List;
Body.Info = Info;
