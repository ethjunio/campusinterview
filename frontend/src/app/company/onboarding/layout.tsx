'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import IconInformation from '@/icons/ic-info_blue.svg';
import { ArrowButton } from '@/components/atoms/Button';
import { Steps } from '@/components/molecules/Steps';
import React from 'react';

// Define the company step routes
const stepRoutes = ['general', 'contact', 'facts', 'joinus', 'participants'];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const stepIndex = stepRoutes.findIndex((route) =>
    pathname.endsWith(`/${route}`) || pathname === `/${route}`
  );

  const currentStep = stepIndex >= 0 ? stepIndex : 0;

  const percentageStepsCompleted =
    ((currentStep + 1) / stepRoutes.length) * 100;

  const title = t('candidate.onboarding.information-title');
  const information = t('candidate.onboarding.information-text', { currentYear });

  const steps = stepRoutes.map((route) =>
    t(`companies.onboarding.step-${route}-title`)
  );

  const canSkip = false;

  return (
    <main className="flex flex-grow flex-col lg:flex-row-reverse">
      {/* Sidebar Info Section — put this first */}
      <section className="w-full right-0 top-0 bottom-0 lg:w-1/3 px-8 pt-10 pb-10 bg-gray-100 lg:px-12">
        <div className="flex items-center mb-5">
          <IconInformation className="w-8 h-8 mr-2 text-primary-light fill-current" />
          <h2>{title}</h2>
        </div>
        <p className="lead-text">{information}</p>

        {canSkip && (
          <ArrowButton tw="mt-8 pl-0" variant="link">
            {t('candidate.onboarding.button-skip')}
          </ArrowButton>
        )}
      </section>

      {/* Main form section */}
      <section className="px-8 lg:px-16 mb-20 lg:mb-32 flex flex-grow">
        <div className="mt-4 lg:mt-16 w-full lg:w-auto">
          <h1>{t('companies.onboarding.title')}</h1>

          <div className="mb-10 mt-6">
            <Steps steps={steps} selected={currentStep} type="company" />
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}
