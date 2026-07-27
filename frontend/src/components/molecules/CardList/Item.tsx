import React, { FC, Children, cloneElement, ReactElement } from 'react';
import ContentLoader from 'react-content-loader';
import c from 'classnames';

import styles from './Item.module.scss';

const Icon: FC<{ children: React.ReactNode }> = ({ children }) => {
  const cn = c(styles.icon);
  const child =
    React.isValidElement(children) && cloneElement(Children.only(children) as ReactElement<any>, { className: cn });
  return child || null;
};

const Title: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h4>{children}</h4>;
};

const Info: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={c(styles.info, 'flex justify-end')}>{children}</div>;
};

type Props = {
  tw?: string;
  loading?: boolean;
  children?: React.ReactNode;
};

type CFC = FC<Props> & {
  Icon: typeof Icon;
  Title: typeof Title;
  Info: typeof Info;
};

export const Item: CFC = ({ children, loading = false, tw }) => {
  const cn = c(styles.base, tw);
  let icon;
  let title;
  let info;
  Children.forEach(children, (node) => {
    const child = node as ReactElement;
    if (child.type === Title) {
      title = child;
    } else if (child.type === Info) {
      info = child;
    } else if (child.type === Icon) {
      icon = child;
    }
  });

  return (
    <li className={cn}>
      {loading ? (
        <ContentLoader
          height={48}
          speed={2}
          backgroundColor={'#E9ECf4'}
          foregroundColor={'#F2F5FC'}
          viewBox="0 0 380 48">
          <circle cx="25" cy="25" r="22" />
          <rect x="80" y="14" rx="6" ry="6" width="250" height="22" />
        </ContentLoader>
      ) : (
        <>
          <div className="flex items-center w-4/6">
            {icon}
            {title}
          </div>
          {info}
        </>
      )}
    </li>
  );
};

Item.Icon = Icon;
Item.Title = Title;
Item.Info = Info;
