import heroImage from "@/assets/hero-image.png";
import heroImage2 from "@/assets/hero-image-2.png";
import heroImage3 from "@/assets/hero-image-3.png";
import { MoveRight, Calendar } from "lucide-react";
import { RegisterLink } from "@/features/landing/Links";
import Link from "next/link";
import { getInterviewBrandName } from "@/utils/interviewBrand";

interface params {
  jobListings: any;
}

const HeroSection = ({ jobListings }: params) => {
  const brandName = getInterviewBrandName(jobListings?.siteUiFlag);

  const formatDate = (
    date: string | Date | undefined | null,
    withYear = true
  ) => {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: withYear ? "numeric" : undefined,
    });
  };
  return (
    <section className="max-w-7xl mx-auto pt-20 lg:pt-24 pb-8 section-padding">
      <div className="px-3">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-4">
            <div className="space-y-4 lg:space-y-3 mb-8">
              <h1 className="text-[#020418] text-[48.5px] leading-[46px] font-thin">
                Looking for a job?
              </h1>

              <p className="font-proxima semibold text-[22px] leading-[26px] text-[#020418]">
                The largest job interview day in Switzerland
              </p>
            </div>

            <div className="space-y-2 pl-4 sm:pl-0 pt-0 lg:pt-4">
              <div className="inline-block bg-primary/10 text-accent-foreground py-1.5 rounded-lg text-xs font-medium">
                <span className="font-proxima font-bold text-[22px] leading-[26px] text-[#020418]">
                  Registration deadline
                </span>
                <div className="flex items-center gap-1 mt-0.5 !text-primaryPurple">
                  <MoveRight className="w-5 h-5 " />
                  <span className="text-[#8072FF] font-bold text-[22px] leading-[26px]">
                    {formatDate(
                      new Date(jobListings?.candidateRegistrationCloseDate),
                      true
                    )}
                  </span>
                </div>
              </div>
              <div className="block">
                <div className="inline-block bg-primary text-primary-foreground py-1.5 rounded-lg text-xs font-medium">
                  <span className="font-proxima font-bold text-[22px] leading-[26px] text-[#020418]">
                    Interview day
                  </span>
                  <div className="flex items-center gap-1 mt-0.5 !text-primaryPurple">
                    <MoveRight className="w-5 h-5 " />
                    <span className="text-[#8072FF] font-bold text-[22px] leading-[26px]">
                      {formatDate(new Date(jobListings?.eventDate), true)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="relative rounded-[10px] overflow-hidden aspect-[4/3]">
                {/* Background Image */}
                <img
                  src="/img/dashboardCampusInterview1.png"
                  alt="Students at career fair"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 !bg-primaryPurple/25"></div>

                {/* Blue Overlay */}
                <div className="absolute inset-0 bg-[rgba(128, 114, 255, 0.45)] mix-blend-luminosity"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center text-center px-6 h-full">
                  <div className="max-w-[350px] space-y-3">
                    <h2 className="text-[#fff] font-bold text-[22px] leading-[26px]  font-proxima">
                      Students
                    </h2>

                    <p className="text-white text-[16px] leading-[26px] font-normal font-proxima">
                      Get to know companies in up to 8 interviews on a single
                      day and find your dream employer with {brandName}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={"/img/Frame_1193.png"}
                  alt="Interview event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative w-full  aspect-[4/3] rounded-[10px] overflow-hidden">
                {/* Background Image */}
                <img
                  src="/img/studentlanding2.png"
                  alt="Students at career fair"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Blue Overlay */}
                <div className="absolute inset-0 "></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-6 text-center">
                  <Link
                    href="/register"
                    className="text-white py-4 px-8 rounded-full text-[14px] leading-[20px] font-bold flex items-center gap-2 shadow-lg hover:opacity-90 transition bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)]"
                  >
                    Register now
                    <MoveRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/login"
                    className="border-2 border-white text-white py-3 px-8 rounded-full text-[14px] leading-[20px] font-bold hover:bg-white hover:text-[#1454CE] transition"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden flex items-center justify-center px-[0px] py-[0px]">
                {/* Background Image */}
                <img
                  src="/img/studentLanding1.png"
                  alt="Students at career fair"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Black Overlay (25%) */}
                <div className="absolute inset-0 !bg-primaryPurple/25"></div>

                {/* Blue Overlay (45%) with Luminosity */}
                <div className="absolute inset-0  mix-blend-luminosity bg-[rgba(128, 114, 255, 0.45)]"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-[70%] max-w-xs">
                  <p className="text-white text-[34px] leading-[36px]">
                    Register now and find your dream job
                  </p>
                </div>
              </div>
              {/* <div className="col-span-2 sm:col-span-1">
                <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Register now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-accent rounded-xl p-4 flex items-center">
                <p className="text-sm font-semibold text-accent-foreground">
                  Register now and find your dream job
                </p>
              </div> */}
            </div>
          </div>

          {/* Right hero image */}
          <div className="hidden lg:block rounded-xl overflow-hidden">
            <img
              src={"/img/Frame_1189.png"}
              alt="Career fair networking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
