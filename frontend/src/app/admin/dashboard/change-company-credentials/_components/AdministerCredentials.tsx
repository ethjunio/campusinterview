"use client";

import { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import debounce from "lodash/debounce";
import { Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import { useGetCompanyNamesWithContactQuery } from "@/hooks/admin/useGetCompanyNamesWithContactQuery";
import { CompanyContact } from "@/app/types";
import { useUpdateCompanyCredentialsMutation } from "@/hooks/admin/useUpdateCompanyCredentialsMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const AdministerCredentials = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  //   const [onCompleted, onError, error] = useNotificationSystem();
  const [companyOptions, setCompanyOptions] = useState<
    {
      value: string;
      label: string;
      company: CompanyContact;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState<string>();
  const [selectedCompany, setSelectedCompany] = useState<CompanyContact>({
    id: "",
    name: "",
    CompanyContacts: [
      {
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        id: "",
      },
    ],
    user: {
      email: "",
    },
  });
  const [searchCompanyTerm, setSearchCompanyTerm] = useState<{
    value: string;
    label: string;
  }>({
    value: "",
    label: "",
  });

  // Query with debounced search term
  const { data, isPending } = useGetCompanyNamesWithContactQuery(
    { search: searchTerm },
    {
      enabled: !searchTerm || searchTerm.length >= 2,
    }
  );

  const updateCompanyCredentialsMutation = useUpdateCompanyCredentialsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companyNamesWithContact", { search: searchTerm }],
      });
      toast.success("Company credentials updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  // Transform API data into React Select options
  useEffect(() => {
    if (data?.data) {
      const options = data.data.map((company: any) => ({
        value: company.id,
        label: company.name,
        company: company,
      }));
      setCompanyOptions(options);
    }
  }, [data]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((inputValue: string) => {
      setSearchTerm(inputValue);
    }, 500), // 500ms delay
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onSearchCompanyChange = (selectedOption: any) => {
    if (!selectedOption) {
      setSearchTerm(""); // Clear searchTerm when selection is cleared
      setSearchCompanyTerm({ value: "", label: "" });
      setSelectedCompany({
        id: "",
        name: "",
        CompanyContacts: [
          {
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            id: "",
          },
        ],
        user: {
          email: "",
        },
      });
      return;
    }

    setSearchCompanyTerm(selectedOption);
    if (selectedOption?.company) {
      setSelectedCompany(selectedOption.company);
    }
  };

  // Add validateInput function near the top of the component
  const validateInput = (value: string) => {
    if (!value) {
      setValidationError("All fields are required");
    } else {
      setValidationError(undefined);
    }
  };

  return (
    <div>
      <h1>{t("admin.credentials.title")}</h1>
      {/* <span className="danger-text">{error}</span> */}
      <span className="danger-text">{validationError}</span>

      <div className="flex flex-col max-w-lg  md:max-w-md xl:max-w-xl justify-between">
        <div className="mt-8 mb-4">
          <label>{t("admin.credentials.company-label")}*</label>
          <Select
            className="w-64"
            isSearchable
            isClearable
            isLoading={isPending}
            classNamePrefix="react-select"
            options={companyOptions}
            placeholder={t(
              "admin.interviews.matches.search-company-placeholder"
            )}
            onChange={onSearchCompanyChange}
            value={searchCompanyTerm}
            onInputChange={(newValue, { action }) => {
              if (action === "input-blur" || action === "menu-close") {
                return;
              }
              // Only trigger search on user input
              if (action === "input-change") {
                debouncedSearch(newValue);
              }
              // Update the visible search term immediately
              setSearchCompanyTerm((prev) => ({
                ...prev,
                label: newValue, // showing the typed search value initially for fast response
              }));
            }}
            filterOption={null} // Disable local filtering as we're using server-side search
            noOptionsMessage={({ inputValue }) =>
              inputValue.length < 2
                ? "Type at least 2 characters to search..."
                : "No options found"
            }
          />
        </div>
        <div>
          
          <div className="mb-4">
            <label>{t("admin.credentials.email-label")}*</label>
            <input
              className="form-input block w-full rounded border-[1px] border-solid border-gray-400"
              name="to"
              value={selectedCompany?.CompanyContacts[0]?.email}
              onChange={(event) => {
                const newValue = event.target.value;
                setSelectedCompany((prev) => ({
                  ...prev,
                  CompanyContacts: [
                    {
                      ...prev.CompanyContacts[0],
                      email: newValue,
                    },
                    ...prev.CompanyContacts.slice(1),
                  ],
                 
                }));
                validateInput(newValue);
              }}
            ></input>
          </div>
          <div className="mb-4">
            <label>{t("admin.credentials.accountEmail-label")}*</label>
            <input
              className="form-input block w-full rounded border-[1px] border-solid border-gray-400"
              name="to"
              value={selectedCompany?.user?.email}
              onChange={(event) => {
                const newValue = event.target.value;
                setSelectedCompany((prev) => ({
                  ...prev,
                 
                  user: {
                    ...prev.user,
                    email: newValue, // Also update user email if needed
                  },
                }));
                validateInput(newValue);
              }}
            ></input>
          </div>
          <div className="mb-4">
            <label>{t("admin.credentials.firstname-label")}*</label>
            <input
              className="form-input block w-full rounded border-[1px] border-solid border-gray-400"
              name="to"
              value={selectedCompany?.CompanyContacts[0]?.firstName}
              onChange={(event) => {
                const newValue = event.target.value;
                setSelectedCompany((prev) => ({
                  ...prev,
                  CompanyContacts: [
                    {
                      ...prev.CompanyContacts[0],
                      firstName: newValue,
                    },
                    ...prev.CompanyContacts.slice(1),
                  ],
                }));
                validateInput(newValue);
              }}
            ></input>
          </div>
          <div className="mb-4">
            <label>{t("admin.credentials.lastname-label")}*</label>
            <input
              className="form-input block w-full rounded border-[1px] border-solid border-gray-400"
              name="to"
              value={selectedCompany?.CompanyContacts[0]?.lastName}
              onChange={(event) => {
                const newValue = event.target.value;
                setSelectedCompany((prev) => ({
                  ...prev,
                  CompanyContacts: [
                    {
                      ...prev.CompanyContacts[0],
                      lastName: newValue,
                    },
                    ...prev.CompanyContacts.slice(1),
                  ],
                }));
                validateInput(newValue);
              }}
            ></input>
          </div>

          <Button
            tw="mt-4"
            variant="primary-light"
            disabled={
              updateCompanyCredentialsMutation.isPending ||
              !selectedCompany?.CompanyContacts[0]?.email ||
              !selectedCompany?.CompanyContacts[0]?.firstName ||
              !selectedCompany?.CompanyContacts[0]?.lastName ||
              !selectedCompany?.user?.email
            }
            onClick={async () => {
              const confirm = window?.confirm(
                "Are you sure you want to update this company's credentials?"
              );
              if (confirm) {
                if (
                  !selectedCompany?.CompanyContacts[0]?.email ||
                  !selectedCompany?.CompanyContacts[0]?.firstName ||
                  !selectedCompany?.CompanyContacts[0]?.lastName
                )
                  return;

                updateCompanyCredentialsMutation.mutate({
                  contactId: selectedCompany?.CompanyContacts[0]?.id,
                  credentials: {
                    email: selectedCompany?.CompanyContacts[0]?.email,
                    firstName: selectedCompany?.CompanyContacts[0]?.firstName,
                    lastName: selectedCompany?.CompanyContacts[0]?.lastName,
                    accountEmail:selectedCompany?.user?.email
                  },
                });
              }
            }}
          >
            {t("admin.credentials.apply")}
          </Button>
        </div>
      </div>
    </div>
  );
};
