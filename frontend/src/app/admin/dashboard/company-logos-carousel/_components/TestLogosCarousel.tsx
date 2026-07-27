"use client";

import { IconButton, Button } from "@/components/atoms/Button";
import { ListItem } from "@/components/molecules/ListItem";
import { useGetCompanyLogoQuery } from "@/hooks/admin/useGetCompanyLogoQuery";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import CompanyIcon from "@/icons/ic-company.svg";
import DeleteIcon from "@/icons/ic-delete.svg";
import UploadLogoForm from "./UploadCompanyLogoForm";
import { useUploadCompanyLogoMutation } from "@/hooks/admin/useUploadCompanyLogoMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCompanyLogoMutation } from "@/hooks/admin/useDeleteCompanyLogoMutation";
import LogoCarousel from "./LogoCarousel";

export default function TestLogosCarousel() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const logoFormRef = useRef<{ reset: () => void }>(null);

  const { data, isPending } = useGetCompanyLogoQuery("test");
  const deleteCompanyLogoMutation = useDeleteCompanyLogoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyLogos", "test"] });
      toast.success("Company logo deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  const uploadCompanyLogoMutation = useUploadCompanyLogoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyLogos", "test"] });
      toast.success("Company logo uploaded successfully");
      logoFormRef.current?.reset();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  if (isPending) return <div>Loading...</div>;

  const handleSubmit = (file: File) => {
    console.log("File to upload:", file);
    uploadCompanyLogoMutation.mutate({
      type: "test",
      credentials: { image: file },
    });
  };

  return (
    <>
      <h2>{t("admin.company-logos-edit.test-logos.title")}</h2>
      <hr className="mt-4 mb-4" />
      <div>
        <UploadLogoForm
          ref={logoFormRef}
          onSubmit={handleSubmit}
          isSubmitting={uploadCompanyLogoMutation.isPending}
        />
      </div>
      <hr className="mt-4 mb-4" />
      <h3>{t("admin.company-logos-edit.test-logos.list-title")}</h3>
      <ul className="space-y-4 mt-8">
        {(data?.data || []).map(({ imageUrl }) => {
          return (
            <ListItem key={imageUrl} loading={isPending}>
              <ListItem.Image
                Placeholder={CompanyIcon}
                src={imageUrl}
                alt="company-logo"
              />
              <ListItem.Body>
                <a onClick={(e) => e.stopPropagation()} href={imageUrl} target="_blank" rel="noopener noreferrer">
                  <h4>{imageUrl}</h4>
                </a>
              </ListItem.Body>
              <ListItem.Actions>
                <IconButton
                  disabled={deleteCompanyLogoMutation.isPending}
                  onClick={() => {
                    deleteCompanyLogoMutation.mutate(imageUrl);
                  }}
                  icon={
                    <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                  }
                  tw="p-1"
                  variant="link"
                />
              </ListItem.Actions>
            </ListItem>
          );
        })}
      </ul>
      <hr className="mt-4 mb-4" />
      <h3>{t("admin.company-logos-edit.test-logos.carousel-title")}</h3>
      <div className="relative mt-12 mb-12">
        {/* Create logo slider component here pass data.data*/}
        <LogoCarousel logos={data?.data || []} />
      </div>
    </>
  );
}
