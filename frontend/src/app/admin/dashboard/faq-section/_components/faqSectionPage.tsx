"use client";
import { BackLink } from "@/components/atoms/BackLink";
import { useGetInfoBoxQuery } from "@/hooks/admin/useGetInfoBoxQuery";
import { useTranslations } from "next-intl";
import React from "react";
import { useUpdateInfoBoxDataMutation } from "@/hooks/admin/useUpdateInformationBoardMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import FaqCompany from "./faqCompanyPage";
import { InfoboxFeatureSkeleton } from "../../info-box/_components/InfoboxFeatureSkeleton";
import FaqCandidate from "./faqStudentPage";

export default function FaqSectionPage() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { data, isPending } = useGetInfoBoxQuery();

  const updateInfoBoxDataMutation = useUpdateInfoBoxDataMutation({
    onSuccess: () => {
      toast.success("Info box data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["infoBox"] });
    },
    onError: (err:any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmit = (values: any) => {
    updateInfoBoxDataMutation.mutate(values);
  };

  if (isPending) {
    return (
      <main className="px-12 py-8 space-y-6 bg-light-soft flex-grow">
        <BackLink href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>
        <h1 className="pb-16">{t("admin.info-box")}</h1>
        <InfoboxFeatureSkeleton />
        <hr />
      </main>
    );
  }

  return (
    <main className="px-12 py-8 space-y-6 bg-light-soft flex-grow">
      <BackLink href="/admin/dashboard">
        {t("admin.back-to-dashboard")}
      </BackLink>
      <h1 className="pb-16">{t("admin.faq-section")}</h1>

      <FaqCompany/>
      <FaqCandidate/>
    </main>
  );
}
