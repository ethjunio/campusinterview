"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { useDeleteUserRetaintionMutation } from "@/hooks/admin/useDeleteUserRetaintionMutation";

const UserRetention = () => {
  const t = useTranslations();

  const deleteUnsavedProfiles = useDeleteUserRetaintionMutation();

  return (
    <div className="space-y-3">
      {/* <span className="danger-text">{error}</span> */}
      <h1>{t("admin.user-retention.page-title")}</h1>
      <Button
        variant="small-red"
        tw="w-56 text-center"
        onClick={() => {
          const confirm = window?.confirm(
            "Are you sure you want to delete all unsaved profiles? This action is ireversible!"
          );
          if (confirm) {
            deleteUnsavedProfiles.mutate();
          }
        }}
        disabled={deleteUnsavedProfiles.isPending}
      >
        {t("admin.user-retention.delete-unsaved-profiles-button-title")}
      </Button>
    </div>
  );
};

export default UserRetention;
