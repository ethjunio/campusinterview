"use client"
import React, { FC, useState, useRef, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '@/components/molecules/form/InputField';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/Button';
import * as y from 'yup';
import { useChangePasswordMutation } from '@/hooks/student/profilemgmt/changePasswordMutation';
import { toast } from 'sonner';
import { Eye, EyeOff, Info } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import isEqual from "lodash.isequal";

export const ChangePasswordFeature: FC = () => {
  const t = useTranslations('auth');
  const router = useRouter();
  const pathname = usePathname();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const formikRef = useRef<any>(null);

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false
  });

  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const tooltipRef = useRef(null);

  const showTooltip = (field: string) => setVisibleTooltip(field);
  const hideTooltip = () => setVisibleTooltip(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !(tooltipRef.current as any).contains(event.target)) {
        hideTooltip();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = formikRef.current?.values;
      if (current) {
        setHasChanges(!isEqual(current, {
          oldPassword: '',
          newPassword: '',
          repeatPassword: '',
        }));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const originalPush = router.push;
    router.push = (path, ...args) => {
      if (hasChanges && typeof path === "string" && path !== pathname) {
        setNextPath(path);
        setShowDialog(true);
        return;
      }
      return originalPush(path, ...args);
    };
    return () => {
      router.push = originalPush;
    };
  }, [hasChanges, pathname]);


  const passwordTooltip = (
    <div
      ref={tooltipRef}
      className={`absolute z-10 text-sm text-gray-600 p-3 bg-white rounded-md shadow-lg border border-gray-200 w-64 ${visibleTooltip ? 'block' : 'hidden'
        }`}
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

  const changePasswordValidationSchema = y.object({
    oldPassword: y.string().required(t('form-error-required')),
    newPassword: y
      .string()
      .required(t('form-error-required'))
      .min(8, t('form-password-error-tooShort'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, t('form-password-error-tooWeak')),
    repeatPassword: y
      .string()
      .required(t('form-error-required'))
      .oneOf([y.ref('newPassword')], t('form-repeat-error-noMatch')),
  });

  const changePasswordMutation = useChangePasswordMutation({
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>

      <Formik
      innerRef={formikRef}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          repeatPassword: '',
        }}
        validationSchema={changePasswordValidationSchema}
        onSubmit={async (values) => {
          changePasswordMutation.mutate(values);
        }}>
        {({ submitCount, errors, isSubmitting }) => (
          <Form className="vstack vstack-0 sm-h:mt-3">
           <div className='mb-10'>
           <div className="flex justify-between items-center max-w-full xl:max-w-md">
              <div>  <h1>{t('changePassword-title')}</h1></div>
              <div>
                <Button
                  data-testid="submit"
                  disabled={isSubmitting}
                  type="submit"
                  tw="px-6">
                  {t('form-button-change-password')}
                </Button>
              </div>
            </div>
            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <div className="general-text-sm text-danger font-medium ">
                Some required fields are not filled.
              </div>
            )}
           </div>
          
            {/* Old Password */}
            <div className="relative mb-4">
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium required" htmlFor="oldPassword">
                  {t('form-oldPassword-label')}*
                </label>
                <div className="relative ml-2">
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('oldPassword')}
                    onFocus={() => showTooltip('oldPassword')}
                    onBlur={hideTooltip}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                  >
                    <Info size={16} />
                  </button>
                  {visibleTooltip === 'oldPassword' && passwordTooltip}
                </div>
              </div>

              <InputField
                required
                placeholder={t('form-oldPassword-placeholder')}
                name="oldPassword"
                type={showPasswords.oldPassword ? "text" : "password"}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('oldPassword')}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                    aria-label={showPasswords.oldPassword ? "Hide password" : "Show password"}
                  >
                    {showPasswords.oldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>

            {/* New Password */}
            <div className="relative mb-4">
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium required" htmlFor="newPassword">
                  {t('form-newPassword-label')}*
                </label>
                <div className="relative ml-2">
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('newPassword')}
                    onFocus={() => showTooltip('newPassword')}
                    onBlur={hideTooltip}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                  >
                    <Info size={16} />
                  </button>
                  {visibleTooltip === 'newPassword' && passwordTooltip}
                </div>
              </div>

              <InputField
                required
                placeholder={t('form-newPassword-placeholder')}
                name="newPassword"
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

            {/* Repeat Password */}
            <div className="relative mb-4">
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium required" htmlFor="repeatPassword">
                  {t('form-repeat-label')}*
                </label>
                <div className="relative ml-2">
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('repeatPassword')}
                    onFocus={() => showTooltip('repeatPassword')}
                    onBlur={hideTooltip}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                  >
                    <Info size={16} />
                  </button>
                  {visibleTooltip === 'repeatPassword' && passwordTooltip}
                </div>
              </div>

              <InputField
                required
                placeholder={t('form-repeat-placeholder')}
                name="repeatPassword"
                type={showPasswords.repeatPassword ? "text" : "password"}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('repeatPassword')}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                    aria-label={showPasswords.repeatPassword ? "Hide password" : "Show password"}
                  >
                    {showPasswords.repeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>
          </Form>
        )}
      </Formik>
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-4">
              You have unsaved changes. Are you sure you want to leave this page?
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDialog(false)} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
                Stay
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setHasChanges(false);
                  setTimeout(() => {
                    if (nextPath) router.push(nextPath);
                  }, 0);
                }}
                className="px-4 py-2 text-sm bg-red text-white rounded hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
