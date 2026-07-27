"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isActive: number; // 1 or 0 (can also be boolean if backend changes)
  type: "candidate" | "company"; // union type (based on your data)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
interface params {
  faqsData: FAQ[];
}
const FAQSection = ({ faqsData }: params) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="campusStudentFaqs"
      className="
    flex flex-col items-center
    bg-card
    gap-[82px]          /* Mobile */
    sm:gap-16           /* Tablet & Desktop = 64px */
     py-[120px]
    relative z-[3]"
    >
      <div className="w-full max-w-[1512px] mx-auto flex flex-col items-center gap-8 px-6">
        {/* Heading Block */}
        <div className="flex flex-col items-center text-center gap-4 max-w-md">
          <h2 className="mb-2 text-[#020418] text-[48.5px] leading-[46px] font-normal">
            FAQ
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed font-normal text-[#020418] text-[16px] leading-[20px] font-normal">
            If you have any more questions about the companies and application
            process please contact our team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="w-full max-w-3xl space-y-2">
          {faqsData?.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="border-b border-[#8072FF]-300 bg-background"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center py-4 text-sm font-medium border-b !border-[#8072FF]"
                >
                  <span className="w-[90%] text-left text-base font-medium text-[#020418] text-[16px] leading-[20px]">
                    {faq.question}
                  </span>

                  <div className="w-[10%] flex justify-end">
                    <Plus
                      className={`w-8 h-8 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-base text-muted-foreground pb-2 leading-relaxed text-[#020418] text-[14px] leading-[20px] font-[100]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
