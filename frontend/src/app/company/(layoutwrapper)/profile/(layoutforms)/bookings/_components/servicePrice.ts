const PRICE_ON_REQUEST_SERVICE_NAME = "Pre-Event: On-Campus";
const PRICE_ON_REQUEST_SERVICE_ID = 2;

export type ServicePriceInfo = {
  id?: string | number;
  name?: string;
  isPriceOnRequest?: boolean;
  price?: string | number | null;
  priceLabel?: string;
};

export type ServicePriceDisplay =
  | { kind: "on-request" }
  | { kind: "fixed"; price: string | number | undefined };

const isPreEventOnCampusService = (
  service: ServicePriceInfo | null | undefined
): boolean =>
  service?.name === PRICE_ON_REQUEST_SERVICE_NAME ||
  Number(service?.id) === PRICE_ON_REQUEST_SERVICE_ID;

export const isPriceOnRequestService = (
  service: ServicePriceInfo | null | undefined
): boolean =>
  Boolean(
    service?.isPriceOnRequest ||
      service?.price == null ||
      isPreEventOnCampusService(service)
  );

export const getServicePriceDisplay = (
  service: ServicePriceInfo | null | undefined
): ServicePriceDisplay => {
  if (isPriceOnRequestService(service)) {
    return { kind: "on-request" };
  }

  return { kind: "fixed", price: service?.price ?? undefined };
};

export const getServicePriceAmount = (
  service: ServicePriceInfo | null | undefined
): number => {
  if (isPriceOnRequestService(service)) {
    return 0;
  }

  return Number(service?.price ?? 0);
};
