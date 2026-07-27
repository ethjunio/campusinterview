"use client";

import { useGetDashboardCountQuery } from "@/hooks/admin/useGetDashboardCountQuery";
import { useTranslations } from "next-intl";
import React from "react";
import DashboardLink from "./DashboardLink";
import DashboardSkeleton from "./DashboardSkeleton";

export default function DashboardPage() {
  const t = useTranslations();
  const { data, isPending } = useGetDashboardCountQuery();

  if (isPending) return <DashboardSkeleton />;

  return (
    <main className="bg-light-softer space-y-6 flex-grow relative p-16">
      <section className="space-y-2">
        <div>
          {t("admin.active-user-count", {
            activeUserCount: data?.data.active_user_count,
          })}
        </div>
      </section>
      <section className="space-y-2">
        <h1>{t("admin.info-box")}</h1>
        <div className="flex space-x-4">
        <DashboardLink
          title={t("admin.info-box")}
          href="/admin/dashboard/info-box"
        ></DashboardLink>
        <DashboardLink
          title={t("admin.faq-section")}
          href="/admin/dashboard/faq-section"
        ></DashboardLink>
        <DashboardLink
          title={t("admin.switch-section")}
          href="/admin/dashboard/campus-switch"
        ></DashboardLink>
        <DashboardLink
          title={t("admin.policy-guideline")}
          href="/admin/dashboard/policy-guideline"
        ></DashboardLink>
        </div>
      </section>
      <section className="space-y-2">
        <h1>{t("admin.companies-title")}</h1>
        <div className="flex space-x-4">
          <DashboardLink
            title={t("admin.companies-title")}
            href="/admin/dashboard/companies"
          >
            <div className="text-primary-light text-2xl">
              {data?.data.company_count}
            </div>
          </DashboardLink>

          <DashboardLink
            title={t("admin.bookings-title")}
            href="/admin/dashboard/bookings"
            hint={t("admin.bookings-hint")}
          >
            <div>
              <span className="text-dark text-base">
                {data?.data.approved_bookings_count}
              </span>
              /
              <span className="text-primary-light text-2xl">
                {data?.data.total_bookings_count}
              </span>
            </div>
          </DashboardLink>

          <DashboardLink
            title={t("admin.preevents-title")}
            href="/admin/dashboard/preevents"
            hint="Administrate company pre-events"
          >
            <div>
              <div className="text-primary-light text-2xl">
                {/* {data?.data.} */}
              </div>
            </div>
          </DashboardLink>

          <DashboardLink
            title={t("admin.credentials.title")}
            href="/admin/dashboard/change-company-credentials"
            hint="Administrate company credentials"
          ></DashboardLink>
        </div>
      </section>

      <section className="space-y-2 ">
        <h1>{t("admin.candidates-title")}</h1>
        <DashboardLink
          title={t("admin.candidates-title")}
          href="/admin/dashboard/candidates"
        >
          <div className="text-primary-light text-2xl">
            {data?.data.candidate_count}
          </div>
        </DashboardLink>
      </section>

      <section className="space-y-2">
        <h1>{t("admin.interviews.title")}</h1>
        <div className="flex space-x-4">
          <DashboardLink
            title={t("admin.interviews.matches.title")}
            href="/admin/dashboard/matches"
          >
            <div className="text-primary-light text-2xl">
              {data?.data.matches_count}
            </div>
          </DashboardLink>

          <DashboardLink
            title={t("admin.interviews.interviews.title")}
            href="/admin/dashboard/interviews"
          >
            <div className="text-primary-light text-2xl">
              {data?.data.interviews_count}
            </div>
          </DashboardLink>
        </div>
      </section>

      <section className="space-y-2 ">
        <h1>{t("admin.event-day-title")}</h1>
        <div className="flex space-x-4">
          <DashboardLink
            title={t("admin.event-day.card-title")}
            href="/admin/dashboard/event-day-edit"
          ></DashboardLink>
          <DashboardLink
            title={t("admin.landing-page-info.card-title")}
            href="/admin/dashboard/landing-page-info-edit"
          ></DashboardLink>
          <DashboardLink
            title={t("admin.user-retention.card-title")}
            href="/admin/dashboard/user-retention"
          ></DashboardLink>
        </div>
      </section>

      <section className="space-y-2 ">
        <h1>{t("admin.company-logos-title")}</h1>
        <div className="flex space-x-4">
          <DashboardLink
            title={t("admin.company-logos-edit-title")}
            href="/admin/dashboard/company-logos-carousel"
          ></DashboardLink>
        </div>
      </section>

      <section className="space-y-2 ">
        <h1>{t("admin.send-emails.title")}</h1>
        <div className="flex space-x-4">
          <DashboardLink
            title={t("admin.send-emails.title")}
            href="/admin/dashboard/send-emails"
          ></DashboardLink>
        </div>
      </section>
    </main>
  );
}
