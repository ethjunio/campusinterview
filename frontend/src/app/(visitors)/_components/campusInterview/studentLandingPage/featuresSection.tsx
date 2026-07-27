import { Zap, Building2, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: "/img/Component_1.png",
    title: "Efficient & Easy",
    description:
      "Simply send interview requests. All the rest will be organized",
  },

  {
    icon: "/img/Component_2.png",
    title: "70+ companies",
    description: "Offering jobs, internships and theses.",
  },
  // {
  //   icon: "/img/Component_3.png",
  //   title: "Supporting program",
  //   description: "Lunch buffet, student lounge, CV check and CV pics for you.",
  // },
];

const FeaturesSection = () => {
  return (
    <section
      className="
    min-h-[20vh]
    flex flex-col items-center justify-center
    gap-8
    max-w-7xl mx-auto px-[10px]
    
    
    
  "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 w-full bg-white rounded-md shadow-sm">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card rounded-xl p-2 sm:p-5 flex items-start gap-4 my-4 lg:my-2"
          >
            <div className="w-20 h-20 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <img
                src={f?.icon}
                alt="Career fair networking"
                className="w-20 h-20"
              />
            </div>

            <div>
              <h3 className="text-[#0621B7] text-[22px] leading-[26px]">
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

export default FeaturesSection;
