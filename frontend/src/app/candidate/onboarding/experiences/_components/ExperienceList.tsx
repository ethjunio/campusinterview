"use client"
import React, { FC, useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { useTranslations } from 'next-intl';
import { AddButton } from '@/components/atoms/Button';
import { useGetCandidateExperienceQuery } from '@/hooks/student/profilemgmt/useGetCandidateExperienceQuery';
import { ExperienceModal } from './ExperienceModal';
import { fromISOtoDate, fromISOtoDateStatic } from '@/utils/date';
import { useRouter } from 'next/navigation';
export const ExperienceList: FC<{
  activeId?: number;
  isOpen: boolean;
  open: (id:any) => void;
  routePath:string
}> = ({ open, isOpen, routePath }) => {
  const t = useTranslations();
  const router = useRouter();
  const { data } = useGetCandidateExperienceQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editExperience, setEditExperience] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const EditExperienceModal = (data: any) => {
    openModal();
    setEditExperience(data);
  };

  const addNewExperience = () => {
    openModal();
    setEditExperience(null);
  };

  return (
    <div className="lg:max-w-screen-md">
       <div className="flex justify-end align-baseline max-w-full xl:max-w-full my-4">
       {data?.data?.length === 0 ? (
              <div>
              <Button
              onClick={()=>{
                router.push(routePath);
              }}
              
              type="button" tw="max-w-xs">
              None Yet
              </Button>
              </div>):
              <Button 
              onClick={()=>{
                router.push(routePath);
              }}
              type="button" tw="max-w-xs">
                Next Step
              </Button>
}
</div>

      <ul>
        {data?.data?.length === 0 ? (
          <li className="lead-text">{t('candidate.experience.lead-empty')}</li>
        ) : null}
        {data?.data.map((experience: any) => (
          <li key={experience?.id} className="border-t border-b border-light py-4 px-2">
            <div className="flex justify-between items-baseline">
              <h3 className="mr-2">{experience?.title}</h3>
              <Button onClick={() => EditExperienceModal(experience)} variant="link" tw="w-auto">
                {t('common.button-edit')}
              </Button>
            </div>
            <div className="mt-0 flex justify-between flex-col lg:flex-row">
              <div className="flex items-baseline">
                <h5 className="mr-2">{experience?.employer}</h5>
                <span className="text-base text-dark-softer font-semibold leading-some">
                  {experience?.jobType.name}
                </span>
              </div>
              <span className="mr-4">
                {fromISOtoDateStatic(experience?.startDate)} -{' '}
                {experience?.endDate ? fromISOtoDateStatic(experience?.endDate) : 'present'}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <AddButton tw="mt-8" onClick={addNewExperience}>
          {t('candidate.experience.button-add')}
        </AddButton>

        {isModalOpen && (
          <ExperienceModal
            isOpen={isOpen}
            closeModal={closeModal}
            data={editExperience}
          />
        )}

      </div>
    </div>
  );
};
