"use client"
import { ProfileForm } from '@/components/organisms/form/ProfileForm';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Formik } from 'formik';
import { ParticipantForm } from './ParticipantForm';
import { useThingsDetailsMutation } from '@/hooks/student/profilemgmt/useThingsDetailsMutation';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useGetThingsAboutMeQuery } from '@/hooks/student/profilemgmt/useGetThingsAboutMeQuery';
import { useCreateCompanyParticipantsdataMutation } from '@/hooks/company/onboarding/useCreateCompanyParticipantsdataMutation';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

const MiscellaneousFeature = () => {
  const t = useTranslations();
   const router = useRouter();

  const {data, isLoading} = useGetThingsAboutMeQuery()

  const createParticipantMutation = useCreateCompanyParticipantsdataMutation({
    onSuccess: () => {
      toast.success("Data saved successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const MiscellaneousSchema = Yup.object().shape({
    miscs: Yup.array().of(
      Yup.object().shape({
        topic: Yup.string().required('Topic is required'),
        description: Yup.string().required('Description is required'),
      })
    ),
  });

  return (
    <div>
      <ProfileForm title={t('companies.participants.title')}>
      <div className="mb-10 lead-text">
        {t('companies.onboarding.step-participants-lead')}
      </div>
        {!isLoading && ( <Formik
         initialValues={{
          miscs: data?.data?.map((item: any) => ({
            topic: item.topic || '',
            description: item.description || '',
          })) || [{ topic: '', description: '' }],
        }}
          validationSchema={MiscellaneousSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await createParticipantMutation.mutateAsync(values?.miscs);
              router.push("/company/onboarding/participants");
            } catch (error: any) {
               toast.error(error?.response?.data?.message);
            } finally {
              setSubmitting(false); 
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <ParticipantForm
              isSubmitting={isSubmitting}
              values={values}
            />
          )}
        </Formik>)}
       
      </ProfileForm>
    </div>
  );
};

export default MiscellaneousFeature;
