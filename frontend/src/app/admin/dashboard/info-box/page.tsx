import React from "react";

import { Metadata } from "next";
import InfoBoxPage from "./_components/InfoBoxPage";

export const metadata: Metadata = {
  title: "Info Box",
  description: "Info Box",
};

const InfoBox = () => {
  return <InfoBoxPage />;
};

export default InfoBox;
