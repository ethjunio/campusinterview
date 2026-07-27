"use client";
import React, { useCallback, useEffect, useState } from "react";
import DeleteIcon from "@/icons/ic-delete.svg";
import ConfirmIcon from "@/icons/ic-confirm.svg";
import DownloadIcon from "@/icons/ic-download.svg";
import { Button, IconButton } from "@/components/atoms/Button";
import { ListItem } from "@/components/molecules/ListItem";
import Select from "react-select";
import { useTranslations } from "next-intl";
import {
  useGetMatchUserQuery,
  useGetMatchCompanyQuery,
  useGetMatchesListQuery,
  useDeleteMatchItemMutation,
  useGetMatchCandidateDataQuery,
  useDeleteAllMatchMutation,
} from "@/hooks/admin/useGetMatchCandidateQuery";
// import { useDeleteMatchMutation } from "@/hooks/admin/useDeleteMatchMutation";
import { toast } from "sonner";
import { CompanyContact } from "@/app/types";
import { useQueryClient } from "@tanstack/react-query";

const Matches = () => {
  const t = useTranslations();
  const [searchCompanyTerm, setSearchCompanyTerm] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [searchCandidateTerm, setSearchCandidateTerm] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { data: user } = useGetMatchUserQuery();
  const { data: company } = useGetMatchCompanyQuery();
  const { data: candidateDownLoadData } = useGetMatchCandidateDataQuery();
  const { data: matchesList, isLoading: loading } = useGetMatchesListQuery(
    {},
    searchCandidateTerm ? searchCandidateTerm?.value : null,
    searchCompanyTerm ? searchCompanyTerm?.value : null
  );
  const queryClient = useQueryClient();


  const deleteMatchItem = useDeleteMatchItemMutation({
    onSuccess: () => {
      toast.success("Match deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const deleteAllMatchMutation = useDeleteAllMatchMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchesList"] });
      toast.success("Matches data deleted successfully");
      setShowDialog(false);

    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
      setShowDialog(false);

    },
  });

  const handleDownload = () => {
    if (!candidateDownLoadData) return;

    // Create a blob from the JSON data
    const blob = new Blob([JSON.stringify(candidateDownLoadData, null, 2)], {
      type: "application/json",
    });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = "candidate-Export.json";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const [companyOptions, setCompanyOptions] = useState<
    {
      value: string;
      label: string;
      company: CompanyContact;
    }[]
  >([]);
  const [candidateOptions, setCandidateOptions] = useState<
    {
      value: string;
      label: string;
      candidate: CompanyContact;
    }[]
  >([]);

  useEffect(() => {
    if (user) {
      const formatedData = user?.data?.map((user: any) => ({
        value: user.candidateId,
        label: user.candidate?.name,
        // candidate: user,
      }));
      setCandidateOptions(formatedData);
    }
    if (company) {
      const formatedData = company?.data?.map((company: any) => ({
        value: company.companyId,
        label: company.company?.name,
        // company: company,
      }));
      setCompanyOptions(formatedData);
    }
  }, [user, company]);

  //   const [deleteMatch, { isLoading: deleteLoading }] = useDeleteMatchMutation();

  const [exportLoading, setExportLoading] = useState(false);
  const onSearchCompanyChange = useCallback((value: any) => {
    setSearchCompanyTerm(value);
  }, []);
  const onSearchCandidateChange = useCallback((value: any) => {
    setSearchCandidateTerm(value);
  }, []);

  return (
    <div>
      <h1>{t("admin.interviews.matches.title")}</h1>
      {/* <span className="danger-text">{error}</span> */}
      <div className="mt-8">
        {!exportLoading && (
          <Button
            variant="primary-dark"
            tw="flex justify-between"
            onClick={handleDownload}
          >
            <span className="text-white mr-4">
              {t("admin.interviews.matches.export-button-title")}
            </span>
            <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
          </Button>
        )}
      </div>
      <div className="mt-8 space-y-2 flex space-x-4 items-baseline justify-start">
        <div>
          <Select
            className="w-64 mt-8 mb-4"
            isSearchable
            isClearable
            classNamePrefix="react-select"
            options={companyOptions}
            placeholder={t(
              "admin.interviews.matches.search-company-placeholder"
            )}
            onChange={onSearchCompanyChange}
            value={searchCompanyTerm}
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
            options={candidateOptions}
            placeholder={t(
              "admin.interviews.matches.search-candidate-placeholder"
            )}
            onChange={onSearchCandidateChange}
            value={searchCandidateTerm}
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : null
            } // 👈 render to body
            menuPosition="fixed" // 👈 avoid clipping
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 ensure on top
            }}
          />
        </div>
        {matchesList?.data?.length > 0 && (
          <div className="w-64 mt-8 mb-4">
          <Button
            variant="small-red"
            
            tw="w-auto"
            onClick={() => {
              // const confirm = window?.confirm(
              //   "Are you sure you want to delete all current interviews from database? This action is ireversable!",
              // );
              setShowDialog(true)
              // if (confirm) {
              //   deleteAllMatchMutation.mutate({
              //     searchCandidateTerm: searchCandidateTerm,
              //     searchCompanyTerm: searchCompanyTerm,
              //   })
              // }
            }}
            disabled={false}
          >
             
            {(searchCandidateTerm?.value ||searchCompanyTerm?.value)?t("admin.interviews.matches.delete-Compay-button-title"):t("admin.interviews.matches.delete-all-button-title")}
          </Button>
          </div>
        )}
      </div>

      <ul className="space-y-4 max-w-4xl">
        {matchesList?.data?.length > 0 &&
          matchesList?.data?.map((data: any) => {
            return (
              <ListItem key={data.id} loading={loading}>
                <ListItem.Image Placeholder={ConfirmIcon} src="" alt="" />
                <ListItem.Title>
                  {t("admin.interviews.matches.list-title")}
                </ListItem.Title>
                <ListItem.Body>
                  <div>
                    <b>Company:</b> {data.company.name}
                  </div>
                  <div>
                    <b>Candidate:</b> {data?.candidate?.name}
                  </div>
                </ListItem.Body>
                <ListItem.Actions>
                  <IconButton
                    onClick={() => {
                      const confirm = window?.confirm(
                        "Are you sure you want to delete this match? Action is ireversable!"
                      );
                      if (confirm) {
                        deleteMatchItem.mutate(data.id);
                        // deleteMatch({
                        //   variables: { input: { interviewRequestId: id } },
                        // });
                        onSearchCandidateChange(null);
                        onSearchCompanyChange(null);
                      }
                    }}
                    tw="p-1"
                    variant="link"
                    icon={
                      <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                    }
                  />
                </ListItem.Actions>
              </ListItem>
            );
          })}
          {showDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-4">
            Are you certain you want to delete this?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={() => {
                  deleteAllMatchMutation.mutate({
                    searchCandidateTerm:searchCandidateTerm ? searchCandidateTerm?.value : null,
                    searchCompanyTerm:searchCompanyTerm ? searchCompanyTerm?.value : null
                  })
                 
                }}
                className="px-4 py-2 text-sm bg-red text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      </ul>
    </div>
  );
};

export default Matches;
