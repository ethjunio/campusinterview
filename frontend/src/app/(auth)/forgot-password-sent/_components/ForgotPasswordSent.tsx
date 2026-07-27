"use client";
import React from "react";

import { useTranslations } from "next-intl";

const ForgotPasswordSent = () => {
  const t = useTranslations();

  const title = t("auth.password-reset.email-sent-title");
  const subtitle = t("auth.password-reset.email-sent-subtitle");
  const text = t("auth.password-reset.email-sent-text");
  return (
    <div className="mx-4 lg:mx-8 xl:mx-12">
      <h1 className="mb-16">{title}</h1>
      <h4 className="mb-5">{subtitle}</h4>
      <p className="general-text max-w-sm">{text}</p>
    </div>
  );
};

export default ForgotPasswordSent;
