import { FC, useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Formik, Form } from "formik";
import { Group } from "@/components/molecules/form/Group";
import { Button } from "@/components/atoms/Button";
import CloseIcon from "@/icons/ic-close.svg";
import isEqual from "lodash/isEqual";

import { getActiveFilters } from "./initialvalues";
import { EducationFilter, educationInitialValues } from "./EducationFilter";
import { SkillsFilter, skillsInitialValues } from "./SkillsFilter";
import { CareerFilter, careerInitialValues } from "./CareerFilter";
import { CategoryFilter, categoryInitialValues } from "./CategoryFilter";
import {
  RegistrationSkills,
  registrationInitialValues,
} from "./RegistrationFilter";
import {
  ResidencePermitFilter,
  ResidencePermitInitialValues,
} from "./ResidencePermitFilter";

const filters = [
  {
    id: "education",
    label: "talent-pool.filter-education",
    Component: EducationFilter,
  },
  { id: "skills", label: "talent-pool.filter-skills", Component: SkillsFilter },
  {
    id: "careerExperience",
    label: "talent-pool.filter-career",
    Component: CareerFilter,
  },
  {
    id: "registrationDate",
    label: "talent-pool.filter-registration-date",
    Component: RegistrationSkills,
  },
  {
    id: "category",
    label: "talent-pool.filter-ranking",
    Component: CategoryFilter,
  },
  {
    id: "residencePermitIds",
    label: "talent-pool.filter-residence",
    Component: ResidencePermitFilter,
  },
];

const defaultValues = {
  education: educationInitialValues,
  skills: skillsInitialValues,
  careerExperience: careerInitialValues,
  registrationDate: registrationInitialValues,
  category: categoryInitialValues,
  favoriteOnly: false,
  residencePermitIds: ResidencePermitInitialValues,
};

const LOCAL_STORAGE_KEY = "talent-pool-filters";

