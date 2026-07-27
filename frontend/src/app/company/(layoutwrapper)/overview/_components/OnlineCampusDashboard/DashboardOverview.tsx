import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LocationCard from "./LoactionCard";
import ImportantDatesCard from "./ImportantDatesCards";
import AgendaCard from "./AgendaSection";
import VideoPlayer from "./VideoPlayer";
import InfoCards from "./InfoCards";
import MatchesSection from "./matchesSection";
import DownloadsSection from "./DownloadsSection";
import ContactSection from "./ContactSection";
import Link from "next/link";

const OnlineDashboardCampusInterview = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className=" overflow-x-hidden">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Hero area: left column + right column on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,380px)_1fr] lg:grid-cols-[minmax(300px,440px)_1fr] gap-6 lg:gap-8">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-light text-foreground leading-tightest text-[32px] leading-[40px] mb-[30px]">
                  Welcome to
                  <br />
                 Online Campus Interview
                </h1>
                <Link href="/company/profile/bookings">
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primaryPurple px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity text[#8072FF] mb-[40px] !text-[16px] leading-[24px]">
                    Book a Room <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
              <InfoCards />
              <ImportantDatesCard />
              <AgendaCard />
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Video - on mobile shows above welcome in design, but we keep it here for simplicity */}
              <div className="order-first md:order-none -mx-4 md:mx-0 -mt-2 md:mt-0 p-4 sm:p-0">
                <VideoPlayer />
              </div>
              <MatchesSection />
            </div>
          </div>

          {/* Bottom section: Downloads + Contact */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DownloadsSection />
            <ContactSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnlineDashboardCampusInterview;
