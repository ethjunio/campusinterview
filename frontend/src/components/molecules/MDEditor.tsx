import React, { FC, useState, useEffect } from "react";

import c from "classnames";
import ReactMde from "react-mde";
import { Remarkable } from "remarkable";
import { useField } from "formik";
import "react-mde/lib/styles/css/react-mde-all.css";
import DOMPurify from "dompurify";

const md = new Remarkable("full", { html: true });
export const MDEditor: FC<{ name: string; previewClassName: string }> = ({
  name,
  previewClassName,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [{ value }, , helper] = useField(name);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPreview(md.render(value));
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex flex-grow flex-col space-y-4 2lg:space-y-0 2lg:flex-row 2lg:space-x-4 ">
      <ReactMde
        childProps={{
          previewButton: { className: "hidden" },
          writeButton: { className: "hidden" },
          textArea: {
            style: {},
            onBlur: () => {
              helper.setTouched(true);
            },
          },
        }}
        classes={{
          reactMde: "flex-auto 2lg:w-1/2 max-w-screen-sm h-full",
          toolbar: "p-2",
          textArea: "text-lg h-100",
        }}
        value={value}
        onChange={(value) => {
          helper.setValue(value);
        }}
      />

      <div className={c("markdown min-h-[412px]", previewClassName)}>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
        />
      </div>
    </div>
  );
};
