import heroImage from "@/assets/hero-image.jpg";
import heroImage2 from "@/assets/hero-image-2.jpg";
import { ArrowRight, Calendar, MoveRight } from "lucide-react";
import Link from "next/link";

interface params {
  jobListings: any;
}
const HeroSection = ({ jobListings }: params) => {
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
    <section className="pt-20 lg:pt-24 pb-8 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex gap-6 lg:gap-10  ">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-4  ">
            <div className="space-y-4 lg:space-y-3 mb-8">
              <h1
                className="
                          text-[#020418] text-[48.5px] leading-[46px] font-thin
                               "
              >
                Interview top talents
              </h1>

              <p className="font-proxima semibold text-[22px] leading-[26px] text-[#020418] ">
                and share your company's story.
              </p>
            </div>

            <div className="space-y-2 sm:pl-0 pt-0 lg:pt-4">
              <div className="inline-block bg-primary/10 text-accent-foreground py-1.5 rounded-lg text-xs font-medium">
                <span className="font-proxima font-bold text-[22px] leading-[26px] text-[#020418]">
                  Registration deadline
                </span>
                <div className="flex items-center gap-1 mt-0.5 !text-primaryPurple">
                  <MoveRight className="w-6 h-4" />
                  <span className="text-[#8072FF] font-bold text-[22px] leading-[26px]">
                    {formatDate(
                      new Date(jobListings?.companyRegistrationCloseDate),
                      true
                    )}
                  </span>
                </div>
              </div>
              <div className="block">
                <div className="inline-block bg-primary text-primary-foreground py-1.5 rounded-lg text-xs font-medium">
                  <span className="text-[22px] leading-[26px] text-[#020418]">
                    Interview day
                  </span>
                  <div className="flex items-center gap-1 mt-0.5 !text-primaryPurple">
                    <MoveRight className="w-6 h-4 " />
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
                  src="/img/company/companyLanding14.png"
                  alt="Students at career fair"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-primaryPurple/25 bg-[rgba(128, 114, 255, 0.45)]"></div>

                {/* Blue Overlay */}
                <div className="absolute inset-0 bg-primaryPurple/0 mix-blend-luminosity"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center text-center px-6 h-full">
                  <div className="max-w-[350px] space-y-3">
                    <h2 className="text-white text-[#fff] font-bold text-[22px] leading-[26px]  font-proxima font-proxima">
                      Companies
                    </h2>

                    <p className="text-white text-white text-[16px] leading-[26px] font-normal font-proxima font-normal font-proxima">
                      The Online Campus Interview offers your company a unique
                      opportunity to meet and hire top talents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={"/img/company/companyLanding10.png"}
                  alt="Interview event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden">
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
                    className="bg-gradient-to-r from-[#8072FF] to-[#6B5CFF]  text-white py-3 px-8 rounded-full text-base font-semibold flex items-center gap-2 shadow-lg hover:opacity-90 transition"
                  >
                    Register now
                    <MoveRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/login"
                    className="border-2 border-white text-white py-3 px-8 rounded-full text-base font-medium hover:bg-white hover:text-[#1454CE] transition"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden flex items-center justify-center px-[26px] py-[20px]">
                {/* Background Image */}
                <img
                  src="/img/company/companyLanding13.png"
                  alt="Students at career fair"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Black Overlay (25%) */}
                <div className="absolute inset-0 !bg-primaryPurple/25"></div>

                {/* Blue Overlay (45%) with Luminosity */}
                <div className="absolute inset-0 bg-[rgba(128, 114, 255, 0.45)] mix-blend-luminosity"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-[80%] max-w-xs">
                  <p className="text-white text-white text-[34px] leading-[36px]">
                    Register now and recruit the talent of tomorrow
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
          <div className="hidden lg:block rounded-2xl overflow-hidden  aspect-6/7 ">
            <img
              src="/img/company/companyLanding9.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
