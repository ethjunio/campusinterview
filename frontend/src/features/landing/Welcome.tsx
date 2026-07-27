import React, { FC, ReactNode } from "react";
import c from "classnames";
import { BackLink } from "@/components/atoms/BackLink";

const CTA: FC<{
  cta: string;
  className?: string;
  children?: ReactNode;
}> = ({ cta, children, className }) => {
  return (
    <div className={c("space-y-6 lg:space-y-3 mt-24 lg:self-start", className)}>
      <div className="leading-tight text-base lg:text-lg lg:leading-snug text-primary-dark">
        {cta}
      </div>
      <div className="flex justify-between lg:justify-start lg:space-x-6">
        {children}
      </div>
    </div>
  );
};

type CFC<T> = FC<T> & {
  CTA: typeof CTA;
};

export const Welcome: CFC<{
  title: string;
  subtitle: string;
  noBack?: boolean;
  registrationDeadline?: string;
  interviewDay?: string;
  className?: string;
  children?: ReactNode;
}> = ({
  noBack = false,
  title,
  subtitle,
  children,
  className = "lg:h-screen lg:h-auto pb-0 lg:pb-48",
  interviewDay,
  registrationDeadline,
}) => {
  function formatDate(timestamp: any): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <div className={c("flex flex-grow flex-col lg:pb-0 lg:block", className)}>
      {!noBack && (
        <BackLink className="mb-16" href="/">
          Back to Front Page
        </BackLink>
      )}
      <div className="flex flex-col max-h-full lg:max-h-132 justify-between flex-grow">
        <header className="space-y-12 flex-grow lg:space-y-20">
          <div className="space-y-2">
            <h1 className="text-primary-dark text-4xl leading-10 lg:leading-13 lg:text-huge">
              {title}
            </h1>
            <h2 className="text-primary-dark font-bold lg:font-extrabold text-lg leading-snug lg:text-3xl lg:leading-relaxed-2">
              {subtitle}
            </h2>
          </div>

          <div className="space-y-4 lg:space-y-6 font-bold leading-snug text-lg lg:text-3xl lg:leading-relaxed-2">
            <div className="text-primary-dark">
              <div className="leading-6 lg:leading-relaxed-2">
                Registration Deadline:
              </div>
              <div className="leading-6 lg:leading-relaxed-2 ">
                {registrationDeadline && formatDate(registrationDeadline)}
              </div>
            </div>

            <div className="text-primary-dark">
              <div className="leading-6 lg:leading-relaxed-2">
                Interview Day:
              </div>
              <div className="leading-6 lg:leading-relaxed-2">
                {interviewDay && formatDate(interviewDay)}
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

Welcome.CTA = CTA;
