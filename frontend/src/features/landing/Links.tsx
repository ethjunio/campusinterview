"use client";
import React, { FC } from "react";

import Link from "next/link";
import { ArrowButton, Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";

type Props = {
  variant?: "primary-dark" | "primary-light";
  className?: string;
  Comp?: typeof Button | typeof ArrowButton;
  to?: string;
};

export const StudentsLink: FC<Props> = ({
  className,
  variant = "primary-dark",
  Comp = ArrowButton,
}) => {
  const t = useTranslations();
  return (
    <Link href="/looking-for-job">
      <Comp tw={className} variant={variant}>
        {t("link-students")}
      </Comp>
    </Link>
  );
};

export const CompaniesLink: FC<Props> = ({
  className,
  variant = "primary-dark",
  Comp = ArrowButton,
}) => {
  const t = useTranslations();

  return (
    <Link href="/looking-for-talent">
      <Comp tw={className} variant={variant}>
        {t("link-companies")}
      </Comp>
    </Link>
  );
};

export const RegisterLink: FC<Props> = ({
  className,
  Comp = Button,
  variant = "primary-light",
  to = "/register",
}) => {
  const t = useTranslations();
  return (
    <Link href={to}>
      <Comp tw={className} variant={variant}>
        {t("link-register")}
      </Comp>
    </Link>
  );
};

export const SignInLink: FC<Props> = ({
  className,

  Comp = Button,
  variant = "primary-dark",
}) => {
  const t = useTranslations();

  return (
    <Link href="/login">
      <Comp tw={className} variant={variant}>
        {t("link-sign-in")}
      </Comp>
    </Link>
  );
};
