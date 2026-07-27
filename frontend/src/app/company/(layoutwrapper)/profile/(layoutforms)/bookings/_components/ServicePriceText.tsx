"use client";

import { useTranslations } from "next-intl";
import { getServicePriceDisplay, ServicePriceInfo } from "./servicePrice";

type Props = {
  service: ServicePriceInfo | null | undefined;
};

export const ServicePriceText = ({ service }: Props) => {
  const t = useTranslations();
  const priceDisplay = getServicePriceDisplay(service);

  if (priceDisplay.kind === "on-request") {
    return t("common.price-on-request");
  }

  return t("common.price", { price: priceDisplay.price });
};
