"use client";
import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const buildUrl = (url: string) => `${url}?v=${Date.now()}`;

const files = [
  {
    name: "Terms and conditions",
    size: "133 KB",
    to: buildUrl("https://cdn.campusinterview.ch/production/test/legal-docs/terms-and-conditions.pdf"),
  },
  {
    name: "Privacy policy",
    size: "44 KB",
    to: buildUrl("https://cdn.campusinterview.ch/production/test/legal-docs/privacy-policy.pdf"),
  },
  {
    name: "Code of conduct",
    size: "20 KB",
    to: buildUrl("https://cdn.campusinterview.ch/production/test/legal-docs/code-of-conduct.pdf"),
  },
];

const DownloadsSection = () => {
  const t = useTranslations("companies");
  return (
    <div className="rounded-xl bg-white p-5 px-[24px] py-[24px]">
      <div className="flex items-center gap-2 mb-4">
        <Download
          size={18}
          className="text-primaryPurple relative top-[-11px]"
        />
        <h3 className="mb-4 text-xl font-bold text-foreground !text-[18px] leading-[28px] text-[#101828] font-thin mb-[24px]">
          Downloads
        </h3>
      </div>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 rounded-lg bg-gray-100 p-3"
          >
            <div className="flex flex-row justify-center items-center w-[40px] h-[40px] bg-white rounded-[14px] flex-none">
              <FileText
                size={16}
                className="shrink-0 text-muted-foreground text-[#364153]"
              />
            </div>
            <span className="flex-1 text-base text-gray-500 !text-[14px] leading-[20px] !text-[#364153]">
              {file.name}
            </span>
            <span className="text-sm text-gray-500 !text-[14px] leading-[20px] !text-[#99A1AF] font-regular">
              {file.size}
            </span>
            <a href={file?.to} target="_blank" rel="noopener noreferrer">
              <button className="text-gray-500 hover:text-primary">
                <Download size={16} className="text-gray-500 mt-[5px]" />
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsSection;
