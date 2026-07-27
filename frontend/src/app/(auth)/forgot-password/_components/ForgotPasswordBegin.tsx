"use client"
import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as y from 'yup';
import { useTranslations } from 'next-intl';
import { InputField } from '@/components/molecules/form/InputField';
import { Button } from '@/components/atoms/Button';
import Head from 'next/head';
import { useForgotPasswordMutation } from '@/hooks/auth/useForgotPasswordMutation';
import { useLandingPageData } from '@/components/useLandingPageData';
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

const ForgotPasswordBegin = () => {
    const router = useRouter();
    const t = useTranslations();
  const { data, isLoading } = useLandingPageData();

    const forgotPasswordMutation = useForgotPasswordMutation(
        {
            onSuccess: (data: any) => {
                router.push('/forgot-password-sent');

            },
        }
    );

    return (
        <div>
            <div className='flex mt-16 sm-h:mt-8 items-baseline'></div>
            <div className="vstack vstack-8">
            <Head>
                <title>Reset password - init</title>
            </Head>
            <div>
                <h1>{t('auth.password-reset.begin-title')}</h1>
                
               {forgotPasswordMutation?.error && <span className="danger-text">{forgotPasswordMutation?.error?.response?.data.message || 'Failed to send the Reset Email Try Again...' }</span>} 
            </div>

            <Formik
                validationSchema={y.object({
                    email: y
                        .string()
                        .required(t('auth.form-error-required'))
                        .email(t('auth.form-email-error-invalid')),
                })}
                initialValues={{ email: '' }}
                onSubmit={async (input) => {
                    forgotPasswordMutation.mutate({ email: input.email })
                }}
            >
                <Form>
                    <InputField
                        name="email"
                        label={t('auth.password-reset.email-label')}
                        placeholder={t('auth.password-reset.email-placeholder')}
                    />
                    <Button disabled={forgotPasswordMutation.isPending} type="submit"
                    tw={`${
                        isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                          ? "!bg-primaryPurple !bg-none"
                          : "!bg-PrimaryBlue !bg-none"
                      }`}
                    
                    
                    >
                        {t('auth.password-reset.button-request-link')}
                    </Button>
                </Form>
            </Formik>
        </div>
        </div>
        
    );
}

export default ForgotPasswordBegin;
