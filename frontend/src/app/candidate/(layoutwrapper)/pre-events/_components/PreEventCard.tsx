"use client";
import React, { FC } from "react";
import c from "classnames";
// import Link from "next/link";
import { ArrowButton } from "@/components/atoms/Button";
import TickIcon from "@/icons/ic-accept.svg";
import QuestionMarkIcon from "@/icons/ic-waitinglist.svg";
import styles from "./PreEventDetail.module.scss";
import { useRouter } from "next/navigation";

export const PreEventCard: FC<{
  id: number;
  imageUrl: string;
  title: string;
  company: { name: string };
  className?: string;
  participantState?: string;
}> = ({
  id,
  title,
  company,
  imageUrl,
  participantState,
  className = "bg-light",
}) => {
  const router = useRouter();

  const truncatedTitle =
    title.length > 35 ? title.substring(0, 35) + " ..." : title;

  return (
    // <Link href={`/candidate/pre-events/${id}`}>
    <div
      className={c(styles.preEventItem, "cursor-pointer rounded shadow-sm")}
      onClick={() => router.push(`/candidate/pre-events/${id}`)}
    >
      <div
        className={c(
          styles.imageCoverMini,
          "h-100 xl:h-132 flex justify-center items-center",
        )}
      >
        <img
          className={c(
            styles.preEventImageMini,
            "w-full object-cover object-[15%_15%] md:object-[25%_25%]",
          )}
          src={imageUrl ? `${imageUrl}` : "/img/FallBack.jpg"}
          alt="event-pic"
        ></img>
      </div>
      <div
        className={c(
          "relative h-32 p-3 px-4 rounded-b flex flex-col",
          className,
        )}
      >
        <div>
          <div className="flex justify-between">
            <div className="general-text text-xs pb-2">{company.name}</div>
            {participantState !== null ? (
              participantState === "applied" ? (
                <QuestionMarkIcon className="p-1 w-8 h-8 fill-current text-info" />
              ) : (
                <TickIcon className="p-1 w-8 h-8 fill-current text-info" />
              )
            ) : (
              <></>
            )}
          </div>
          <h4>{truncatedTitle}</h4>
        </div>
        <div className="flex w-full justify-end items-end h-full">
          <ArrowButton
            variant="link"
            style={{ right: "5px" }}
            tw="absolute hover:bg-light stroke-current stroke-3 bottom-0 right-0 w-auto mr-0"
          />
        </div>
      </div>
    </div>
    // </Link>
  );
};
