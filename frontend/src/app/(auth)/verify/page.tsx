import React from 'react'
import Head from 'next/head';
import { useTranslations } from 'next-intl';


const page = () => {
    const t = useTranslations();
    const title = t('auth.verify-title');
    const subtitle = t('auth.verify-subtitle');
    const text = t('auth.verify-text');
    return (
      <div className="mx-4 lg:mx-8 xl:mx-12">
        <Head>
          <title>Verify</title>
        </Head>
        <h1 className="mb-16">{title}</h1>
        <h4 className="mb-5">{subtitle}</h4>
        <p className="general-text max-w-sm">{text}</p>
      </div>
    );
  };

export default page
