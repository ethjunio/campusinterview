import {
  AlertTriangle,
  ArchiveX,
  Calendar,
  Hamburger,
  MapPin,
  Plus,
  Users,
} from "lucide-react";

const companies = [
  {
    icon: "/img/Frame_1177.png",
    title: "Accenture",
    description:
      "Apply to your dream company with just a few clicks, register and upload your CV.",
  },
  {
    icon: "/img/ELCA.png",
    title: "ELCA",
    description:
      "The largest job interview day with over 70 companies at one location.",
  },
  {
    icon: "/img/NoserEngineering_PNG.png",
    title: "NoserEngineering_PNG",
    description:
      "Job application training, CV checks and workshops to prepare you for success.",
  },
  {
    icon: "/img/Parallel_PNG.png",
    title: "Parallel_PNG",
    description:
      "Apply to your dream company with just a few clicks, register and upload your CV.",
  },
  {
    icon: "/img/VAT_PNG.png",
    title: "VAT_PNG",
    description:
      "The largest job interview day with over 70 companies at one location.",
  },
  {
    icon: "/img/altman.png",
    title: "altman",
    description:
      "Job application training, CV checks and workshops to prepare you for success.",
  },
  {
    icon: "/img/images.png",
    title: "Efficient & Easy",
    description:
      "Apply to your dream company with just a few clicks, register and upload your CV.",
  },
  {
    icon: "/img/lonza.png",
    title: "lonza",
    description:
      "The largest job interview day with over 70 companies at one location.",
  },
  {
    icon: "/img/sitrox.png",
    title: "sitrox",
    description:
      "Job application training, CV checks and workshops to prepare you for success.",
  },
  {
    icon: "/img/ubs-logo.png",
    title: "ubs-logo",
    description:
      "Apply to your dream company with just a few clicks, register and upload your CV.",
  },
  {
    icon: "/img/wurth-logo-transparent-fotor-20230817182311.png",
    title: "companies",
    description:
      "The largest job interview day with over 70 companies at one location.",
  },
  {
    icon: "/img/altman1.png",
    title: "altman1",
    description:
      "Job application training, CV checks and workshops to prepare you for success.",
  },
];
interface CompanyLogo {
  imageUrl: string;
}
interface params {
  companyLogos: CompanyLogo[];
  jobListings: any;
}
const CompaniesSection = ({ companyLogos, jobListings }: params) => {
  const updatedCompanyLogos: CompanyLogo[] = [
    ...companyLogos,
    { imageUrl: "/img/wurth-logo-transparent-fotor-20230817182311.png" },
    { imageUrl: "/img/altman1.png" },
  ];
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
    <section className="py-8 section-padding">
      <div
        className="max-w-7xl mx-auto px-[10px]
    "
      >
        <div className="bg-card ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            {/* Companies */}
            <div className="lg:col-span-2 pt-5 bg-white rounded-md shadow-sm">
              <div className="flex flex-col items-center justify-center gap-[2px] w-full max-w-[1259px] mx-auto my-6">
                <p className="text-lg mb-2 text-muted-foreground text-[#020418] !text-[22px] leading-[26px]">
                  Companies participating
                </p>

                <p className="text-xl font-semibold !text-primaryPurple font-sans text-[#020418] !text-[22px] leading-[26px]">
                  in Program of Autumn 2025
                </p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-10 mt-8">
                {updatedCompanyLogos.map((c) => (
                  <div
                    key={c?.imageUrl}
                    className="flex items-center justify-center h-28"
                  >
                    <img
                      src={c?.imageUrl}
                      alt="company logo"
                      className="max-h-20 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dates & Location */}
            <div className="space-y-4 gap-6 ">
              <div className=" flex flex-col shadow-sm items-start gap-6 px-[24px] py-[20px] bg-white rounded-md">
                <h4 className="font-semibold text-2xl text-foreground flex items-center gap-2 text-[#020418] text-[22px] leading-[26px]">
                  Important Dates
                </h4>

                <div className="space-y-4 text-xs text-muted-foreground w-full">
                  <div className="flex items-start gap-4">
                    <img
                      src="/img/onlinecampus/Importantdate3.png"
                      className="w-[40px] h-[40px] object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                        Registration Deadline
                      </span>
                      <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                        {formatDate(
                          new Date(jobListings.candidateRegistrationCloseDate),
                          true
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img
                      src="/img/onlinecampus/Importantdate2.png"
                      className="w-[40px] h-[40px] object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                        Matching Deadline
                      </span>
                      <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                        {formatDate(
                          new Date(jobListings.matchingCloseDate),
                          true
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img
                      src="/img/onlinecampus/Importantdate1.png"
                      className="w-[40px] h-[40px] object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                        Interview Day
                      </span>
                      <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                        {formatDate(new Date(jobListings.eventDate), true)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-accent  rounded-md shadow p-4 bg-white flex flex-col items-start gap-6 px-[24px] py-[20px] bg-white ">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 text-[#020418] text-[22px] leading-[26px]">
                  Agenda
                </h2>

                {/* Content Row */}
                <div className="space-y-4 text-xs text-muted-foreground w-full">
                  <div className="flex items-start gap-4">
                    <img
                      src="/img/onlinecampus/Importantdate5.png"
                      className="w-[40px] h-[40px] object-contain"
                      alt="Interviews"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                        Interviews
                      </span>
                      <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                        {jobListings?.agendaInterviewsRange}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img
                      src="/img/onlinecampus/Importantdate4.png"
                      className="w-[40px] h-[40px] object-contain"
                      alt="Break"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                        Break
                      </span>
                      <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                        {jobListings?.agendaLunchRange}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
