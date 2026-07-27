"use client";

import React, { useState } from "react";
import take from "lodash/fp/take";
import { ListItem } from "@/components/molecules/ListItem";
import CompanyIcon from "@/icons/ic-company.svg";
import AcceptIcon from '@/icons/ic-accept.svg';
import DeleteIcon from "@/icons/ic-delete.svg";
import { IconButton, Button } from "@/components/atoms/Button";
import DownloadIcon from "@/icons/ic-download.svg";
import { useTranslations } from "next-intl";
import { useGetCompaniesListQuery } from "@/hooks/admin/useGetCompaniesListQuery";
import { Company } from "@/app/types";
import CompaniesListSkeleton from "./CompaniesListSkeleton";
import { useDeleteCompaniesMutation } from "@/hooks/admin/useDeleteCompaniesMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { useCreateApproveCompanyMutation } from "@/hooks/admin/useCreateApproveCompanyMutation";
import { Checkbox } from "@/components/molecules/form/Checkbox";
import { useStatusCompanyMutation } from "@/hooks/admin/useStatusCompanyMutation";

const CompaniesList = () => {

  const t = useTranslations();
  const queryClient = useQueryClient();
  const [employeeid, setemployeeid] = useState<string[]>([]);
  const [allemployee, setallemployee] = useState(false);

  const deleteCompanyMutation = useDeleteCompaniesMutation({
    onSuccess: () => {
      toast.success("Company data deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companiesList"] });
    },
    onError: (err:any) => {
     toast.error(err?.response?.data?.message);
    },
  });

  const updateStatusCompanyMutation = useStatusCompanyMutation({
    onSuccess: () => {
      toast.success("Status data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companiesList"] });
    },
    onError: (err:any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const onHandleSubmit = (values: any) => {
    if(employeeid?.length>0){
    const payload = {
      "profileIds": employeeid,
    "profileStatus": values
    }
    updateStatusCompanyMutation.mutate(payload);
  }
    else{
      toast.warning("Select Profiles");
    }
  };

    const { mutate: approveCompanyList } = useCreateApproveCompanyMutation({
      onSuccess: () => {
        toast.success("Company data approved successfully");
        queryClient.invalidateQueries({ queryKey: ["companiesList"] });
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "An error occurred");
      },
    });

  const { data, isPending } = useGetCompaniesListQuery();

  console.log("companies data", data);

  if (isPending) return <CompaniesListSkeleton />;

  const currentDate = new Date();

  const fileNameJSON = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}-${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}-companies-export.json`;
  const fileNameCSV = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}-${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}-companies-export.csv`;

    const handleFileDownload = async (type: string) => {
      try {
        // Construct the API URL
        const url = `/admin/companyMgmt/exportCompanyData/${type}`;
    
        // Make the API call using axiosInstance
        const response = await axiosInstance.get(url, {
          responseType: "blob", // Important: This tells Axios to treat the response as a Blob
        });
    
        console.log("company response", response);
    
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
         
        }: Company) => id);
        setemployeeid(tempemployee);
        setallemployee(true);
    }
};

  return (
    <div>
      {/* <span className="danger-text">{error}</span> */}

      <div className="mb-4">
        <Button
          variant="primary-dark"
          onClick={() => handleFileDownload("JSON")}
          tw="flex justify-between"
        >
          <span className="text-white mr-4">
            {t("admin.companies.export-json-button-title")}
          </span>
          <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
        </Button>
      </div>
      <div className="mb-4">
        <Button
          variant="primary-dark"
          onClick={() => handleFileDownload("CSV")}
          tw="flex justify-between"
        >
          <span className="text-white mr-4">
            {t("admin.companies.export-csv-button-title")}
          </span>
          <DownloadIcon className="w-5 h-5 flex-shrink-0 fill-current text-white" />
        </Button>
      </div>
      <div className="mb-4 flex justify-end gap-4">
      {/* <Button
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
        </Button> */}
        {/* <Button
          variant="primary-dark"
          onClick={() => onHandleSubmit("active")}
          tw="flex justify-between"
        >
          <span className="text-white mr-4">
            Active Selected company
          </span>
        </Button>
        <Button
          variant="primary-dark"
          onClick={() => onHandleSubmit("inactive")}
          tw="flex justify-between"
        >
          <span className="text-white mr-4">
            InActive Selected company
          </span>
        </Button> */}
      </div>

      <ul className="space-y-4">
        {(data?.data || [])?.map(
          ({
            id,
            name,
            industries,
            description,
            imageUrlSmall,
            user,
            approved
          }: Company) => {
            return (
              <ListItem key={id} loading={isPending} id={id} type="company">
                
            
          
                <ListItem.Image
                  Placeholder={CompanyIcon}
                  src={imageUrlSmall}
                  alt={`${name}-image`}
                />
                <ListItem.Title>
                  {name}
                  <div className="text-sm">{user?.email}</div>
                </ListItem.Title>
                <ListItem.Body>
                  <div className="flex space-x-8">
                    <div>
                      {industries?.length > 0 &&
                        take(
                          2,
                          industries?.map(({ id, name }) => (
                            <div key={id} className="general-text-sm">
                              {name}
                            </div>
                          ))
                        )}
                    </div>
                    <span className="general-text-sm">{description}</span>
                  </div>
                </ListItem.Body>
                <ListItem.Actions>
                  <div className="flex space-x-2">
              
                     {!approved && (
                    <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      approveCompanyList({ companyId:id });
                    }}
                      tw="p-1"
                      variant="link"
                      icon={
                        <AcceptIcon className="w-6 h-6 fill-current text-info" />
                      }
                    />
                  )}
                      {/* <div
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
</div> */}
                    <IconButton
                      // call delete mutation here
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirm = window?.confirm(
                          "Are you sure you want to delete this company? This action is ireversible!"
                        );
                        if (confirm) {
                          deleteCompanyMutation.mutate({ id });
                        }
                      }}
                      tw="p-1"
                      variant="link"
                      icon={
                        <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                      }
                    />
                  </div>
                </ListItem.Actions>
              </ListItem>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default CompaniesList;
