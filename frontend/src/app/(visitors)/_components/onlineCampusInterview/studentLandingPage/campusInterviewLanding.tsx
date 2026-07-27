import Navbar from "../homepage/navbar";
import CompaniesSection from "./companiesSection";
import CTASection from "./ctaSection";
import FAQSection from "./faqSection";
import FeaturesSection from "./featuresSection";
import Footer from "./footer";
import HeroSection from "./herosection";
import HowItWorksSection from "./howitworkssection";
import TestimonialsSection from "./testimonialsSection";

interface CompanyLogo {
  imageUrl: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isActive: number; // 1 or 0 (can also be boolean if backend changes)
  type: "candidate" | "company"; // union type (based on your data)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
interface LookingForJobProps {
  logos: CompanyLogo[];
  jobListings: any;
  faqsData: FAQ[];
}

const OnlineCampusInterviewStudentLanding: React.FC<LookingForJobProps> = ({
  logos,
  jobListings,
  faqsData,
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <HeroSection jobListings={jobListings} />
      <FeaturesSection />
      <CompaniesSection companyLogos={logos} jobListings={jobListings} />
      <HowItWorksSection />
      <FAQSection faqsData={faqsData} />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default OnlineCampusInterviewStudentLanding;
