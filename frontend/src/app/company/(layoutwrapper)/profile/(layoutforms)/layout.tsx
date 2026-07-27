"use client"
import { FC, ReactNode } from "react";
import { useTranslations } from "next-intl";
import EditProfileMenu from "../_components/EditProfileMenu";
import { BackLink } from "@/components/atoms/BackLink";
import { usePathname } from "next/navigation";
import IconInformation from '@/icons/ic-info_blue.svg';

export const companyEditLinks = [
  {
    label: "profile.generalData-navlink",
    href: "/company/profile/general",
  },
  {
    label: "profile.contactData-navlink",
    href: "/company/profile/contacts",
  },
  {
    label: "profile.participants-navlink",
    href: "/company/profile/participants",
  },
  {
    label: "profile.facts-navlink",
    href: "/company/profile/facts",
  },
  {
    label: "profile.joinus-navlink",
    href: "/company/profile/joinus",
  },
  {
    label: "profile.openPositions-navlink",
    href: "/company/profile/open-positions",
  },
  {
    label: "profile.bookings-navlink",
    href: "/company/profile/bookings",
  },
  {
    label: "profile.changePassword-navlink",
    href: "/company/profile/change-password",
  },
  {
    label: "profile.settings-navLink",
    href: "/company/profile/settings",
  },
];

export type UserType = "candidate" | "companies";

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
            href={`/${type === "candidate" ? "candidate" : "company"
              }/profile/${type === "candidate" ? "personal" : "general"
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


export const DashboardBookingInfoLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations('companies');
  return (
    <div className="bg-light-soft flex flex-grow flex-col h-screen">
      <section className="flex flex-grow">{children}</section>

      <section className="lg:fixed right-0 top-0 bottom-0 mt-14 lg:w-1/3 px-8 py-10 bg-gray-100 lg:px-12">
        <div className="flex items-center mb-5">
          <IconInformation className="w-8 h-8 mr-2 text-primary-light fill-current" />
          <h2>{t('bookings.info-heading')}</h2>
        </div>
        <p className="lead-text">{t('bookings.info-lead')}</p>
      </section>
    </div>
  );
};

const layout = ({ children }: { children: React.ReactNode }) => {

  const pathname = usePathname();

  const isProfileMenu = pathname?.startsWith('/company/profile/general/menu')
  if (isProfileMenu) {
    return <>{children}</>;
  }

  const isBooking = pathname?.startsWith('/company/profile/bookings/rooms') || pathname?.startsWith('/company/profile/bookings/additional-services') || pathname?.startsWith('/company/profile/bookings/fill-slots')
  if (isBooking) {
    return <>{children}</>;
  }

  const isSummary = pathname?.startsWith('/company/profile/bookings/summary') || pathname?.startsWith('/company/profile/bookings/completed');
  if (isSummary) {
    return (
      <DashboardBookingInfoLayout>
        {children}
      </DashboardBookingInfoLayout>
    );

  }


  return (
    <>
      <DashboardEditLayout type="companies" editLinks={companyEditLinks}>
        {children}
      </DashboardEditLayout>
    </>
  );
};

export default layout;
