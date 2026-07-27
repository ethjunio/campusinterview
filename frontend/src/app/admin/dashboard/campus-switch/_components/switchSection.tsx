"use client";

import { useState, useEffect } from "react";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { revalidateInterviewBrandPages } from "@/actions/revalidate";
import { BackLink } from "@/components/atoms/BackLink";
import { useGetCampusSwitchBoxQuery } from "@/hooks/admin/useGetCampusSwitchQuesry";
import { useUpdateCampusSwitchBoxDataMutation } from "@/hooks/admin/useUpdateCampusSwitchDataMutation";


const SwitchSection = () => {
  const t = useTranslations();
  const [mode, setMode] = useState("0");

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useGetCampusSwitchBoxQuery();

  useEffect(() => {
    if (data?.data) {
      setMode(`${data?.data?.siteUiFlag}`);
    }
  }, [data]);

  const updateCampusSwitchDataMutation = useUpdateCampusSwitchBoxDataMutation({
    onSuccess: async () => {
      toast.success("Data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getCampusSwitchBox"] });
      queryClient.invalidateQueries({ queryKey: ["getLandingPageInfoVisitors"] });
      await revalidateInterviewBrandPages();
      router.refresh();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const onSubmitUpdate = () => {
    updateCampusSwitchDataMutation.mutate({ siteUIFlag: Number(mode) });
  };

  return (
    <main className="px-12 py-8 space-y-6 bg-light-soft flex-grow">
      <BackLink href="/admin/dashboard">
        {t("admin.back-to-dashboard")}
      </BackLink>
      <h1 className="pb-16">{t("admin.switch-section")}</h1>

      <div className="flex items-start justify-start bg-gray-50 px-4">
        <div className="w-full max-w-sm space-y-4">
          {/* Label */}
          <label className="text-sm font-medium text-gray-900">
            Interview Mode
          </label>

          {/* Custom Select */}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">Campus Interview</option>
            <option value="1">Online Campus Interview</option>
          </select>

          {/* Custom Button */}
          <button
            onClick={onSubmitUpdate}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default SwitchSection;
