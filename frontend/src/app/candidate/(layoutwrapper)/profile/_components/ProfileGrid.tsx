"use client";

import { Fragment, useEffect, useState } from "react";
import c from "classnames";
import Link from "next/link";
import { IconButton } from "@/components/atoms/Button";
import PlusIcon from "@/icons/ic-plus.svg";
import styles from "./Card.module.scss";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, useParams } from "next/navigation";

export interface ProfileGridProps {
  left?: GridItem[];
  right?: GridItem[];
  gridStyleLeft?: React.CSSProperties;
  gridStyleRight?: React.CSSProperties;
  name?: string;
}

interface GridItem {
  title?: string;
  text?: string;
  outerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  under?: boolean;
  name?: string;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({
  left = [],
  right = [],
  gridStyleLeft,
  gridStyleRight,
  name,
}) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  const params = useParams();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size to set mobile state
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canEdit = !params.candidateId && !params.companyId;

  // Render description with edit option if applicable
  const renderDescription = (text: string, itemName: string) => {
    return canEdit && !text && name && itemName ? (
      <Link href={`profile/${name}?focus=${itemName}`} scroll={false}>
        <IconButton
          tw="inline-block text-right -m-4 items-center"
          variant="link"
          icon={<PlusIcon className="w-4 h-4 fill-current" />}
        >
          {t("common.button-add")}
        </IconButton>
      </Link>
    ) : (
      <div>{text ? text : null}</div>
    );
  };

  // Render row item for mobile view
  const renderMobileRowItem = (item: GridItem, index: number) => {
    const {
      text,
      outerStyle,
      under,
      title,
      titleStyle,
      textStyle,
      name: itemName,
    } = item;
    const shouldBeUnder =
      (text && text.length + (title?.length || 0) > 35) || under;

    return (
      <div
        key={`mobile-${title}-${index}`}
        style={outerStyle}
        className={c("flex mt-5", shouldBeUnder ? "flex-col" : "flex-row")}
      >
        <div
          style={titleStyle}
          className={c(
            "align-baseline pr-4",
            shouldBeUnder ? "min-w-1/2" : "min-w-1/2 max-w-1/2",
          )}
        >
          {title}
        </div>
        <div style={textStyle} className={c(shouldBeUnder ? "mt-2" : "")}>
          {renderDescription(text || "", itemName || "")}
        </div>
      </div>
    );
  };

  // Render row item for desktop view
  const renderDesktopRowItem = (item: GridItem, index: number) => {
    const { text, title, titleStyle, textStyle, name: itemName } = item;

    return (
      <Fragment key={`desktop-${title}-${index}`}>
        <div style={titleStyle} className="mb-4 text-base">
          {title || ""}
        </div>
        <div style={textStyle} className="mb-4 text-base">
          {renderDescription(text || "", itemName || "")}
        </div>
      </Fragment>
    );
  };

  return isMobile ? (
    <div className="w-full" style={gridStyleLeft}>
      {left.map(renderMobileRowItem)}
      {right.map(renderMobileRowItem)}
    </div>
  ) : (
    <div className="w-full flex flex-col lg:flex-row items-start">
      <div style={gridStyleLeft} className={c(styles.grid4On1First)}>
        {left.map(renderDesktopRowItem)}
      </div>
      <div style={gridStyleRight} className={c(styles.grid4On1Second)}>
        {right.map(renderDesktopRowItem)}
      </div>
    </div>
  );
};

export default ProfileGrid;
