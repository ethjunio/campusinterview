import React, { FC, useEffect } from 'react';
import * as y from 'yup';
import { Formik } from 'formik';
// import { optionToData, dataToOption } from 'utils';
// import { SelectOption } from 'types';
// import gql from 'graphql-tag';
// import { useLazyQuery, useMutation } from '@apollo/react-hooks';
// import {
//   ExperienceData,
//   ExperienceDataVariables,
// } from './__generated__/ExperienceData';
// import {
//   ExperienceUpsert,
//   ExperienceUpsertVariables,
// } from './__generated__/ExperienceUpsert';
// import { useNotificationSystem } from 'utils/apollo';
// import { useMeQ } from 'features/auth/state/queries.hooks';
// import {
//   ExperienceRemove,
//   ExperienceRemoveVariables,
// } from './__generated__/ExperienceRemove';
import { ExperienceModal } from './ExperienceModal';
import { useTranslations } from 'next-intl';
// import { fromDateToISO, fromISOtoDate } from 'utils/date';
// import {
//   maxString,
//   maxStringAndRequired,
// } from 'features/company/state/validations';

const defaultInitialValues = {
  title: '',
  employer: '',
  description: '',
  jobType: null,
  startDate: '',
  endDate: '',
};

// const ExperienceQuery = gql`
//   query ExperienceData($input: GetCandidateExperienceInput!) {
//     experience: getCandidateExperience(input: $input) {
//       id
//       title
//       employer
//       jobType {
//         id
//         name
//       }
//       startDate
//       endDate
//       description
//     }
//   }
// `;

// const UpsertMutation = gql`
//   mutation ExperienceUpsert($input: CandidateExperienceInput!) {
//     response: upsertCandidateExperience(input: $input) {
//       id
//       title
//       candidateId
//       employer
//       jobType {
//         id
//         name
//       }
//       startDate
//       endDate
//       description
//     }
//   }
// `;

// const RemoveMutation = gql`
//   mutation ExperienceRemove($id: Int!) {
//     response: removeCandidateExperience(id: $id)
//   }
// `;

export const ExperienceFeature: FC<{
  isOpen: boolean;
  activeId: number;
  jobTypes: SelectOption[];
  close: (dirty?: boolean) => void;
}> = ({ activeId, isOpen, close, jobTypes = [] }) => {
  const [t] = useTranslation(['common']);
  const meQ = useMeQ();
  const [getExperience, { data }] = useLazyQuery<
    ExperienceData,
    ExperienceDataVariables
  >(ExperienceQuery);

  const [onCompleted, onError, error] = useNotificationSystem();
  useEffect(() => {
    if (activeId) {
      getExperience({
        variables: {
          input: {
            id: activeId,
          },
        },
      });
    }
  }, [activeId]);

//   const [upsert] = useMutation<ExperienceUpsert, ExperienceUpsertVariables>(
//     UpsertMutation,
//     {
//       update: (cache, { data }) => {
//         cache.writeQuery<ExperienceData, ExperienceDataVariables>({
//           query: ExperienceQuery,
//           variables: { input: { id: data.response.id } },
//           data: {
//             experience: {
//               __typename: 'CandidateExperience',
//               ...data.response,
//             },
//           },
//         });
//       },
//       onError,
//       onCompleted: () => {
//         close();
//         onCompleted();
//       },
//     },
//   );

//   const [remove] = useMutation<ExperienceRemove, ExperienceRemoveVariables>(
//     RemoveMutation,
//     {
//       onCompleted: () => {
//         close();
//         onCompleted();
//       },
//     },
//   );
  return (
    <Formik
      enableReinitialize
      initialValues={
        activeId && data?.experience
          ? {
              title: data?.experience.title,
              employer: data?.experience.employer,
              description: data?.experience.description,
              jobType: dataToOption(data?.experience.jobType),
              startDate: fromISOtoDate(data?.experience.startDate),
              endDate: fromISOtoDate(data?.experience.endDate),
            }
          : defaultInitialValues
      }
      validationSchema={y.object().shape({
        title: maxStringAndRequired(t, 80),
        employer: maxStringAndRequired(t, 80),
        jobType: y
          .object()
          .nullable()
          .required(t('common:form-field-required')),
        startDate: y
          .string()
          .required(t('common:form-field-required'))
          .nullable(),
        endDate: y.string().nullable(),
        description: maxString(t, 550),
      })}
      onSubmit={async (values) => {
        await upsert({
          variables: {
            input: {
              id: activeId,
              candidateId: meQ.data.me.candidateId,
              ...values,
              startDate: fromDateToISO(values.startDate),
              endDate: fromDateToISO(values.endDate),
              jobType: optionToData(values.jobType),
            },
          },
        });
      }}>
      {() => (
        <ExperienceModal
          activeId={activeId}
          jobTypes={jobTypes}
          isOpen={isOpen}
          error={error}
          close={close}
          remove={remove}
        />
      )}
    </Formik>
  );
};
