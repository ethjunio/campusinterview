"use client"
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { ExtracurricularsForm } from './ExtracurricularsForm';
import { ProfileForm } from '@/components/organisms/form/ProfileForm';
import { useGetCandidateExtracurricularsQuery } from '@/hooks/student/profilemgmt/useGetCandidateExtracurricularsQuery';
import { fromDateToISO, fromISOtoDate } from '@/utils/date';
import { useExtraCurricularFormCreateMutation } from '@/hooks/student/profilemgmt/useextracurricularFormCreateMutatio';
import * as y from 'yup';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/atoms/Button';
import isEqual from "lodash.isequal";
import { usePathname, useRouter } from 'next/navigation';

const ExtracurricularsFeature: FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data, isLoading } = useGetCandidateExtracurricularsQuery();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const newItem = {
    id: null,
    title: '',
    activity: '',
    description: '',
    startDate: '',
    endDate: '',
  };

  const queryClient = useQueryClient();


  const maxStringAndRequired = (t: any, value = 255) => {
    return y
      .string()
      .max(value, t('common.form-field-error-max', { max: value }))
      .required(t('common.form-field-required'))
      .trim() // Removes leading and trailing spaces
      .matches(/^(?!\s*$).+/) // Prevents only spaces
      .nullable();
  };

  const originalValues = useMemo(() => {
    if (!data) return null;
    return {
      extras:
        data.data && data.data.length
          ? data.data.map((curi: any) => ({
              ...curi,
              startDate: fromISOtoDate(curi.startDate),
              endDate: fromISOtoDate(curi.endDate),
            }))
          : [newItem],
    };
  }, [data]);
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

  const normalizeValues = (vals: any) => ({
    extras: vals.extras
      .map((e: any) => ({
        id: e.id ?? null,
        title: (e.title || "").trim(),
        activity: (e.activity || "").trim(),
        description: (e.description || "").trim(),
        startDate: e.startDate || "",
        endDate: e.endDate || "",
      }))
      .sort((a: any, b: any) => (a.id ?? 0) - (b.id ?? 0)),
  });
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
  const snapshotRef = useRef<string | null>(null);

/* 1️⃣  build/refresh baseline whenever server data (originalValues) changes */
useEffect(() => {
  if (originalValues) {
    snapshotRef.current = JSON.stringify(normalizeValues(originalValues));
    setHasChanges(false);                   // page is clean again
  }
}, [originalValues]); 



  const createExtracurricularFormMutation = useExtraCurricularFormCreateMutation(
    {
      onSuccess: (success: any) => {
        toast.success(success?.message);
        setHasChanges(false);
        queryClient.invalidateQueries({ queryKey: ["GetCandidateExtracurriculars"] });
      },
      onError: (err: any) => {
        console.log("error", err)
        toast.error(err?.response?.data?.message);
      },
    }
  )
  if (!originalValues) return null;
  return (
    <div>
      <ProfileForm>
        {data && !isLoading && (
          <Formik
          initialValues={originalValues}
            validationSchema={y.object().shape({
              extras: y.array().of(
                y.object().shape({
                  title: maxStringAndRequired(t, 80),
                  activity: maxStringAndRequired(t, 80),
                  startDate: y
                    .string()
                    .required(t('common.form-field-required'))
                    .nullable(),
                  endDate: y.string().nullable(),
                }),
              ),
            })}
            onSubmit={async ({ extras }) => {
              const formattedExtras = extras.map((extra:any) => ({
                title: extra.title,
                activity: extra.activity,
                startDate: fromDateToISO(extra.startDate),
                endDate: fromDateToISO(extra.endDate),
                description: extra.description,
              }));

              console.log("extracurricular", extras)
              createExtracurricularFormMutation.mutate(formattedExtras);
            }}>
            {({ submitCount, errors, values, isSubmitting }) => {
               formikValues = values;
               useEffect(() => {
                if (!originalValues) return;
                const current = JSON.stringify(normalizeValues(values)); // Formik values
                if (snapshotRef.current === null) {
                  snapshotRef.current = current;          // first mount
                  return;
                }
                setHasChanges(current !== snapshotRef.current);
              }, [values, originalValues]);
              return<>
                <Form>
                  <div className='mb-10'>
                    <div className="flex justify-between items-center max-w-full xl:max-w-md">
                      <div><h1 className="">{t('candidate.extracurriculars.title')}</h1></div>
                      <div>
                        <Button tw="text-center" disabled={isSubmitting} type="submit">
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
                  <ExtracurricularsForm {...{ isSubmitting, newItem, values }} />
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

export default ExtracurricularsFeature;

