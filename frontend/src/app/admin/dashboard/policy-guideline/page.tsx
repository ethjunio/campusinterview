import { Metadata } from "next";
import PolicyGuideline from "./_components/policyGuidance";

export const metadata: Metadata = {
  title: "Switch Campus",
  description: "Switch campus",
};

const FaqBox = () => {
  return <PolicyGuideline />;
};

export default FaqBox;
