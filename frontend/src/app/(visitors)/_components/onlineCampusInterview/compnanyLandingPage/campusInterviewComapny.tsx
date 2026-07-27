import Navbar from "../homepage/navbar";
import Footer from "../studentLandingPage/footer";
import BenefitsSection from "./benifitsSection";
import CompositionSection from "./compositionSection";
import CTASection from "./ctaBanner";
import EventInfoSection from "./eventInfoSection";
import FAQSection from "./faqSection";
import HeroSection from "./heroSection";
import HowItWorksSection from "./howItWorksSection";
import StatsSection from "./statsSection";
import TestimonialsSection from "./testimonialsSection";
import WhyCampusSection from "./whyCampusSection";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isActive: number; // 1 or 0 (can also be boolean if backend changes)
  type: "candidate" | "company"; // union type (based on your data)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
const OnlineCampusInterviewCompany = ({
  impressions,
  talentData,
  faqsData,
}: {
  impressions: any[];
  talentData: any;
  faqsData: FAQ[];
}) => {
  return (
    <div className=" bg-gray-100">
      {/* <Navbar /> */}
      <HeroSection jobListings={talentData} />
      <StatsSection />
      <CompositionSection />
      <TestimonialsSection />
      <EventInfoSection jobListings={talentData} />
      <HowItWorksSection />
      <WhyCampusSection />
      <BenefitsSection />
      <FAQSection faqsData={faqsData} />
      <CTASection />
      <Footer />
    </div>
  );
};

export default OnlineCampusInterviewCompany;
