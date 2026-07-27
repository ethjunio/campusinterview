import React, { FC, useCallback, useEffect } from 'react';
import { TagList as Tags, Tag } from '../Taglist';
import { useField } from 'formik';

import { FormControl } from './FormControl';

type Props = {
  name: string;
  label: string;
  tags: Tag[];
  min: number;
  required?: boolean;
  multi?: boolean;
};

export const TagList: FC<Props> = ({
  required = false,
  tags,
  name,
  label,
  min,
  multi = true,
}) => {
  const [{ value }, meta, helpers] = useField(name);
  const onSelected = useCallback((activeTags) => {
    helpers.setValue([...activeTags]);
  }, []);

  // valdation in formik hooks is async we need to set touched after the value was set
  useEffect(() => {
    if (value && value.length >= min) {
      helpers.setTouched(true);
    }
  }, [value]);

  return (
    <FormControl
      as="label"
      name={name}
      label={label}
      required={required}
      error={meta.touched && meta.error}>
      <div className="mt-3">
        <Tags
          {...{ tags, name, onSelected, multi }}
          activeTags={Array.isArray(value) ? value : [value]}
        />
      </div>
    </FormControl>
  );
};
