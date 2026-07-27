"use client"
import React, {
  FC,
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
} from 'react';
import c from 'classnames';
import Link from 'next/link';
import { Button, IconButton } from '../atoms/Button';
import { useTranslations } from 'next-intl';
import PlusIcon from '@/icons/ic-plus.svg';
import useMobileDetect from '@/utils/useMobileDetect';

type Props = {
  href: string;

  children: ReactNode;
};

const Title: FC<{ children: ReactNode }> = ({ children }) => <h1>{children}</h1>;

const Action: FC<{ href?: string; children: ReactNode }> = ({ children, href = '' }) => (
  <Link href={href}>
    <Button variant="primary-dark">{children}</Button>
  </Link>
);

const BodyContext = createContext({ href: '', readonly: false });
const Body: FC<{ className?: string; readonly?: boolean; href?: string; children?: ReactNode }> = ({
  children,
  href = '',
  className = '',
  readonly = false,
}) => {
  return (
    <div className={className}>
      <BodyContext.Provider value={{ href, readonly }}>
        {children}
      </BodyContext.Provider>
    </div>
  );
};

const Table: React.FC<{ className?: string; children?: ReactNode }> = ({ children, className }) => {
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  return (
    <>
      {isMobile ? (
        children
      ) : (
        <table className={className}>
          <tbody>{children}</tbody>
        </table>
      )}
    </>
  );
};

const TableRow: FC<{
  title: string;
  titleClassName?: string;
  name?: string;
  readonly?: boolean;
  descriptionClassName?: string;
  under?: boolean;
  className?: string;
  anotherCol?: ReactElement;
  children?: ReactNode;
}> = ({
  title,
  titleClassName,
  children,
  name,
  descriptionClassName,
  under,
  className,
  anotherCol,
}) => {
  const { href, readonly } = useContext(BodyContext);
  const t = useTranslations();
  const hasNoVal = !children;
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  const shouldBeUnder =
    (children && children.toString().length + title.length > 35) || under;

  return (
    <>
      {isMobile ? (
        <div
          className={c(
            'flex mt-5 lg:mt-4',
            shouldBeUnder ? 'flex-col' : 'flex-row',
            className,
          )}>
          <div
            className={c(
              'align-baseline pr-4',
              shouldBeUnder ? 'min-w-1/2' : 'min-w-1/2 max-w-1/2',
              titleClassName,
            )}>
            <span className={titleClassName}>{title}</span>
          </div>
          <div className={c(shouldBeUnder ? 'mt-2' : '')}>
            {!readonly && hasNoVal && name ? (
              <Link href={`${href}?focus=${name}`} scroll={false}>
                <IconButton
                  tw="inline-block text-right -m-4 items-center"
                  variant="link"
                  icon={
                    <PlusIcon className="inline-block w-4 h-4 fill-current items-center" />
                  }>
                  {t('common.button-add')}
                </IconButton>
              </Link>
            ) : (
              <div className={c(descriptionClassName)}>{children}</div>
            )}
          </div>
        </div>
      ) : (
        <tr>
          <td className={c('align-baseline', titleClassName)}>
            <span className={titleClassName}>{title}</span>
          </td>
          <td className="max-w-screen-sm align-baseline">
            {!readonly && hasNoVal && name ? (
              <Link href={`${href}?focus=${name}`} scroll={false}>
                <IconButton
                  tw="inline-block text-right -m-4 items-center"
                  variant="link"
                  icon={
                    <PlusIcon className="inline-block w-4 h-4 fill-current items-center" />
                  }>
                  {t('common.button-add')}
                </IconButton>
              </Link>
            ) : (
              children
            )}
          </td>
          {anotherCol ? <td>{anotherCol}</td> : null}
        </tr>
      )}
    </>
  );
};

type CompoundFC<T> = FC<T> & {
  Title: typeof Title;
  Action: typeof Action;
  Body: typeof Body;
  Row: typeof TableRow;
  Table: typeof Table;
};

export const OverviewCard: CompoundFC<Props> = ({ children, href }) => {
  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  let title = null;
  let action = null;
  let body = null;
  Children.forEach(children, (node: ReactNode) => {
    if (node === null) return null;
    const child = node as ReactElement;
    if (child.type === Action) {
      action = cloneElement(child, { href });
    } else if (child.type === Title) {
      title = child;
    } else if (child.type === Body) {
      body = cloneElement(child, { href });
    }
  });

  return (
    <section className="bg-white rounded-md m-4 p-4 sm:m-10 sm:p-10">
      <div className="flex flex-grow justify-between">
        {title}
        {hasMounted && !isMobile ? action : null}
      </div>
      {body}
      {hasMounted && isMobile ? (
        <div className="mt-8 flex justify-center">{action}</div>
      ) : null}
    </section>
  );
};

OverviewCard.Title = Title;
OverviewCard.Action = Action;
OverviewCard.Body = Body;

OverviewCard.Row = TableRow;
OverviewCard.Table = Table;