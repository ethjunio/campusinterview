import { Mail, Phone, Search } from "lucide-react";
import womanIllustration from "@/assets/woman-illustration.png";

const BenefitsSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-3 sm:py-16 bg-section relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blob rounded-full opacity-30 blur-3xl" />

      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <div
            className="bg-card rounded-2xl  px-[15px] sm:p-6 sm:p-8 
                w-full 
                flex flex-col justify-center"
          >
            <div className="space-y-5">
              <h2 className="text-[#8072FF] text-[36px] leading-[40px] sm:text-[36px] sm:leading-[40px] font-thin">
                Benefit as a young start-up
              </h2>

              <p className="text-base font-light text-muted-foreground leading-relaxed text-[#020418] text-[16px] leading-[22px]">
                We offer a special deal to innovative start-ups in our mission
                to prone entrepreneurship. The Online Campus Interview is the
                perfect place to recruit top talents with minimal effort. All
                companies younger than 5 years are very welcomed to apply. More
                information upon request.
              </p>

              <div className="block lg:flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:campusinterview@ethjuniors.ch?subject="subject"`}
                >
                  <button
                    className="!bg-primaryPurple text-white mb-3 py-3 px-4 
                         rounded-full text-sm font-medium 
                         hover:opacity-90 transition-opacity 
                         flex items-center justify-center gap-2 bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)] text-[14px]"
                  >
                    <Mail className="w-4 h-4" />
                    campusinterview@ethjuniors.ch
                  </button>
                </a>
                <a href="tel:+41446326638">
                  <button
                    className="!bg-primaryPurple text-white py-3 px-4 
                         rounded-full text-sm font-medium 
                         hover:opacity-90 transition-opacity 
                         flex items-center justify-center gap-2 bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)] text-[14px]"
                  >
                    <Phone className="w-4 h-4" />
                    +41 44 632 66 38
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={"/img/company/companyLanding4.png"}
              alt="Benefits for startups"
              className="object-contain md:w-[60%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
