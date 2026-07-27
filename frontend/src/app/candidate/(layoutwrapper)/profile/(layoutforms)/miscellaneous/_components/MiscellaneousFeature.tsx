// "use client"
// import { ProfileForm } from '@/components/organisms/form/ProfileForm';
// import { useTranslations } from 'next-intl';
// import React from 'react';
// import { Formik } from 'formik';
// import { MiscellaneousForm } from './MiscellaneousForm';
// import { useThingsDetailsMutation } from '@/hooks/student/profilemgmt/useThingsDetailsMutation';
// import { toast } from 'sonner';
// import * as Yup from 'yup';
// import { useGetThingsAboutMeQuery } from '@/hooks/student/profilemgmt/useGetThingsAboutMeQuery';

// const MiscellaneousFeature = () => {
//   const t = useTranslations();

//   const {data, isLoading} = useGetThingsAboutMeQuery()

//   const thingsDetailMutation = useThingsDetailsMutation({
//     onSuccess: () => {
//       toast.success("Data Saved successfully");
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });

//   const MiscellaneousSchema = Yup.object().shape({
//     miscs: Yup.array().of(
//       Yup.object().shape({
//         topic: Yup.string().required('Topic is required'),
//         description: Yup.string().required('Description is required'),
//       })
//     ),
//   });

//   return (
//     <div>
//       <ProfileForm title={t('candidate.miscs.title')}>
//         {!isLoading && ( <Formik
//          initialValues={{
//           miscs: data?.data?.map((item: any) => ({
//             topic: item.topic || '',
//             description: item.description || '',
//           })) || [{ topic: '', description: '' }],
//         }}
//           validationSchema={MiscellaneousSchema}
//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               await thingsDetailMutation.mutateAsync(values?.miscs);
//             } catch (error: any) {
//                toast.error(error?.response?.data?.message);
//             } finally {
//               setSubmitting(false); 
//             }
//           }}
//         >
//           {({ values, isSubmitting }) => (
//             <MiscellaneousForm
//               isSubmitting={isSubmitting}
//               values={values}
//             />
//           )}
//         </Formik>)}

//       </ProfileForm>
//     </div>
//   );
// };

// export default MiscellaneousFeature;


"use client"
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { MiscellaneousForm } from './MiscellaneousForm';
import { ProfileForm } from '@/components/organisms/form/ProfileForm';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useGetThingsAboutMeQuery } from '@/hooks/student/profilemgmt/useGetThingsAboutMeQuery';
import { useThingsDetailsMutation } from '@/hooks/student/profilemgmt/useThingsDetailsMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/atoms/Button';
import { usePathname, useRouter } from 'next/navigation';
import isEqual from "lodash.isequal";

const MiscellaneousFeature: FC = () => {
  const t = useTranslations();

  const queryClient = useQueryClient()

  const newItem = {
    topic: '',
    description: '',
  };
  const { data, isLoading } = useGetThingsAboutMeQuery()
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const snapshotRef = useRef<string | null>(null);

  const originalValues = useMemo(() => {
    if (!data) return null;
    return {
      extras:
        data.data && data.data.length
          ? data.data.map((item: any) => ({
              topic: item.topic || "",
              description: item.description || "",
            }))
          : [newItem],
    };
  }, [data]);
  const normalizeValues = (vals: any) => ({
    extras: vals.extras
      .map((m: any) => ({
        topic: (m.topic || "").trim(),
        description: (m.description || "").trim(),
      }))
      // sort to avoid order-based false positives
      .sort((a: any, b: any) =>
        a.topic.localeCompare(b.topic, undefined, { sensitivity: "base" })
      ),
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  let formikValues: any = null;
  const pathname = usePathname();
 
  useEffect(() => {
    if (!originalValues || !formikValues) return;
    const current = normalizeValues(formikValues);
    const original = normalizeValues(originalValues);
    setHasChanges(!isEqual(current, original));
  }, [originalValues, formikValues]);

  useEffect(() => {
    const originalPush = router.push;

    router.push = (path, ...args) => {
      if (hasChanges && typeof path === "string" && path !== pathname) {
        setNextPath(path);
        setShowDialog(true);
        return;
      }
      return originalPush(path, ...args);
    };

    return () => {
      router.push = originalPush; 
    };
  }, [hasChanges, pathname]);

  
  const thingsDetailMutation = useThingsDetailsMutation({
    onSuccess: (success: any) => {
      toast.success(success?.message);
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ["getThingsAboutMe"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const MiscellaneousSchema = Yup.object().shape({
    extras: Yup.array().of(
      Yup.object().shape({
        topic: Yup.string()
          .trim()
          .matches(/^(?!\s*$).+/, 'Topic cannot be empty or spaces only')
          .required('Topic is required'),
        description: Yup.string()
          .trim()
          .matches(/^(?!\s*$).+/, 'Description cannot be empty or spaces only')
          .required('Description is required'),
      })
    ),
  });


  if (!originalValues) return null;
  return (
    <div>
      <ProfileForm>
        {data && !isLoading && (
          <Formik
            initialValues={originalValues}
            enableReinitialize
            validationSchema={MiscellaneousSchema}
            onSubmit={async ({ extras }) => {
              const formattedExtras = extras.map((extra:any) => ({
                topic: extra.topic,
                description: extra.description,
              }));

              console.log("extracurricular", extras)
              thingsDetailMutation.mutate(formattedExtras);
            }}>
            {({ submitCount, errors, values, isSubmitting }) => {
                formikValues = values;
                useEffect(() => {
                  const current = normalizeValues(values);
                  const original = normalizeValues(originalValues);
                  setHasChanges(!isEqual(current, original));
                }, [values, originalValues]);
              return<>
                <Form>
                  <div className='mb-10'>
                    <div className="flex justify-between items-center max-w-full xl:max-w-md">
                      <div><h1 className="">{t('candidate.miscs.title')}</h1></div>
                      <div>
                        <Button tw="text-center" type="submit">
                          {t('common.button-save')}
                        </Button>
                      </div>
                    </div>
                    {submitCount > 0 && Object.keys(errors).length > 0 && (
                      <div className="general-text-sm mt-3 text-danger font-medium ">
                        Some required fields are not filled.
                      </div>

                    )}
                  </div>
                  <MiscellaneousForm {...{ isSubmitting, newItem, values }} />
                </Form>


              </>
            }}
          </Formik>
        )}
      </ProfileForm>
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-4">
              You have unsaved changes. Are you sure you want to leave this
              page?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Stay
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setHasChanges(false);
                  setTimeout(() => {
                    if (nextPath) router.push(nextPath); // Delay to allow state to update
                  }, 0);
                }}
                className="px-4 py-2 text-sm bg-red text-white rounded hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiscellaneousFeature;

