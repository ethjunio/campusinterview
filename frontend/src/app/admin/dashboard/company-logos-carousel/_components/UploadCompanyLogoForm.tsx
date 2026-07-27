import React, { useCallback, useRef, useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

interface UploadLogoFormProps {
  onSubmit: (file: File) => void;
  className?: string;
  isSubmitting: boolean;
  ref?: React.ForwardedRef<{ reset: () => void }>;
}

const FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("A file is required")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true;
      return (value as File).size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported format", (value) => {
      if (!value) return true;
      return SUPPORTED_FORMATS.includes((value as File).type);
    }),
});

const UploadLogoForm = React.forwardRef(
  (
    { onSubmit, className = "", isSubmitting }: UploadLogoFormProps,
    ref: React.ForwardedRef<{ reset: () => void }>
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Add reset function
    const formikRef = useRef<any>(null);

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        setSelectedFileName("");
        setPreviewUrl("");
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
      },
    }));

    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }, []);

    const handleDrop = useCallback(
      (
        e: React.DragEvent,
        setFieldValue: (field: string, value: any) => void
      ) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
          handleFileSelect(file, setFieldValue);
        }
      },
      []
    );

    const handleFileSelect = (
      file: File,
      setFieldValue: (field: string, value: any) => void
    ) => {
      setFieldValue("file", file);
      setSelectedFileName(file.name);

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <Formik
        innerRef={formikRef}
        initialValues={{ file: null }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (values.file) {
            onSubmit(values.file);
          }
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className={`${className}`}>
            <div className="flex gap-6 items-center">
              {/* Left side - Drag & Drop box */}
              <div
                className={`w-40 h-40 border-2 ${
                  dragActive ? "border-blue-500" : "border-black"
                } rounded-lg flex items-center justify-center relative cursor-pointer`}
                onClick={handleButtonClick}
                onDragEnter={(e) => handleDrag(e)}
                onDragLeave={(e) => handleDrag(e)}
                onDragOver={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e, setFieldValue)}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <p className="text-gray-500">Drag & Drop</p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  key={selectedFileName} // Reset file input
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileSelect(file, setFieldValue);
                    }
                  }}
                />
              </div>

              {/* Right side - Information */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg">Company logo</h3>
                <div className="text-gray-500 text-sm space-y-1">
                  <p>JPEG or PNG</p>
                  <p>10 MB</p>
                  <p>Square format preferred</p>
                  {selectedFileName && (
                    <p className="text-blue-500">
                      Selected: {selectedFileName}
                    </p>
                  )}
                </div>
                {errors.file && touched.file && (
                  <p className="general-text-sm text-danger ml-1 mt-1">{errors.file}</p>
                )}
              </div>
            </div>

            {/* Upload button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 px-4 py-2 bg-[#1968FF] text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Uploading..." : "Upload logo"}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
);

// Add display name
UploadLogoForm.displayName = "UploadLogoForm";

export default UploadLogoForm;