export const ListViewFilter: FC<{
  onApplyFilters: (filterData: Record<string, any>) => void;
}> = ({ onApplyFilters }) => {
  const t = useTranslations("companies");
  const isMobile = false;

  /** 🧠 Load initial state from localStorage or fallback to defaults */
  const getInitialValues = () => {
    if (typeof window === "undefined") return defaultValues;

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;

      if (!parsed) return defaultValues;

      // ✅ Ensure skills.languageLevels are always objects { language, level: {value,label} | null }
      if (parsed.skills?.languageLevels) {
        parsed.skills.languageLevels = parsed.skills.languageLevels.map(
          (lvl: any) => ({
            language: lvl.language,
            // if already object keep it, otherwise fallback to raw value (null for now, will rehydrate in SkillsFilter)
            level:
              typeof lvl.level === "object"
                ? lvl.level
                : lvl.level
                ? { value: lvl.level, label: "" }
                : null,
          }),
        );
      }

      return parsed;
    } catch (e) {
      console.warn("Failed to parse saved filters", e);
      return defaultValues;
    }
  };

  const [appliedValues, setAppliedValues] = useState(getInitialValues);

  useEffect(() => {
    // On first render, apply filters from localStorage
    onApplyFilters(appliedValues);
  }, []);

  return (
    <section className="relative py-6 px-6 xl:px-6 flex-shrink-0 w-full lg:w-72 2lg:w-84">
      <Formik
        enableReinitialize
        initialValues={appliedValues}
        onSubmit={(values, { resetForm }) => {
          onApplyFilters(values);
          setAppliedValues(values);
          localStorage.setItem("talentPoolPage", "1");
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values)); // ✅ Save to localStorage
          resetForm({ values });
        }}
      >
        {({ values, resetForm, isSubmitting }) => {
          const isFormChanged = useMemo(() => {
            return !isEqual(values, appliedValues);
          }, [values, appliedValues]);

          return (
            <Form className="w-full">
              <div className="flex justify-between">
                <h2>{t("talent-pool.filter-title")}</h2>
                {isMobile && (
                  <CloseIcon className="w-4 h-4 text-primary-light cursor-pointer" />
                )}
              </div>

              <ul className="mt-10 space-y-4">
                {filters?.map(({ id, label, Component }) => (
                  <Group
                    key={id}
                    disabled={false}
                    title={t(label)}
                    initialOpen={id === "category"}
                    count={getActiveFilters(id, values)}
                  >
                    <Component />
                  </Group>
                ))}

                <li className="flex justify-between items-center pt-4 pb-4 -ml-4">
                  <Button
                    onClick={() => {
                      resetForm({ values: defaultValues });
                      setAppliedValues(defaultValues);
                      localStorage.setItem("talentPoolPage", "1");
                      localStorage.removeItem(LOCAL_STORAGE_KEY);
                      onApplyFilters({});
                    }}
                    variant="link"
                  >
                    {t("talent-pool.filter-clear")}
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !isFormChanged}
                    tw="ml-4"
                    variant="primary-light"
                  >
                    {t("talent-pool.filter-apply")}
                  </Button>
                </li>
              </ul>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

// import { FC, useState, useMemo, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import { Formik, Form } from "formik";
// import { Group } from "@/components/molecules/form/Group";
// import { Button } from "@/components/atoms/Button";
// import CloseIcon from "@/icons/ic-close.svg";
// import isEqual from "lodash/isEqual";

// import { getActiveFilters } from "./initialvalues";
// import { EducationFilter, educationInitialValues } from "./EducationFilter";
// import { SkillsFilter, skillsInitialValues } from "./SkillsFilter";
// import { CareerFilter, careerInitialValues } from "./CareerFilter";
// import { CategoryFilter, categoryInitialValues } from "./CategoryFilter";
// import { RegistrationSkills } from "./RegistrationFilter";

// const filters = [
//   {
//     id: "education",
//     label: "talent-pool.filter-education",
//     Component: EducationFilter,
//   },
//   {
//     id: "skills",
//     label: "talent-pool.filter-skills",
//     Component: SkillsFilter,
//   },
//   {
//     id: "careerExperience",
//     label: "talent-pool.filter-career",
//     Component: CareerFilter,
//   },
//   {
//     id: "registrationDate",
//     label: "talent-pool.filter-registration-date",
//     Component: RegistrationSkills,
//   },
//   {
//     id: "category",
//     label: "talent-pool.filter-category",
//     Component: CategoryFilter,
//   },
// ];

// const defaultValues = {
//   education: educationInitialValues,
//   skills: skillsInitialValues,
//   careerExperience: careerInitialValues,
//   registrationDate: educationInitialValues,
//   category: categoryInitialValues,
//   favoriteOnly: false,
// };

// const LOCAL_STORAGE_KEY = "talent-pool-filters";

// export const ListViewFilter: FC<{
//   onApplyFilters: (filterData: Record<string, any>) => void;
// }> = ({ onApplyFilters }) => {
//   const t = useTranslations("companies");
//   const isMobile = false;

//   // 🧠 Load initial state from localStorage or fallback to defaults
//   const getInitialValues = () => {
//     if (typeof window === "undefined") return defaultValues;
//     try {
//       const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
//       return saved ? JSON.parse(saved) : defaultValues;
//     } catch {
//       return defaultValues;
//     }
//   };

//   const [appliedValues, setAppliedValues] = useState(getInitialValues);

//   useEffect(() => {
//     // On first render, apply filters from localStorage
//     onApplyFilters(appliedValues);
//   }, []);

//   return (
//     <section className="relative py-6 px-6 xl:px-6 flex-shrink-0 w-full lg:w-72 2lg:w-84">
//       <Formik
//         enableReinitialize
//         initialValues={appliedValues}
//         onSubmit={(values, { resetForm }) => {
//           onApplyFilters(values);
//           setAppliedValues(values);
//           localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values)); // ✅ Save to localStorage
//           resetForm({ values });
//         }}
//       >
//         {({ values, resetForm, isSubmitting }) => {
//           const isFormChanged = useMemo(() => {
//             return !isEqual(values, appliedValues);
//           }, [values, appliedValues]);

//           return (
//             <Form className="w-full">
//               <div className="flex justify-between">
//                 <h2>{t("talent-pool.filter-title")}</h2>
//                 {isMobile && (
//                   <CloseIcon className="w-4 h-4 text-primary-light cursor-pointer" />
//                 )}
//               </div>

//               <ul className="mt-10 space-y-4">
//                 {filters.map(({ id, label, Component }: any) => {
//                   return (
//                     <Group
//                       key={id}
//                       disabled={false}
//                       title={t(label)}
//                       initialOpen={id === "category"}
//                       count={getActiveFilters(id, values)}
//                     >
//                       <Component />
//                     </Group>
//                   )
//                 })}

//                 <li className="flex justify-between items-center pt-4 pb-4 -ml-4">
//                   <Button
//                     onClick={() => {
//                       resetForm({ values: defaultValues });
//                       setAppliedValues(defaultValues);
//                       localStorage.removeItem(LOCAL_STORAGE_KEY);
//                       onApplyFilters({});
//                     }}
//                     variant="link"
//                   >
//                     {t("talent-pool.filter-clear")}
//                   </Button>

//                   <Button
//                     type="submit"
//                     disabled={isSubmitting || !isFormChanged}
//                     tw="ml-4"
//                     variant="primary-light"
//                   >
//                     {t("talent-pool.filter-apply")}
//                   </Button>
//                 </li>
//               </ul>
//             </Form>
//           );
//         }}
//       </Formik>
//     </section>
//   );
// };
