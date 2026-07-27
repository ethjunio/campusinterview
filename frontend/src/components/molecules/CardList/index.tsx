import React, { FC } from 'react';
import c from 'classnames';

import { Item } from './Item';
import { Summary } from './Summary';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

type CFC = FC<Props> & {
  Item: typeof Item;
  Summary: typeof Summary;
};

export const CardList: CFC = ({ className = 'vstack-4', children }) => {
  const cn = c('vstack', className, {
    'vstack-4': !className.includes('vstack-'),
  });

  return <ul className={cn}>{children}</ul>;
};

export const CardItem = Item;
CardList.Item = Item;
CardList.Summary = Summary;
