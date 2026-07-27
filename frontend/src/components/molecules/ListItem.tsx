"use client";
import React, {
  FC,
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import ContentLoader from "react-content-loader";
import c from "classnames";
import { BackLink } from "@/components/atoms/BackLink";
import { getStateBadge } from "@/utils/interview";
import { usePathname } from "next/navigation";

import styles from "./ListItem.module.css";
import useAuthStore from "@/app/store/authStore";

const Image: FC<{
  Placeholder: FC<{ className: string }>;
  src: string;
  alt: string;
  interviewStatus?: string;
  responsive?: boolean;
}> = ({ src, alt, Placeholder, interviewStatus, responsive }) => {
  const stateBadge = getStateBadge(interviewStatus!);

  return src ? (
    <div className="relative">
      <img
        {...{ alt, src }}
        className={c(
          "flex-shrink-0 rounded-full",
          responsive ? "w-12 h-12 lg:w-16 lg:h-16" : "w-16 h-16",
        )}
      />
      <div
        style={{
          bottom: "15px",
          right: "25px",
          fontSize: "10px",
          width: "10px",
          height: "10px",
        }}
        className="absolute"
      >
        {interviewStatus && stateBadge}
      </div>
    </div>
  ) : (
    <div className="relative">
      <Placeholder className="w-16 h-16" />
      <div
        style={{
          bottom: "15px",
          right: "25px",
          fontSize: "10px",
          width: "10px",
          height: "10px",
        }}
        className="absolute"
      >
        {interviewStatus && stateBadge}
      </div>
    </div>
  );
};

const Title: FC<{ responsive?: boolean; children: React.ReactNode }> = ({
  children,
  responsive,
}) => (
  <h3
    className={c(
      "flex-shrink-1 max-w-md ",
      responsive ? "mx-0 lg:mx-4" : "mx-4",
    )}
  >
    {children}
  </h3>
);

const Body: FC<{ children: React.ReactNode }> = ({ children }) => {
  const childs = Children.toArray(children);
  return (
    <div className="w-full flex-grow">
      {childs[0]}
      {childs.length === 2 && childs[1]}
    </div>
  );
};

const Actions: FC<{ disabled?: boolean; children: React.ReactNode }> = ({
  children,
  disabled,
}) => {
  return (
    // <>
    //   {Children.map(children, (child: ReactNode) =>
    //     cloneElement(child as ReactElement, { disabled })
    //   )}
    // </>
    <>
      {Children.map(children, (child: ReactNode) => {
        if (!isValidElement(child)) {
          return child; // skip null, string, fragment, etc.
        }
        if (child.type === React.Fragment) {
          return child; // don't clone Fragments
        }
        return cloneElement(child as ReactElement, { disabled });
      })}
    </>
  );
};

type CFC = FC<{
  loading?: boolean;
  style?: object;
  textUnder?: boolean;
  responsive?: boolean;
  containerStyle?: object;
  id?: string;
  type?: string;
  children?: React.ReactNode;
  from?: string;
}> & {
  Image: typeof Image;
  Title: typeof Title;
  Body: typeof Body;
  Actions: typeof Actions;
};

export const ListItem: CFC = ({
  children,
  loading,
  style,
  textUnder,
  responsive,
  containerStyle,
  id,
  type,
  from,
}) => {
  const pathname = usePathname();
  let title, image, body, actions;
  const [disableLink, setDisableLink] = useState(false);
  const router = useRouter();
  const user = useAuthStore();
  Children.forEach(children, (node) => {
    const child = node as ReactElement;

    if (child.type === Image) {
      image = child;
    } else if (child.type === Title) {
      title = child;
    } else if (child.type === Body) {
      body = child;
    } else if (child.type === Actions) {
      actions = child;
    }
  });

  const textClass = textUnder ? "w-full" : "flex items-center w-full";
  let link: string | null;
  let origin: string | Boolean = false;
  if (user?.user?.type === "admin") {
    link = null;
    if (pathname.includes("candidates")) {
      link = `/admin/dashboard/candidates/${id}`;
    } else if (pathname.includes("companies")) {
      link = `/admin/dashboard/companies/${id}`;
    }
  } else if (type === "candidate") {
    if (from === "talent-pool") {
      origin = "?origin=t-pool";
      link = `/company/talent-pool/${id}/${origin}`;
    } else {
      link = `/company/talent-pool/${id}`;
    }
  } else if (user?.user?.type === "company") {
    link = null;
    if (pathname.includes("pre-event")) {
      link = `/company/pre-event/${id}`;
    }
  } else if (type === "company") link = `/candidate/companies/${id}`;

  function handleLink(event: any, link: any) {
    if (link) {
      router.push(link!);
      return;
    }

    if (
      (disableLink && event.target.tagName.toLowerCase() !== "input") ||
      !type ||
      !id
    ) {
      event.preventDefault();
    }
  }

  const lisItemPadding = responsive
    ? "py-0 px-3 lg:py-3 lg:px-5"
    : "py-3 px-3 lg:py-3 lg:px-5";

  return (
    <div
      className="flex items-center w-full text-black cursor-pointer"
      key={id}
      // href={link!}
      onClick={(e) => handleLink(e, link)}
    >
      <li
        style={style}
        className={c(
          "flex items-center shadow rounded-lg bg-white py-1 px-1 sm:py-3 sm:px-5 w-full z-10",
          lisItemPadding,
        )}
      >
        {loading ? (
          <>
            <ContentLoader className="w-100 h-16" height="100%">
              <circle r={32} cx={32} cy={32} speed={2} />
              <rect className="w-32 h-5" x={72} y={24} />
              <rect className="w-32 h-4" x={256} y={16} />
              <rect className="w-32 h-4" x={256} y={36} />
            </ContentLoader>
            <div className="flex flex-grow flex-col items-end">
              {actions && cloneElement(actions, { disabled: true })}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center flex-1">
              <div
                style={containerStyle}
                className={c(
                  responsive ? styles.responsiveListItem : styles.listItem,
                  textClass,
                )}
              >
                {responsive ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="block lg:hidden"
                  >
                    <BackLink
                      className="stroke-current stroke-3"
                      href={
                        type === "candidate"
                          ? "/company/chatroom/menu"
                          : "/candidate/chatroom/menu"
                      }
                    ></BackLink>
                  </div>
                ) : null}
                {image}
                {title}
                {body}
                <div className="flex flex-col items-end flex-grow">
                  <div
                    onMouseEnter={() => setDisableLink(true)}
                    onMouseLeave={() => setDisableLink(false)}
                  >
                    {actions}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

ListItem.Image = Image;
ListItem.Title = Title;
ListItem.Body = Body;
ListItem.Actions = Actions;
