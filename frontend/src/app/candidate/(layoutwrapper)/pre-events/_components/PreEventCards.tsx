"use client";
import React, { FC } from "react";
import c from "classnames";
import { PreEventCard } from "./PreEventCard";
import styles from "./PreEventDetail.module.scss";

export const PreEventCards: FC<{
  showCount?: -1 | 1 | 2 | 4;
  bg?: "white" | "light";
  events: any;
}> = ({ showCount = -1, bg = "white", events }) => {
  const preEventsCn = c({
    "bg-white": bg === "white",
    "bg-light-soft": bg === "light",
  });

  return (
    <div className={styles.preEventsContainer}>
      {events?.map((event: any, index: any) => (
        <PreEventCard
          className={preEventsCn}
          key={event.id}
          {...event}
          //   participantState={participantStates[index]}
          participantState={null}
        />
      ))}
    </div>
  );
};
