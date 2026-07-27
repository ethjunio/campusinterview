export type LandingPageData = {
  siteUiFlag?: number | string;
  mainPageStudentsBox?: string;
  mainPageCompaniesBox?: string;
  eventName?: string;
  companyRegistrationCloseDate?: string;
  eventDate?: string;
};

type FetchResult = {
  data?: {
    data?: LandingPageData;
  };
};

function coerceSiteUiFlag(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Reads `siteUiFlag` from `/visitor/getlandingPageData` JSON regardless of common
 * wrapper shapes ({ siteUiFlag }, { data: { siteUiFlag } }, nested `data.data`).
 */
export function extractSiteUiFlagFromVisitorPayload(
  payload: unknown
): number | undefined {
  if (payload == null || typeof payload !== "object") return undefined;
  const o = payload as Record<string, unknown>;

  const direct = coerceSiteUiFlag(o.siteUiFlag);
  if (direct !== undefined) return direct;

  const d1 = o.data;
  if (d1 && typeof d1 === "object") {
    const o1 = d1 as Record<string, unknown>;
    const mid = coerceSiteUiFlag(o1.siteUiFlag);
    if (mid !== undefined) return mid;
    const d2 = o1.data;
    if (d2 && typeof d2 === "object") {
      const deep = coerceSiteUiFlag((d2 as Record<string, unknown>).siteUiFlag);
      if (deep !== undefined) return deep;
    }
  }

  return undefined;
}

export function getLandingPageData(
  fetchResult?: FetchResult | null
): LandingPageData | undefined {
  return fetchResult?.data?.data;
}

export function getSiteUiFlagFromFetch(
  fetchResult?: FetchResult | null
): number | undefined {
  const fromPayload = extractSiteUiFlagFromVisitorPayload(
    (fetchResult as { data?: unknown } | null | undefined)?.data
  );
  if (fromPayload !== undefined) return fromPayload;
  return coerceSiteUiFlag(getLandingPageData(fetchResult)?.siteUiFlag);
}

/**
 * When `/visitor/getlandingPageData` is unreachable, `src/i18n/request.ts`
 * defaults `siteUiFlag` to online mode (1). Use the same shape here so the
 * root layout, hero, and translated copy stay consistent.
 */
export const LANDING_PAGE_FETCH_FALLBACK = {
  data: { data: { siteUiFlag: 1 } },
} as const;
