"use client"
import React, { FC, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ExperienceList } from './ExperienceList';
import { Button } from '@/components/atoms/Button';

interface params {
  routePath:string
}
export const ExperiencesFeature = ({routePath}:params) => {
  const t = useTranslations();

  const [activeId, setActiveId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const open = useCallback((id:any) => {
    setActiveId(id);
    setShowDialog(true);
  }, []);

  const close = useCallback((dirty?: boolean) => {
    if (!dirty || window?.confirm('Are you sure you want to close?')) {
      setActiveId(null);
      setShowDialog(false);
    }
  }, []);

  return (
    <div>
      <h1 className="mb-10">{t('candidate.experience.title-plural')}</h1>
     
      <ExperienceList isOpen={showDialog} open={open} routePath={routePath}/>
     
    </div>
  );
};
