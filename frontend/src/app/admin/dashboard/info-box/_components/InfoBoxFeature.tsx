"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import { InputField } from "@/components/molecules/form/InputField";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import DOMPurify from "dompurify";
import classNames from "classnames";

export type EditorFieldProps = {
  field: string;
  label: string;
  value: string;
  setFieldValue: (field: string, value: string) => void;
};

export const EditorWithPreview = ({
  field,
  label,
  value,
  setFieldValue,
}: EditorFieldProps) => {
  const [previewHtml, setPreviewHtml] = useState("");
  const [isHtmlContent, setIsHtmlContent] = useState(false);
  const [isPlainTextView, setIsPlainTextView] = useState(false);
  const [htmlBackup, setHtmlBackup] = useState("");

  const initialContent = useMemo(() => {
    const html = value.replace(/^\*\*+|\*\*+$/g, "");
    return DOMPurify.sanitize(html);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose max-w-full min-h-[298px] border rounded-md p-3 focus:outline-none",
      },
    },
    // onUpdate: ({ editor }) => {
    //   const html = editor.getHTML();
    //   setFieldValue(field, html);
    //   setPreviewHtml(html);
    //   setIsHtmlContent(/<\/?[a-z][\s\S]*>/i.test(html)); // detect HTML
    // },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText().trim();

      // Use a hidden element to get plain text
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      const plainText = tempEl.textContent?.trim() || "";

      // Check if content has actual tags beyond wrapping <p>
      const isHtml =
        plainText !== text || // Some encoded HTML may alter content
        html.replace(/\s/g, "") !== `<p>${plainText}</p>`.replace(/\s/g, "");

      setPreviewHtml(html);
      setIsHtmlContent(isHtml);
      setFieldValue(field, html);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      const html = editor.getHTML();
      setPreviewHtml(html);
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="space-y-4 ">
      {label && <h2>{label}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex gap-2 flex-wrap rounded border px-2 py-1 bg-gray-50 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={getButtonClass(editor.isActive("bold"))}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={getButtonClass(editor.isActive("italic"))}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={getButtonClass(editor.isActive("underline"))}
            >
              Underline
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              className={getButtonClass(editor.isActive("link"))}
            >
              Link
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter image URL");
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
              className={getButtonClass(false)}
            >
              Image
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              className={getButtonClass(false)}
            >
              Undo
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              className={getButtonClass(false)}
            >
              Redo
            </button>
            <button
              type="button"
              disabled={!isHtmlContent}
              onClick={() => {
                if (!isPlainTextView) {
                  // Save the current HTML and strip to plain text
                  const html = editor.getHTML();
                  const tempEl = document.createElement("div");
                  tempEl.innerHTML = html;
                  const plainText =
                    tempEl.textContent || tempEl.innerText || "";

                  setHtmlBackup(html);
                  editor.commands.setContent(plainText);
                  setIsPlainTextView(true);
                } else {
                  // Restore the previous HTML
                  editor.commands.setContent(htmlBackup);
                  setIsPlainTextView(false);
                }
              }}
              className={getButtonClass(false)}
            >
              {isPlainTextView ? "Convert to HTML View" : "Convert to Text"}
            </button>
          </div>

          <EditorContent
            editor={editor}
            className="h-[300px] bg-white rounded-md border overflow-auto"
          />
        </div>
        <div>
          <div
            className="prose prose-sm max-w-none h-72 bg-white rounded-md shadow-sm p-2 overflow-auto border [&_img]:w-[100px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(previewHtml),
            }}
          />
        </div>
      </div>
    </div>
  );
};

function getButtonClass(active: boolean) {
  return classNames(
    "text-sm px-3 py-1 rounded border transition",
    active
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
  );
}

export const InfoBoxFeature: FC<any> = ({
  companyMarkdown,
  candidateMarkdown,
  candidateTopPicks,
  businessMenuMarkdown,
  economyMenuMarkdown,
  companyButtonDescription,
  companyButtonText,
  companyButtonLink,
  companyButtonVisibility,
  onSubmit,
  isPending,
}) => {
  const t = useTranslations();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        candidateMarkdown:
          candidateMarkdown?.replace(/^\*\*+|\*\*+$/g, "") || "",
        candidateTopPicks:
          candidateTopPicks?.replace(/^\*\*+|\*\*+$/g, "") || "",
        companyMarkdown: companyMarkdown?.replace(/^\*\*+|\*\*+$/g, "") || "",
        businessMenuMarkdown:
          businessMenuMarkdown?.replace(/^\*\*+|\*\*+$/g, "") || "",
        economyMenuMarkdown:
          economyMenuMarkdown?.replace(/^\*\*+|\*\*+$/g, "") || "",
        companyButtonDescription:
          companyButtonDescription?.replace(/^\*\*+|\*\*+$/g, "") || "",
        companyButtonText,
        companyButtonLink,
        companyButtonVisibility,
      }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting, dirty }) => (
        <Form className="space-y-8">
          <div className="space-y-16">
            <EditorWithPreview
              field="candidateMarkdown"
              label={t("admin.candidate.info-box-title")}
              value={values.candidateMarkdown}
              setFieldValue={setFieldValue}
            />

            <EditorWithPreview
              field="candidateTopPicks"
              label={t("admin.candidate.info-box-candidate-top-picks-title")}
              value={values.candidateTopPicks}
              setFieldValue={setFieldValue}
            />

            <EditorWithPreview
              field="companyMarkdown"
              label={t("admin.company.info-box-title")}
              value={values.companyMarkdown}
              setFieldValue={setFieldValue}
            />

            <EditorWithPreview
              field="businessMenuMarkdown"
              label={t("admin.company.info-box-business-menu-label")}
              value={values.businessMenuMarkdown}
              setFieldValue={setFieldValue}
            />

            <EditorWithPreview
              field="economyMenuMarkdown"
              label={t("admin.company.info-box-economy-menu-label")}
              value={values.economyMenuMarkdown}
              setFieldValue={setFieldValue}
            />

            <EditorWithPreview
              field="companyButtonDescription"
              label={t(
                "admin.company.info-box-company-button-description-label"
              )}
              value={values.companyButtonDescription}
              setFieldValue={setFieldValue}
            />

            <InputField
              name="companyButtonText"
              label={t("admin.company.info-box-company-button-text-label")}
              placeholder={t(
                "admin.company.info-box-company-button-text-label"
              )}
            />

            <InputField
              name="companyButtonLink"
              label={t("admin.company.info-box-company-button-link-label")}
              placeholder={t(
                "admin.company.info-box-company-button-link-label"
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !dirty || isPending}
            >
              {t("common.button-save")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
