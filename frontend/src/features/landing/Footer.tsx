"use client";
import React, { FC, useMemo } from "react";
// import { RegisterLink, SignInLink } from './Links';
import EthjIcon from "../../assets/icons/ethj-juniors.svg";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface FooterProps {
  cta: string;
  children?: ReactNode;
}

export const Footer: FC<FooterProps> = ({ cta, children }) => {
  const router = useRouter();

  //   UseMemo to determine if the page is 'looking-for-talent'
  //   const typeParam = useMemo(
  //     () => (router.pathname === '/looking-for-talent' ? '?_for=company' : ''),
  //     [router.pathname],
  //   );

  return (
    <div className="flex flex-col absolute bottom-0 left-0 right-0 mb-8">
      <div className="xl:max-w-sm font-extrabold px-8 lg:px-0 lg:ml-40 text-2xl lg:text-3xl relaxed mb-24 text-primary-light">
        {cta}
        <div className="flex space-x-4 mt-8 justify-between lg:justify-start">
          {/* <RegisterLink to={`/register${typeParam}`} className="w-auto" />
          <SignInLink className="w-auto" /> */}
          {children}
        </div>
      </div>

      <div className="px-8 flex flex-col space-y-4 flex-grow lg:items-end lg:flex-row lg:space-y-0 justify-between lg:mr-8">
        <div className="flex flex-col lg:flex-row lg:items-end">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.ethjuniors.ch/"
          >
            <EthjIcon className="pb-4 lg:pb-0 flex-shrink-0 w-28 justify-end" />
          </a>
          <span className="lg:ml-10 text-primary-dark text-sm">
            Hochstrasse 60a | 8044 Zürich | Switzerland |{" "}
            <a
              className="text-oprimary-dark text-sm primaryDarkImportant"
              href={`mailto:campusinterview@ethjuniors.ch?subject="subject"`}
            >
              campusinterview@ethjuniors.ch
            </a>{" "}
            |{" "}
            <a
              className="text-primary-dark text-sm"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.ethjuniors.ch/"
            >
              ethjuniors.ch
            </a>
          </span>
        </div>
        <span className="text-primary-dark text-sm">
          Imprint |{" "}
          <a
            className="text-primary-dark text-sm"
            href="/updatedPrivacyPolicy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </span>
      </div>
    </div>
  );
};
