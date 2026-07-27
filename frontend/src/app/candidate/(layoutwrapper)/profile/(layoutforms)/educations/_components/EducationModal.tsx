import React from "react";
import { EducationForm } from "./EducationForm";
import { useTranslations } from "next-intl";
import { useGetMajorsDropdownQuery, useGetSpecializationDropdownQuery, useGetUniversityDropdownQuery } from "@/hooks/student/onboardingmgmt/useGetEducationalFormHooks";
import { useGetEducationLevelQuery } from "@/hooks/student/onboardingmgmt/useGetEducationLevelQuery";
import { dataToOption } from "@/utils";

const EducationModal = ({ closeModal, data }: any) => {
  const t = useTranslations();

  const { data: universitiesData } = useGetUniversityDropdownQuery();
  const { data: educationLevelsData } = useGetEducationLevelQuery();
  const { data: fieldsOfStudyData } = useGetMajorsDropdownQuery();
  const { data: specializationsData } = useGetSpecializationDropdownQuery();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal only if click is on the overlay (not the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between">
          <h1>{t("candidate.education.title")}</h1>
          <button className=" text-[18px] text-[#1968ff] font" onClick={closeModal}>X</button>
        </div>
        <div className="h-8"></div>
         <EducationForm
          closeModal={closeModal}
          {...(data && { editableData: data })}
          universities={universitiesData?.data.map(dataToOption)}
          specializations={specializationsData?.data.map(
            dataToOption,
          )}
          majors={fieldsOfStudyData?.data.map(dataToOption)}
          educationLevels={educationLevelsData?.data}
        />    
      </div>
    </div>
  );
};

export default EducationModal;
