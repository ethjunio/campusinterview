"use client";

import { FC, ReactNode } from "react";

import { BackLink } from "@/components/atoms/BackLink";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import EditProfileMenu from "./EditProfileMenu";


export const candidateEditLinks = [
    {
        label: "profile.personal-navlink",
        href: "/candidate/profile/personal",
    },
    {
        label: "profile.education-navlink",
        href: "/candidate/profile/educations",
    },
    {
        label: "profile.experience-navlink",
        href: "/candidate/profile/experiences",
    },
    {
        label: "profile.jobRequirements-navlink",
        href: "/candidate/profile/lookingfor",
    },
    {
        label: "profile.extracurricular-navlink",
        href: "/candidate/profile/extracurriculars",
    },
    {
        label: "profile.languages-navlink",
        href: "/candidate/profile/languages",
    },
    {
        label: "profile.itSkills-navlink",
        href: "/candidate/profile/it-skills",
    },
    {
        label: "profile.miscellaneous-navlink",
        href: "/candidate/profile/miscellaneous",
    },
    {
        label: "profile.changePassword-navlink",
        href: "/candidate/profile/change-password",
    },
    {
        label: "profile.settings-navLink",
        href: "/candidate/profile/settings",
    },
];

export type UserType = "candidate" | "employer";

export const DashboardEditLayout: FC<{
    type: UserType;
    editLinks: { label: string; href: string }[];
    children: ReactNode;
}> = ({ editLinks, type, children }) => {
    const t = useTranslations(type);

    return (
        <div className="relative flex flex-grow">
            {/* Sidebar Menu */}
            <div className="hidden lg:block">
                <EditProfileMenu type={type} editLinks={editLinks} />
            </div>

            {/* Main Content */}
            <div className="pl-8 lg:pl-14 pr-8 lg:pr-16 mt-4 lg:mt-12 mb-12 w-full">
                {/* Back Link for Mobile */}
                <div className="block lg:hidden mb-4">
                    <BackLink
                        href={`/${type}/profile/${type === "candidate" ? "personal" : "general"
                            }/menu`}
                    >
                        {t("profile.edit-back")}
                    </BackLink>
                </div>

                {/* Child Content */}
                <div className="flex flex-col items-center lg:items-start">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isProfileMenu = pathname?.startsWith('/candidate/profile/personal/menu');

  if (isProfileMenu) {
    return <>{children}</>;
  }

  return (
    <DashboardEditLayout type="candidate" editLinks={candidateEditLinks}>
      {children}
    </DashboardEditLayout>
  );
}