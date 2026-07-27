import React, { FC, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SelectField } from "@/components/molecules/form/SelectField";
import { dataToOption } from "@/utils";
import { useGetLanguageDropdownQuery } from "@/hooks/student/profilemgmt/useGetLanguageDropdownQuery";
import { useGetSkillsDropdownQuery } from "@/hooks/student/profilemgmt/useGetSkillsDropdownQuery";
import { useGetLanguageLevelDropdownQuery } from "@/hooks/student/profilemgmt/useGetLanguageLevelDropdownQuery";
import { useFormikContext } from "formik";
import isEqual from "lodash/isEqual";

export const skillsInitialValues = {
  language: [],
  technologies: [],
  experienceTechnologies: [],
  languageLevels: [],
};

export const SkillsFilter: FC = () => {
  const t = useTranslations();
  const { values, setFieldValue } = useFormikContext<any>();

  // API data
  const { data: languageData } = useGetLanguageDropdownQuery();
  const { data: languageLevelData } = useGetLanguageLevelDropdownQuery();
  const { data: technologiesData } = useGetSkillsDropdownQuery();

  // Options mapping
  const languageOptions = useMemo(
    () => languageData?.data?.map(({ code, name }: any) => ({ value: code, label: name })) || [],
    [languageData]
  );

  const languageLevelOptions = useMemo(
    () => languageLevelData?.data?.map(({ id, name }: any) => ({ value: id, label: name })) || [],
    [languageLevelData]
  );

  const technologyOptions = useMemo(
    () => technologiesData?.data?.map(dataToOption) || [],
    [technologiesData]
  );

  const selectedLanguages = values?.skills?.language || [];
  const currentLevels = values?.skills?.languageLevels || [];

  /** 🧠 Sync languages → languageLevels array */
  useEffect(() => {
    const updatedLevels = selectedLanguages.map((lang: any) => {
      const existing = currentLevels.find((lvl: any) => lvl.language === lang.value);
      return {
        language: lang.value,
        level: existing?.level || null,
      };
    });

    if (!isEqual(updatedLevels, currentLevels)) {
      setFieldValue("skills.languageLevels", updatedLevels);
    }
  }, [selectedLanguages]);

  /** 🧠 Normalize level values into proper option objects after reload */
  useEffect(() => {
    if (currentLevels?.length && languageLevelOptions?.length) {
      const normalized = currentLevels.map((lvl: any) => {
        if (!lvl.level) return lvl;

        // already an object {value,label}
        if (typeof lvl.level === "object" && lvl.level.label) return lvl;

        // if only raw value saved, map it to option
        const option = languageLevelOptions.find((opt) => opt.value === lvl.level?.value || opt.value === lvl.level);
        return { ...lvl, level: option || null };
      });

      if (!isEqual(normalized, currentLevels)) {
        setFieldValue("skills.languageLevels", normalized);
      }
    }
  }, [languageLevelOptions]);

  return (
    <>
      {/* Language Selection */}
      <SelectField
        isMulti
        isClearable={false}
        isSearchable
        label={t("companies.talent-pool.filter-language-label")}
        placeholder={t("common.placeholders.select-field")}
        name="skills.language"
        options={languageOptions}
      />

      {/* Level dropdown for each selected language */}
      {selectedLanguages?.map((lang: { value: string; label: string }, index: number) => (
        <div key={lang.value}>
          <SelectField
            isClearable
            isSearchable={false}
            label={`${lang.label} Level`}
            placeholder={t("common.placeholders.select-field")}
            name={`skills.languageLevels.${index}.level`}
            options={languageLevelOptions}
          />
        </div>
      ))}

      {/* Technologies Selection */}
      <SelectField
        isMulti
        isSearchable
        isClearable={false}
        label={t("companies.talent-pool.filter-technologies-label")}
        placeholder={t("common.placeholders.select-field")}
        name="skills.technologies"
        options={technologyOptions}
      />

      {/* Experience-linked technologies Selection */}
      <SelectField
        isMulti
        isSearchable
        isClearable={false}
        label={t("companies.talent-pool.filter-experience-technologies-label")}
        placeholder={t("common.placeholders.select-field")}
        name="skills.experienceTechnologies"
        options={technologyOptions}
      />
    </>
  );
};