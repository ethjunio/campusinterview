"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { Button } from "@/components/atoms/Button";
import { InputField } from "@/components/molecules/form/InputField";
import { loginValidationSchema } from "@/utils/validations";
import useAuthStore from "@/app/store/authStore";
import { LoginCredentials } from "@/app/services/auth/authApi";
import { Eye, EyeOff, Info } from "lucide-react";
import { useLandingPageData } from "@/components/useLandingPageData";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";
import { useAuthHydration } from "@/hooks/useAuthHydration";
import {
  clearPersistedAuthSession,
  getDashboardPath,
  redirectToDashboard,
} from "@/utils/authSession";

export const LoginForm = () => {
  const t = useTranslations();
  const { data, isLoading } = useLandingPageData();

  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuthStore();
  const hydrated = useAuthHydration();
  const [error, setError] = useState<string | null>(null);

  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    setError(null);
    try {
      await login(values);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Email and password did not match."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const showTooltip = () => setVisibleTooltip(true);
  const hideTooltip = () => setVisibleTooltip(false);

  useEffect(() => {
    if (!hydrated) return;

    const token = Cookies.get("accessToken");

    if (!token) {
      if (user) {
        clearPersistedAuthSession();
        useAuthStore.setState({ user: null });
      }
      return;
    }

    if (!user) {
      clearPersistedAuthSession();
      return;
    }

    const dashboardPath = getDashboardPath(user);
    if (dashboardPath) {
      redirectToDashboard(dashboardPath);
    }
  }, [hydrated, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !(tooltipRef.current as any).contains(event.target)) {
        hideTooltip();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const passwordTooltip = (
    <div
      ref={tooltipRef}
      className={`absolute z-10 text-sm text-gray-600 p-3 bg-white rounded-md shadow-lg border border-gray-200 w-64 ${
        visibleTooltip ? "block" : "hidden"
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

  return (
    <>
      <div className="flex mt-16 sm-h:mt-8 items-baseline">
        <Link
          href="/login"
          className="whitespace-no-wrap cursor-pointer font-extrabold text-dark text-3xl leading-loose"
        >
          {t("auth.tabs-signIn")}
        </Link>
        <div className="self-stretch vr mx-4"></div>
        <Link
          href="/register"
          className={`whitespace-no-wrap cursor-pointer h2 ${
            isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
              ? "!text-primaryPurple !text-none"
              : "!text-PrimaryBlue !text-none"
          }`}
        >
          {t("auth.tabs-register")}
        </Link>
      </div>
      <div className="mt-12 sm-h:mt-8">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema(t)}
          onSubmit={handleSubmit}
        >
          <Form className="vstack vstack-6 sm-h:vstack-3">
            {error && <div className="text-red mb-4">{error}</div>}
            <InputField
              required
              name="email"
              type="email"
              label={t("auth.form-email-label")}
              placeholder={t("auth.form-email-placeholder")}
              maxLength={50}
            />

            {/* Password Field with Tooltip */}
            <div className="relative">
              <div className="flex items-center mb-1">
                <label
                  className="block text-sm font-medium required"
                  htmlFor="password"
                >
                  {t("auth.form-password-label")}*
                </label>
                <div className="relative ml-2">
                  <button
                    type="button"
                    onMouseEnter={showTooltip}
                    onFocus={showTooltip}
                    onBlur={hideTooltip}
                    className="text-gray-500 hover:text-primary-dark focus:outline-none"
                  >
                    <Info size={16} />
                  </button>
                  {passwordTooltip}
                </div>
              </div>

              <InputField
              required
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.form-password-placeholder")}
              endAdornment={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-primary-dark focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            </div>

            <div className="mt-16 lg:hstack lg:hstack-4 flex justify-between lg:justify-start">
              <Button tw={`px-8
              ${
                isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                  ? "!bg-primaryPurple !bg-none"
                  : "!bg-PrimaryBlue !bg-none"
              }
              `} type="submit">
                {t("auth.form-button-signIn")}
              </Button>
              <Link href="/forgot-password"
             
              >
                <Button 
                tw={`px-0 lg:px-4
                ${
                  isOnlineCampusInterview(data?.data?.data?.siteUiFlag)
                    ? "!text-primaryPurple !text-none"
                    : "!text-PrimaryBlue !text-none"
                }
                
                `}
                type="button" variant="transparent">
                  {t("auth.form-button-forgot")}
                </Button>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
