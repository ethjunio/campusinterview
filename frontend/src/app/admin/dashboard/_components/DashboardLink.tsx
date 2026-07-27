import React, { FC } from "react";

import Link from "next/link";

const DashboardLink: FC<{
  title: string;
  hint?: string;
  href: string;
  children?: React.ReactNode;
}> = ({ title, href, children, hint }) => (
  <div className="w-64">
    <Link href={href}>
      <button
        type="button"
        className="w-full h-24 flex flex-grow items-center justify-between p-4 bg-white rounded-md shadow hover:shadow-md"
      >
        <div className="text-left text-dark">
          {title}
          <div className="general-text-sm text-dark-soft">{hint}</div>
        </div>
        {children}
      </button>
    </Link>
  </div>
);

export default DashboardLink;
