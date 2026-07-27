"use client"
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { BackLink } from '@/components/atoms/BackLink';
import { PreeventsList } from '@/app/admin/dashboard/preevents/_components/PreeventsList';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';

const PreeventsPage: NextPage = () => {

  const t = useTranslations();

  return (
    <main className="flex-grow p-8 bg-light-softer">
      <div className="max-w-screen-xl">
        <BackLink className="mb-12" href="/admin/dashboard">
          {t('admin.back-to-dashboard')}
        </BackLink>
        <div className="flex justify-between">
          <h1 className="mb-8">{t('admin.preevents-title')}</h1>
          <Link href="/admin/dashboard/preevents/preevents-form">
            <Button tw="mb-8" variant="primary-dark">
              {t('admin.preevent-list.list-createButton-label')}
            </Button>
          </Link>
        </div>
        <PreeventsList />
      </div>
    </main>
  );
};


export default PreeventsPage;
