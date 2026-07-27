"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '@/components/molecules/form/InputField';
import { Checkbox } from '@/components/molecules/form/Checkbox';
import { Button } from '@/components/atoms/Button';
import { useTranslations } from "next-intl";
import { Radio } from '@/components/molecules/form/Radio';
import { RadioGroup } from '@/components/molecules/form/Radio';
import { useRegisterMutation } from '@/hooks/auth/useRegisterMutation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as y from 'yup';
import { toast } from 'sonner';
import { Eye, EyeOff, Info } from 'lucide-react';
import { useLandingPageData } from '@/components/useLandingPageData';
import { isOnlineCampusInterview } from "@/utils/interviewBrand";

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

const RegisterForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const { data, isLoading, error } = useLandingPageData();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showRepeatPasswordTooltip, setShowRepeatPasswordTooltip] = useState(false);

  const passwordTooltipRef = useRef(null);
  const repeatPasswordTooltipRef = useRef(null);

  const initialValues = {
    email: '',
    password: '',
    repeatPassword: '',
    privacy: false,
    type: 'candidate'
  };

  const registerMutation = useRegisterMutation({
    onSuccess: () => {
      router.push('/verify');
    },
    onError: (data: any) => {
      toast.error(data?.response?.data?.message);
    }
  });

  const registrationValidationSchema = y.object({
    email: y
    .string()
    .required(t('auth.form-error-required'))
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      t('auth.form-email-error-invalid')
    )
    .max(50, t('common.form-field-error-max', { max: 50 })),
    password: y
      .string()
      .required(t('auth.form-error-required'))
      .min(8, t('auth.form-password-error-tooShort'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        t('auth.form-password-error-tooWeak')
      ),
    repeatPassword: y
      .string()
      .required(t('auth.form-error-required'))
      .oneOf([y.ref('password')], t('auth.form-repeat-error-noMatch')),
    privacy: y.bool().oneOf([true], t('auth.form-privacy-error-notAccepted')),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        passwordTooltipRef.current &&
        !passwordTooltipRef.current.contains(event.target)
      ) {
        setShowPasswordTooltip(false);
      }
      if (
        repeatPasswordTooltipRef.current &&
        !repeatPasswordTooltipRef.current.contains(event.target)
      ) {
        setShowRepeatPasswordTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className='flex mt-16 sm-h:mt-8 items-baseline'>
        <Link href="/login" 
        
        className={`whitespace-no-wrap cursor-pointer ${isOnlineCampusInterview(data?.data?.data?.siteUiFlag) ? "text-primaryPurple":"text-primary-light"} text-2xl font-semibold leading-normal`}
        >
          {t('auth.tabs-signIn')}
        </Link>
        <div className="self-stretch vr mx-4"></div>
        <Link href="/register" className='whitespace-no-wrap cursor-pointer h1'>
          {t('auth.tabs-register')}
        </Link>
      </div>

      <div className='mt-12 sm-h:mt-8'>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema}
          onSubmit={async (values) => {
            const { privacy, ...filteredValues } = values;
            registerMutation.mutate(filteredValues);
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="vstack vstack-6 sm-h:vstack-3 sm-h:mt-2 mt-8">
              <InputField
                required
                label={t('auth.form-email-label')}
                name="email"
                type="email"
                placeholder={t('auth.form-email-placeholder')}
                maxLength={50}
              />

              {/* Password Field */}
              <div className="relative">
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium required" htmlFor="password">
                    {t('auth.form-password-label')}*
                  </label>
                  <div className="relative ml-2">
                    <button
                      type="button"
                      onMouseEnter={() => setShowPasswordTooltip(true)}
                      onMouseLeave={() => setShowPasswordTooltip(false)}
                      onFocus={() => setShowPasswordTooltip(true)}
                      onBlur={() => setShowPasswordTooltip(false)}
                      className="text-gray-500 hover:text-primary-dark focus:outline-none"
                      aria-label="Show password requirements"
                    >
                      <Info size={16} />
                    </button>
                    <TooltipBox visible={showPasswordTooltip} tooltipRef={passwordTooltipRef} />
                  </div>
                </div>
                <InputField
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t('auth.form-password-placeholder')}
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-gray-500 hover:text-primary-dark focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                />
              </div>

              {/* Repeat Password Field */}
              <div className="relative">
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium required" htmlFor="repeatPassword">
                    {t('auth.form-repeat-label')}*
                  </label>
                  <div className="relative ml-2">
                    <button
                      type="button"
                      onMouseEnter={() => setShowRepeatPasswordTooltip(true)}
                      onMouseLeave={() => setShowRepeatPasswordTooltip(false)}
                      onFocus={() => setShowRepeatPasswordTooltip(true)}
                      onBlur={() => setShowRepeatPasswordTooltip(false)}
                      className="text-gray-500 hover:text-primary-dark focus:outline-none"
                      aria-label="Show password requirements"
                    >
                      <Info size={16} />
                    </button>
                    <TooltipBox visible={showRepeatPasswordTooltip} tooltipRef={repeatPasswordTooltipRef} />
                  </div>
                </div>
                <InputField
                  required
                  name="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder={t('auth.form-repeat-placeholder')}
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword((prev) => !prev)}
                      className="text-gray-500 hover:text-primary-dark focus:outline-none"
                      aria-label={showRepeatPassword ? "Hide password" : "Show password"}
                    >
                      {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                />
              </div>

              {/* Radio & Privacy */}
              <div className="vstack vstack-5">
                <RadioGroup name="type">
                  <Radio label={t('auth.form-type-student-label')} value="candidate"
                   className={`
                   ${
                     isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                       ? "!text-primaryPurple !text-none"
                       : "!text-PrimaryBlue !text-none"
                   }
                   `}
                  
                  />
                  <Radio label={t('auth.form-type-company-label')} value="company"
                  
                  className={`
                  ${
                    isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                      ? "!text-primaryPurple !text-none"
                      : "!text-PrimaryBlue !text-none"
                  }
                  `}
                  />
                </RadioGroup>
                <Checkbox name="privacy"
                className={`
                ${
                  isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                    ? "!text-primaryPurple !text-none"
                    : "!text-PrimaryBlue !text-none"
                }
                `}

                >
                  {t.rich('auth.form-privacy', {
                    a: (chunks) => (
                      <a
                        href="https://cdn.campusinterview.ch/production/test/legal-docs/privacy-policy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                            ? "!text-primaryPurple !text-none"
                            : "!text-PrimaryBlue !text-none"
                        }`}
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </Checkbox>
              </div>

              <Button
                data-testid="submit"
                disabled={!isValid || isSubmitting}
                type="submit"
                tw={`px-6 ${
                  isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                    ? "!bg-primaryPurple !bg-none"
                    : "!bg-PrimaryBlue !bg-none"
                }`}
              >
                {t('auth.form-button-register')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterForm;
