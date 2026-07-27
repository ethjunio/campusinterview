import React, { FC } from 'react';
import Link from 'next/link';
import { ArrowButton } from '@/components/atoms/Button';

export const SmallCard: FC<{
  title: string;
  href: string;
  disabled?: boolean;
  Icon: FC<{ className: string }>;
}> = ({ title, href, Icon, disabled = false }) => {
  return (
    <div className="flex flex-grow w-full sm:w-1/2 rounded-md shadow-sm p-3 xl:p-6 items-center space-x-2 bg-white">
      <Icon className="w-16 h-16 flex-shrink-0" />
      <div>
        <h3 className="whitespace-no-wrap mb-1">{title}</h3>
        <Link href={href}>
          <ArrowButton
            style={{ padding: 0 }}
            tw="p-0"
            variant="link"
            disabled={disabled}>
            Show more
          </ArrowButton>
        </Link>
      </div>
    </div>
  );
};
