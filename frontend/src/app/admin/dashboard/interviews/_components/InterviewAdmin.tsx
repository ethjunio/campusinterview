"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import DeleteIcon from "@/icons/ic-delete.svg";
import ConfirmIcon from "@/icons/ic-confirm.svg";
import MatchingIcon from "@/icons/ic-confirm.svg";
import DownloadIcon from "@/icons/ic-download.svg";
import UploadIcon from "@/icons/ic-upload.svg";
import { Button, IconButton } from "@/components/atoms/Button";
import { ListItem } from "@/components/molecules/ListItem";
import {
  useGetInterviewListQuery,
  useGetCompanyNamesWithContactQuery,
  useGetScheduledDataQuery,
  useGetPreScheduledDataQuery,
} from "@/hooks/admin/useGetInterviewListQuery";
import {
  useDeleteInterviewMutation,
  useDeleteAllInterviewMutation,
} from "@/hooks/admin/useDeleteInterviewList";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Select from "react-select";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { createPublishInterviewMutation } from "@/hooks/admin/createPublishInterviewMutation";
import { createNotifyParticipantsMutation } from "@/hooks/admin/createNotifyParticipantsMutation";
import {
  useCreateAdminCreateInterviewsMutation,
  useUpdateAdminCreateInterviewsMutation,
} from "@/hooks/admin/useCreateAdminCreateInterviewsMutation";
const InterviewListSkeleton = dynamic(
  () => import("../../interviews/_components/InterviewListSkeleton"),
  { ssr: false },
);

