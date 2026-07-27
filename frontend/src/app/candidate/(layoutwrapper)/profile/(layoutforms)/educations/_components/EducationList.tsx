"use client";
import React, { FC, useEffect, useState } from "react";
import { IconButton, Button } from "@/components/atoms/Button";
import Plus from "@/icons/ic-plus.svg";
import { useTranslations } from "next-intl";
import styles from "./EducationList.module.scss";
import { AddButton } from "@/components/atoms/Button";
import { useGetEducationListQuery } from "@/hooks/student/profilemgmt/useGetEducationListQuery";
import { fromISOtoDate, fromISOtoDateStatic } from "@/utils/date";
import EducationModal from "./EducationModal";
import ThesisModal from "./ThesisModal";
import { useGetThesisDropDown } from "@/hooks/student/profilemgmt/useGetThesisDropDown";
import { dataToOption } from "@/utils";

export const EducationList: FC<{
  activeId?: number;
  isOpen: boolean;
  open: (id: number, thesisId?: string | "new") => void;
}> = ({ open, isOpen }) => {
  const t = useTranslations();

  const { data } = useGetEducationListQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const [editEducation, setEditEducation] = useState(null);
  const [thesisData, setThesisData] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openThesisModal = () => setIsThesisModalOpen(true);
  const closeThesisModal = () => setIsThesisModalOpen(false);

  // TODO: fix this hack, useQuery is not reading data from cache
  useEffect(() => {
    if (!isOpen) {
      //   refetch();
    }
  }, [isOpen]);

  const EditEducationModal = (data: any) => {
    openModal();
    setEditEducation(data);
  };

  const addNewEducation = () => {
    openModal();
    setEditEducation(null);
  };

  const EditThesisModal = (data: any) => {
    setIsThesisModalOpen(true);
    console.log(data, "Tesis DADA");
    setThesisData(data);
  };

  const { data: thesisDropdown } = useGetThesisDropDown();

  return (
    <div className="lg:max-w-screen-md">
      <ul>
        {data?.data.map((education: any) => (
          <li
            key={education?.id}
            className="border-t border-b border-light py-4 px-2"
          >
            <div className="flex justify-between items-baseline">
              <h3 className="mr-2">
                {education?.educationLevel.name} -{" "}
                {education?.university?.name === "Other"
                  ? education?.otherUniversity
                  : education?.university?.name}
              </h3>
              <Button
                onClick={() => EditEducationModal(education)}
                variant="link"
                tw="w-auto"
              >
                {t("common.button-edit")}
              </Button>
            </div>
            <div className="mt-0 flex justify-between gap-5">
              <div className="flex items-baseline">
                <span className="text-base text-dark-softer font-semibold leading-some">
                  {education?.major.name}
                </span>
              </div>
              <span className="mr-4">
                {fromISOtoDateStatic(education?.startDate)}-{" "}
                {education?.endDate
                  ? fromISOtoDateStatic(education?.endDate)
                  : "present"}
              </span>
            </div>

            <div className="bg-light-softer mt-4 pl-4 pr-2 py-3">
              <div className="flex justify-between items-baseline">
                <h4>{t("candidate.education.thesis.title-plural")}</h4>
              </div>
              <ul className="vstack vstack-3 ml-10 mt-2 list-disc">
                {education?.theses.map(
                  (
                    { id, title, type, thesisId, startDate }: any,
                    indx: number
                  ) => (
                    <li
                      className={styles["list-item"]}
                      onClick={() => open(id, thesisId)}
                      key={id}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-grow justify-between items-center">
                          <div>
                            <h5 className="hover:text-primary-light">
                              {title}
                            </h5>
                            <span className="general-text-sm text-dark-soft">
                              {type?.name}
                            </span>
                          </div>

                          <div className="flex flex-col items-end mr-4 -mt-1">
                            <div
                              className={styles["button-edit"]}
                              onClick={() =>
                                EditThesisModal(education?.theses[indx])
                              }
                            >
                              <span className="general-text text-primary-light">
                                {t("common.button-edit")}
                              </span>
                            </div>
                            <span className="general-text-sm text-dark-soft">
                              {fromISOtoDateStatic(startDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                )}
                <li className={styles["list-item"]}>
                  <div className="flex">
                    <IconButton
                      tw="p-0 w-auto"
                      onClick={() => EditThesisModal(education?.id)}
                      variant="link"
                      icon={<Plus className="h-4 w-4 fill-current" />}
                    >
                      {t("candidate.education.form-addThesis-button")}
                    </IconButton>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <AddButton tw="mt-8" onClick={addNewEducation}>
          {t("candidate.education.button-add")}
        </AddButton>

        {isModalOpen && (
          <EducationModal
            isOpen={isOpen}
            closeModal={closeModal}
            data={editEducation}
          />
        )}

        {isThesisModalOpen && (
          <ThesisModal
            isOpen={isOpen}
            closeModal={closeThesisModal}
            data={thesisData}
            types={thesisDropdown?.data.map(dataToOption)}
          />
        )}
      </div>
    </div>
  );
};
