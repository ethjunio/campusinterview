"use client"
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { ExperienceForm } from './ExperienceForm';
import { useGetPositionsDropdownQuery } from '@/hooks/student/profilemgmt/useGetPositionsDropdownQuery';
import { useGetSkillsDropdownQuery } from '@/hooks/student/profilemgmt/useGetSkillsDropdownQuery';
import { dataToOption } from '@/utils';

export const ExperienceModal = ({ isOpen, closeModal, data }: any) => {
  const t = useTranslations();

  const { data: jobTypesData } = useGetPositionsDropdownQuery();
  const { data: skillsData } = useGetSkillsDropdownQuery();

   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Close modal only if click is on the overlay (not the modal content)
      if (e.target === e.currentTarget) {
        closeModal();
      }
    };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h1>{t("candidate.experience.title")}</h1>
            <button className=" text-[18px] text-[#1968ff] font" onClick={closeModal}>X</button>
          </div>
          <ExperienceForm  closeModal={closeModal}
            {...(data && { editableData: data })}
            jobTypes={jobTypesData?.data.map(dataToOption)}
            skills={skillsData?.data.map(dataToOption) || []}
             />
        </div>
      </div>
    </>
  );
};
