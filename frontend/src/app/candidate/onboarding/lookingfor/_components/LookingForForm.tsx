"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Form, Formik } from "formik";
import { InputField } from "@/components/molecules/form/InputField";
import { Button } from "@/components/atoms/Button";
import Select from "react-select";
import { usePathname, useRouter } from "next/navigation";
import { useCandidateJobFormCreateMutation } from "@/hooks/student/onboardingmgmt/useCandidateJobFormCreateMutation";
import {
  useGetActivityDropdownQuery,
  useGetInterestDropdownQuery,
  useGetJobDropdownQuery,
  useGetWorkDropdownQuery,
} from "@/hooks/student/onboardingmgmt/useGetCandidateFormHooks";
import { useGetJobRequirementsDataQuery } from "@/hooks/student/onboardingmgmt/useGetJobRequirementsDataQuery";
import { useCreateTimeSlotsMutation } from "@/hooks/student/interviewmgmt/useCreateTimeSlotsMutation";
import { toast } from "sonner";
import { DatePickerField } from "@/app/candidate/(layoutwrapper)/profile/(layoutforms)/extracurriculars/_components/DatePickerField";
import { fromISOtoDate } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import isEqual from "lodash.isequal";

export const LookingForForm = (button: any) => {
  const [isSearchable, setIsSearchable] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const queryClient = useQueryClient();

  const createCandidateJobFormMutation = useCandidateJobFormCreateMutation();
  const createTimeSlotsMutation = useCreateTimeSlotsMutation();

  const [searchDataJob, setSearchDataJob] = useState<any>([]);
  const [searchDataWork, setSearchDataWork] = useState<any>([]);
  const [searchDataActivity, setSearchDataActivity] = useState<any>([]);
  const [searchTermInterest, setSearchTermInterest] = useState<any>([]);
  const [searchDataInterest, setSearchDataInterest] = useState<any>([]);

  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const { data: jobOptions } = useGetJobDropdownQuery();
  const { data: workOptions } = useGetWorkDropdownQuery();
  const { data: activityOptions } = useGetActivityDropdownQuery();
  const { data: interestOptions, isLoading } = useGetInterestDropdownQuery();
  const { data: jobRequirementsData } = useGetJobRequirementsDataQuery();

  useEffect(() => {
    if (jobOptions?.data) {
      const searchData = jobOptions?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchDataJob(searchData);
    }
  }, [jobOptions?.data]);

  useEffect(() => {
    if (workOptions?.data) {
      const searchData = workOptions?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchDataWork(searchData);
    }
  }, [workOptions?.data]);

  useEffect(() => {
    if (activityOptions?.data) {
      const searchData = activityOptions?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchDataActivity(searchData);
    }
  }, [activityOptions?.data]);

  useEffect(() => {
    if (interestOptions?.data) {
      const searchData = interestOptions?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchDataInterest(searchData);
    }
    if (jobRequirementsData?.data?.interests) {
      const updatedInterests = jobRequirementsData.data.interests.map(
        (item: any) => ({
          value: item.id,
          label: item.name,
        }),
      );
      setSearchTermInterest(updatedInterests);
    }
  }, [interestOptions?.data, jobRequirementsData]);

  const onSearchChangeJob = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("desiredJobTypeId", selectedOption?.value || null);
  };

  const onSearchChangeWork = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("desiredWorkAreaId", selectedOption?.value || null);
  };

  const onSearchChangeActivity = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("desiredTravelActivityId", selectedOption?.value || null);
  };

  const onSearchChangeInterest = (selectedOption: any, setFieldValue: any) => {
    setSearchTermInterest(selectedOption);
    setFieldValue(
      "interestIds",
      selectedOption.map((opt: any) => opt.value),
    );
  };

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
  const originalValues = useMemo(
    () => ({
      startDate: fromISOtoDate(jobRequirementsData?.data?.startDate) || null,
      desiredJobTypeId: jobRequirementsData?.data?.desiredJobTypeId || null,
      desiredWorkAreaId: jobRequirementsData?.data?.desiredWorkAreaId || null,
      desiredTravelActivityId:
        jobRequirementsData?.data?.desiredTravelActivityId || null,
      careerGoal: jobRequirementsData?.data?.careerGoal || "",
      positionRequirements:
        jobRequirementsData?.data?.positionRequirements || "",
      interestIds:
        jobRequirementsData?.data?.interests?.map((i: any) => i.id) || [],
    }),
    [jobRequirementsData],
  );

  const normalise = useMemo(
    () => (v: any) => ({
      startDate: v.startDate || "",
      desiredJobTypeId: v.desiredJobTypeId ?? null,
      desiredWorkAreaId: v.desiredWorkAreaId ?? null,
      desiredTravelActivityId: v.desiredTravelActivityId ?? null,
      careerGoal: (v.careerGoal || "").trim(),
      positionRequirements: (v.positionRequirements || "").trim(),
      interestIds: Array.isArray(v.interestIds)
        ? [...v.interestIds].sort()
        : [],
    }),
    [],
  );
  let formikValues: any = null;
  const pathname = usePathname();
  useEffect(() => {
    if (!originalValues || !formikValues) return;
    const current = normalise(formikValues);
    const original = normalise(originalValues);
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
  if (!originalValues) return null;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={originalValues}
        onSubmit={async (formData: any) => {
          const sanitizedData = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== undefined) {
              acc[key] = formData[key];
            }
            return acc;
          }, {} as Record<string, any>);

          if (sanitizedData.startDate) {
            sanitizedData.startDate = sanitizedData.startDate
              .split(".")
              .reverse()
              .join("-");
          }

          createCandidateJobFormMutation.mutate(sanitizedData, {
            onSuccess: (data) => {
              toast.success(data?.message);
              setHasChanges(false);
              queryClient.invalidateQueries({
                queryKey: ["getJobRequirements"],
              });
              setTimeout(() => {
                {
                  button.button === "save"
                    ? null
                    : router.push("/candidate/overview?showModal=true");
                }
              }, 0);
            },
            onError: (error: any) => {
              toast.error(error?.response?.data?.message);
            },
          });

          createTimeSlotsMutation.mutate({});
        }}
      >
        {({ values, setFieldValue, submitCount, errors }) => {
          formikValues = values;
          useEffect(() => {
            const current = normalise(values);
            const original = normalise(originalValues);
            setHasChanges(!isEqual(current, original));
          }, [values, originalValues]);
          const hasData = Object.values(values).some(
            (value) =>
              value !== "" &&
              value !== null &&
              value !== undefined &&
              (Array.isArray(value) ? value.length > 0 : true),
          );

          const buttonLabel =
            button.button === "save"
              ? "Save"
              : hasData
              ? "Next Step"
              : "Skip Step";

          return (
            <Form>
              <div className="flex justify-between items-center max-w-full xl:max-w-md">
                <div>
                  <h3>What I'm Looking For</h3>
                </div>
                <div>
                  <Button type="submit" tw="max-w-xs">
                    {buttonLabel}
                  </Button>
                </div>
              </div>
              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className="general-text-sm text-danger font-medium ">
                  Some required fields are not filled.
                </div>
              )}
              <div className="mt-10 vstack vstack-0">
                <div className="mb-4">
                  <div className="flex mb-1">
                    <div className="general-text">Desired job type</div>
                  </div>
                  <Select
                    className="mt-8 max-w-full xl:max-w-md mb-4 cursor-pointer"
                    isSearchable={isSearchable}
                    isClearable
                    classNamePrefix="react-select"
                    options={searchDataJob}
                    placeholder={t(
                      "candidate.lookingfor.form-desiredJobType-placeholder",
                    )}
                    onChange={(selectedOption) =>
                      onSearchChangeJob(selectedOption, setFieldValue)
                    }
                    value={searchDataJob.find(
                      (option: any) => option.value === values.desiredJobTypeId,
                    )}
                  />
                </div>
                <div className="datebox mb-8 max-w-full xl:max-w-md">
                  <DatePickerField
                    name="startDate"
                    label="Desired start date"
                    placeholder="Choose"
                    nextDate
                    today={true}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex mb-1">
                    <div className="general-text">Desired place of work</div>
                  </div>
                  <Select
                    className="!mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                    isSearchable
                    isClearable
                    classNamePrefix="react-select"
                    options={searchDataWork}
                    placeholder={t(
                      "candidate.lookingfor.form-desiredWorkArea-placeholder",
                    )}
                    onChange={(selectedOption) =>
                      onSearchChangeWork(selectedOption, setFieldValue)
                    }
                    value={searchDataWork.find(
                      (option: any) =>
                        option.value === values.desiredWorkAreaId,
                    )}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex mb-1">
                    <div className="general-text">Desired travel activity</div>
                  </div>
                  <Select
                    className="!mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                    isSearchable={isSearchable}
                    isClearable
                    classNamePrefix="react-select"
                    options={searchDataActivity}
                    placeholder={t(
                      "candidate.lookingfor.form-desiredTravelActivity-placeholder",
                    )}
                    onChange={(selectedOption) =>
                      onSearchChangeActivity(selectedOption, setFieldValue)
                    }
                    value={searchDataActivity.find(
                      (option: any) =>
                        option.value === values.desiredTravelActivityId,
                    )}
                  />
                </div>

                <InputField
                  name="careerGoal"
                  label="Career goal"
                  placeholder={t(
                    "candidate.lookingfor.form-careerGoal-placeholder",
                  )}
                  maxLength={50}
                />

                <InputField
                  name="positionRequirements"
                  label="Position requirements"
                  placeholder={t(
                    "candidate.lookingfor.form-positionRequirements-placeholder",
                  )}
                  maxLength={50}
                />

                <div className="flex mb-1">
                  <div className="general-text">Areas of interest</div>
                </div>
                <Select
                  className="!mt-2 max-w-full xl:max-w-md mb-4 cursor-pointer"
                  isSearchable={isSearchable}
                  isMulti
                  isClearable
                  classNamePrefix="react-select"
                  options={searchDataInterest}
                  placeholder={t(
                    "candidate.lookingfor.form-areasOfInterest-placeholder",
                  )}
                  onChange={(selectedOption) =>
                    onSearchChangeInterest(selectedOption, setFieldValue)
                  }
                  value={searchTermInterest}
                />
              </div>
              {showDialog && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <p className="text-lg font-medium mb-4">
                      You have unsaved changes. Are you sure you want to leave
                      this page?
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
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
