import { Calendar, MapPin } from "lucide-react";

interface params {
  jobListings: any;
}
const EventInfoSection = ({ jobListings }: params) => {
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
      <div className="max-w-7xl mx-auto px-[15px] sm:px-6">
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Companies */}

          {/* Dates & Location */}
          {/* <div className="space-y-4"> */}
          <div className="flex flex-col items-start gap-6 px-[24px] py-[20px] bg-white shadow-sm rounded-xl border border-[#E2DFF7]">
            <h4 className="font-semibold text-2xl text-foreground flex items-center gap-2 text-[#020418] text-[22px] leading-[26px]">
              {/* <Calendar className="w-4 h-4" /> */}
              Important Dates
            </h4>

            <div className="space-y-4 text-xs text-muted-foreground w-full">
              <div className="flex gap-4">
                <span className="!text-primaryPurple ">
                  <img src="/img/onlinecampus/Importantdate3.png" />
                </span>
                <div className="flex flex-col">
                  <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                    Registration Deadline
                  </span>
                  <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                    {formatDate(
                      new Date(jobListings?.companyRegistrationCloseDate),
                      true
                    )}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="!text-primaryPurple">
                  <img src="/img/onlinecampus/Importantdate2.png" />
                </span>
                <div className="flex flex-col">
                  <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                    Matching Deadline
                  </span>
                  <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                    {formatDate(new Date(jobListings?.matchingCloseDate), true)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="!text-primaryPurple">
                  <img src="/img/onlinecampus/Importantdate1.png" />
                </span>
                <div className="flex flex-col">
                  <span className="text-gray-400 font-normal text-[#6A7282] text-[16px] leading-[20px] font-thin">
                    Interview Day
                  </span>
                  <span className="font-medium text-foreground text-[#020418] text-[16px] leading-[20px] font-thin">
                    {formatDate(new Date(jobListings?.eventDate), true)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className=" shadow-sm rounded-xl border border-[#E2DFF7]  p-8 bg-accent  p-4 bg-white flex flex-col items-start gap-6 px-[24px] py-[20px] bg-white">
            {/* Title */}
            <h2 className="font-semibold text-2xl text-foreground flex items-center gap-2 text-[#020418] text-[22px] leading-[26px]">
              Agenda
            </h2>

            {/* Content Row */}
            <div className="space-y-4 text-xs text-muted-foreground w-full">
              <div className="flex items-start gap-4">
                <img
                  src="/img/onlinecampus/Importantdate5.png"
                  className="w-8 h-8 object-contain"
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
                  className="w-8 h-8 object-contain"
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
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
