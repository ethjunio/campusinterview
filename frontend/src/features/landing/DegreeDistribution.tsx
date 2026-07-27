// import React, { FC, useContext, createContext } from "react";
// import { PieChart, Pie, Cell } from "recharts";
// import c from "classnames";
// import { useTranslations } from "next-intl";
// // import { useCompaniesStaticData } from "./queries";

// const context = {
//   values: {
//     matchingCloseDate: "30",
//     registrationDeadline: "40",
//     interviewDay: "10",
//     distributionDegrees: {
//       master: 40,
//       bachelor: 30,
//       phd: 30,
//     },
//     distributionStudyFields: {
//       engineering: 35,
//       economics: 25,
//       naturalSciences: 20,
//       other: 20,
//     },
//   },
// };

// const COLORS = ["#6876D7", "#79C9FC", "#7ca9ff", "#9EE8EE"];

// export const StaticContext = createContext<{
//   values: Partial<any>;
// }>(context);
// export function useCompaniesStaticData() {
//   return useContext<{ values: Partial<any> }>(StaticContext);
// }

// const Distribution: FC<{
//   title: string;
//   values: {
//     value: number;
//     title: string;
//     cn: string;
//     data: { name: string; value: number };
//   }[];
// }> = ({ title, values }) => {
//   return (
//     <div className="flex flex-col items-start space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
//       <PieChart width={200} height={200}>
//         <Pie
//           data={values.map(({ data }) => data)}
//           cx="50%" // Center X
//           cy="50%" // Center Y
//           dataKey="value"
//           stroke="none" // Removes the border
//         >
//           {values.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>

//       <div>
//         <h3 className="text-2xl mb-4 text-relaxed-2 text-primary-light">
//           {title}
//         </h3>
//         <div className="space-y-2 text-primary-dark text-base lg:text-lg leading-relaxed">
//           {values.map(({ title, value, cn }) => (
//             <div className="flex items-center" key={title}>
//               <div className={c("w-3 h-3 mr-2", cn)}></div>
//               <span className="text-primary-dark">
//                 {value}% {title}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const DegreeDistribution: FC = () => {
//   const { values } = useCompaniesStaticData();
//   if (!values || !values.distributionDegrees) return <></>;
//   const { master, bachelor, phd } = values?.distributionDegrees;
//   const t = useTranslations();
//   const vals = [
//     {
//       value: master,
//       title: t("looking-for-talent.talent-pool-composition.degree-master"),
//       cn: "#7CA9FF",
//       data: { name: "master", value: 40 },
//     },
//     {
//       value: bachelor,
//       title: t("looking-for-talent.talent-pool-composition.degree-bachelor"),
//       cn: "#6876D7",
//       data: { name: "bachelor", value: 30 },
//     },
//     {
//       value: phd,
//       title: t("looking-for-talent.talent-pool-composition.degree-phd"),
//       cn: "#79C9FC",
//       data: { name: "phd", value: 30 },
//     },
//   ];

//   return (
//     <Distribution
//       title={t("looking-for-talent.talent-pool-composition.degree")}
//       values={vals}
//     />
//   );
// };
// export const StudyFieldsDistribution: FC = () => {
//   const { values } = useCompaniesStaticData();
//   if (!values.distributionStudyFields) return <></>;
//   const { engineering, economics, naturalSciences, other } =
//     values.distributionStudyFields;
//   const t = useTranslations();
//   const vals = [
//     {
//       value: engineering,
//       title: t("looking-for-talent.talent-pool-composition.field-engineering"),
//       cn: "#7CA9FF",
//       data: { name: "engineering", value: 35 },
//     },
//     {
//       value: naturalSciences,
//       title: t(
//         "looking-for-talent.talent-pool-composition.field-natural-sciences"
//       ),
//       cn: "#9EE8EE",
//       data: { name: "naturalSciences", value: 20 },
//     },
//     {
//       value: economics,
//       title: t("looking-for-talent.talent-pool-composition.field-economics"),
//       cn: "#6876D7",
//       data: { name: "economics", value: 25 },
//     },
//     {
//       value: other,
//       title: t("looking-for-talent.talent-pool-composition.field-other"),
//       cn: "#79C9FC",
//       data: { name: "other", value: 20 },
//     },
//   ];

