import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Register",
    description:
      "Register to have a look at the Online Campus Interview web app and find more information. The registration is free of charge and without any obligations.",
    hasButton: true,
  },
  {
    number: "2",
    title: "Make a booking",
    description:
      "Make a booking to fully participate at the Online Campus Interview. This will grant you access to our large Online Pool with up to 1900 students.",
  },
  {
    number: "3",
    title: "Request Interviews",
    description:
      "Browse student profiles and send interview requests. All interviews are arranged on a first-come, first-served basis. So better be early.",
  },
  {
    number: "4",
    title: "Interview day",
    description: "Your interviews take place in person.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      className="
    flex flex-col items-start
    bg-white relative z-[2]
    px-[15px] sm:px-8 lg:px-[140px]
    py-[50px]
    sm:py-[150px]
    md:py-[100px]
    gap-8 sm:gap-[72px]
  "
    >
      <div className="w-full max-w-[1512px] mx-auto">
        {/* Title */}
        <div className="flex flex-col gap-4 mb-5 sm:mb-12 w-full">
          <h2 className="text-center text-[#8072FF] text-[36px] leading-[40px] sm:text-[48.5px] sm:leading-[46px] font-thin">
            How does the <br className="hidden sm:block" />
            Online Campus Interview work?
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl p-6 min-h-[200px] border border-border/50 shadow-sm bg-[#F3F2FB]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[40px] h-[40px] rounded-full bg-primaryPurple flex items-center justify-center text-white text-sm font-bold !text-[18px]">
                  {step.number}
                </div>

                <h3 className="font-semibold text-[#8072FF] text-[22px] leading-[26px]">
                  {step.title}
                </h3>
              </div>

              <p className="text-base font-light text-muted-foreground leading-relaxed text-[#020418] text-[16px] leading-[22px]">
                {step.description}
              </p>

              {step.hasButton && (
                <Link
                  href="/register"
                  className="inline-block mt-8 px-5 py-2.5 bg-primaryPurple text-white text-sm font-medium rounded-full hover:opacity-90 transition text-[14px]"
                >
                  Register now
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
