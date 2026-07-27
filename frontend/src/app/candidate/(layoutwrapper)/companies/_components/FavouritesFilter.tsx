"use client"
import React, { FC, useCallback } from 'react';
import c from 'classnames';
import { useField } from 'formik';

import FavoriteIcon from '@/icons/ic-favorite.svg';
import FavoriteIconFull from '@/icons/ic-favorite_full.svg';

export const FavoritesFilter: FC<{
  disabled?: boolean;
  name: string;
  label: string;
}> = ({ disabled = false, name, label }) => {
  const [field, , helpers] = useField(name);
  const onChange = useCallback(() => {
    helpers.setValue(field.value === 1 ? 0 : 1); 
  }, [field.value]);
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onChange}
      className={c('flex justify-between items-center w-full', {
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
      })}>
      <span
        className={c({
          'text-dark': !disabled,
          'text-dark-softer': disabled,
        })}>
        {label}
      </span>
      {!!field.value ? (
        <FavoriteIconFull
          className={c('w-5 h-5 ml-8 fill-current text-primary-light', {
            'cursor-not-allowed text-primary-soft': disabled,
            'cursor-default text-primary-light': !disabled,
          })}
        />
      ) : (
        <FavoriteIcon
          className={c(
            'w-5 h-5 fill-current stroke-none ml-8 text-primary-light',
            {
              'cursor-not-allowed text-primary-soft': disabled,
              'cursor-default text-primary-light': !disabled,
            },
          )}
        />
      )}
    </button>
  );
};
