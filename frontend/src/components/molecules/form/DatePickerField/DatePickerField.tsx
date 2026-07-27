import React, { FC, useCallback } from 'react';
import { useField } from 'formik';
import CalendarIcon from '@/icons/ic-calendar.svg';
import CloseIcon from '@/icons/ic-close.svg';
import { DayPicker } from 'react-day-picker';
import Cleave from 'cleave.js/react';
import defaultClassnames from './defaultClassnames';

import { FormControl } from '../FormControl';
import { IconButton } from '@/components/atoms/Button';
import { defaultFormat, parseDate, formatDate, formatDateWithTimeZone } from '@/utils/date';

const CustomInput: FC<any> = React.forwardRef<any, any>(
  ({ onClear, ...props }, ref) => (
    <div
      ref={ref}
      className="relative border border-dark-soft px-3 py-2 rounded-md w-full">
      <CalendarIcon className="w-6 h-6 text-primary-light fill-current absolute left-0 ml-3" />
      <Cleave
        options={{ date: true, delimiter: '.', datePatern: ['d', 'm', 'Y'] }}
        className="mr-2 ml-8 w-28 flex items-center text-dark"
        {...props}
      />
      {props.value && (
        <IconButton
          onClick={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            onClear();
          }}
          tw="p-1 absolute top-0 right-0 mt-2 mr-2"
          variant="link"
          icon={<CloseIcon className="w-4 h-4 fill-current text-dark" />}
        />
      )}
    </div>
  ),
);

CustomInput.displayName = 'DateInputComponent';

export const DatePickerField: FC<{
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  style?: any;
}> = ({
  name,
  required = false,
  label,
  placeholder = 'day.month.year',
  disabled = false,
  style,
}) => {
    const [field, meta, helper] = useField(name);

    const onChange = useCallback(
      (date) => {
        helper.setValue(date && formatDateWithTimeZone(date));
      },
      [helper],
    );

    return (
      <FormControl
        tw="max-w-full w-full lg:w-auto xl:max-w-md mb-3"
        style={style}
        {...{ label, name, required }}
        error={meta.touched && meta.error}>
        {/* <DayPickerInput
        classNames={{
          container: '',
          overlay: 'absolute left-0 z-10 mt-2 bg-white shadow rounded-md',
          overlayWrapper: 'relative',
        }}
        component={CustomInput}
        formatDate={formatDateWithTimeZone}
        parseDate={parseDate}
        format={defaultFormat}
        inputProps={{
          placeholder,
          onBlur: () => helper.setTouched(true),
          onClear: () => {
            helper.setValue('');
          },
          disabled,
        }}
        dayPickerProps={{
          firstDayOfWeek: 1,
          classNames: {
            ...defaultClassnames,
            container: 'inline-block general-text mx-1',
            day:
              'table-cell p-1 rounded align-middle text-center cursor-pointer hover:bg-primary-softer hover:text-dark',
            today: 'font-extrabold text-primary-soft',
            selected: 'text-white bg-primary-light',
          },
        }}
        onBlur={() => helper.setTouched(true)}
        onDayChange={onChange}
        value={field.value}
      /> */}

        <DayPicker
          selected={field.value ? parseDate(field.value) : undefined}
          onDayClick={(date) => onChange(date)}
          mode="single"
          firstDayOfWeek={1}
          className="absolute left-0 z-10 mt-2 bg-white shadow rounded-md"
          dayClassName={(date) =>
            `table-cell p-1 rounded align-middle text-center cursor-pointer hover:bg-primary-softer hover:text-dark ${date === field.value ? 'text-white bg-primary-light' : ''
            }`
          }
          todayClassName="font-extrabold text-primary-soft"
          disabled={disabled}
        />
      </FormControl>
    );
  };
