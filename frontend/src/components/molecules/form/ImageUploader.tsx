// import React, { FC, useCallback } from 'react';
// import { useField } from 'formik';

// import { ImageUploader as Uploader } from '@/components/molecules/ImageUploader';

// type Props = {
//   name: string;
//   label: string;
//   fileTypeInfo: string;
//   formatInfo: string;
//   maxSize?: number;
//   maxSizeInfo: string;
//   mimeTypes?: string[];
// };

// export const ImageUploader: FC<Props> = ({
//   name,
//   label,
//   maxSize = 10,
//   mimeTypes = ['image/jpeg', 'image/png'],
//   formatInfo,
//   fileTypeInfo,
//   maxSizeInfo,
// }) => {
//   const [field, meta, helpers] = useField(name);

//   console.log("field value", field.value)
//   const onChange = useCallback(
//     (val) => {
//       helpers.setValue(val);
//     },
//     [helpers],
//   );
//   return (
//     <Uploader
//       {...{
//         onChange,
//         mimeTypes,
//         maxSize,
//         maxSizeInfo,
//         formatInfo,
//         fileTypeInfo,
//         label,
//         name,
//       }}
//       error={meta.touched && meta.error}
//       value={field.value}
//     />
//   );
// };

// import React, { FC, useCallback, useEffect } from "react";
// import { useField } from "formik";
// import { ImageUploader as Uploader } from "@/components/molecules/ImageUploader";

// // Helper function to convert URL to File with preview
// const urlToFile = async (
//   url: string,
//   filename: string,
//   mimeType: string
// ): Promise<File & { preview: string }> => {
//   const response = await fetch(url);
//   const buffer = await response.arrayBuffer();
//   const file = new File([buffer], filename, { type: mimeType });

//   // Add preview property to the File object
//   return Object.assign(file, { preview: URL.createObjectURL(file) });
// };

// type Props = {
//   name: string;
//   label: string;
//   fileTypeInfo: string;
//   formatInfo: string;
//   maxSize?: number;
//   maxSizeInfo: string;
//   mimeTypes?: string[];
// };

// export const ImageUploader: FC<Props> = ({
//   name,
//   label,
//   maxSize = 10,
//   mimeTypes = ["image/jpeg", "image/png"],
//   formatInfo,
//   fileTypeInfo,
//   maxSizeInfo,
// }) => {
//   const [field, meta, helpers] = useField(name);
//   const [error, setError] = React.useState<string | null>(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       if (field.value && typeof field.value === "string") {
//         try {
//           const file = await urlToFile(field.value, "image.png", "image/png");
//           helpers.setValue(file);
//         } catch (error) {
//           setError("Error fetching image");
//         }
//       }
//     };

//     fetchImage();
//   }, [field.value, helpers]);

//   // const onChange = useCallback(
//   //   (val: any) => {
//   //     helpers.setValue(val);
//   //     console.log(val, helpers, "val?>>>>>>");
//   //   },
//   //   [helpers]
//   // );

//   const onChange = useCallback(
//     (val: any) => {
//       if (!val) {
//         setError("No file selected.");

//         return;
//       }

//       if (val instanceof File) {
//         // Check MIME type
//         if (!mimeTypes.includes(val.type)) {
//           setError("Invalid file type. Must be an image.");

//           return;
//         }

//         // Check file size
//         const fileSizeInMB = val.size / (1024 * 1024);
//         if (fileSizeInMB > maxSize) {
//           setError(`File size exceeds ${maxSize}MB limit.`);
//           return;
//         }

//         // If valid, clear error and set value
//         helpers.setValue(val);
//         setError(null);
//       } else {
//         setError("Uploaded file is not a valid image.");
//       }
//     },
//     [helpers, mimeTypes, maxSize]
//   );

//   return (
//     <Uploader
//       {...{
//         onChange,
//         mimeTypes,
//         maxSize,
//         maxSizeInfo,
//         formatInfo,
//         fileTypeInfo,
//         label,
//         name,
//       }}
//       error={error || meta.error}
//       value={field.value}
//     />
//   );
// };

import React, { FC, useCallback, useEffect, useState } from "react";
import { useField } from "formik";
import { ImageUploader as Uploader } from "@/components/molecules/ImageUploader";

const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string
): Promise<File & { preview: string }> => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const file = new File([buffer], filename, { type: mimeType });
  return Object.assign(file, { preview: URL.createObjectURL(file) });
};

type Props = {
  name: string;
  label: string;
  fileTypeInfo: string;
  formatInfo: string;
  maxSize?: number;
  maxSizeInfo: string;
  mimeTypes?: string[];
};

export const ImageUploader: FC<Props> = ({
  name,
  label,
  maxSize = 10,
  mimeTypes = ["image/jpeg", "image/png"],
  formatInfo,
  fileTypeInfo,
  maxSizeInfo,
}) => {
  const [field, meta, helpers] = useField(name);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     if (field.value && typeof field.value === "string") {
  //       try {
  //         const file = await urlToFile(field.value, "image.png", "image/png");
  //         helpers.setValue(file);
  //       } catch (error) {
  //         console.log("Error fetching image");
  //       }
  //     }
  //   };
  //   fetchImage();
  // }, [field.value, helpers]);

  const onChange = useCallback(
    (val: File | null) => {
      if (!val) {
        setError("No file selected.");
        return;
      }

      if (!(val instanceof File)) {
        setError(`File size exceeds ${maxSize}MB limit.`);
        return;
      }

      if (!mimeTypes.includes(val.type)) {
        setError("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }

      const fileSizeInMB = val.size / (1024 * 1024);
      if (fileSizeInMB > maxSize) {
        setError(`File size exceeds ${maxSize}MB limit.`);
        return;
      }

      helpers.setValue(val);
      setError(null);
    },
    [helpers, mimeTypes, maxSize]
  );

  return (
    <Uploader
      onChange={onChange}
      mimeTypes={mimeTypes}
      maxSize={maxSize}
      maxSizeInfo={maxSizeInfo}
      formatInfo={formatInfo}
      fileTypeInfo={fileTypeInfo}
      label={label}
      name={name}
      error={error || meta.error}
      value={field.value}
    />
  );
};
