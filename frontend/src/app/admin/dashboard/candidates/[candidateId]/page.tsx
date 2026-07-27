"use client";
import React from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { PersonalCard } from "./_components/PersonalCard";
import { EducationsCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/EducationsCard";
import { ExperienceCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/ExperienceCard";
import { LookingForCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/LookingForCard";
import { LanguagesCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/LanguagesCard";
import { ItSkillsCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/ItSkillsCard";
import { ExtracurricularsCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/ExtraCurricularsCard";
import { useParams, useRouter } from "next/navigation";
import { BackButton } from "@/components/atoms/BackLink";
import { Button } from "@/components/atoms/Button";
import Head from "next/head";
import { useGetTalentDetailByIdQuery } from "@/hooks/company/talent-pool/useGetTalentDetailByIdQuery";
import { MiscsCard } from "@/app/company/(layoutwrapper)/talent-pool/(talentDetails)/[candidateId]/_components/MiscCard";
import { axiosInstance } from "@/utils/axios";

const Profile: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const params = useParams();
  const { candidateId } = params;
  const { data, isLoading } = useGetTalentDetailByIdQuery(candidateId);

  const pageTitle = data?.data
    ? `${data.data?.firstName} ${data?.data?.lastName}`
    : "Candidate Detail";

  async function getCandidateCV(candidateId: any) {
    try {
      const url = `/company/talentPoolMgmt/getCandidateCV/${candidateId}`;

      const response = await axiosInstance.get(url, {
        responseType: "blob",
      });

      const file = window.URL.createObjectURL(response.data);
      window.open(file, "_blank");

      return response;
    } catch (error) {
      throw error;
    }
  }

  const downloadCandidateCVButton = (
    <Button
      variant="accent"
      tw="mr-4"
      onClick={async () => await getCandidateCV(candidateId)}
    >
      {t("companies.talent-pool.download-candidate-cv")}
    </Button>
  );

  return (
    <main className="bg-light-soft flex-grow relative">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div
        className="absolute z-0 bg-cover h-48 bg-center top-0 left-0 right-0 "
        style={{ backgroundImage: "url(/img/head_image_1.png)" }}
      >
        <BackButton
          className="text-white absolute top-0 px-4 lg:px-10 mt-4"
          onClick={() => router.back()}
        >
          {t("common.back")}
        </BackButton>
      </div>
      {!isLoading && data && (
        <>
          <PersonalCard
            data={data}
            readonly
            candidateId={candidateId as string}
          >
            <React.Fragment>
              <div className="flex mb-4 lg:mb-0">
                {downloadCandidateCVButton}
              </div>
            </React.Fragment>
          </PersonalCard>
          <EducationsCard data={data} readonly />
          <ExperienceCard data={data} readonly />
          <LookingForCard data={data} readonly />
          <ExtracurricularsCard data={data} readonly />
          <LanguagesCard data={data} readonly />
          <ItSkillsCard data={data} readonly />
          <MiscsCard data={data} readonly />
        </>
      )}
    </main>
  );
};

export default Profile;
