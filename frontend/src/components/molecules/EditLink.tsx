import React, { FC } from 'react';
import Link from 'next/link';
import ArrowRight from '@/icons/ic-arrow-right.svg';
import c from 'classnames';

const ALink: FC<{ className: string; href: string; children: React.ReactNode }> = ({
  children,
  className,
  href,
}) => {
  return (
    <Link href={href}>
      <span className={className}>{children}</span>
    </Link>
  );
};

const ButtonLink: FC<{ className: string; onClick: () => void; children: React.ReactNode }> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export const EditLink: FC<{
  active: boolean;
  label: string;
  href?: string;
  info?: string;
}> = ({ active, label, href, info = '' }) => {
  const cn = c(
    'px-8 py-3 whitespace-nowrap general-text flex hover:bg-light-softer items-base-line flex-grow justify-between w-full stroke-current stroke-3',
    {
      'bg-light-soft': active,
    },
  );

  return (
    <li>
      {href ? (
        <ALink href={href} className={cn}>
          <div>{label}</div>
          <div className="flex space-x-6">
            <span>{info}</span>
            <ArrowRight className="w-4 h-4 text-primary-light fill-current flex-shrink-0" />
          </div>
        </ALink>
      ) : (
        <ButtonLink className={cn} onClick={() => {}}>
          <div>{label}</div>
          <div className="flex space-x-6">
            <span>{info}</span>
            <ArrowRight className="w-4 h-4 text-primary-light fill-current flex-shrink-0" />
          </div>
        </ButtonLink>
      )}
    </li>
  );
};