//   return (
//     <Distribution
//       title={t("looking-for-talent.talent-pool-composition.field-of-study")}
//       values={vals}
//     />
//   );
// };

"use client";
import React, { FC } from "react";
import { PieChart, Pie, Cell } from "recharts";
import c from "classnames";
import { useTranslations } from "next-intl";
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";

const COLORS = ["#6876D7", "#79C9FC", "#7ca9ff", "#9EE8EE"];

const Distribution: FC<{
  title: string;
  values: {
    value: string | number;
    title: string;
    cn: string;
    data: { name: string; value: string | number };
  }[];
}> = ({ title, values }) => {
  // Convert all values to numbers before passing to chart
  const chartData = values.map(({ data }) => ({
    ...data,
    value: Number(data.value),
  }));

  return (
    <div className="flex flex-col items-start space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          dataKey="value"
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <div>
        <h3 className="text-2xl mb-4 text-relaxed-2 text-primary-light">
          {title}
        </h3>
        <div className="space-y-2 text-primary-dark text-base lg:text-lg leading-relaxed">
          {values.map(({ title, value, cn }) => (
            <div className="flex items-center" key={title}>
              <div className={c("w-3 h-3 mr-2")} style={{ backgroundColor: cn }}></div>
              <span className="text-primary-dark">
                {value}% {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const DegreeDistribution: FC = () => {
  const t = useTranslations();
  const { data } = useGetLandingPageDataQuery() as any;

  const master = data?.data?.distributionDegrees?.master ?? 0;
  const bachelor = data?.data?.distributionDegrees?.bachelor ?? 0;
  const phd = data?.data?.distributionDegrees?.phd ?? 0;

  const vals = [
    {
      value: master,
      title: t("looking-for-talent.talent-pool-composition.degree-master"),
      cn: "#7CA9FF",
      data: { name: "master", value: master },
    },
    {
      value: bachelor,
      title: t("looking-for-talent.talent-pool-composition.degree-bachelor"),
      cn: "#6876D7",
      data: { name: "bachelor", value: bachelor },
    },
    {
      value: phd,
      title: t("looking-for-talent.talent-pool-composition.degree-phd"),
      cn: "#79C9FC",
      data: { name: "phd", value: phd },
    },
  ];

  return (
    <Distribution
      title={t("looking-for-talent.talent-pool-composition.degree")}
      values={vals}
    />
  );
};

export const StudyFieldsDistribution: FC = () => {
  const t = useTranslations();
  const { data } = useGetLandingPageDataQuery() as any;

  const engineering = data?.data?.distributionStudyFields?.engineering ?? 0;
  const naturalSciences = data?.data?.distributionStudyFields?.naturalSciences ?? 0;
  const economics = data?.data?.distributionStudyFields?.economics ?? 0;
  const other = data?.data?.distributionStudyFields?.other ?? 0;

  const vals = [
    {
      value: engineering,
      title: t("looking-for-talent.talent-pool-composition.field-engineering"),
      cn: "#7CA9FF",
      data: { name: "engineering", value: 35 },
    },
    {
      value: naturalSciences,
      title: t(
        "looking-for-talent.talent-pool-composition.field-natural-sciences"
      ),
      cn: "#9EE8EE",
      data: { name: "naturalSciences", value: 20 },
    },
    {
      value: economics,
      title: t("looking-for-talent.talent-pool-composition.field-economics"),
      cn: "#6876D7",
      data: { name: "economics", value: 25 },
    },
    {
      value: other,
      title: t("looking-for-talent.talent-pool-composition.field-other"),
      cn: "#79C9FC",
      data: { name: "other", value: 20 },
    },
  ];

  return (
    <Distribution
      title={t("looking-for-talent.talent-pool-composition.field-of-study")}
      values={vals}
    />
  );
};
