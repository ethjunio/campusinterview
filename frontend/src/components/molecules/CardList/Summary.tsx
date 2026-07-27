import React, { FC, Children } from 'react';
import c from 'classnames';
import { useTranslations } from 'next-intl';

export const Summary: FC<{ totalCost: number }> = ({ children, totalCost }) => {
  const t = useTranslations('common');
  const arr = Children.toArray(children);
  const title = arr[0];
  const info = arr.length === 2 ? arr[1] : null;

  return (
    <li
      className={c(
        'pl-5 py-3 pr-8  rounded shadow flex items-center justify-between text-white bg-primary-light order border-light bg-light-softer',
      )}>
      <div className="flex items-center">
        <h4 className="text-white mr-8">{title}</h4>
        <span className="text-white general-text-sm">{info}</span>
      </div>
      <div className="text-white general-text">
        {t('price', { price: totalCost })}
      </div>
    </li>
  );
};
