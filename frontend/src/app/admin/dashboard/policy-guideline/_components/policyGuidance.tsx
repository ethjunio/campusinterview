"use client";

import { useState, useEffect, useRef } from "react";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";

import { useGetCampusSwitchBoxQuery } from "@/hooks/admin/useGetCampusSwitchQuesry";
import { useUpdateCampusSwitchBoxDataMutation } from "@/hooks/admin/useUpdateCampusSwitchDataMutation";
import { BackLink } from "@/components/atoms/BackLink";
import { Eye, Trash2, Upload } from "lucide-react";
import { useUpdatePolicyGuidanceDataMutation } from "@/hooks/admin/useUpdatePolicyGuidanceMutation";
import { useGetPolicyGuidanceBoxQuery } from "@/hooks/admin/useGetPolicyGuidanceQuery";

export type DocKey = "tnc" | "privacy" | "conduct";

export const DOC_LABELS: Record<DocKey, string> = {
  tnc: "termsAndConditions",
  privacy: "privacyPolicy",
  conduct: "codeOfConduct",
};
export const DOC_LABELS_DISPLAY: Record<DocKey, string> = {
  tnc: "Terms And Conditions",
  privacy: "Privacy Policy",
  conduct: "Code Of Conduct",
};
const DOC_URLS = {
  tnc: "https://cdn.campusinterview.ch/production/test/legal-docs/terms-and-conditions.pdf",
  privacy:
    "https://cdn.campusinterview.ch/production/test/legal-docs/privacy-policy.pdf",
  conduct:
    "https://cdn.campusinterview.ch/production/test/legal-docs/code-of-conduct.pdf",
};
const buildUrl = (url: string) => `${url}?v=${Date.now()}`;
export const getPdfUrl = (key: DocKey) => {
  return `${DOC_URLS[key]}?v=${Date.now()}`;
};
const STORAGE_PREFIX = "pdf-doc:";

export interface StoredPdf {
  name: string;
  dataUrl: string; // data:application/pdf;base64,...
  size: number;
  uploadedAt: number;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const DOC_KEYS: DocKey[] = ["tnc", "privacy", "conduct"];

const PolicyGuideline = () => {
  const t = useTranslations();
  const [mode, setMode] = useState("0");

  const [docs, setDocs] = useState<Record<DocKey, string>>({
    tnc: buildUrl(DOC_URLS.tnc),
    privacy: buildUrl(DOC_URLS.privacy),
    conduct: buildUrl(DOC_URLS.conduct),
  });

  return (
    <main className="px-12 py-8 space-y-6 bg-light-soft flex-grow">
      {/* Header */}
      <div className="max-w-7xl  mb-8">
        <BackLink href="/admin/dashboard">
          {t("admin.back-to-dashboard")}
        </BackLink>

        <h1 className="text-2xl font-semibold mt-3">
          {t("admin.policy-guideline")}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Upload and manage your platform documents
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl ">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {DOC_KEYS.map((key) => (
            <DocCard key={key} docKey={key} pdf={docs[key]} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default PolicyGuideline;

function DocCard({ docKey, pdf }: { docKey: DocKey; pdf: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const queryClient = useQueryClient();
  const updatePolicyGuidanceDataMutation = useUpdatePolicyGuidanceDataMutation({
    onSuccess: () => {
      toast.success("Data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getPolicyGuidanceBox"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 4.5 * 1024 * 1024) {
      toast.error("File too large (max ~4.5MB)");
      return;
    }

    setBusy(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("type", DOC_LABELS[docKey]);
      formData.append("updateEnv", "prod");
      const payload = {
        key: DOC_LABELS[docKey],
        formdata: formData,
      };
      await updatePolicyGuidanceDataMutation.mutateAsync(payload);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const handleView = () => {
    const url = getPdfUrl(docKey);
    window.open(url, "_blank");
  };


  return (
    <div className="group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-5 border-b">
        <h3 className="text-sm font-semibold text-gray-800">
          {DOC_LABELS_DISPLAY[docKey]}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {pdf ? (
            <span className="block truncate" title={pdf}>
              {pdf}
            </span>
          ) : (
            "No file uploaded"
          )}
        </p>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />

        {/* Upload */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="
        w-full flex items-center justify-center gap-2 
        px-4 py-2.5 rounded-xl 
        bg-indigo-600 text-white text-sm font-medium
        hover:bg-indigo-700 active:scale-[0.98]
        transition disabled:opacity-50
      "
        >
          <Upload className="h-4 w-4" />
          Upload / Replace PDF
        </button>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleView}
            disabled={!pdf}
            className="
          flex-1 flex items-center justify-center gap-2
          px-3 py-2 rounded-lg border text-sm
          hover:bg-gray-50 transition
          disabled:opacity-40
        "
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          {/* <button
        type="button"
        onClick={handleRemove}
        disabled={!pdf}
        className="
          flex-1 flex items-center justify-center gap-2
          px-3 py-2 rounded-lg border text-sm
          text-red-600 border-red-200
          hover:bg-red-50 transition
          disabled:opacity-40
        "
      >
        <Trash2 className="h-4 w-4" />
        Remove
      </button> */}
        </div>
      </div>
    </div>
  );
}
