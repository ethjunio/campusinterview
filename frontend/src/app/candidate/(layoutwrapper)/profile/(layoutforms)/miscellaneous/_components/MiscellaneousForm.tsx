// import React, { FC } from "react";
// import { FieldArray, Form, FormikValues } from "formik";
// import { useTranslations } from "next-intl";
// import { InputField } from "@/components/molecules/form/InputField";
// import { TextAreaField } from "@/components/molecules/form/TextAreaField";
// import { IconButton, Button } from "@/components/atoms/Button";
// import Delete from "@/icons/ic-delete.svg";
// import Plus from "@/icons/ic-plus.svg";

// type Props = {
//   values: FormikValues;
//   isSubmitting: boolean;
// };

// export const MiscellaneousForm: FC<Props> = ({
//   values,
//   isSubmitting,
// }) => {
//   const t = useTranslations();

//   return (
//     <Form>
//       <FieldArray name="miscs">
//         {(arrayHelpers) => (
//           <div>
//             {Array.isArray(values.miscs) &&
//               values.miscs.map((_: any, index: number) => (
//                 <div key={index}>
//                   <div className="flex flex-col lg:flex-row">
//                     <div className="flex-grow max-w-screen-full lg:max-w-screen-md vstack vstack-1">
//                       <InputField
//                         name={`miscs[${index}].topic`}
//                         label={t("candidate.miscs.form-topic-label")}
//                         placeholder={t(
//                           "candidate.miscs.form-topic-placeholder"
//                         )}
//                         required
//                       />
//                       <TextAreaField
//                         name={`miscs[${index}].description`}
//                         label={t(
//                           "candidate.miscs.form-description-label"
//                         )}
//                         placeholder={t(
//                           "candidate.miscs.form-description-placeholder"
//                         )}
//                         rows={5}
//                         required
//                       />
//                     </div>
//                     <IconButton
//                       tw="rounded lg:ml-12 p-2 self-center lg:self-start w-auto"
//                       variant="outline"
//                       onClick={() => arrayHelpers.remove(index)}
//                       icon={<Delete className="h-4 w-4 fill-current" />}
//                     >
//                       {t("candidate.miscs.button-remove")}
//                     </IconButton>
//                   </div>
//                   <hr className="my-6" />
//                 </div>
//               ))}
//             <div className="flex justify-center lg:justify-end">
//               <IconButton
//                 tw="rounded p-2"
//                 variant="outline"
//                 disabled={values.miscs.length >= 10}
//                 onClick={() =>
//                   arrayHelpers.push({
//                     topic: "",
//                     description: "",
//                   })
//                 }
//                 icon={<Plus className="h-4 w-4 fill-current" />}
//               >
//                 {t("candidate.miscs.button-add")}
//               </IconButton>
//             </div>
//           </div>
//         )}
//       </FieldArray>

//       <div className="flex justify-center lg:justify-start">
//         <Button tw="mt-4 lg:mt-0" type="submit" disabled={isSubmitting}>
//           {t("common.button-save")}
//         </Button>
//       </div>
//     </Form>
//   );
// };


"use client"
import React, { FC } from 'react';
import { FormikValues } from 'formik';
import { useTranslations } from 'next-intl';
import { InputField } from '@/components/molecules/form/InputField';
import { TextAreaField } from '@/components/molecules/form/TextAreaField';
import { ListsForm } from '../../extracurriculars/_components/ListsForm';

type Props = {
  newItem: {
    topic: string;
    description: string;
  };
  values: FormikValues;
  isSubmitting: boolean;
};

export const MiscellaneousForm: FC<Props> = ({
  newItem,
  values,
  isSubmitting,
}) => {
  const t = useTranslations();

  return (
    <ListsForm
      isSubmitting={isSubmitting}
      name="extras"
      addLabel= {t("candidate.miscs.button-add")}
      removeLabel= {t("candidate.miscs.button-remove")}
      values={values}
      newItem={newItem}>
      <InputField
        name={`topic`}
        label={t("candidate.miscs.form-topic-label")}
        placeholder={t(
          "candidate.miscs.form-topic-placeholder"
        )}
        required
      />
      <TextAreaField
        name={`description`}
        label={t(
          "candidate.miscs.form-description-label"
        )}
        placeholder={t(
          "candidate.miscs.form-description-placeholder"
        )}
        rows={5}
        required
      />

    </ListsForm>
  );
};


