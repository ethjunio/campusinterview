"use client";
import React, { FC, ReactElement, useState } from "react";
import range from "lodash/range";
import c from "classnames";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BackLink } from "@/components/atoms/BackLink";
import { compose } from "lodash/fp";
import PlusIcon from "@/icons/ic-plus.svg";
import MinusIcon from "@/icons/ic-minus.svg";
import Head from "next/head";
import useAuthStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";


const Collapsible: FC<{ question: string; answer: ReactElement }> = ({
  question,
  answer,
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={c("rounded divide-y-2 divide-dark", {
            "bg-white": !open,
            "bg-light-softer": open,
          })}
        >
          <div className="px-4 py-6">
            <DisclosureButton className="flex p-2 w-full items-baseline justify-between">
              <h3 className="text-primary-dark text-left font-semibold pr-12">
                {question}
              </h3>
              {open ? (
                <MinusIcon className="flex-shrink-0 w-5 h-5 text-primary-dark fill-current" />
              ) : (
                <PlusIcon className="flex-shrink-0 w-5 h-5 text-primary-dark fill-current" />
              )}
            </DisclosureButton>
            <DisclosurePanel className="px-2 pt-4 pr-12">
              <p className="text-primary-dark text-base leading-normal text-justify lg:text-left">
                {answer}
              </p>
            </DisclosurePanel>
          </div>
        </div>
      )}
    </Disclosure>
  );
};
const FAQ = () => {
  const t = useTranslations();
  const { user } = useAuthStore();
  const userType = user?.type;

  const router = useRouter();

  let overviewLink = "/";

  if (userType === "company") {
    overviewLink =
      user?.companyOnboardingState !== "finished" ? "BACK" : "/company/overview";
  } else if (userType === "candidate") {
    overviewLink =
      user?.candidateOnboardingState !== "finished" ? "BACK" : "/candidate/overview";
  } else if (userType === "admin") {
    overviewLink = "/admin/dashboard";
  }
  const tabs = t("Faq.tabs").split(",");

  return (
    <main className="bg-white sm:py-16 py-4 sm:pl-40 px-8 sm:mr-12 max-w-screen-lg ">
      <Head>
        <title>FAQ</title>
      </Head>


      {overviewLink === "BACK" ? (
        <BackLink className="mb-10" onClick={() => router.back()}>
          {t("link-frontpage")}
        </BackLink>
      ) : (
        <BackLink className="mb-10" href={overviewLink}>
          {t("link-frontpage")}
        </BackLink>
      )}

      <section className="w-full">
        <h1 className="text-4xl lg:text-huge leading-13 text-primary-dark">
          {t("Faq.title")}
        </h1>
        <TabGroup className="mt-10 lg:mt-20">
          <TabList className="flex justify-start gap-3">
            {tabs.map((key) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  `md:text-2xl text-xl border border-[#1968FF] rounded-lg px-4 py-4 btn ${selected ? 'btn-primary-dark' : null
                  }`
                }
              >
                {t(`Faq.${key}.title`)}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-4 w-full">
            {tabs.map((key) => {
              const count = parseInt(t(`Faq.${key}.count`));
              return (
                <TabPanel className="w-full" key={key}>
                  <ul className="divide-y divide-light">
                    {range(1, count).map((v) => (
                      <li key={`${key}-${v}`}>
                        <Collapsible
                          question={t(`Faq.${key}.q-${v}`)}
                          answer={
                            <span
                              dangerouslySetInnerHTML={{
                                __html:  DOMPurify.sanitize(t(`Faq.${key}.a-${v}`)),
                              }}
                            />
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      </section>
    </main>
  );
};

export default FAQ;
