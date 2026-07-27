import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Register",
    description:
      "All participants have to register for participating at the Online Campus Interview. The registration is free of charge and without any obligations.",
    hasButton: true,
  },
  {
    number: "2",
    title: "Make a CV",
    description:
      "Fill in our CV template and make yourself appealing to registered companies. We highly encourage you to fill out every information asked to increase your chances for an interview.",
  },
  {
    number: "3",
    title: "Request Interviews",
    description:
      "Browse company profiles and send interview requests to the appealing ones. All interviews are allocated on a first come, first serve basis. Please note, that if an interview request is accepted, attending the interview at the Online Campus Interview day becomes mandatory.",
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

    px-8 lg:px-[100px]
    py-[120px]

    gap-8 sm:gap-[72px]
  "
    >
      <div className="w-full max-w-[1500px] mx-auto">
        {/* Title */}
        <div className="flex flex-col gap-4 mb-[70px] w-full">
          <h2 className="text-center text-[#8072FF] text-[36px] leading-[40px] sm:text-[48.5px] sm:leading-[46px] font-thin">
            How does the <br className="hidden sm:block mb-3" />
            Online Campus Interview work?
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl p-6 min-h-[200px] shadow-sm bg-gray-100"
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
                  className="inline-block mt-8 px-5 py-2.5 bg-primaryPurple text-white text-sm font-medium rounded-full hover:opacity-90 transition"
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
