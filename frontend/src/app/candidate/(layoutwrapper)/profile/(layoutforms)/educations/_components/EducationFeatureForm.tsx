"use client";
import React, { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { EducationList } from "./EducationList";

const EducationFeatureForm = () => {
  const t = useTranslations();

  const [activeId, setActiveId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const [activeThesisId, setActiveThesisId] = useState(null);
  const [showThesisDialog, setShowThesisDialog] = useState(false);

  const open = useCallback((id: number, thesisId: string | "new") => {
    setActiveId(id);
    thesisId !== "new" && setActiveThesisId(thesisId);
    if (thesisId) {
      setShowThesisDialog(true);
    } else {
      setShowDialog(true);
    }
  }, []);

  const close = useCallback((dirty?: boolean) => {
    if (!dirty || window?.confirm("Are you sure you want to close?")) {
      setActiveId(null);
      setActiveThesisId(null);
      setShowDialog(false);
      setShowThesisDialog(false);
    }
  }, []);
  return (
    <div>
      <h1 className="mb-10">{t("candidate.education.title")}</h1>
      <EducationList isOpen={showDialog || showThesisDialog} open={open} />
      {/* <EducationFeature activeId={activeId} close={close} isOpen={showDialog} />
      <ThesisFeature
        educationId={activeId}
        activeId={activeThesisId}
        close={close}
        isOpen={showThesisDialog}
      /> */}
    </div>
  );
};

export default EducationFeatureForm;
