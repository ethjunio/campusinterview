import ctaIllustration from "@/assets/cta-illustration.png";
import Link from "next/link";

const CTASection = () => {
  return (
    <section
      className="py-16 lg:py-20 px-[10px]
    md:px-[20px]
    lg:px-[30px]"
    >
      <div
        className="max-w-7xl mx-auto  bg-cover bg-center bg-no-repeat rounded-xl"
        style={{ backgroundImage: "url('/img/backgroundImage_23.png')" }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "var(--cta-gradient)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 sm:w-56 lg:w-64 h-40 sm:h-56 lg:h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col items-center text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
            <img
              src="/img/Group_4.png"
              alt="Career illustration"
              className="w-40 sm:w-56 lg:w-64 mb-6 rounded-xl"
            />

            <p className="font-semibold text-foreground mb-6 text-[22px] text-[#020418] leading-[26px] mb-0">
              Be a part of the companies <br />
              leading tomorrow!.
            </p>

            <Link
              href="/register"
              className="px-6 py-2.5 bg-primaryPurple text-gray-100 text-sm sm:text-base font-medium rounded-full hover:opacity-90 transition-opacity text-[22px] text-[#fff] bg-[linear-gradient(90deg,#1454CE_63%,#0621B7_100%)]"
            >
              Join now !
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
