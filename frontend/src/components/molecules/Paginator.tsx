import React, { FC } from 'react';
import c from 'classnames';
import { Button, IconButton } from '@/components/atoms/Button';
import ArrowRight from '@/icons/ic-arrow-right.svg';
import ArrowLeft from '@/icons/ic-arrow-left.svg';

export const Paginator: FC<{
  disabled: boolean;
  page: number;
  totalCount: number;
  perPageCount: number;
  onPageChange: (nextPage: number) => void;
}> = ({ disabled, page, totalCount, perPageCount, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / perPageCount);

  let pages = [];

  function addAfter(pageNumber, median, result) {
    const after =
      pageNumber <= page + median - 1 &&
      pageNumber < Math.ceil(totalCount / perPageCount)
        ? { number: pageNumber + 1, type: 'after' }
        : null;

    if (after) {
      result.push(after);
      return addAfter(pageNumber + 1, median, result);
    }
    return result;
  }

  function addBefore(pageNumber, median, result) {
    const before =
      pageNumber > page - median && pageNumber > 1
        ? { number: pageNumber - 1, type: 'before' }
        : null;

    if (before) {
      result.push(before);
      return addBefore(pageNumber - 1, median, result);
    }

    return result;
  }

  function addPaginationNumbers(startPageNumber, numberOfNumbers) {
    const before = addBefore(startPageNumber, numberOfNumbers, []).reverse();
    const current = { number: page, type: 'current' };
    const after = addAfter(startPageNumber, numberOfNumbers, []);

    if (startPageNumber + numberOfNumbers < pageCount) {
      after.push({ number: pageCount, type: 'afterDots' });
    }
    if (startPageNumber - numberOfNumbers > 1) {
      before.unshift({ number: 1, type: 'beforeDots' });
    }

    return [...before, current, ...after];
  }

  pages = addPaginationNumbers(page, 2);

  return (
    <ul className="flex items-center">
      <li>
        <IconButton
          disabled={disabled}
          onClick={() => page > 1 && onPageChange(page - 1)}
          tw={c({
            'text-primary-light hover:text-primary-lighter': page < 1,
            'text-primary-soft cursor-not-allowed': page === 1,
          })}
          variant="link"
          icon={<ArrowLeft className={c('w-4 h-4 fill-current')} />}
        />
      </li>
      {pages.map((n) => {
        return (
          <React.Fragment key={`page-n-${n.number}`}>
            {n.type === 'afterDots' ? (
              <li className="h3 pb-1 cursor-default">...</li>
            ) : null}
            <li>
              <Button
                disabled={disabled}
                variant="link"
                onClick={() => n.number !== page && onPageChange(n.number)}
                tw={c('rounded-full w-8 h-8 p-0 text-center min-h-full', {
                  'text-white bg-primary-light hover:text-white hover:bg-primary-light':
                    page === n.number,
                  'text-dark hover:text-primary-light': page !== n.number,
                })}>
                {n.type === 'current' ? <b>{n.number}</b> : n.number}
              </Button>
            </li>
            {n.type === 'beforeDots' ? (
              <li className="h3 pb-1 cursor-default">...</li>
            ) : null}
          </React.Fragment>
        );
      })}
      {pageCount > 1 && (
        <li>
          <IconButton
            disabled={disabled}
            onClick={() => page < pageCount && onPageChange(page + 1)}
            variant="link"
            tw={c({
              'text-primary-light hover:text-primary-lighter': page < pageCount,
              'text-primary-soft cursor-not-allowed': page === pageCount,
            })}
            icon={
              <ArrowRight
                className={c('w-4 h-4 fill-current', {
                  'text-primary-light hover:text-primary-lighter':
                    page < pageCount,
                  'text-primary-soft': page === pageCount,
                })}
              />
            }
          />
        </li>
      )}
    </ul>
  );
};
