// import React, { FC, useCallback, useState, useEffect } from "react";
// import IconUpload from "@/icons/ic-upload.svg";
// import c from "classnames";
// import { useDropzone } from "react-dropzone";
// import { IconButton } from "@/components/atoms/Button";
// import styles from "./ImageUploader.module.css";
// import { useTranslations } from "next-intl";

// type Props = {
//   name: string;
//   label: string;
//   error?: string;
//   fileTypeInfo: string;
//   formatInfo: string;
//   maxSizeInfo: string;
//   mimeTypes: string[];
//   maxSize: number;
//   onChange: Function;
//   value?: { preview: string };
// };

// const preview = c(styles.square, styles.preview);
// const dropArea = c(styles.square, styles["drop-area"]);

// export const ImageUploader: FC<Props> = ({
//   label,
//   name,
//   error,
//   formatInfo,
//   fileTypeInfo,
//   maxSizeInfo,
//   mimeTypes,
//   onChange,
//   value = { preview: "" },
// }) => {
//   const t = useTranslations();
//   const [img, setImg] = useState(value?.preview);
//   const [uploadError, setUploadError] = useState(false);
//   const [rejected, setRejected] = useState(false);
//   useEffect(() => {
//     value && setImg(value?.preview);
//   }, [value]);

//   const onDrop = useCallback((files) => {
//     if (files.length !== 1) return;
//     const file = files[0];
//     if (mimeTypes.includes(file.type)) {
//       const fileUrl = URL.createObjectURL(file);
//       file.preview = fileUrl;
//       onChange(file);
//     }
//   }, []);
//   const { inputRef, getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     onDropRejected: () => {
//       console.log("droprejected")
//       setRejected(true);
//       setUploadError(true);
//       onChange({ preview: "" });
//       setTimeout(() => setRejected(false), 300);
//     },
//     accept: mimeTypes,
//     maxSize: 10000000,
//   });

//   return (
//     <div className="mb-6 lg:mb-0">
//       <div className="flex items-center">
//         <div {...getRootProps({ className: "relative" })}>
//           <div
//             className={preview}
//             style={{
//               backgroundImage: `url(${img})`,
//             }}
//           ></div>
//           <input {...getInputProps()} name={name} accept="image/*" />
//           <div className={c(dropArea, { [styles.rejected]: rejected })}>
//             {img ? null : "Drag & Drop"}
//           </div>
//         </div>
//         <div className="ml-2 sm:ml-8">
//           <IconButton
//             icon={<IconUpload className="w-4 h-4 fill-current" />}
//             onClick={() => inputRef.current?.click()}
//             variant="link"
//             tw="p-4 whitespace-pre-wrap"
//           >
//             {label}
//           </IconButton>
//           {error && (
//             <span
//               data-testid={`${name}-error`}
//               className="general-text-sm text-danger ml-4"
//             >
//               {error}
//             </span>
//           )}

//           <div className="ml-4 text-sm text-dark-soft">
//             <div>{fileTypeInfo}</div>
//             <div>{maxSizeInfo}</div>
//             <div>{formatInfo}</div>
//           </div>
//         </div>
//       </div>
//       {uploadError ? (
//         <span className="general-text-sm text-danger ml-1 mt-1">
//           {t("common:upload-picture-error")}
//         </span>
//       ) : null}
//     </div>
//   );
// };

import React, { FC, useCallback, useState, useEffect } from "react";
import IconUpload from "@/icons/ic-upload.svg";
import c from "classnames";
import { useDropzone } from "react-dropzone";
import { IconButton } from "@/components/atoms/Button";
import styles from "./ImageUploader.module.css";
import { useTranslations } from "next-intl";

type Props = {
  name: string;
  label: string;
  error?: string;
  fileTypeInfo: string;
  formatInfo: string;
  maxSizeInfo: string;
  mimeTypes: string[];
  maxSize: number;
  onChange: (file: File | { preview: string }) => void;
  value?: { preview: string };
};

const preview = c(styles.square, styles.preview);
const dropArea = c(styles.square, styles["drop-area"]);

export const ImageUploader: FC<Props> = ({
  label,
  name,
  error,
  formatInfo,
  fileTypeInfo,
  maxSizeInfo,
  mimeTypes,
  maxSize,
  onChange,
  value = { preview: "" },
}) => {
  const t = useTranslations();
  const [img, setImg] = useState(value?.preview ? value?.preview : value);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    value && setImg(value?.preview ? value?.preview : value);
  }, [value]);

  const onDrop = useCallback(
    (files: File[]) => {
      if (files.length !== 1) return;
      const file = files[0];

      if (!mimeTypes.includes(file.type)) {
        setUploadError("Invalid file format. Allowed: JPEG, PNG.");
        return;
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        setUploadError(`File size exceeds ${maxSize}MB limit.`);
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      file.preview = fileUrl;
      onChange(file);
      setUploadError(null);
    },
    [mimeTypes, maxSize, onChange]
  );

  const onDropRejected = useCallback(
    (fileRejections) => {
      console.log("Rejected files:", fileRejections);
      setRejected(true);
      setUploadError("Unsupported file type or size exceeds limit.");
      onChange({ preview: "" });

      setTimeout(() => setRejected(false), 300);
    },
    [onChange]
  );

  const { inputRef, getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: mimeTypes.join(","),
    maxSize: maxSize * 1024 * 1024,
  });

  return (
    <div className="mb-6 lg:mb-0">
      <div className="flex items-center">
        <div {...getRootProps({ className: "relative" })}>
          <div
            className={preview}
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
          <input
            {...getInputProps()}
            name={name}
            accept={mimeTypes.join(",")}
          />
          <div className={c(dropArea, { [styles.rejected]: rejected })}>
            {img ? null : "Drag & Drop"}
          </div>
        </div>
        <div className="ml-2 sm:ml-8">
          <IconButton
            icon={<IconUpload className="w-4 h-4 fill-current" />}
            onClick={() => inputRef.current?.click()}
            variant="link"
            tw="p-4 whitespace-pre-wrap"
          >
            {label}
          </IconButton>
          {error || uploadError ? (
            <span className="general-text-sm text-danger ml-4">
              {error || uploadError}
            </span>
          ) : null}

          <div className="ml-4 text-sm text-dark-soft">
            <div>{fileTypeInfo}</div>
            <div>{maxSizeInfo}</div>
            <div>{formatInfo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
