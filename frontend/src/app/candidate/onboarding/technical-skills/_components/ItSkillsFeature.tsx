"use client"
import { ProfileForm } from '@/components/organisms/form/ProfileForm';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { ItSkillsForm } from './ItSkillsForm';
import { useGetSkillsDropdownQuery } from '@/hooks/student/profilemgmt/useGetSkillsDropdownQuery';
import { useGetSkillsLevelsDropdownQuery } from '@/hooks/student/profilemgmt/useGetSkillsLevelsDropdownQuery';
import { useGetCandidateSkillsQuery } from '@/hooks/student/profilemgmt/useGetCandidateSkillsQuery';
import { useCreateItSkillsDetailsMutation } from '@/hooks/student/profilemgmt/useCreateItSkillsDetailsMutation';
import { toast } from 'sonner';
import * as y from 'yup';
import { dataToOption } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/atoms/Button';
import { usePathname, useRouter } from 'next/navigation';
import isEqual from "lodash.isequal";

interface params {
  routePath:string
}

const ItSkillsFeature = ({routePath}:params) => {
  const t = useTranslations();
  const queryClient = useQueryClient()

  const newItem = {
    itSkill: undefined,
    skillLevel: undefined,
    otherItSkill: "",
    description: "",
  };

  const maxString = (t: any, value = 255) => {
    return y
      .string()
      .max(value, t('common.form-field-error-max', { max: value }))
      .nullable();
  };

  const { data, isLoading } = useGetCandidateSkillsQuery();

  const { data: itSkillsData } = useGetSkillsDropdownQuery();
  const router = useRouter();
  const { data: levelsData } = useGetSkillsLevelsDropdownQuery();
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const pathname = usePathname();

  const snapshotRef = useRef<string | null>(null);

  const originalValues = useMemo(() => {
    if (!data) return null;
    return {
      itSkills:
        data.data && data.data.length
          ? data.data.map((s: any) => ({
              skillLevel: dataToOption(s.skillLevel),
              itSkill: dataToOption(s.itSkill),
              otherItSkill: s.itSkill?.name === "Other" ? s.otherItSkill : "",
              description: s.description,
            }))
          : [],
    };
  }, [data]);
  

  const normalizeValues = (vals: any) => ({
    itSkills: vals.itSkills
      .map((s: any) => ({
        itSkillId: s.itSkill?.value ?? null,
        skillLevelId: s.skillLevel?.value ?? null,
        otherItSkill: s.otherItSkill?.trim() ?? "",
        description: (s.description || "").trim(),
      }))
      // keep a stable sort so equality checks aren’t order-dependent
      .sort(
        (a: any, b: any) =>
          (a.itSkillId ?? 0) - (b.itSkillId ?? 0) ||
          (a.skillLevelId ?? 0) - (b.skillLevelId ?? 0)
      ),
  });
  useEffect(() => {
    if (originalValues) {
      snapshotRef.current = JSON.stringify(normalizeValues(originalValues));
      setHasChanges(false);
    }
  }, [originalValues]);
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






  const createItskillsFormMutation = useCreateItSkillsDetailsMutation(
    {
      onSuccess: (msg: any) => {
        toast.success(msg.message)
        setHasChanges(false);
        queryClient.invalidateQueries({ queryKey: ["getCandidateSkills"] });
        router.push(routePath);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      }
    }
  );

  const otherValidationOption = (t: any) => ({
    is: (v: any) => v?.label === 'Other',
    then: (schema: any) =>
      schema
        .required(t('common.form-field-required'))
        .trim()
        .matches(/^(?!\s*$).+/),
  });

  if (!originalValues) return null;

  

  return (
    <div>
      <ProfileForm>
        {data && !isLoading && (
          <Formik
          initialValues={originalValues}
          enableReinitialize
            onSubmit={(values) => {
              // Transform form values to the desired payload format
              const transformedValues = values.itSkills.map((item: any) => {
                const payload: any = {
                  itSkillId: item.itSkill?.value,
                  skillLevelId: item.skillLevel?.value,
                  description: item.description || "",
                };

                if (item.itSkill?.label === "Other" && item.otherItSkill) {
                  payload.otherItSkill = item.otherItSkill;
                }

                return payload;
              });

              console.log("Transformed Payload:", transformedValues);
              createItskillsFormMutation.mutate(transformedValues);
            }}


            validationSchema={y.object().shape({
              itSkills: y.array().of(
                y.object().shape({
                  itSkill: y
                    .object()
                    .nullable()
                    .required(t('common.form-field-required')),
                  otherItSkill: y
                    .string()
                    .when('itSkill', otherValidationOption(t))
                    .nullable(),
                  skillLevel: y
                    .object()
                    .nullable()
                    .required(t('common.form-field-required')),
                  description: maxString(t, 550),
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
                      <div><h1 className="">{t('candidate.itSkills.title')}</h1></div>
                      <div>
                        {values?.itSkills?.length>0?
                        <Button tw="text-center" type="submit">
                          {t('common.button-save')}
                        </Button>:
                        <Button tw="text-center" 
                        onClick={()=>{
                          router.push(routePath);
                        }}
                        >
                          {t('common.button-none-yet')}
                        </Button>
            }
                      </div>
                    </div>
                    {submitCount > 0 && Object.keys(errors).length > 0 && (
                      <div className="general-text-sm mt-3 text-danger font-medium ">
                        Some required fields are not filled.
                      </div>

                    )}
                  </div>
                  <ItSkillsForm
                    isSubmitting={isSubmitting}
                    newItem={newItem}
                    values={values}
                    skills={itSkillsData?.data.map(dataToOption) || []}
                    levels={levelsData?.data.map(dataToOption) || []}
                    handleSubmit={handleSubmit}
                    // setFieldValue={setFieldValue}
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

export default ItSkillsFeature;
