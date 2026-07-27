"use client";
import { Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { PersonalCard } from "./_components/PersonalCard";
import { EducationsCard } from "./_components/EducationsCard";
import { ExperienceCard } from "./_components/ExperienceCard";
import { LookingForCard } from "./_components/LookingForCard";
import { ExtracurricularsCard } from "./_components/ExtraCurricularCard";
import { LanguagesCard } from "./_components/LanguagesCard";
import { ItSkillsCard } from "./_components/ItSkillsCard";
import { MiscsCard } from "./_components/MiscCard";
import useMobileDetect from "@/utils/useMobileDetect";

const page = () => {
  const t = useTranslations();
  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  return (
    <main className="bg-light-soft flex-grow relative">
      <Head>
        <title>Profile</title>
      </Head>
      <div
        className="absolute z-0 bg-cover h-32 sm:h-48 bg-center top-0 left-0 right-0 "
        style={{ backgroundImage: "url(/img/head_image_1.png)" }}
      >
        <div className="flex justify-between items-baseline px-4 sm:px-10 pt-4 sm:pt-10">
          <h3 className="text-white">{t("common.profile-title")}</h3>
          <Link
            href={
              isMobile
              ? '/candidate/profile/personal/menu'
              : '/candidate/profile/personal'
            }
          >
            <Button tw="w-auto" variant="primary-dark">
              {t("common.profile-edit")}
            </Button>
          </Link>
        </div>
      </div>
      <PersonalCard />
      <EducationsCard />
      <ExperienceCard />
      <LookingForCard />
      <ExtracurricularsCard />
      <LanguagesCard />
      <ItSkillsCard />
      <MiscsCard />
    </main>
  );
};

export default page;
