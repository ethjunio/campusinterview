"use client"
import { Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { GeneralCard } from "./_components/GeneralCard";
import { FactsCard } from "./_components/FactsCard";
import { PositionsCard } from "./_components/PositionsCard";
import { JoinUsCard } from "./_components/JoinUsCard";
import useMobileDetect from "@/utils/useMobileDetect";
const page = () => {
  const t = useTranslations();

  const { currentDevice } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

  return (
    <main className="bg-light-soft flex flex-col flex-grow relative">
      <Head>
        <title>Company Profile</title>
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
                ? "/company/profile/general/menu"
                : "/company/profile/general"
            }
          >
            <Button variant="primary-dark" tw="w-auto">
              {t("common.profile-edit")}
            </Button>
          </Link>
        </div>
      </div>
      <GeneralCard />
      <FactsCard />
      <PositionsCard />
      <JoinUsCard />
    </main>
  );
};

export default page;
