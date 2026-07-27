import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "use-intl/core";

import { applyInterviewBrandToMessages } from "@/utils/interviewBrand";
import { getSiteUiFlagFromFetch } from "@/utils/landingPageData";

async function getSiteUiFlag(): Promise<number> {
  try {
    const apiBaseUrl =
      process.env.API_BASE_URL ??
      "http://dev82.developer24x7.com:4016/api/v1.0";

    const response = await fetch(
      `${apiBaseUrl}/visitor/getlandingPageData`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return 1;
    }

    const json = await response.json();
    return getSiteUiFlagFromFetch({ data: json }) ?? 1;
  } catch {
    return 1;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "en";
  const messages = (await import(`../../messages/${locale}.json`))
    .default as AbstractIntlMessages;
  const siteUiFlag = await getSiteUiFlag();

  return {
    locale,
    messages: applyInterviewBrandToMessages(messages, siteUiFlag),
  };
});
