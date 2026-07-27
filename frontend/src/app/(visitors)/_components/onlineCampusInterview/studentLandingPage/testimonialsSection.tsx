"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";

const TestimonialsSection = () => {
  const t = useTranslations();

  const testimonials = [
    {
      icon: "https://cdn.campusinterview.ch/testimonies/students/01.jpeg",
      name: t("looking-for-job.testimonies.name-1"),
      role: "ETH Mas Grad",
      text: t("looking-for-job.testimonies.message-1"),
    },
    {
      icon: "https://cdn.campusinterview.ch/testimonies/students/02.jpeg",
      name: t("looking-for-job.testimonies.name-2"),
      role: "ETH Mas Grad",
      text: t("looking-for-job.testimonies.message-2"),
    },
    {
      icon: "https://cdn.campusinterview.ch/testimonies/students/03.jpeg",
      name: t("looking-for-job.testimonies.name-3"),
      role: "ETH Mas Grad",
      text: t("looking-for-job.testimonies.message-3"),
    },
  ];

  return (
    <div
      className="
    relative w-full
    bg-cover bg-center bg-no-repeat
    flex flex-col items-center
    gap-[100px]
    py-[150px]
    px-4 sm:px-8 lg:px-0
    z-[5]
  "
      style={{ backgroundImage: "url('/img/backgroundImage_23.png')" }}
    >
      {/* Heading */}
      <div className="flex flex-col gap-4 text-center">
        <h2 className="font-bold text-gray-900 text-[#020418] !text-[36px] leading-[38px] font-bold">
          Impressions of past <br /> events from Students
        </h2>
      </div>

      {/* Slider Wrapper */}
      <div className="relative  w-full max-w-6xl overflow-hidden  mx-auto top-[-30px]">
        {/* LEFT BUTTON */}
        <button className="testimonial-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black text-white sm:p-3 rounded-full">
          <ArrowLeft size={18} />
        </button>

        {/* RIGHT BUTTON */}
        <button className="testimonial-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black text-white sm:p-3 rounded-full">
          <ArrowRight size={18} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 2.5,
            },
          }}
          loop
          className="px-6 md:px-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide
              key={index}
              className="
          w-full
          sm:w-[429px]
          min-h-[280px]
          flex flex-col items-start
          p-6 gap-2
          bg-[#F3F2FB]
          border border-[#C0DAFF]
          rounded-[10px]
          flex-shrink-0
        "
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.icon}
                    className="w-full h-full rounded-lg object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <h4 className="font-thin text-[#8072FF] !text-[22px] leading-[26px] mb-2">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 text-[#020418] !text-[14px] leading-[20px] font-thin">
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed text-[#020418] !text-[16px] leading-[22px] font-[400]">
                {item.text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsSection;
