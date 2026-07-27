"use client";

import React, { useState } from "react";
import take from "lodash/fp/take";
import { ListItem } from "@/components/molecules/ListItem";
import ProfileIcon from "@/icons/ic-profile.svg";
import DeleteIcon from "@/icons/ic-delete.svg";
import { Button, IconButton } from "@/components/atoms/Button";
// import { stripTypenames } from '@/utils';
import DownloadIcon from "@/icons/ic-download.svg";
import { useTranslations } from "next-intl";
import { useGetCandidatesListQuery } from "@/hooks/admin/useGetCandidatesListQuery";
import CandidateListSkeleton from "./CandidateListSkeleton";
import { Candidate } from "@/app/types";
import { useDeleteCandidatesMutation } from "@/hooks/admin/useDeleteCandidatesMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { useStatusCandidateMutation } from "@/hooks/admin/useStatusCandidateMutation";
import { Modal } from "@/components/organisms/modal/Modal";

export const CandidatesList = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [employeeid, setemployeeid] = useState<string[]>([]);
  const [allemployee, setallemployee] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; status: "active" | "inactive" | null }>({ open: false, status: null });

  const deleteCandidateMutation = useDeleteCandidatesMutation({
    onSuccess: () => {
      toast.success("Candidate data deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["candidatesListing"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const updateStatusCandidateMutation = useStatusCandidateMutation({
    onSuccess: () => {
      toast.success("Status data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["candidatesListing"] });
    },
    onError: (err:any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const onHandleSubmit = (values: any) => {
    const payload = {
      "profileIds": employeeid,
      "profileStatus": values
    };
    updateStatusCandidateMutation.mutate(payload);
  };

  const requestStatusChange = (status: "active" | "inactive") => {
    if (employeeid?.length > 0) {
      setConfirmModal({ open: true, status });
    } else {
      toast.warning("Select Profiles");
    }
  };

  const handleConfirm = () => {
    if (confirmModal.status) onHandleSubmit(confirmModal.status);
    setConfirmModal({ open: false, status: null });
  };
  const { data, isPending } = useGetCandidatesListQuery();

  if (isPending) return <CandidateListSkeleton />;

  const currentDate = new Date();
  const candidateWithInterviewsFileNameJSON = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}-${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}-candidates-with-interviews-exportJSON.json`;
  const candidateWithInterviewsFileNameCSV = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}-${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}-candidates-with-interviews-exportCSV.csv`;

  const handleFileDownload = async (type: string) => {
    try {
      // Construct the API URL
      const url = `/admin/candidateMgmt/exportCandidateData/${type}`;

      // Make the API call using axiosInstance
      const response = await axiosInstance.get(url, {
        responseType: "blob", // Important: This tells Axios to treat the response as a Blob
      });

      // Get the file blob from the response
      const fileBlob = response.data;
      const fileUrl = URL.createObjectURL(fileBlob);

      // Create a temporary <a> element for triggering the download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "exported_data"; // Set the filename (you can dynamically set this)
      link.style.display = "none";

      // Append the link to the document, trigger the click event, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error initiating download:", error);
    }
  };
  const handlecheck = (id: string) => {
    let temp = [...employeeid];
    if (temp?.includes(id)) {
        temp = temp.filter((num) => num !== id);
    } else {
        temp.push(id);
    }
    setemployeeid(temp);
};
const handleallchecked = () => {
  if (allemployee) {
      setemployeeid([]);
      setallemployee(false);
  } else {

      let tempemployee = data?.data?.map(({
        id,
       
      }: Candidate) => id);
      setemployeeid(tempemployee);
      setallemployee(true);
  }
};

  return (
    <div>
      {/* <span className="danger-text">{error}</span> */}
      <div className="mb-8">
        <Button
          variant="primary-dark"
          tw="flex justify-between"
          onClick={() => handleFileDownload("JSON")}
        >
          <span className="text-white mr-4">
            {t(
              "admin.candidates.export-json-candidates-with-interviews-button-title"
            )}
          </span>
          <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
        </Button>
      </div>
      <div className="mb-4">
        <Button
          variant="primary-dark"
          tw="flex justify-between"
          onClick={() => handleFileDownload("CSV")}
        >
          <span className="text-white mr-4">
            {t(
              "admin.candidates.export-csv-candidates-with-interviews-button-title"
            )}
          </span>
          <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
        </Button>
      </div>
      <div className="mb-4 flex justify-end gap-4">
      <Button
          variant="primary-dark"
          // onClick={() => handleFileDownload("CSV")}
          tw="flex justify-between"
        >
         <div className="" >
            
            <input
            className="w-4 h-4 border-2 border-gray-300 mx-4"
            checked={allemployee}
type="checkbox"
id="all"
onChange={(value) =>
  handleallchecked()
}

/>
</div>
All
          {/* <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" /> */}
        </Button>
        <Button
          variant="primary-dark"
          onClick={() => requestStatusChange("active")}
          tw="flex justify-between"
        >
          <span className="text-white mr-4">
            {/* {t("admin.companies.export-csv-button-title")} */}
            Activate Selected Candidates
          </span>
        </Button>
        <Button
          variant="primary-dark"
          onClick={() => requestStatusChange("inactive")}
          tw="flex justify-between"
        >
          <span className="text-white mr-4">
            {/* {t("admin.companies.export-csv-button-title")} */}
            Deactivate Selected Candidates
          </span>
        </Button>
      </div>
      <ul className="space-y-4">
        {(data?.data || []).map(
          ({
            id,
            firstName,
            lastName,
            email,
            education,
            imageUrlSmall,
            profileStatus
          }: Candidate) => {
            return (
              <ListItem key={id} loading={isPending} id={id} type="admin">
                <ListItem.Image
                  Placeholder={ProfileIcon}
                  src={imageUrlSmall}
                  alt={`${firstName}-${lastName}-image`}
                />
                <ListItem.Title>
                  <div>
                    {firstName} {lastName}
                  </div>
                  <div className="text-sm">{email}</div>
                </ListItem.Title>
                <ListItem.Body>
                  <div className="general-text">
                    {take(2, education).map(({ university }, index) => {
                      return (
                        <div key={`${university.id}-${index}`}>
                          {university.name}
                        </div>
                      );
                    })}
                  </div>
                </ListItem.Body>
                <ListItem.Body>
                  <div className="general-text first-letter:capitalize ml-8">
                    {profileStatus}
                  </div>
                </ListItem.Body>
                <ListItem.Actions>
                  <div className="flex space-x-2">
                  <div
                      onClick={(e) => {
                        e.stopPropagation();
                       
                      }}
                      >
            
            <input
            className="w-4 h-4 border-2 border-gray-300"
checked={employeeid?.length>0?employeeid?.includes(id):false}
type="checkbox"
onChange={(value) =>
handlecheck(id)
}
/>
</div>
                  <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirm = window?.confirm(
                           "Are you sure you want to delete this candidate? This action is irreversible!"
                        );
                        if (confirm) {
                          deleteCandidateMutation.mutate({ id });
                        }
                      }}
                      tw="p-1"
                      variant="link"
                      icon={
                        <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                      }
                    />
                    {/* <button
                      onClick={() => {
                        const confirm = window?.confirm(
                          "Are you sure you want to delete this candidate? This action is irreversible!"
                        );
                        if (confirm) {
                          deleteCandidateMutation.mutate({ id });
                        }
                      }}
                      className="p-1 bg-transparent border-0 text-danger cursor-pointer"
                    >
                      <DeleteIcon className="w-6 h-6 fill-current" />
                    </button> */}
                  </div>
                </ListItem.Actions>
              </ListItem>
            );
          }
        )}
      </ul>
      <Modal
        modalStatus={confirmModal.open}
        title={`Mark candidates as ${confirmModal.status}?`}
        description={`You are about to mark ${employeeid.length} selected candidate(s) as ${confirmModal.status}. Are you sure?`}
        textFirstBtn="Confirm"
        textSecondBtn="Cancel"
        onClickFirstBtn={handleConfirm}
        onClickSecondBtn={() => setConfirmModal({ open: false, status: null })}
        toggleModal={() => setConfirmModal({ open: false, status: null })}
      />
    </div>
  );
};
