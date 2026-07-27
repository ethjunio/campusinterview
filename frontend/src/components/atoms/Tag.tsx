import React, { FC } from "react";
import c from "classnames";

import styles from "./Tag.module.css";

type TagProps = {
  active: boolean;
  onClick: () => void;
  tw: string;
  selectable?: boolean;
  children: React.ReactNode;
};

export const Tag: FC<TagProps> = ({
  children,
  active,
  selectable = false,
  onClick,
  tw,
}) => {
  const cn = c(styles.tag, tw, {
    [styles.tag]: !selectable,
    [styles["tag-selectable"]]: selectable,
    [styles.active]: active,
  });
  return (
    <span className={cn} onClick={onClick} tw="cursor-pointer">
      {children}
    </span>
  );
};
