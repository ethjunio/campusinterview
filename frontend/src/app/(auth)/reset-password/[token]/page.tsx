"use client";
import React, { useRef, useState, useEffect } from 'react';
import * as y from 'yup';
import { Formik, Form } from 'formik';
import { InputField } from '@/components/molecules/form/InputField';
import { Button } from '@/components/atoms/Button';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useResetPasswordMutation } from '@/hooks/auth/useResetPasswordMutation';
import { Eye, EyeOff, Info } from 'lucide-react';

const TooltipBox = ({ visible, tooltipRef }: { visible: boolean; tooltipRef: any }) => (
  <div
    ref={tooltipRef}
    className={`absolute z-10 text-sm text-gray-600 p-3 bg-white rounded-md shadow-lg border border-gray-200 w-64 ${visible ? 'block' : 'hidden'}`}
    style={{ top: '-5px', right: '-270px' }}
  >
    <p className="font-medium mb-1">Password requirements:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Minimum 8 characters</li>
      <li>At least one uppercase letter</li>
      <li>At least one lowercase letter</li>
      <li>At least one number</li>
    </ul>
  </div>
);

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();

  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    repeatNewPassword: false,
  });

  const [showNewTooltip, setShowNewTooltip] = useState(false);
  const [showRepeatTooltip, setShowRepeatTooltip] = useState(false);

  const newTooltipRef = useRef(null);
  const repeatTooltipRef = useRef(null);

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      router.push('/login');
    },
  });

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newTooltipRef.current && !newTooltipRef.current.contains(event.target)) {
        setShowNewTooltip(false);
      }
      if (repeatTooltipRef.current && !repeatTooltipRef.current.contains(event.target)) {
        setShowRepeatTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="vstack vstack-8">
      <Head>
        <title>{t('auth.password-reset.reset-password-title')}</title>
      </Head>
      <div>
        <h1>{t('auth.password-reset.reset-password-title')}</h1>
        {resetPasswordMutation?.error && (
          <span className="danger-text">
            {resetPasswordMutation?.error?.response?.data.message || t('auth.reset-password-error')}
          </span>
        )}
      </div>

      <Formik
        validationSchema={y.object({
          newPassword: y
            .string()
            .required(t('auth.form-error-required'))
            .min(8, t('auth.form-password-error-tooShort'))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              t('auth.form-password-error-tooWeak'),
            ),
          repeatNewPassword: y
            .string()
            .required(t('auth.form-error-required'))
            .oneOf(
              [y.ref('newPassword')],
              t('auth.form-repeat-error-noMatch'),
            ),
        })}
        initialValues={{
          newPassword: '',
          repeatNewPassword: '',
        }}
        onSubmit={async (values) => {
          resetPasswordMutation.mutate({ ...values, verifyId: params.token as string });
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="vstack vstack-4">

            {/* New Password */}
            <div className="relative">
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium required" htmlFor="newPassword">
                  {t('auth.password-reset.new-password-label')}*
                </label>
                <div className="relative ml-2">
                  <button
                    type="button"
                    onMouseEnter={() => setShowNewTooltip(true)}
                    onMouseLeave={() => setShowNewTooltip(false)}
                    onFocus={() => setShowNewTooltip(true)}
                    onBlur={() => setShowNewTooltip(false)}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                    aria-label='Password requirements:'
                  >
                    <Info size={16} />
                  </button>
                  <TooltipBox visible={showNewTooltip} tooltipRef={newTooltipRef} />
                </div>
              </div>
              <InputField
                name="newPassword"
                placeholder={t('auth.password-reset.new-password-placeholder')}
                type={showPasswords.newPassword ? "text" : "password"}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                    aria-label={showPasswords.newPassword ? "Hide password" : "Show password"}
                  >
                    {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>

            {/* Repeat New Password */}
            <div className="relative">
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium required" htmlFor="repeatNewPassword">
                  {t('auth.password-reset.repeat-new-password-label')}*
                </label>
                <div className="relative ml-2">
                  <button
                    type="button"
                    onMouseEnter={() => setShowRepeatTooltip(true)}
                    onMouseLeave={() => setShowRepeatTooltip(false)}
                    onFocus={() => setShowRepeatTooltip(true)}
                    onBlur={() => setShowRepeatTooltip(false)}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                    aria-label='Password requirements:'
                  >
                    <Info size={16} />
                  </button>
                  <TooltipBox visible={showRepeatTooltip} tooltipRef={repeatTooltipRef} />
                </div>
              </div>
              <InputField
                name="repeatNewPassword"
                placeholder={t('auth.password-reset.repeat-new-password-placeholder')}
                type={showPasswords.repeatNewPassword ? "text" : "password"}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('repeatNewPassword')}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                    aria-label={showPasswords.repeatNewPassword ? "Hide password" : "Show password"}
                  >
                    {showPasswords.repeatNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>

            <Button
              disabled={!isValid || isSubmitting || resetPasswordMutation.isPending}
              type="submit"
            >
              {t('auth.password-reset.button-reset')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
