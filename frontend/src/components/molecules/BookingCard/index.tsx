import React, { FC, Children, cloneElement, ReactElement } from 'react';
import c from 'classnames';

import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer';

type Props = {
  disabled?: boolean;
  children?: React.ReactNode;
};

type CFC<T> = FC<T> & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
};
export const BookingCard: CFC<Props> = ({ disabled, children }) => {
  const childs = Children.map(children, (node) => {
    const child = node as ReactElement;
    if (child.type === Header) {
      return cloneElement(child, { disabled });
    }

    return child;
  });

  const cn = c(
    'bg-white flex flex-none w-full sm:w-1/2 lg:w-full lg:max-w-sm flex-col rounded-md shadow h-full lg:h-auto',
    {
      'pointer-events-none opacity-50': disabled,
    },
  );

  return <div className={cn}>{childs}</div>;
};

BookingCard.Header = Header;
BookingCard.Body = Body;
BookingCard.Footer = Footer;