const InterviewAdmin = () => {
  const t = useTranslations();
  const [exportLoading, setExportLoading] = useState(false);
  const [interviewsExportLoading, setInterviewsExportLoading] = useState(false);
  const [companyName, setCompanyName] = useState<any | null>(null);
  const [companyList, setCompanyList] = useState<any>([]);
  const [candidateName, setCandidateName] = useState<any | null>(null);
  const [candidateList, setCandidateList] = useState<any>([]);
  const queryClient = useQueryClient();
  const { data: companyNamesWithContact, refetch: refetchCompanies } =
    useGetCompanyNamesWithContactQuery();

  const { data: scheduledData, refetch: refetchScheduled } =
    useGetScheduledDataQuery();
  const { data: preScheduledData, refetch: refetchInter } =
    useGetPreScheduledDataQuery();

  const CreateInterviewMutation = useCreateAdminCreateInterviewsMutation({
    onSuccess: () => {
      toast.success("Interviews created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const UpdateInterviewMutation = useUpdateAdminCreateInterviewsMutation({
    onSuccess: () => {
      // refetchInter();
      // refetchScheduled();
      // refetchCompanies();
      refetchInterview();
      toast.success("Timeslots updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleDownloadPreScheduled = () => {
    if (!preScheduledData) return;

    // Create a blob from the JSON data
    const blob = new Blob([JSON.stringify(preScheduledData, null, 2)], {
      type: "application/json",
    });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = "preScheduledFileName.json";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    if (!scheduledData) return;

    // Create a blob from the JSON data
    const blob = new Blob([JSON.stringify(scheduledData, null, 2)], {
      type: "application/json",
    });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = "scheduledFileName.json";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (e.target && e.target.result) {
        const parsedData = JSON.parse(e.target.result as string);
        CreateInterviewMutation.mutate({ ...parsedData });
      }
      if (inputFile.current) {
        inputFile.current.value = "";
      }
    };
  };
  const handleUpload = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (e.target && e.target.result) {
        const parsedData = JSON.parse(e.target.result as string);
        UpdateInterviewMutation.mutate({ ...parsedData });
      }
      if (inputFile.current) {
        inputFile.current.value = "";
      }
    };
  };

  useEffect(() => {
    if (companyNamesWithContact) {
      const candidateNames = companyNamesWithContact?.candidate?.map(
        (company: { firstName: string; lastName: string; id: string }) => {
          return {
            label: company.firstName + " " + company.lastName,
            value: company.id,
          };
        },
      );
      const companyNames = companyNamesWithContact?.company?.map(
        (company: { name: string; id: string }) => {
          return {
            label: company.name,
            value: company.id,
          };
        },
      );
      setCompanyList(companyNames);
      setCandidateList(candidateNames);
    }
  }, [companyNamesWithContact]);

  const {
    data,
    isPending,
    isLoading: interviewsLoading,
    refetch: refetchInterview,
  } = useGetInterviewListQuery(
    {},
    candidateName ? candidateName?.label : null,
    companyName ? companyName?.label : null,
  );


  const PublishInterviewMutation = createPublishInterviewMutation({
    onSuccess: (message: any) => {
      queryClient.invalidateQueries({ queryKey: ["interviewsList"] });
      toast.success(message?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const NotifyParticipants = createNotifyParticipantsMutation({
    onSuccess: (message: any) => {
      queryClient.invalidateQueries({ queryKey: ["interviewsList"] });
      toast.success(message?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const deleteInterviewMutation = useDeleteInterviewMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewsList"] });
      toast.success("Interview data deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const deleteAllInterviewMutation = useDeleteAllInterviewMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewsList"] });
      toast.success("Interview data deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSearchCandidateChange = useCallback((value: any) => {
    setCandidateName(value);
  }, []);

  const onSearchCompanyChange = useCallback((value: any) => {
    setCompanyName(value);
  }, []);

  if (isPending || !data) {
    return <InterviewListSkeleton />;
  }

  return (
    <div>
      <h1>{t("admin.interviews.interviews.title")}</h1>
      {/* <span className="danger-text">{error}</span> */}
      <div className="mt-8 space-y-2 flex flex-col xl:flex-row space-x-4 items-baseline justify-end">
        <div>
          {!exportLoading && (
            <Button
              variant="primary-dark"
              tw="flex justify-between "
              onClick={handleDownloadPreScheduled}
            >
              <span className="text-white mr-4">
                {t(
                  "admin.interviews.interviews.export-request-interviews-button-title",
                )}
              </span>
              <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
            </Button>
          )}
        </div>
        <div>
          {!interviewsExportLoading && (
            <Button
              variant="primary-dark"
              tw="flex justify-between"
              onClick={handleDownload}
            >
              <span className="text-white mr-4">
                {t(
                  "admin.interviews.interviews.export-interviews-button-title",
                )}
              </span>
              <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
            </Button>
          )}
        </div>

        <div>
          <input
            id="file"
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <Button
            variant="primary-dark"
            tw="flex justify-between"
            onClick={() => inputFile.current?.click()}
            disabled={data?.data.length > 0}
          >
            <span className="text-white mr-4">
              {t("admin.interviews.interviews.upload-button-title")}
            </span>
            <UploadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
          </Button>
        </div>
        <div>
          <input
            id="file"
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          <Button
            variant="primary-dark"
            tw="flex justify-between"
            onClick={() => inputFile.current?.click()}
            // disabled={data?.data.length > 0}
          >
            <span className="text-white mr-4">
              {t("admin.interviews.interviews.upload-button-title-export")}
            </span>
            <UploadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
          </Button>
        </div>
        <Link href="/admin/dashboard/interview-create">
          <Button tw="mb-8" variant="primary-dark">
            {t("admin.interviews.create-interview.button-label")}
          </Button>
        </Link>
        <Link href="/admin/dashboard/interview-change-room">
          <Button tw="mb-8" variant="primary-dark">
            {t("admin.interviews.change-rooms.button-label")}
          </Button>
        </Link>
        <Button
          variant="accent"
          onClick={() => {
            const confirm = window?.confirm(
              "Are you sure you want to publish current interviews? This action is ireversable!",
            );
            if (confirm) {
              PublishInterviewMutation.mutate({});
            }
          }}
          disabled={false}
        >
          {t("admin.interviews.interviews.publish-button-title")}
        </Button>
        <Button
          variant="accent"
          onClick={() => {
            const confirm = window?.confirm(
              "Are you sure you want to notify all users with their current interview schedules? You can do this only once!",
            );

            if (confirm) {
              NotifyParticipants.mutate({});
            }
          }}
          //   disabled={eventPhase?.phases?.areParticipantsNotified}
        >
          {t("admin.interviews.interviews.notify-button-title")}
        </Button>
      </div>

      <div className="mt-8 space-y-2 flex space-x-4 items-baseline justify-start">
        <div>
          <Select
            className="w-64 mt-8 mb-4"
            isSearchable
            isClearable
            classNamePrefix="react-select"
            options={companyList}
            placeholder={t(
              "admin.interviews.interviews.search-company-placeholder",
            )}
            onChange={onSearchCompanyChange}
            value={companyName}
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : null
            } // 👈 render to body
            menuPosition="fixed" // 👈 avoid clipping
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 ensure on top
            }}
          />
        </div>
        <div>
          <Select
            className="w-64 mt-8 mb-4"
            isSearchable
            isClearable
            classNamePrefix="react-select"
            options={candidateList}
            placeholder={t(
              "admin.interviews.interviews.search-candidate-placeholder",
            )}
            onChange={onSearchCandidateChange}
            value={candidateName}
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : null
            } // 👈 render to body
            menuPosition="fixed" // 👈 avoid clipping
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 ensure on top
            }}
          />
        </div>
        {data?.data?.length > 0 && (
          <Button
            variant="small-red"
            tw="w-auto"
            onClick={() => {
              const confirm = window?.confirm(
                "Are you sure you want to delete all current interviews from database? This action is ireversable!",
              );

              if (confirm) {
                deleteAllInterviewMutation.mutate();
              }
            }}
            disabled={false}
          >
           {/* {t("admin.interviews.interviews.delete-company-button-title")} */}
            {t("admin.interviews.interviews.delete-all-button-title")}
          </Button>
        )}
      </div>
      {/* Listing interviews */}
      <div>
        <ul className="space-y-4 mt-12">
          {/* {(interviewsData?.interviews || [])
            .filter(({ company, candidate }) => {
              if (!searchCandidateTerm && !searchCompanyTerm) {
                return true;
              }
              if (
                searchCandidateTerm &&
                searchCompanyTerm &&
                candidate.id === searchCandidateTerm.value &&
                company.id === searchCompanyTerm.value
              ) {
                return true;
              } else {
                if (
                  searchCandidateTerm &&
                  candidate.id === searchCandidateTerm.value &&
                  !searchCompanyTerm
                ) {
                  return true;
                }

                if (
                  searchCompanyTerm &&
                  company.id === searchCompanyTerm.value &&
                  !searchCandidateTerm
                ) {
                  return true;
                }
                return false;
              }
            }) */}
          {data?.data?.map(
            ({
              id,
              candidate,
              company,
              timeSlot,
              timeBlock,
              companyId,
              interviewRoom,
              interviewLocation
            }) => {
              return (
                <ListItem key={id} loading={interviewsLoading}>
                  <ListItem.Image Placeholder={MatchingIcon} src="" alt="" />
                  <ListItem.Title>
                    {t("admin.interviews.interviews.list-title")}
                  </ListItem.Title>
                  <ListItem.Body>
                    <div className="grid grid-cols-6 space-x-4 justify-start">
                      <div className="grid grid-rows-2 space-y-2">
                        <h3>
                          {t("admin.interviews.interviews.candidate-title")}
                        </h3>
                        <div className="general-text-sm">
                          {candidate?.firstName} {candidate?.lastName}
                        </div>
                      </div>
                      <div className="grid grid-rows-2 space-y-2">
                        <h3>
                          {t("admin.interviews.interviews.company-title")}
                        </h3>
                        <div className="general-text-sm">{company?.name}</div>
                      </div>
                      <div className="grid grid-rows-2 space-y-2">
                        <h3>
                          {t("admin.interviews.interviews.time-range-title")}
                        </h3>
                        <div className="general-text-sm">
                          {timeSlot?.timeRange}
                        </div>
                      </div>
                      <div className="grid grid-rows-2 space-y-2">
                        <h3>Preferred Time Slot</h3>
                        <div className="general-text-sm">{timeBlock?.name}</div>
                      </div>
                      <div className="grid grid-rows-2 space-y-2">
                        <h3>
                          {t(
                            "admin.interviews.interviews.interview-room-title",
                          )}
                        </h3>
                        <div className="general-text-sm">
                          {interviewRoom?.name ? interviewRoom?.name : "N/A"}
                        </div>
                      </div>
                      <div className="grid grid-rows-2 space-y-2">
                        <h3>
                          {t(
                            "admin.interviews.interviews.interview-location-title",
                          )}
                        </h3>
                        <div className="general-text-sm">
                          {interviewLocation ? interviewLocation : "N/A"}
                        </div>
                      </div>
                    </div>
                  </ListItem.Body>
                  <ListItem.Actions>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/dashboard/interviewEdit/${id}/${companyId}`}
                      >
                        <Button variant="outline">
                          {t("admin.preevent-list.list-editButton-label")}
                        </Button>
                      </Link>
                      <IconButton
                        onClick={() => {
                          const confirm = window?.confirm(
                            "Are you sure you want to delete this interview? Action is ireversable!",
                          );
                          if (confirm) {
                            deleteInterviewMutation.mutate(id.toString());
                            // onSearchCandidateChange(null);
                            // onSearchCompanyChange(null);
                          }
                        }}
                        tw="p-1 mr-6"
                        variant="link"
                        icon={
                          <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                        }
                      />
                    </div>
                  </ListItem.Actions>
                </ListItem>
              );
            },
          )}
        </ul>
      </div>
    </div>
  );
};

export default InterviewAdmin;
