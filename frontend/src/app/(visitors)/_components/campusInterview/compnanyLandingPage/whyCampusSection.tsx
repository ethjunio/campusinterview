import whyIllustration from "@/assets/why-illustration.png";
import Link from "next/link";

const WhyCampusSection = () => {
  return (
    <section
      className="max-w-7xl mx-auto relative overflow-hidden bg-background 
                    py-14 lg:py-20"
    >
      {/* Decorative blob */}
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 
                  bg-blob rounded-full opacity-30 blur-3xl"
      />

      <div
        className="max-w-7xl mx-auto
                  lg:px-6 lg:px-12 "
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/img/company/companyLanding5.png"
              alt="Why Campus Interview"
              className="object-contain md:w-[60%]"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 text-left md:text-left  px-[15px] sm: px-[10px]">
            <h2 className="text-[#0621B7] text-[36px] leading-[40px] sm:text-[36px] sm:leading-[40px] font-thin">
              Why Campus Interview?
            </h2>

            <p className="text-base font-light text-muted-foreground leading-relaxed text-[#020418] text-[16px] leading-[22px]">
              The Campus Interview offers your company the unique
              opportunity to attract top talents. Our large online pool holds up
              to 1900 graduate students and PhDs from ETH Zurich, the University
              of Zurich and more. Our online matching platform allows you to
              connect with excellent candidates meeting your requirements and
              invite them for an interview.
            </p>

            <div className="flex md:justify-start">
              <Link
                href="/register"
                className="bg-[linear-gradient(90deg,#1454CE_63%,#0621B7_100%)] text-white py-3 px-6 
                             rounded-full text-sm font-medium 
                             hover:opacity-90 transition-opacity text-[14px]"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCampusSection;
