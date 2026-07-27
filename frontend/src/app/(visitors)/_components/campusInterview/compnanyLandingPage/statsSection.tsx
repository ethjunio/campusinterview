import { Users, MessageSquare, TrendingUp } from "lucide-react";

const features = [
  {
    icon: "/img/company/companyLanding1.png",
    title: "Talent Pool",
    description:
      "of more than 1400 graduate students from ETH Zurich, University of Zurich and other leading Swiss Universities.",
  },
  {
    icon: "/img/company/companyLanding2.png",
    title: "8+ interviews",
    description:
      "with candidates of your choice meeting your requirements, organized via a matching platform.",
  },

  {
    icon: "/img/company/companyLanding3.png",
    title: "90% success rate",
    description:
      "to hire 1-2 candidates per room. It’s not a job fair, it’s a job interview day",
  },
];

const StatsSection = () => {
  return (
    <section
      className="
    min-h-[20vh]
    flex flex-col items-center justify-center
    gap-8
    sm:px-[10px]
    px-[15px]
    md:px-[20px]
    lg:px-[30px]
    max-w-7xl mx-auto
    
  "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full bg-white flex justify-center rounded-xl shadow-sm pb-5 py-1">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card rounded-xl p-5 md:pb-0 flex items-start gap-4 my-4 lg:my-2"
          >
            <div className="w-20 h-20 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <img
                src={f?.icon}
                alt="Career fair networking"
                className="w-20 h-20"
              />
            </div>

            <div>
              <h3 className="font-bold text-[#0621B7] text-[22px] leading-[26px]">
                {f.title}
              </h3>
              <p className="lg:text-base text-muted-foreground mt-1 leading-relaxed text-[16px] leading-[20px] font-normal">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
