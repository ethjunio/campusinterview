"use client";

import { FC, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ListViewFilter } from "./ListViewFilter";
import { ListViewList } from "./ListViewList";

export const ListViewFeature: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [filterParams, setFilterParams] = useState<Record<string, any>>({});

  const handleApplyFilters = (filters: Record<string, any>) => {
    const transformedFilters: Record<string, string> = {};

    if (filters.education) {
      if (filters.education.educationLevel) {
        transformedFilters.educationlevelIds = filters.education.educationLevel
          .map((el: any) => el.value)
          .join(",");
      }
      if (filters.education.specialization) {
        transformedFilters.specializationIds = filters.education.specialization
          .map((el: any) => el.value)
          .join(",");
      }
      if (filters.education.major) {
        transformedFilters.majorIds = filters.education.major
          .map((el: any) => el.value)
          .join(",");
      }
      if (filters.education.university) {
        transformedFilters.universityIds = filters.education.university
          .map((el: any) => el.value)
          .join(",");
      }
    }

    if (filters.skills) {
      // if (filters.skills.language) {
      //   transformedFilters.languageIds = filters.skills.language.map((el: any) => el.value).join(',');
      // }

      if (filters.skills.language && filters.skills.languageLevels) {
        const languageIds: Record<string, number[]> = {};

        filters.skills.language.forEach((lang: any) => {
          const langCode = lang.value;

          // collect all selected levels for this language
          const levels = filters.skills.languageLevels
            .filter((lvl: any) => lvl?.language === langCode && lvl?.level)
            .map((lvl: any) => lvl?.level?.value);

          languageIds[langCode] = levels;
        });

        // 🔑 build string in required shape
        const languageIdsQuery = Object.entries(languageIds)
          .map(([lang, ids]) => `${lang}:[${ids.join(",")}]`)
          .join(",");

        transformedFilters.languageIds = languageIdsQuery;
      }

      if (filters.skills.technologies) {
        transformedFilters.technologiesIds = filters.skills.technologies
          .map((el: any) => el.value)
          .join(",");
      }

      if (filters.skills.experienceTechnologies) {
        transformedFilters.experienceTechnologiesIds =
          filters.skills.experienceTechnologies
            .map((el: any) => el.value)
            .join(",");
      }
    }

    if (filters.careerExperience) {
      if (filters.careerExperience.interest) {
        transformedFilters.interestIds = filters.careerExperience.interest
          .map((el: any) => el.value)
          .join(",");
      }
      if (filters.careerExperience.desiredJobType) {
        transformedFilters.offeredPosIds =
          filters.careerExperience.desiredJobType
            .map((el: any) => el.value)
            .join(",");
      }
      if (filters.careerExperience.desiredWorkArea) {
        transformedFilters.workAreaIds =
          filters.careerExperience.desiredWorkArea
            .map((el: any) => el.value)
            .join(",");
      }
      if (filters.careerExperience.experiencesNumber) {
        transformedFilters.experienceCount =
          filters.careerExperience.experiencesNumber.value;
      }
      if (filters.careerExperience.experienceYears) {
        transformedFilters.experienceYears =
          filters.careerExperience.experienceYears.value;
      }
      if (filters.careerExperience.startDate) {
        transformedFilters.canStartDate = filters.careerExperience.startDate;
      }
    }

    if (filters.registrationDate) {
      if (filters.registrationDate.after) {
        transformedFilters.registrationDateAfter =
          filters.registrationDate.after;
      }
      if (filters.registrationDate.before) {
        transformedFilters.registrationDateBefore =
          filters.registrationDate.before;
      }
    }

    if (filters.category && filters.category.category) {
      transformedFilters.categoryEnums = filters.category.category
        .map((el: any) => el.value)
        .join(",");
    }

    if (filters?.residencePermitIds && filters?.residencePermitIds) {
      transformedFilters.residencePermitIds = filters?.residencePermitIds
        ?.map((el: any) => el.value)
        .join(",");
    }
    // transformedFilters.favoriteOnly = filters.favoriteOnly;

    setFilterParams(transformedFilters);
    // Convert to query string and push to router
    const queryString = new URLSearchParams(transformedFilters).toString();

    router.push(`${pathname}?${queryString}`);
  };

  return (
    <>
      <div className="hidden lg:block">
        <ListViewFilter onApplyFilters={handleApplyFilters} />
      </div>
      <div className="block w-full">
        <ListViewList filters={filterParams} />
      </div>
    </>
  );
};
