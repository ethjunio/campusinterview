import React, { FC, ReactNode } from "react";

import c from "classnames";
import Link from "next/link";
import ArrowLeft from "@/icons/ic-arrow-left.svg";
import ArrowRight from "@/icons/ic-arrow-right.svg";

// BackLink Component (for navigating with a link)
// export const BackLink: FC<{
//   className?: string;
//   href: string;
//   children?: ReactNode;
// }> = ({ children, href, className }) => (
//   <Link href={href} className={c("flex items-center", className)}>
//     <ArrowLeft className="fill-current mr-2 w-4 h-4 inline-block" />
//     {children}
//   </Link>
// );

type BackLinkProps = {
  className?: string;
  href?: string; // Make optional
  onClick?: () => void; // Add this
  children?: ReactNode;
};

export const BackLink: FC<BackLinkProps> = ({
  children,
  href,
  onClick,
  className,
}) => {
  const classes = c("flex items-center", className);

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        <ArrowLeft className="fill-current mr-2 w-4 h-4 inline-block" />
        {children}
      </button>
    );
  }

  return (
    <Link href={href || "/"} className={classes}>
      <ArrowLeft className="fill-current mr-2 w-4 h-4 inline-block" />
      {children}
    </Link>
  );
};

// BackButton Component (for triggering an action with a button)
export const BackButton: FC<{
  className?: string;
  onClick: () => void;
  children: ReactNode;
}> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={c("flex items-center", className)}>
    <ArrowLeft className="fill-current mr-2 w-4 h-4 inline-block" />
    {children}
  </button>
);
