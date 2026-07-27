"use client"
import React, { FC } from 'react';
import { Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { ExtracurricularsForm } from './ExtracurricularsForm';
import { ProfileForm } from '@/components/organisms/form/ProfileForm';
import { useGetCandidateExtracurricularsQuery } from '@/hooks/student/profilemgmt/useGetCandidateExtracurricularsQuery';
import { fromDateToISO, fromISOtoDate } from '@/utils/date';
import { useExtraCurricularFormCreateMutation } from '@/hooks/student/profilemgmt/useextracurricularFormCreateMutatio';
import * as y from 'yup';
import { toast } from 'sonner';

const ExtracurricularsFeature: FC = () => {
  const t = useTranslations();

  const {data, isLoading} = useGetCandidateExtracurricularsQuery();
 
  const newItem = {
    id: null,
    title: '',
    activity: '',
    description: '',
    startDate: '',
    endDate: '',
  };

   const maxStringAndRequired = (t, value = 255) => {
    return y
      .string()
      .max(value, t('common.form-field-error-max', { max: value }))
      .required(t('common.form-field-required'))
      .nullable();
  };
  

  const createExtracurricularFormMutation = useExtraCurricularFormCreateMutation(
    {
      onSuccess: (success:any) => {
        toast.success(success?.message);
      },
      onError: (err:any) => {
        console.log("error",err)
        toast.error(err?.response?.data?.message);
      },
    }
  )

  return (
    <div>
      <ProfileForm title={t('candidate.extracurriculars.title')}>
        {data && !isLoading && (
          <Formik
            initialValues={{
              extras:
                data?.data && data.data.length
                  ? data?.data.map((curi) => {
                      return {
                        ...curi,
                        startDate: fromISOtoDate(curi.startDate),
                        endDate: fromISOtoDate(curi.endDate),
                      };
                    })
                  : [newItem],
            }}
            validationSchema={y.object().shape({
              extras: y.array().of(
                y.object().shape({
                  title: maxStringAndRequired(t, 80),
                  activity: maxStringAndRequired(t, 80),
                  startDate: y
                    .string()
                    .required(t('common.form-field-required'))
                    .nullable(),
                  endDate: y.string().nullable(),
                  description: maxStringAndRequired(t, 550),
                }),
              ),
            })}
            onSubmit={async ({ extras }) => {
              const formattedExtras = extras.map((extra) => ({
                title: extra.title,
                activity: extra.activity,
                startDate: fromDateToISO(extra.startDate),
                endDate: fromDateToISO(extra.endDate),
                description: extra.description,
              }));
          
              console.log("extracurricular", extras)
              createExtracurricularFormMutation.mutate(formattedExtras);
            }}>
            {({ values, isSubmitting }) => (
              <ExtracurricularsForm {...{ isSubmitting, newItem, values }} />
            )}
          </Formik>
        )}
      </ProfileForm>
    </div>
  );
};

export default ExtracurricularsFeature;

