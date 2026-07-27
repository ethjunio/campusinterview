import type { AbstractIntlMessages } from "use-intl/core";

export const CAMPUS_INTERVIEW = "Campus Interview";
export const ONLINE_CAMPUS_INTERVIEW = "Online Campus Interview";

export function isOnlineCampusInterview(siteUiFlag: unknown): boolean {
  return Number(siteUiFlag) === 1;
}

export function getInterviewBrandName(siteUiFlag: unknown): string {
  return isOnlineCampusInterview(siteUiFlag)
    ? ONLINE_CAMPUS_INTERVIEW
    : CAMPUS_INTERVIEW;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function applyInterviewBrandToText(
  text: string | undefined | null,
  siteUiFlag: unknown
): string {
  if (!text) return "";

  if (isOnlineCampusInterview(siteUiFlag)) {
    return text.replace(
      new RegExp(`(?<!Online )${escapeRegExp(CAMPUS_INTERVIEW)}`, "g"),
      ONLINE_CAMPUS_INTERVIEW
    );
  }

  return text.replace(
    new RegExp(escapeRegExp(ONLINE_CAMPUS_INTERVIEW), "g"),
    CAMPUS_INTERVIEW
  );
}

function transformMessageValue(
  value: AbstractIntlMessages | string,
  siteUiFlag: unknown
): AbstractIntlMessages | string {
  if (typeof value === "string") {
    return applyInterviewBrandToText(value, siteUiFlag);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      transformMessageValue(nestedValue, siteUiFlag),
    ])
  );
}

export function applyInterviewBrandToMessages(
  messages: AbstractIntlMessages,
  siteUiFlag: unknown
): AbstractIntlMessages {
  return transformMessageValue(messages, siteUiFlag) as AbstractIntlMessages;
}
