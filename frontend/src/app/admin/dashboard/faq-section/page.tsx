import React from "react";

import { Metadata } from "next";
import FaqSectionPage from "./_components/faqSectionPage";

export const metadata: Metadata = {
  title: "Faq Section",
  description: "Faq section",
};

const FaqBox = () => {
  return <FaqSectionPage />;
};

export default FaqBox;
