import { useField } from 'formik';
import React, {
  FC,
  Children,
  ReactElement,
  cloneElement,
  useState,
} from 'react';
import { InputField } from './InputField';

interface Props {
  name?: string;
  className?: string;
  label?: string;
  value: any;
  clearOther?: () => void;
  checked?: boolean | undefined;
  children?: React.ReactNode;
}

interface GroupProps {
  name: string;
  label?: string;
  otherLabel?: string;
  otherName?: string;
  defaultChecked?: string;
  children?: React.ReactNode;
}

export const Radio: FC<Props> = ({
  label,
  name,
  value,
  clearOther,
  checked = undefined,
  className

}) => {
  if (!name) {
    throw new Error(
      'Radio requires name field when not used as part of RadioGroup',
    );
  }

  const [{ onChange, ...field }] = useField({ name, type: 'radio', value });
  return (
    <label className="inline-flex items-center">
      <input
        data-testid={name}
        type="radio"
        className={`form-radio  h-4 w-4 ${className}`}
        onChange={(evt) => {
          clearOther && clearOther();
          onChange(evt);
        }}
        {...field}
        checked={checked}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export const RadioGroup: FC<GroupProps> = ({
  name,
  children,
  label,
  otherLabel = '',
  otherName = '',
  defaultChecked = '',
}) => {
  const [field, meta, helpers] = useField(name);
  const [other, setOther] = useState(!field.value);

  const values = [];
  const cloned = Children.map(children, (child) => {
    const rChild = child as ReactElement<Props>;

    if (rChild.type === Radio) {
      values.push(rChild.props.value);
      return cloneElement(rChild, {
        name,
        clearOther: () => setOther(false),
        checked: (() => {
          return field.value
            ? field.value === rChild.props.value
            : rChild.props.value === defaultChecked;
        })(),
      });
    }
    return null;
  });

  return (
    <div>
      {label && <span className="block text-dark">{label}</span>}
      <div className="hstack hstack-8">
        {cloned}
        {other && (
          <OtherRadio
            label={otherLabel}
            value="other"
            checked={other}
            onChange={() => {
              helpers.setValue('');
              helpers.setTouched(true);
              setOther(true);
            }}
          />
        )}
      </div>
      {other && (
        <div className="mt-2 w-40">
          <InputField name={otherName} placeholder={otherLabel} />
        </div>
      )}
      {meta.touched && meta.error && (
        <span className="leading-tight text-danger ml-1 text-sm">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export const OtherRadio: FC<
  Props & {
    onChange?: () => void;
    checked?: boolean;
  }
> = ({ name, label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        data-testid={name}
        type="radio"
        className="form-radio text-primary-light h-4 w-4"
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};
