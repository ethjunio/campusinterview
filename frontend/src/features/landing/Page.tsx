import React, { FC, Children, ReactNode, ReactElement } from "react";
import c from "classnames";
import { Welcome } from "./Welcome";
import { Footer } from "./Footer";
import ScrollIcon from "../../assets/icons/ic-scroll.svg";

interface TopInfoProps {
  className?: string;
  children?: ReactNode;
}

const TopInfo: FC<TopInfoProps> = ({ children, className }) => {
  return (
    <div
      className={c(
        "flex flex-col mt-20 lg:mt-0 lg:max-h-160 space-y-4 lg:space-y-0 justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ScrollIndicatorProps {
  className?: string;
}

const ScrollIndicator: FC<ScrollIndicatorProps> = ({ className }) => {
  return (
    <ScrollIcon
      className={c(
        "w-10 h-12 text-primary-dark fill-current scrollIndicator",
        className
      )}
    />
  );
};

type PageProps = {
  sectionClassName?: string;
  className?: string;
  children?: ReactNode;
};

type CFC<T> = FC<T> & {
  Welcome: typeof Welcome;
  TopInfo: typeof TopInfo;
  ScrollIndicator: typeof ScrollIndicator;
  Footer: typeof Footer;
};

export const Page: CFC<PageProps> = ({
  children,
  sectionClassName,
  className,
}) => {
  const childs: ReactElement[] = [];
  let welcome: ReactElement | undefined;
  let footer: ReactElement | undefined;
  let scrollIndicator: ReactElement | undefined;
  let topInfo: ReactElement | undefined;

  Children.map(children, (node) => {
    const child = node as ReactElement;
    if (child.type === Welcome) {
      welcome = child;
    } else if (child.type === TopInfo) {
      topInfo = child;
    } else if (child.type === Footer) {
      footer = child;
    } else if (child.type === ScrollIndicator) {
      scrollIndicator = child;
    } else {
      childs.push(child);
    }
  });

  return (
    <main className="relative h-full flex-grow pb-116 lg:pb-132 overflow-hidden">
      <section
        className={c(
          "px-8 lg:pl-40 lg:pr-24 flex flex-col flex-grow relative",
          {
            [sectionClassName!]: !!sectionClassName,
            "landing-section-top": !sectionClassName,
          }
        )}
      >
        <div
          className={c(
            "flex lg:flex-row flex-col flex-grow lg:justify-between",
            {
              [className!]: className,
              "pt-6 lg:pt-32": !className,
            }
          )}
        >
          {welcome}
          {topInfo}
        </div>

        {scrollIndicator}
      </section>
      {childs}

      {footer}
    </main>
  );
};

Page.Welcome = Welcome;
Page.TopInfo = TopInfo;
Page.Footer = Footer;
Page.ScrollIndicator = ScrollIndicator;
