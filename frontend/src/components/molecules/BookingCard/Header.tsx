import React, { FC, Children } from 'react';

export const Header: FC<{ Icon: FC<{ className: string }>; children: React.ReactNode }> = ({
  children,
  Icon,
}) => {
  const arr = Children.toArray(children);
  const heading = arr[0];
  const subtitle = arr.length === 2 ? arr[1] : null;

  return (
    <div className="flex rounded-t whitespace-no-wrap bg-light-softer items-center py-6 pl-6 pr-12">
      <Icon className="flex-shrink-0 w-16 h-16 mr-3 -mt-2" />
      <div className="flex flex-col">
        <h2 className="mb-1 font-extrabold text-lg lg:text-2xl leading-[24px]">{heading}</h2>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};
