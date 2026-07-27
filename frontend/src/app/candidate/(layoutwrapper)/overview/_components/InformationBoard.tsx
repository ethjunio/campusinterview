"use client";
import React from "react";
import c from "classnames";
import { Remarkable } from "remarkable";
import { useGetInfoBoxQuery } from "@/hooks/admin/useGetInfoBoxQuery";
import DOMPurify from "dompurify";

const md = new Remarkable("full", { html: true });

export const InformationBoard = () => {
  const { data: infoData } = useGetInfoBoxQuery();
  const previewClassName =
    "lg:h-108 bg-white rounded-md pl-9 pt-6 pb-8 xl:pb-12 shadow-sm";

  return (
    <section className={c("markdown", previewClassName)}>
      {infoData?.data?.candidateMarkdown && (
        <div
          className="content max-w-screen-sm pr-9 xl:pr-40 [&_img]:w-[100px]"
          dangerouslySetInnerHTML={{
            __html:DOMPurify.sanitize( md.render(infoData?.data?.candidateMarkdown)),
          }}
        />
      )}
    </section>
  );
};
