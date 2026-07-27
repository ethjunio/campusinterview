import React, { FC, ReactElement, Children, cloneElement, ReactNode } from 'react';
import { Form, FieldArray, FormikValues } from 'formik';
import { IconButton, Button } from '@/components/atoms/Button';
import Delete from '@/icons/ic-delete.svg';
import { useTranslations } from 'next-intl';
import { AddButton } from '@/components/atoms/Button';

type Props = {
  name: string;
  values: FormikValues;
  addLabel: string;
  removeLabel: string;
  newItem: any;
  isSubmitting: boolean;
  children: ReactNode;
  onSubmit: () => void;
};

export const ListForm: FC<Props> = ({
  isSubmitting,
  addLabel,
  removeLabel,
  name,
  values,
  children,
  newItem,
  onSubmit,
}) => {
  const t = useTranslations();

  const applyName = (childs: ReactNode, index: number): ReactNode => {
    return Children.map(childs, (node) => {
      const child = node as ReactElement;
      if (child.props?.name) {
        return cloneElement(child, {
          name: `${name}[${index}].${child.props.name}`,
        });
      }
      return child.props?.children
        ? cloneElement(child, {
            children: applyName(child.props.children, index),
          })
        : child;
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FieldArray name={name}>
        {(arrayHelpers) => (
          <div>
            {(values[name] || []).map((_: any, index: number) => (
              <div key={index}>
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-grow max-w-screen-full lg:max-w-screen-md vstack vstack-1">
                    {applyName(children, index)}
                  </div>
                  <IconButton
                    tw="rounded lg:ml-12 p-2 lg:self-start self-center justify-center"
                    variant="outline"
                    onClick={() => arrayHelpers.remove(index)}
                    icon={<Delete className="lg:ml-4 h-4 w-4 fill-current" />}
                  >
                    {removeLabel}
                  </IconButton>
                </div>
                <hr className="my-6" />
              </div>
            ))}
            <div className="flex justify-center lg:justify-end">
              <AddButton
                disabled={values[name]?.length >= 10}
                onClick={() => arrayHelpers.push({ ...newItem })}
              >
                {addLabel}
              </AddButton>
            </div>
          </div>
        )}
      </FieldArray>
      {/* <div className="flex justify-center lg:justify-start mt-4 lg:mt-0">
        <Button tw="text-center" type="submit" onClick={onSubmit}>
          {t('common.button-save')}
        </Button>
      </div> */}
    </Form>
  );
};
