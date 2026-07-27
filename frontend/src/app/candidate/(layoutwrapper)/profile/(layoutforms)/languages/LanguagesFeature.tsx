"use client"
import { ProfileForm } from '@/components/organisms/form/ProfileForm';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { LanguagesForm } from './_components/LanguagesForm';
import { useCreateLanguageDetailsMutation } from '@/hooks/student/profilemgmt/useCreateLanguageDetailsMutation';
import * as y from 'yup';
import { toast } from 'sonner';
import { useGetCandidateLanguageQuery } from '@/hooks/student/profilemgmt/useGetCandidateLanguageQuery';
import { useGetLanguageDropdownQuery } from '@/hooks/student/profilemgmt/useGetLanguageDropdownQuery';
import { useGetLanguageLevelDropdownQuery } from '@/hooks/student/profilemgmt/useGetLanguageLevelDropdownQuery';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/atoms/Button';
import { usePathname, useRouter } from 'next/navigation';
import isEqual from "lodash.isequal";


const LanguagesFeature = () => {
  const t = useTranslations();
  const queryClient = useQueryClient()
  const router = useRouter();

  const newItem = { language: undefined, languageLevel: undefined, qualification: '' };

  const { data, isLoading } = useGetCandidateLanguageQuery();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const maxString = (t: any, value = 255) => {
    return y
      .string()
      .max(value, t('common.form-field-error-max', { max: value }))
      .nullable();
  };

  const { data: languagesData } = useGetLanguageDropdownQuery();
  const { data: languageLevelsData } = useGetLanguageLevelDropdownQuery();

  let formikValues: any = null;
  const pathname = usePathname();

  const originalValues = useMemo(() => {
    if (!data) return null;
    return {
      languages:
        data.data?.length
          ? data.data.map((s: any) => ({
              language: { value: s.language.code, label: s.language.name },
              languageLevel: {
                value: s.languageLevel.id,
                label: s.languageLevel.name,
              },
              qualification: s.qualification,
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
    languages: vals.languages
      .map((v: any) => ({
        language: v.language?.value || null,
        level: v.languageLevel?.value || null,
        qualification: (v.qualification || "").trim(),
      }))
      .sort((a: any, b: any) => (a.language ?? "").localeCompare(b.language ?? "")),
  });

  const snapshotRef = useRef<string | null>(null);

  /* 1️⃣  build/refresh baseline whenever server data (originalValues) changes */
  useEffect(() => {
    if (originalValues) {
      snapshotRef.current = JSON.stringify(normalizeValues(originalValues));
      setHasChanges(false);                   // page is clean again
    }
  }, [originalValues]); 

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
  const createLanguageFormMutation = useCreateLanguageDetailsMutation(
    {
      onSuccess: (msg: any) => {
        toast.success(msg.message)
        queryClient.invalidateQueries({ queryKey: ["getCandidateLanguage"] });
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      }
    }
  );

  //ToDO make this datetooption utility function

  function dataToOption(data: any) {
    if (data) {
      const { id: value, name: label } = data;
      return { value, label };
    }
    return null;
  }
  if (!originalValues) return null;

  return (
    <div>
      <ProfileForm>
        {data && !isLoading && (
          <Formik
          initialValues={originalValues}
          enableReinitialize
            onSubmit={(values) => {
              const transformedData = values.languages.map((item: any) => ({
                languageCode: item.language?.value,
                languageLevelId: item.languageLevel?.value,
                qualification: item.qualification || undefined,
              }));

              createLanguageFormMutation.mutate(transformedData);
            }}

            validationSchema={y.object().shape({
              languages: y.array().of(
                y.object().shape({
                  language: y
                    .object()
                    .nullable()
                    .required(t('common.form-field-required')),
                  languageLevel: y
                    .object()
                    .nullable()
                    .required(t('common.form-field-required')),
                  qualification: maxString(t, 550),
                }),
              ),
            })}
          >
            {({ submitCount, errors, values, handleSubmit, setFieldValue, isSubmitting }) => {
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
                    <div><h1 className="">{t('candidate.languages.title')}</h1></div>
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
                <LanguagesForm
                  isSubmitting={isSubmitting}
                  newItem={newItem}
                  values={values}
                  languages={
                    languagesData?.data.map(
                      ({ code, name }: { code: string; name: string }) => ({ value: code, label: name }),
                    ) || []
                  }
                  levels={languageLevelsData?.data.map(dataToOption) || []}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
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

export default LanguagesFeature;
