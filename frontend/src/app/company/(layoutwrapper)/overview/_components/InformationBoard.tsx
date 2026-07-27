"use client"
import React from 'react';
import c from 'classnames';
import { Remarkable } from 'remarkable';
import { Button } from '@/components/atoms/Button';
import { useGetInfoBoxQuery } from '@/hooks/admin/useGetInfoBoxQuery';
import DOMPurify from "dompurify";

const md = new Remarkable('full', { html: true });


export const InformationBoard = () => {
  const { data } = useGetInfoBoxQuery()
  const previewClassName =
    'lg:h-108 bg-white rounded-md px-9 pt-6 pb-8 xl:pb-12 shadow-sm';

  return (
    <>
      <section className={c('markdown', previewClassName)}>
        {data?.data?.companyMarkdown && (
          <div
            className="content max-w-screen-sm pr-9 xl:pr-40"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(md.render(data?.data?.companyMarkdown)),
            }}
          />
        )}
      </section>
      {/* {data?.data?.companyButtonVisibility ? (
        <section className={c('markdown', previewClassName)}>
          {data?.data?.companyButtonDescription && (
            <div className="flex flex-col align-between justify-between h-full">
              <div
                className="content max-w-screen-sm pr-9 xl:pr-40"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.data?.companyButtonDescription),
                }}
              />
              <div className="flex justify-end">
                <a
                  href={data.data.companyButtonLink}
                  rel="noreferrer"
                  target="_blank">
                  <Button variant="primary-dark">
                    {data.data.companyButtonText}
                  </Button>
                </a>
              </div>
            </div>
          )}
        </section>
      ) : null} */}
    </>
  );
};
